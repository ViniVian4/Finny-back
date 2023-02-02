import { Router } from 'express';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { postTransaction } from '../controllers/transactionsController.js';
import { newTransactionSchema } from '../schemas/transactionsSchemas.js';

const transactionsRouter = Router();

transactionsRouter
  .post("", validateBody(newTransactionSchema), postTransaction);

export { transactionsRouter };
