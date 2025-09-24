"use server"

import { db } from "@/app/_lib/prisma"

export interface BarbershopWithGestor {
  id: string
  code: string | null
  name: string
  corporateName: string | null
  cnae: string | null
  cpfCnpj: string | null
  stateRegistration: string | null
  phones: string[]
  zipCode: string | null
  address: string
  number: string | null
  complement: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
  description: string
  imageUrl: string
  bannerUrl: string | null
  theme: string | null
  verification: string | null
  latitude: number | null
  longitude: number | null
  gestorid: string
  createdAt: Date
  updatedAt: Date
  gestor: {
    id: string
    name: string | null
    email: string
  }
}

export const getBarbershops = async (): Promise<BarbershopWithGestor[]> => {
  try {
    const barbershops = await db.barbershop.findMany({
      include: {
        gestor: {
          select: {
            id: true,
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

export const getBarbershopById = async (
  id: string,
): Promise<BarbershopWithGestor | null> => {
  try {
    const barbershop = await db.barbershop.findUnique({
      where: { id },
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

    return barbershop
  } catch (error) {
    console.error("Erro ao buscar barbearia:", error)
    throw new Error("Erro ao buscar barbearia")
  }
}
