import pino, { PrettyOptions } from 'pino';

import { serviceName } from './consts';

const logLevel = process.env.LOG_LEVEL;
const isDevelopment = process.env.NODE_ENV === 'development';

// https://github.com/pinojs/pino-pretty#options
const prettyPrintOptions: PrettyOptions = {
  ignore: 'pid,hostname',
  translateTime: 'SYS:HH:MM:ss.l Z',
};

export const logger = pino({
  name: serviceName,
  level: logLevel,
  prettyPrint: isDevelopment ? prettyPrintOptions : false,
  redact: {
    paths: [
      'req.headers.cookie',
      // hide authorization data in GraphqlError
      'error.context.request.headers.authorization',
    ],
    censor: 'xxx',
  },
  serializers: {
    // In addition to `err` key, Error can be passed via `error` as well
    error: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});
