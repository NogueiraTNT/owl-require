"use server"

import { db } from "@/app/_lib/prisma"

export interface BarbershopWithGestor {
  id: string
  code: string
  name: string
  corporateName: string
  cnae: string
  cpfCnpj: string
  stateRegistration: string | null
  phones: string[]
  zipCode: string
  address: string
  number: string
  complement: string | null
  neighborhood: string
  city: string
  state: string
  description: string
  imageUrl: string
  gestorid: string
  createdAt: Date
  updatedAt: Date
  gestor: {
    id: string
    name: string
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
