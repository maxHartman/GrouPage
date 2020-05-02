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
  user?: Express.User
) => Promise<void>;

export type RouteDefinition = {
  fn: RouteFn;
  endpoint: string;
  type: RequestType;
  validators: ValidationChain[];
  requireAuthentication?: boolean;
  preValidatorCustomMiddleware?: any[];
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
 * Posts
 */

export type Post = {
  timestamp: number;
  content: string;
};
