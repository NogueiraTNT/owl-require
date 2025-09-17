"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface DeleteServiceParams {
  serviceId: string
  barbershopId: string
}

export const deleteService = async (params: DeleteServiceParams) => {
  await db.barbershopService.delete({
    where: {
      id: params.serviceId,
    },
  })

  revalidatePath("/")
  revalidatePath(`/services/${params.barbershopId}`)
}
