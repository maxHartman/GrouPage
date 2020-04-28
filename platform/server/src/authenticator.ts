import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import UserErrors from "./services/users/UserErrors";
import { UserService } from "./services/users/UserService";
import { User } from "./types";

const userService = new UserService();

const x = "demo string";

export type Authenticated = { authenticated: string };

const authenticatedObj: Authenticated = { authenticated: "authenticated" };

passport.use(
  "local",
  new LocalStrategy(async (_, clientsFoundX: string, done) => {
    try {
      if (clientsFoundX !== x) {
        // Client did not find the correct x and thus
        // should note be authenticated
        done(null, null);
        return;
      }

      // await userService.signupUser({ username, password });
      // const user = await userService.getUser(username);
      done(null, authenticatedObj);
    } catch (error) {
      done(null, null, error);
    }
  })
);

passport.serializeUser((user: Authenticated, done) => {
  done(null, user.authenticated);
});

passport.deserializeUser(async (username: string, done) => {
  // TODO
  // const user = await userService.getUser(username);
  done(null, authenticatedObj);
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

export { passport, isLoggedIn, x };
