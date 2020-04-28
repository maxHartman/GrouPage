import { ValidationChain } from "express-validator";

import { GeneralError } from "../errors/GeneralError";
import { DefinedRoutes } from "../types";
import RouteErrors from "./RouteErrors";

const routeValidators: DefinedRoutes<ValidationChain[]> = {
  views: {
    home: [],
  },
  users: {
    authenticateUser: [],
    logout: [],
    getUserInfo: [],
  },
};

export = routeValidators;
