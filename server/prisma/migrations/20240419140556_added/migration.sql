-- AlterTable
ALTER TABLE "BudgetSection" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'JAO';

-- AlterTable
ALTER TABLE "PurchaseSection" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'JS';
