"use server"

import { db } from "@/app/_lib/prisma"

export const getBarbershopsForShowcase = async () => {
  try {
    const barbershops = await db.barbershop.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        city: true,
        state: true,
        theme: true,
        verification: true,
        createdAt: true,
        gestor: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            services: true,
            ratings: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return barbershops
  } catch (error) {
    console.error("❌ Erro ao buscar barbearias:", error)
    return []
  }
}
