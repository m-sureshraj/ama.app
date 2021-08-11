import { ResponseCodes } from './consts';

type KeyValue = Record<string, unknown>;

export class AppError extends Error {
  constructor(message?: string, public context: KeyValue = {}) {
    super(message);
  }
}

export class HttpError extends AppError {
  constructor(message: string, public httpStatus: ResponseCodes, context?: KeyValue) {
    super(message, context);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, context?: KeyValue) {
    super(message, ResponseCodes.notFound, context);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, context?: KeyValue) {
    super(message, ResponseCodes.badRequest, context);
  }
}

interface GraphqlErrorResponse extends Error {
  errors: Record<string, unknown>[];
  request: {
    query: string;
    variables: Record<string, unknown>;
    headers: Record<string, unknown>;
  };
}

export class GraphqlError extends BadRequestError {
  constructor(error: GraphqlErrorResponse) {
    if (error.request.headers?.authorization) {
      error.request.headers.authorization = 'NOT AVAILABLE IN LOGS';
    }

    super(error.message, {
      errors: error.errors,
      request: error.request,
    });
  }
}
