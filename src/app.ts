import express from 'express';
import cors from 'cors';

import { transactionsRouter } from './routers/transactionsRouter.js';

import { loadEnv } from './config/envs.js';
import { connectDb } from './config/database.js';

connectDb();
loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use('/transactions', transactionsRouter);

app.listen(process.env.PORT, () => console.log(`Magic happens on ${process.env.PORT}`));
