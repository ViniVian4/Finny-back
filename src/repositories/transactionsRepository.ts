import { prisma } from '../config/database';
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
