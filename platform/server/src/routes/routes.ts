import { passport } from "../authenticator";
import {
  DefinedRoutes,
  RequestType,
  RouteDefinition,
  RoutesObject,
} from "../types";
import { isRouteDefinition } from "../utils";
import {
  addPost,
  authenticateUser,
  getEVector,
  getPosts,
  getUserInfo,
  getViewHome,
  logout,
} from "./routeFns";
import routeValidators from "./routeValidators";

const routes: DefinedRoutes<RouteDefinition> = {
  views: {
    home: {
      fn: getViewHome,
      endpoint: "/",
      type: RequestType.GET,
      validators: routeValidators.views.home,
    },
  },
  posts: {
    getPosts: {
      fn: getPosts,
      endpoint: "/getPosts",
      type: RequestType.GET,
      validators: routeValidators.posts.getPosts,
    },
    addPost: {
      fn: addPost,
      endpoint: "/addPost",
      type: RequestType.POST,
      validators: routeValidators.posts.addPost,
    },
  },
  users: {
    authenticateUser: {
      fn: authenticateUser,
      endpoint: "/auth",
      type: RequestType.POST,
      validators: routeValidators.users.authenticateUser,
      customMiddleware: [passport.authenticate("local")],
    },
    logout: {
      fn: logout,
      endpoint: "/logout",
      type: RequestType.GET,
      validators: routeValidators.users.logout,
    },
    getUserInfo: {
      fn: getUserInfo,
      endpoint: "/getUserInfo",
      type: RequestType.GET,
      validators: routeValidators.users.getUserInfo,
    },
    getEVector: {
      fn: getEVector,
      endpoint: "/getEVector",
      type: RequestType.GET,
      validators: routeValidators.users.getEVector,
    },
  },
};

// No need to touch anything below here
function executeForEachRoute(
  routesObj: RoutesObject,
  fnToExecute: (valAsDef: RouteDefinition) => void
): void {
  Object.entries(routesObj).forEach(([_, val]) => {
    if (!isRouteDefinition(val)) {
      executeForEachRoute(val, fnToExecute);
      return;
    }

    fnToExecute(val);
  });
}

const endpointToRole: Map<string, boolean> = new Map();
executeForEachRoute(routes, (routeAsDef) =>
  endpointToRole.set(routeAsDef.endpoint, routeAsDef.requireAuthentication)
);

export { routes, executeForEachRoute, endpointToRole };
