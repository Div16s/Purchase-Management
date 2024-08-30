-- CreateTable
CREATE TABLE "BudgetSection" (
    "id" SERIAL NOT NULL,
    "budgetHead" TEXT NOT NULL DEFAULT '',
    "sanctionedBudget" TEXT NOT NULL DEFAULT '',
    "budgetAvailable" TEXT NOT NULL DEFAULT '',
    "budgetBooked" TEXT NOT NULL DEFAULT '',
    "balanceBudget" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "BudgetSection_pkey" PRIMARY KEY ("id")
);
