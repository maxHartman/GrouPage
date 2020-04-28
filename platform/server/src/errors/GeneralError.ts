const name = "GeneralError";

export type ErrorInfo = { id: string; description: string };

export class GeneralError extends Error {
  readonly description: string;
  readonly id: string;
  readonly extra: object;

  constructor({ id, description }: ErrorInfo, extra?: object) {
    super(description);
    // https://gist.github.com/justmoon/15511f92e5216fa2624b
    this.id = id;
    this.name = name;
    this.description = description;
    this.extra = extra;
    Error.captureStackTrace(this, GeneralError);
  }
}
