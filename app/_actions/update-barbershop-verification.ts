"use server"

import { db } from "@/app/_lib/prisma"
import { BarbershopVerification } from "@/app/generated/prisma"
import { revalidatePath } from "next/cache"

export const updateBarbershopVerification = async (
  barbershopId: string,
  verification: BarbershopVerification | null,
) => {
  try {
    await db.barbershop.update({
      where: {
        id: barbershopId,
      },
      data: {
        verification,
      },
    })

    revalidatePath("/admin/barbershops")
    return { success: true }
  } catch (error) {
    console.error("Erro ao atualizar verificação da barbearia:", error)
    throw new Error("Erro ao atualizar verificação da barbearia")
  }
}
