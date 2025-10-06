/*
  Warnings:

  - Added the required column `rate` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Rating" ADD COLUMN     "rate" INTEGER NOT NULL;
