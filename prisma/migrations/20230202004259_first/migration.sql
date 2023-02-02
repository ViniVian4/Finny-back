-- CreateEnum
CREATE TYPE "TypeNames" AS ENUM ('EXPENSE', 'INCOME');

-- CreateTable
CREATE TABLE "CustomTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "value" INTEGER NOT NULL,
    "date" VARCHAR(10) NOT NULL,
    "installments" INTEGER,
    "customTypeId" INTEGER NOT NULL,
    "type" "TypeNames" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_customTypeId_fkey" FOREIGN KEY ("customTypeId") REFERENCES "CustomTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
