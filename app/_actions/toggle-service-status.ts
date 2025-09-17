"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface ToggleServiceStatusParams {
  serviceId: string
  barbershopId: string
}

export const toggleServiceStatus = async (
  params: ToggleServiceStatusParams,
) => {
  const service = await db.barbershopService.findUnique({
    where: { id: params.serviceId },
    select: { active: true },
  })

  if (!service) {
    throw new Error("Serviço não encontrado")
  }

  await db.barbershopService.update({
    where: { id: params.serviceId },
    data: { active: !service.active },
  })

  revalidatePath("/")
  revalidatePath(`/services/${params.barbershopId}`)
}
