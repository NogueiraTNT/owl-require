/*
  Warnings:

  - You are about to drop the column `verification` on the `Barbershop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Barbershop" DROP COLUMN "verification";

-- AlterTable
ALTER TABLE "public"."NotificationSettings" ADD COLUMN     "dailyReminderEmailEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "dailyReminderWhatsAppEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "reminder1hEmailEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "reminder1hWhatsAppEnabled" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "public"."BarbershopVerification";
