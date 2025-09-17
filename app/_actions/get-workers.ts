// app/_actions/get-workers.ts
"use server"

import { db } from "../_lib/prisma"

export const getWorkersWithSchedules = async (barbershopId: string) => {
  const workers = await db.worker.findMany({
    where: {
      barbershopId: barbershopId,
      active: true,
    },
    include: {
      hors: true, // Inclui os horários de cada funcionário
    },
    orderBy: {
      createdAt: "asc",
    },
  })
  return workers
}
