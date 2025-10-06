/*
  Warnings:

  - The values [rose,orange,green,blue,yellow,violet] on the enum `ThemeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ThemeType_new" AS ENUM ('red', 'redDark', 'roseDark', 'orangeDark', 'greenDark', 'blueDark', 'yellowDark', 'violetDark');
ALTER TABLE "public"."Barbershop" ALTER COLUMN "theme" TYPE "public"."ThemeType_new" USING ("theme"::text::"public"."ThemeType_new");
ALTER TYPE "public"."ThemeType" RENAME TO "ThemeType_old";
ALTER TYPE "public"."ThemeType_new" RENAME TO "ThemeType";
DROP TYPE "public"."ThemeType_old";
COMMIT;
