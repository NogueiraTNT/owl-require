// app/_actions/create-barbershop.ts

"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

interface CreateBarbershopParams {
  // Dados básicos
  name: string // Nome Fantasia
  corporateName: string // Razão Social
  cnae: string
  cpfCnpj: string
  stateRegistration?: string

  // Contatos
  phones: string // Vem como string, vamos converter

  // Endereço
  zipCode: string
  address: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string

  // Outros
  description: string
  imageUrl: string
  gestorid: string
}

export const createBarbershop = async (params: CreateBarbershopParams) => {
  const phonesArray = params.phones.split(",").map((phone) => phone.trim())

  // Gerar código único para a loja
  const code = `LOJA-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

  const newBarbershop = await db.barbershop.create({
    data: {
      code,
      name: params.name,
      corporateName: params.corporateName,
      cnae: params.cnae,
      cpfCnpj: params.cpfCnpj,
      stateRegistration: params.stateRegistration || null,
      phones: phonesArray,
      zipCode: params.zipCode,
      address: params.address,
      number: params.number,
      complement: params.complement || null,
      neighborhood: params.neighborhood,
      city: params.city,
      state: params.state,
      description: params.description,
      imageUrl: params.imageUrl,
      gestorid: params.gestorid,
    },
  })

  revalidatePath("/")
  redirect(`/settings/${newBarbershop.id}`)
}
