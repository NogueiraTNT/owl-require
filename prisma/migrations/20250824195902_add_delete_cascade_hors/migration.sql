/*
  Warnings:

  - The primary key for the `Hors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Hors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Hors" DROP CONSTRAINT "Hors_workerId_fkey";

-- AlterTable
ALTER TABLE "public"."Hors" DROP CONSTRAINT "Hors_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Hors_pkey" PRIMARY KEY ("workerId");

-- AddForeignKey
ALTER TABLE "public"."Hors" ADD CONSTRAINT "Hors_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "public"."Worker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
