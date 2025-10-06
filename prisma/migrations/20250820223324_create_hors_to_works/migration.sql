-- CreateTable
CREATE TABLE "public"."Hors" (
    "id" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "horarios" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Hors" ADD CONSTRAINT "Hors_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "public"."Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
