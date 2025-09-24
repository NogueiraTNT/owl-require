"use server"

import { db } from "@/app/_lib/prisma"
import { BarbershopVerification, ThemeType } from "@/app/generated/prisma"
import { revalidatePath } from "next/cache"

export interface UpdateBarbershopData {
  name?: string
  corporateName?: string
  cnae?: string
  cpfCnpj?: string
  stateRegistration?: string
  phones?: string[]
  zipCode?: string
  address?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
  description?: string
  imageUrl?: string
  bannerUrl?: string
  theme?: ThemeType | null
  verification?: BarbershopVerification | null
  latitude?: number | null
  longitude?: number | null
}

export const updateBarbershopAdmin = async (
  barbershopId: string,
  data: UpdateBarbershopData,
) => {
  try {
    const updatedBarbershop = await db.barbershop.update({
      where: {
        id: barbershopId,
      },
      data: {
        ...data,
        phones: data.phones || undefined,
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

    revalidatePath("/admin/barbearias")
    return { success: true, barbershop: updatedBarbershop }
  } catch (error) {
    console.error("Erro ao atualizar barbearia:", error)
    throw new Error("Erro ao atualizar barbearia")
  }
}
