-- CreateTable
CREATE TABLE "public"."NotificationSettings" (
    "id" TEXT NOT NULL,
    "barbershopId" TEXT NOT NULL,
    "clientEmailEnabled" BOOLEAN NOT NULL DEFAULT true,
    "clientWhatsAppEnabled" BOOLEAN NOT NULL DEFAULT true,
    "workerEmailEnabled" BOOLEAN NOT NULL DEFAULT true,
    "workerWhatsAppEnabled" BOOLEAN NOT NULL DEFAULT true,
    "ownerEmailEnabled" BOOLEAN NOT NULL DEFAULT true,
    "ownerWhatsAppEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationSettings_barbershopId_key" ON "public"."NotificationSettings"("barbershopId");

-- AddForeignKey
ALTER TABLE "public"."NotificationSettings" ADD CONSTRAINT "NotificationSettings_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "public"."Barbershop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
