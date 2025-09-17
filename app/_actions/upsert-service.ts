"use server"

import { db } from "@/app/_lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

interface UpsertServiceParams {
  serviceId?: string // <- opcional
  name: string
  description: string
  price: string // vem do MoneyInput
  barbershopId: string
  imageUrl: string
}

// converte string BRL para Prisma.Decimal
function parsePriceToDecimal(input: string): Prisma.Decimal {
  if (!input) throw new Error("Preço vazio.")
  let s = input.trim().replace(/\s/g, "")
  s = s.replace(/[^\d.,-]/g, "")
  if (s.includes(",") && s.includes(".")) {
    s = s.replace(/\./g, "").replace(",", ".")
  } else if (s.includes(",")) {
    s = s.replace(",", ".")
  }
  const num = Number(s)
  if (!Number.isFinite(num)) throw new Error("Preço inválido.")
  return new Prisma.Decimal(num.toFixed(2))
}

export const upsertService = async (params: UpsertServiceParams) => {
  const data = {
    name: params.name,
    description: params.description,
    price: parsePriceToDecimal(params.price),
    barbershopId: params.barbershopId,
    imageUrl: params.imageUrl,
  }

  if (params.serviceId && params.serviceId.trim() !== "") {
    await db.barbershopService.update({
      where: { id: params.serviceId },
      data,
    })
  } else {
    await db.barbershopService.create({ data })
  }

  revalidatePath("/")
  revalidatePath(`/services/${params.barbershopId}`)
}
