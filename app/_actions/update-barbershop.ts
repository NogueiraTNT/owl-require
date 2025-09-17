"use server"

import { db } from "@/app/_lib/prisma"
import { ThemeType } from "@prisma/client"
import { revalidatePath } from "next/cache"

interface UpdateBarbershopParams {
  id: string
  // Dados básicos
  name: string // Nome Fantasia
  corporateName: string // Razão Social
  cnae: string
  cpfCnpj: string
  stateRegistration?: string

  // Contatos
  phones: string // Receberemos como string e converteremos para array

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
  theme: string
}

export const updateBarbershop = async (params: UpdateBarbershopParams) => {
  // Converte a string de telefones em um array de strings
  const phonesArray = params.phones.split(",").map((phone) => phone.trim())

  await db.barbershop.update({
    where: {
      id: params.id,
    },
    data: {
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
      theme: params.theme as ThemeType,
    },
  })

  // Revalida o cache da página para mostrar os dados atualizados
  revalidatePath("/")
  revalidatePath(`/settings/${params.id}`)
}
