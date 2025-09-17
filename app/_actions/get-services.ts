"use server"

import { db } from "../_lib/prisma"

export const getServicesByBarbershop = async (barbershopId: string) => {
  const services = await db.barbershopService.findMany({
    where: {
      barbershopId: barbershopId,
      active: true,
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  // Converter Decimal para number para ser compatível com Client Components
  return services.map((service) => ({
    ...service,
    price: Number(service.price),
  }))
}
