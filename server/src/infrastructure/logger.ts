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
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});
