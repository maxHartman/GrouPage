import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import UserErrors from "./services/users/UserErrors";
import { UserService } from "./services/users/UserService";
import { User } from "./types";

const userService = new UserService();

passport.use(
  "local",
  new LocalStrategy(async (username, password, done) => {
    try {
      // TODO do actual authentication
      await userService.signupUser({ username, password });
      const user = await userService.getUser(username);
      done(null, user);
    } catch (error) {
      done(null, null, error);
    }
  })
);

passport.serializeUser((user: User, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username: string, done) => {
  // TODO
  const user = await userService.getUser(username);
  done(null, user);
});

function isLoggedIn(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  // passport adds this to the request object
  if (request.isAuthenticated()) {
    return next();
  }
  return response.send(UserErrors.USER_NOT_AUTHENTICATED);
}

export { passport, isLoggedIn };
