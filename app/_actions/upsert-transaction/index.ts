"use server"

import { db } from "@/app/_lib/prisma"
import { getCurrentGestor } from "@/app/_lib/session"
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client"
import { revalidatePath } from "next/cache"
import { upsertTransactionSchema } from "./schama"

interface UpsertTransactionParams {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
  barbershopId: string
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params)

  const gestor = await getCurrentGestor()
  if (!gestor) {
    throw new Error("Acesso não autorizado.")
  }

  const { id, barbershopId, ...dataToSave } = params

  const barbershop = await db.barbershop.findFirst({
    where: {
      id: barbershopId,
      gestorid: gestor.id,
    },
  })

  if (!barbershop) {
    throw new Error("Barbearia não encontrada ou não pertence a este gestor.")
  }

  await db.transaction.upsert({
    update: {
      ...dataToSave,
      barbershopId: barbershop.id,
    },
    create: {
      ...dataToSave,
      barbershopId: barbershop.id,
    },
    where: {
      id: id ?? "",
    },
  })

  revalidatePath(`/transactions/${barbershop.id}`)
}
