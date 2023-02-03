import { prisma } from '../src/config/database';

export async function cleanDb() {
  await prisma.transactions.deleteMany({});
  await prisma.customTypes.deleteMany({});
}