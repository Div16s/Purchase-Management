-- CreateTable
CREATE TABLE "PurchaseSection" (
    "id" SERIAL NOT NULL,
    "startPageNo" TEXT NOT NULL DEFAULT '',
    "endPageNo" TEXT NOT NULL DEFAULT '',
    "rsInValue" TEXT NOT NULL DEFAULT '',
    "rsInWords" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PurchaseSection_pkey" PRIMARY KEY ("id")
);
