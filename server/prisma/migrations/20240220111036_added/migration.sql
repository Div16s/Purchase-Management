/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserOTP` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `UserOTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserOTP" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserOTP_email_key" ON "UserOTP"("email");
