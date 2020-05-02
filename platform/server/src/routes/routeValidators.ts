import { ValidationChain } from "express-validator";

import { DefinedRoutes } from "../types";

const routeValidators: DefinedRoutes<ValidationChain[]> = {
  views: {
    home: [],
  },
  users: {
    getEVector: [],
    authenticateUser: [],
    logout: [],
    getUserInfo: [],
  },
  posts: { addPost: [], getPosts: [] },
};

export = routeValidators;
