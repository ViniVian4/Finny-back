import { Router } from 'express';
import { validateBody } from '../middlewares/validationMiddleware';
import { postTransaction } from '../controllers/transactionsController';
import { newTransactionSchema } from '../schemas/transactionsSchemas';

const transactionsRouter = Router();

transactionsRouter
  .post('', validateBody(newTransactionSchema), postTransaction);

export { transactionsRouter };
