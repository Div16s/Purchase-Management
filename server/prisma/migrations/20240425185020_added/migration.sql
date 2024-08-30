-- CreateEnum
CREATE TYPE "RejectedBy" AS ENUM ('NONE', 'HOD', 'JAO', 'ACCOUNTANT', 'AO', 'AR', 'JR', 'DR', 'JS', 'ACCOUNTS', 'PURCHASE', 'REGISTRAR');

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "rejectedBy" "RejectedBy" NOT NULL DEFAULT 'NONE';
