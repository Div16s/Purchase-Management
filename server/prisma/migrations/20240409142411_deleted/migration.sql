/*
  Warnings:

  - You are about to drop the column `signature` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "signature";

-- CreateTable
CREATE TABLE "Signature" (
    "id" SERIAL NOT NULL,
    "department" "Department" NOT NULL DEFAULT 'CSE',
    "role" "Role" NOT NULL DEFAULT 'FACULTY',
    "signature" TEXT NOT NULL DEFAULT '',
    "formId" INTEGER NOT NULL,

    CONSTRAINT "Signature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Signature" ADD CONSTRAINT "Signature_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
