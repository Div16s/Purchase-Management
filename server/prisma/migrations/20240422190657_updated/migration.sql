/*
  Warnings:

  - The values [ACCOUNTS,DEAN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('FACULTY', 'HOD', 'JAO', 'ACCOUNTANT', 'AO', 'AR', 'JR', 'DR', 'JS', 'REGISTRAR');
ALTER TABLE "PurchaseSection" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Signature" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "BudgetSection" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TABLE "Signature" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TABLE "BudgetSection" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TABLE "PurchaseSection" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "PurchaseSection" ALTER COLUMN "role" SET DEFAULT 'JS';
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'FACULTY';
ALTER TABLE "Signature" ALTER COLUMN "role" SET DEFAULT 'FACULTY';
ALTER TABLE "BudgetSection" ALTER COLUMN "role" SET DEFAULT 'JAO';
COMMIT;
