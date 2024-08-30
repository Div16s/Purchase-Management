/*
  Warnings:

  - You are about to drop the `Signature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Signature" DROP CONSTRAINT "Signature_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "signature" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Signature";
