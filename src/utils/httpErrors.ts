export abstract class HTTPClientError extends Error {
  readonly statusCode!: number;

  readonly name!: string;

  constructor(message: string | object) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HTTP400Error extends HTTPClientError {
  readonly statusCode: number = 400;

  constructor(message: string | Object = "Bad Request!") {
    super(message);
  }
}

export class HTTP404Error extends HTTPClientError {
    readonly statusCode: number = 404;

    constructor(message: string | Object = "Not Found!") {
      super(message);
    }
}

export abstract class RejectionError extends Error {
  readonly statusCode!: number;

  readonly name!: string;

  constructor(message: string | object) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
