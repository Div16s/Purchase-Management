-- CreateEnum
CREATE TYPE "Department" AS ENUM ('CSE', 'EE', 'MNC', 'ME', 'CH', 'CE', 'BME', 'PH');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" "Department" NOT NULL DEFAULT 'CSE';
