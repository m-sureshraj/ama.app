export enum ResponseCodes {
  ok = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  duplicate = 409,
  unprocessable = 422,
  error = 500,
  unknown = 501,
  serviceUnavailable = 503,
}

export const serviceName = 'ama-api';
