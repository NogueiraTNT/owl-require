/*
  Warnings:

  - You are about to drop the column `stripeCurrentPeriodEnd` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionStatus` on the `Barbershop` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `Gestor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `Gestor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Barbershop_stripeCustomerId_key";

-- DropIndex
DROP INDEX "public"."Barbershop_stripeSubscriptionId_key";

-- AlterTable
ALTER TABLE "public"."Barbershop" DROP COLUMN "stripeCurrentPeriodEnd",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripePriceId",
DROP COLUMN "stripeSubscriptionId",
DROP COLUMN "stripeSubscriptionStatus";

-- AlterTable
ALTER TABLE "public"."Gestor" ADD COLUMN     "stripeCurrentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePriceId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "stripeSubscriptionStatus" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Gestor_stripeCustomerId_key" ON "public"."Gestor"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Gestor_stripeSubscriptionId_key" ON "public"."Gestor"("stripeSubscriptionId");
