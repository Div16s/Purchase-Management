-- CreateTable
CREATE TABLE "UserOTP" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL,
    "otpCreationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserOTP_pkey" PRIMARY KEY ("id")
);
