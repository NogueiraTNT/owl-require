-- CreateEnum
CREATE TYPE "public"."ThemeType" AS ENUM ('red', 'redDark', 'roseDark', 'orangeDark', 'greenDark', 'blueDark', 'yellowDark', 'violetDark');

-- AlterTable
ALTER TABLE "public"."Barbershop" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "theme" "public"."ThemeType";
