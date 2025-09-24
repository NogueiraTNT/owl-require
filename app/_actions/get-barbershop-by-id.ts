"use server"

import { db } from "@/app/_lib/prisma"
import { BarbershopWithGestor } from "./get-barbershops"

export const getBarbershopById = async (
  barbershopId: string,
): Promise<BarbershopWithGestor> => {
  try {
    const barbershop = await db.barbershop.findUnique({
      where: {
        id: barbershopId,
      },
      include: {
        gestor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!barbershop) {
      throw new Error("Barbearia não encontrada")
    }

    return barbershop
  } catch (error) {
    console.error("Erro ao buscar barbearia:", error)
    throw new Error("Erro ao buscar barbearia")
  }
}
