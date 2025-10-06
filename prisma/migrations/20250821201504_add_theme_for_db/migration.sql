-- CreateEnum
CREATE TYPE "public"."ThemeType" AS ENUM ('red', 'redDark', 'rose', 'roseDark', 'orange', 'orangeDark', 'green', 'greenDark', 'blue', 'blueDark', 'yellow', 'yellowDark', 'violet', 'violetDark');

-- AlterTable
ALTER TABLE "public"."Barbershop" ADD COLUMN     "theme" "public"."ThemeType";
