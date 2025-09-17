/*
  Warnings:

  - The primary key for the `Hors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[bookingId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Hors` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `bookingId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Hors" DROP CONSTRAINT "Hors_workerId_fkey";

-- AlterTable
ALTER TABLE "public"."Hors" DROP CONSTRAINT "Hors_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Hors_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Rating" ADD COLUMN     "bookingId" TEXT NOT NULL,
ADD COLUMN     "rate" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_bookingId_key" ON "public"."Rating"("bookingId");

-- AddForeignKey
ALTER TABLE "public"."Hors" ADD CONSTRAINT "Hors_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "public"."Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
