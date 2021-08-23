import { Response } from 'node-fetch';
import { ObjectID } from 'mongodb';

import { HttpError } from './error';

export function handleFetchError(message: string) {
  return (res: Response): Response => {
    if (!res.ok) {
      throw new HttpError(message, res.status, {
        statusText: res.statusText,
        url: res.url,
      });
    }

    return res;
  };
}

export function convertToObjectId(id: string): ObjectID {
  return new ObjectID(id);
}
