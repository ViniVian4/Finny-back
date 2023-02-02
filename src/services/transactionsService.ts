import transactionRepository, { CreateTransactionParams } from '../repositories/transactionsRepository.js';
import customTypesRepository from '../repositories/customTypesRepository.js';
import { TypeNames } from '@prisma/client';
import dayjs from 'dayjs';

function generateData(newTransaction: FrontData, id: number) {
  const data: CreateTransactionParams[] = [];

  for (let i = 0; i < newTransaction.installments; i++) {
    const date = dayjs(newTransaction.date).add(i, 'month');

    data.push({
      name: newTransaction.name,
      value: newTransaction.value,
      date: date.format('DD/MM/YYYY'),
      installments: (newTransaction.installments - i),
      type: newTransaction.type,
      customTypeId: id
    });
  }

  return data;
}

async function createTransaction(newTransaction: FrontData) {
  if (newTransaction.type !== TypeNames.EXPENSE && newTransaction.type !== TypeNames.INCOME) {
    throw { name: 'bad request' };
  }

  let customType = await customTypesRepository.findCustomTypeByName(newTransaction.customTypeName);
  if (!customType) {
    customType = await customTypesRepository.createCustomType(newTransaction.customTypeName);
  }

  const data = generateData(newTransaction, customType.id);

  return transactionRepository.createTransactions(data);
}

type FrontData = {
  name: string,
  value: number,
  date: string,
  installments: number,
  type: TypeNames,
  customTypeName: string
}

const transactionsService = {
  createTransaction
};

export default transactionsService;
