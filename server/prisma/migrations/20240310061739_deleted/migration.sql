/*
  Warnings:

  - You are about to drop the column `fileData` on the `Signature` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `Signature` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Signature" DROP COLUMN "fileData",
DROP COLUMN "fileName";
