"use server"

import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"

interface UpsertWorkerParams {
  id?: string
  name: string
  imageUrl: string
  barbershopId: string
  horarios: string[]
}

export const upsertWorker = async (params: UpsertWorkerParams) => {
  const { id, name, imageUrl, barbershopId, horarios } = params

  // Se um 'id' existe, estamos ATUALIZANDO um funcionário
  if (id) {
    await db.$transaction(async (prisma) => {
      // 1. Atualiza os dados do funcionário (isso está correto)
      await prisma.worker.update({
        where: { id },
        data: {
          name,
          imageUrl,
        },
      })

      // 2. A CORREÇÃO ESTÁ AQUI: Troque 'update' por 'upsert'
      await prisma.hors.upsert({
        where: {
          workerId: id,
        },
        update: {
          horarios,
        },
        create: {
          workerId: id,
          horarios,
        },
      })
    })
  }
  // Se não existe 'id', estamos CRIANDO um novo funcionário (isso já está correto)
  else {
    await db.worker.create({
      data: {
        name,
        imageUrl,
        barbershopId,
        hors: {
          create: {
            horarios,
          },
        },
      },
    })
  }

  revalidatePath(`/employees/${barbershopId}`)
}
