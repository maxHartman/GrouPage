import { ErrorObject } from "../types";
import { assertErrorIdsDoNotRepeat } from "../utils";

const errors: ErrorObject = {};

assertErrorIdsDoNotRepeat(errors);

export = errors;
