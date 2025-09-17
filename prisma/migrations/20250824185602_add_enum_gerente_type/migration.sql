/*
  Warnings:

  - Added the required column `type` to the `Gestor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."GestorType" AS ENUM ('ADMIN', 'OWNER', 'WORKER');

-- AlterTable
ALTER TABLE "public"."Gestor" ADD COLUMN     "type" "public"."GestorType" NOT NULL;
