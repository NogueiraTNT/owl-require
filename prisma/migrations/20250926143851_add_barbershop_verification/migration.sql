-- CreateEnum
CREATE TYPE "public"."BarbershopVerification" AS ENUM ('PIONEER', 'VERIFIED');

-- AlterTable
ALTER TABLE "public"."Barbershop" ADD COLUMN     "verification" "public"."BarbershopVerification";
