/*
  Warnings:

  - A unique constraint covering the columns `[formId]` on the table `PurchaseSection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `formId` to the `PurchaseSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseSection" ADD COLUMN     "formId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseSection_formId_key" ON "PurchaseSection"("formId");

-- AddForeignKey
ALTER TABLE "PurchaseSection" ADD CONSTRAINT "PurchaseSection_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
