-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "budgetHead" TEXT NOT NULL,
    "sanctionedBudget" INTEGER NOT NULL,
    "approxCost" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "budgetaryApprovalEnclosed" TEXT NOT NULL,
    "readyForInstallation" TEXT NOT NULL,
    "goodForResearchPurpose" TEXT NOT NULL,
    "GEM" TEXT NOT NULL,
    "modeOfEnquiry" TEXT NOT NULL,
    "nameOfSupplier" TEXT NOT NULL,
    "numberOfQuotation" INTEGER NOT NULL,
    "quotationNumber" TEXT NOT NULL,
    "modeOfPayment" TEXT NOT NULL,
    "deliveryPeriod" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "itemDescription" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
