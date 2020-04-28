import { assert } from "console";

import { ErrorObject, RouteDefinition } from "./types";

export function deleteAllKeysFromObjs(objs: object[]): void {
  objs.forEach(obj => {
    Object.keys(obj).forEach(key => delete obj[key]);
  });
}

export function assertErrorIdsDoNotRepeat(errors: ErrorObject) {
  // Ensure no error ids overlap
  const seenIds = new Set();
  Object.entries(errors).forEach(([_, { id }]) => {
    assert(seenIds.has(id) == false);
    seenIds.add(id);
  });
}

// Type-guard to check at runtime if variableToCheck is a route definition
export const isRouteDefinition = (
  variableToCheck: any
): variableToCheck is RouteDefinition =>
  (variableToCheck as RouteDefinition).fn !== undefined;
