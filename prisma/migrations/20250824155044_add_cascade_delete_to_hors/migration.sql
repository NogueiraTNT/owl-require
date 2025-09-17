-- DropForeignKey
ALTER TABLE "public"."Hors" DROP CONSTRAINT "Hors_workerId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Hors" ADD CONSTRAINT "Hors_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "public"."Worker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
