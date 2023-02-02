import { prisma } from '../config/database.js';
import { Transactions } from '@prisma/client';

async function createTransactions(createData: CreateTransactionParams[]) {
  return prisma.transactions.createMany({
    data: createData
  });
}

export type CreateTransactionParams = Omit<Transactions, 'id' | 'createdAt' | 'updatedAt'>;

const transactionRepository = {
  createTransactions
};

export default transactionRepository;
