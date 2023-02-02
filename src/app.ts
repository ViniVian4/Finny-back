import express from 'express';
import cors from 'cors';

import { loadEnv } from './config/envs.js';
import { connectDb } from './config/database.js';

connectDb();
loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json());

app.listen(process.env.PORT, () => console.log(`Magic happens on ${process.env.PORT}`));
