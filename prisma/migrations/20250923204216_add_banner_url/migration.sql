-- CreateEnum
CREATE TYPE "public"."AdminType" AS ENUM ('SUPORTE', 'ADMIN');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."ThemeType" ADD VALUE 'rose';
ALTER TYPE "public"."ThemeType" ADD VALUE 'orange';
ALTER TYPE "public"."ThemeType" ADD VALUE 'green';
ALTER TYPE "public"."ThemeType" ADD VALUE 'blue';
ALTER TYPE "public"."ThemeType" ADD VALUE 'yellow';
ALTER TYPE "public"."ThemeType" ADD VALUE 'violet';

-- AlterTable
ALTER TABLE "public"."Barbershop" ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "cnae" TEXT,
ADD COLUMN     "code" TEXT,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "corporateName" TEXT,
ADD COLUMN     "cpfCnpj" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "stateRegistration" TEXT,
ADD COLUMN     "zipCode" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "public"."Worker" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "public"."AdminType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");
