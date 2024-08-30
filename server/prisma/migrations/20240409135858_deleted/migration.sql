/*
  Warnings:

  - You are about to drop the column `budgetHead` on the `BudgetSection` table. All the data in the column will be lost.
  - You are about to drop the column `sanctionedBudget` on the `BudgetSection` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[formId]` on the table `BudgetSection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `formId` to the `BudgetSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BudgetSection" DROP COLUMN "budgetHead",
DROP COLUMN "sanctionedBudget",
ADD COLUMN     "formId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BudgetSection_formId_key" ON "BudgetSection"("formId");

-- AddForeignKey
ALTER TABLE "BudgetSection" ADD CONSTRAINT "BudgetSection_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
