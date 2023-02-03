import { faker } from '@faker-js/faker';
import { prisma } from '../../src/config/database';
import app, { init } from '../../src/app';
import httpStatus from 'http-status';
import supertest from 'supertest';
import dayjs from 'dayjs';

import { cleanDb } from '../helpers';
import { createCustomType } from '../factories/customTypesFactory';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /transactions', () => {
  it('should respond with status 400 when there is no body', async () => {
    const response = await server.post('/transactions');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = (installments: number) => ({
      name: faker.commerce.product(),
      value: faker.datatype.number({ min: 10, max: 100, precision: 1 }),
      date: dayjs(faker.date.birthdate()).format('MM/DD/YYYY'),
      installments: installments,
      type: 'INCOME',
      customTypeName: faker.commerce.productAdjective()
    });

    it('should respond with status 201 and create a new transaction and a new customType when number of installments is 1 and there is no customTypes', async () => {
      const body = generateValidBody(1);

      const response = await server.post('/transactions').send(body);

      expect(response.status).toBe(httpStatus.CREATED);

      const newCustomType = await prisma.customTypes.findFirst({
        where: {
          name: {
            equals: body.customTypeName,
            mode: 'insensitive'
          }
        }
      });
      expect(newCustomType).toEqual(
        expect.objectContaining({
          name: body.customTypeName
        })
      );

      const newTransaction = await prisma.transactions.findFirst({ where: { name: body.name } });
      expect(newTransaction).toEqual(
        expect.objectContaining({
          name: body.name,
          value: body.value,
          date: body.date,
          installments: body.installments,
          type: body.type,
          customTypeId: newCustomType.id
        })
      );
    });

    it('should respond with status 201 and create a new transaction when number of installments is 1 and the body customType already exists', async () => {
      const body = generateValidBody(1);

      const newCustomType = await createCustomType(body.customTypeName);
      expect(newCustomType).toEqual(
        expect.objectContaining({
          name: body.customTypeName
        })
      );

      const response = await server.post('/transactions').send(body);

      expect(response.status).toBe(httpStatus.CREATED);

      const newTransaction = await prisma.transactions.findFirst({ where: { name: body.name, customTypeId: newCustomType.id } });
      expect(newTransaction).toEqual(
        expect.objectContaining({
          name: body.name,
          value: body.value,
          date: body.date,
          installments: body.installments,
          type: body.type,
          customTypeId: newCustomType.id
        })
      );
    });

    it('should respond with status 201 and create new transactions according to number of installments', async () => {
      const body = generateValidBody(2);

      const response = await server.post('/transactions').send(body);

      expect(response.status).toBe(httpStatus.CREATED);

      const newCustomType = await prisma.customTypes.findFirst({
        where: {
          name: {
            equals: body.customTypeName,
            mode: 'insensitive'
          }
        }
      });
      expect(newCustomType).toEqual(
        expect.objectContaining({
          name: body.customTypeName
        })
      );

      const newTransaction = await prisma.transactions.findMany({ where: { name: body.name } });
      expect(newTransaction).toEqual(
        [
          expect.objectContaining({
            name: body.name,
            value: body.value,
            date: body.date,
            installments: body.installments,
            type: body.type,
            customTypeId: newCustomType.id
          }),
          expect.objectContaining({
            name: body.name,
            value: body.value,
            date: dayjs(body.date).add(1, 'month').format('MM/DD/YYYY'),
            installments: (body.installments - 1),
            type: body.type,
            customTypeId: newCustomType.id
          })
        ]
      );
    });
  });

  describe('when body is invalid', () => {
    const generateInvalidBody = () => ({
      name: faker.commerce.product(),
      value: faker.datatype.number({ min: 10, max: 100, precision: 0.01 }),
      date: dayjs(faker.date.birthdate()).format('MM/DD/YYYY'),
      installments: 0,
      type: 'isso',
      customTypeName: faker.commerce.productAdjective()
    });

    it('should respond with status 400', async () => {
      const body = generateInvalidBody();

      const response = await server.post('/transactions').send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
});
