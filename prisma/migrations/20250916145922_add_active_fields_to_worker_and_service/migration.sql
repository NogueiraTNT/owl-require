-- AlterTable
ALTER TABLE "public"."BarbershopService" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Worker" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
