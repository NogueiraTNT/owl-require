"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface DeleteTransactionParams {
  transactionId: string
  barbershopId: string
}

export const deleteTransaction = async (params: DeleteTransactionParams) => {
  await db.transaction.delete({
    where: {
      id: params.transactionId,
    },
  })

  revalidatePath("/")
  revalidatePath(`/transactions/${params.barbershopId}`)
  revalidatePath(`/dashboard/${params.barbershopId}`)
}
