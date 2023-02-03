import { prisma } from '../../src/config/database';

export async function createCustomType(name: string) {
  return prisma.customTypes.create({
    data: {
      name: name
    }
  });
}