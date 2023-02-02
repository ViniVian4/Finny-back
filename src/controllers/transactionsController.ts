import httpStatus from 'http-status';
import { Response, Request } from 'express';

import transactionsService from '../services/transactionsService.js';

export async function postTransaction(req: Request, res: Response) {
  try {
    const transaction = await transactionsService.createTransaction(req.body);

    return res.status(httpStatus.CREATED).send(transaction);
  } catch (error) {
    if (error.name === 'bad request') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
