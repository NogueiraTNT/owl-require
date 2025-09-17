-- CreateEnum
CREATE TYPE "public"."SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED', 'PENDING', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."Gestor" ADD COLUMN     "lastPaymentId" TEXT,
ADD COLUMN     "mercadoPagoCustomerId" TEXT,
ADD COLUMN     "planEndDate" TIMESTAMP(3),
ADD COLUMN     "planStartDate" TIMESTAMP(3),
ADD COLUMN     "subscriptionStatus" "public"."SubscriptionStatus" DEFAULT 'INACTIVE';
