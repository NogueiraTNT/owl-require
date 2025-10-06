/*
  Warnings:

  - A unique constraint covering the columns `[workerId]` on the table `Hors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hors_workerId_key" ON "public"."Hors"("workerId");
