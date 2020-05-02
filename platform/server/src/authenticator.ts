import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import UserErrors from "./services/users/UserErrors";

const x = { engineering: "testing", art: "demo string" };

export type Authenticated = { groupId: string };

const authenticatedObj = (groupId: string) => ({
  groupId,
});

passport.use(
  "local",
  new LocalStrategy(async (groupId: string, clientsFoundX: string, done) => {
    try {
      if (clientsFoundX !== x[groupId]) {
        // Client did not find the correct x and thus
        // should note be authenticated
        done(null, null);
        return;
      }

      done(null, authenticatedObj(groupId));
    } catch (error) {
      done(null, null, error);
    }
  })
);

passport.serializeUser((user: Authenticated, done) => {
  done(null, user.groupId);
});

passport.deserializeUser(async (groupId: string, done) => {
  done(null, authenticatedObj(groupId));
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
