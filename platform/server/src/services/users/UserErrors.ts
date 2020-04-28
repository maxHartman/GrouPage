import { ErrorObject } from "../../types";
import { assertErrorIdsDoNotRepeat } from "../../utils";

const errors: ErrorObject = {
  USER_NOT_FOUND: { id: "USER-NOT-FOUND", description: "User not found" },
  USERNAME_ALREADY_EXISTS: {
    id: "USERNAME-EXISTS",
    description: "User already exists"
  },
  INVALID_PASSWORD: { id: "INVALID-PASSWORD", description: "Invalid password" },
  INCORRECT_PASSWORD: {
    id: "INCORRECT-PASSWORD",
    description: "Incorrect password"
  },
  USER_NOT_AUTHENTICATED: {
    id: "NOT-AUTHENTICATED",
    description: "User not authenticated"
  }
};

assertErrorIdsDoNotRepeat(errors);

export = errors;
