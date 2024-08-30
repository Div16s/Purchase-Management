-- DropForeignKey
ALTER TABLE "BudgetSection" DROP CONSTRAINT "BudgetSection_formId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_formId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseSection" DROP CONSTRAINT "PurchaseSection_formId_fkey";

-- DropForeignKey
ALTER TABLE "Signature" DROP CONSTRAINT "Signature_formId_fkey";

-- AddForeignKey
ALTER TABLE "Signature" ADD CONSTRAINT "Signature_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetSection" ADD CONSTRAINT "BudgetSection_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseSection" ADD CONSTRAINT "PurchaseSection_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
