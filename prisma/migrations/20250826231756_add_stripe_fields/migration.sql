/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerId]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Barbershop" ADD COLUMN     "stripeCurrentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePriceId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "stripeSubscriptionStatus" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_stripeCustomerId_key" ON "public"."Barbershop"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_stripeSubscriptionId_key" ON "public"."Barbershop"("stripeSubscriptionId");
