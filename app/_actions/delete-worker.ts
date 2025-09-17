// app/_actions/delete-worker.ts

"use server" // <-- A CORREÇÃO É APENAS ESTA LINHA!

import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate"
import { db } from "../_lib/prisma"

interface DeleteWorkerParams {
  workerId: string
  barbershopId: string
}

export const deleteWorker = async (params: DeleteWorkerParams) => {
  const { workerId, barbershopId } = params
  await db.$transaction(async (prisma) => {
    await prisma.worker.delete({
      where: { id: workerId },
    })
  })

  revalidatePath(`/employees/${barbershopId}`)
}
