"use server"

import { db } from "@/app/_lib/prisma"

export const getAllBarbershops = async () => {
  try {
    const barbershops = await db.barbershop.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        imageUrl: true,
        verification: true,
        createdAt: true,
        gestor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return barbershops
  } catch (error) {
    console.error("Erro ao buscar barbearias:", error)
    throw new Error("Erro ao buscar barbearias")
  }
}
