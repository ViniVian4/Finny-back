import express, { Express } from 'express';
import cors from 'cors';

import { transactionsRouter } from './routers/transactionsRouter';

import { loadEnv } from './config/envs';
import { connectDb } from './config/database';

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use('/transactions', transactionsRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export default app;
