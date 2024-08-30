-- CreateEnum
CREATE TYPE "ApprovedBy" AS ENUM ('NONE', 'INITIAL_HOD', 'FINAL_HOD', 'JAO', 'ACCOUNTANT', 'AO', 'AR', 'JR', 'DR', 'JS', 'REGISTRAR');

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "approvedBy" "ApprovedBy" NOT NULL DEFAULT 'NONE';
