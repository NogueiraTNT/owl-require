/*
  Warnings:

  - You are about to drop the column `stripeCurrentPeriodEnd` on the `Gestor` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `Gestor` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `Gestor` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `Gestor` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionStatus` on the `Gestor` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."PlanType" AS ENUM ('BASIC', 'PRO', 'PREMIUM');

-- DropIndex
DROP INDEX "public"."Gestor_stripeCustomerId_key";

-- DropIndex
DROP INDEX "public"."Gestor_stripeSubscriptionId_key";

-- AlterTable
ALTER TABLE "public"."Gestor" DROP COLUMN "stripeCurrentPeriodEnd",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripePriceId",
DROP COLUMN "stripeSubscriptionId",
DROP COLUMN "stripeSubscriptionStatus",
ADD COLUMN     "plan" "public"."PlanType";
