import express from "express";
import { ValidationChain } from "express-validator";

import { ErrorInfo } from "./errors/GeneralError";

/**
 * General
 */

export type ErrorObject = { [name: string]: ErrorInfo };

/**
 * Routes
 */

export enum RequestType {
  POST = "POST",
  GET = "GET",
}

export type RouteFn = (
  req: any,
  res: express.Response,
  // TODO consider having user be of type UserProfile (or whatever our internal
  // user representation is)
  user?: Express.User
) => Promise<void>;

export type RouteDefinition = {
  fn: RouteFn;
  endpoint: string;
  type: RequestType;
  validators: ValidationChain[];
  requireAuthentication?: boolean;
  preValidatorCustomMiddleware?: any[];
  // TODO Maybe should be express.NextFunction or RequestHandler?
  customMiddleware?: any[];
  afterRoute?: express.NextFunction[];
};

export type RoutesObject = {
  [routeCategory: string]: RouteDefinition | RoutesObject;
};

// Describes all routes that should be defined for any
// place where each route is mapped to a definition of type T.
// For example, mapping each route to its route definition
// or to a validator chain
export type DefinedRoutes<T> = {
  views: {
    home: T;
  };
  users: {
    getEVector: T;
    authenticateUser: T;
    getUserInfo: T;
    logout: T;
  };
  posts: { getPosts: T; addPost: T };
};

/**
 * Users
 */

// TODO delete
export type User = {
  username: string;
  password: string;
};

export type Post = {
  timestamp: number;
  content: string;
};

export type SignupUserParams = {
  username: string;
  password: string;
};
