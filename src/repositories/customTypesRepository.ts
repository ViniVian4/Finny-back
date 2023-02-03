import { prisma } from '../config/database';

async function createCustomType(name: string) {
  return prisma.customTypes.create({
    data: {
      name: name
    }
  });
}

async function findCustomTypeByName(name: string) {
  return prisma.customTypes.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      }
    }
  });
}

const customTypesRepository = {
  createCustomType,
  findCustomTypeByName
};

export default customTypesRepository;
