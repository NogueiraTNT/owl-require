"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface ToggleWorkerStatusParams {
  workerId: string
  barbershopId: string
}

export const toggleWorkerStatus = async (params: ToggleWorkerStatusParams) => {
  const worker = await db.worker.findUnique({
    where: { id: params.workerId },
    select: { active: true },
  })

  if (!worker) {
    throw new Error("Funcionário não encontrado")
  }

  await db.worker.update({
    where: { id: params.workerId },
    data: { active: !worker.active },
  })

  revalidatePath("/")
  revalidatePath(`/employees/${params.barbershopId}`)
}
