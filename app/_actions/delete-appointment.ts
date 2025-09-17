"use server"

import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client"

interface DeleteAppointmentParams {
  appointmentId: string
  barbershopId: string
}

export const deleteAppointment = async (params: DeleteAppointmentParams) => {
  await db.$transaction(async (prisma) => {
    // Buscar dados do agendamento antes de deletar usando query raw para incluir novos campos
    const bookingData = (await prisma.$queryRaw`
      SELECT 
        b.id,
        b."clientName",
        s.name as "serviceName",
        s.price as "servicePrice",
        u.name as "userName"
      FROM "Booking" b
      LEFT JOIN "BarbershopService" s ON b."serviceId" = s.id
      LEFT JOIN "User" u ON b."userId" = u.id
      WHERE b.id = ${params.appointmentId}
    `) as Array<{
      id: string
      clientName: string | null
      serviceName: string
      servicePrice: number
      userName: string | null
    }>

    if (!bookingData || bookingData.length === 0) {
      throw new Error("Agendamento não encontrado")
    }

    const booking = bookingData[0]

    // Determinar nome do cliente
    const clientDisplayName =
      booking.clientName || booking.userName || "Cliente"

    // Criar transação de despesa (cancelamento)
    await prisma.transaction.create({
      data: {
        name: `Cancelamento - ${booking.serviceName} - ${clientDisplayName}`,
        type: TransactionType.EXPENSE,
        amount: Number(booking.servicePrice),
        category: TransactionCategory.BARBERSHOP,
        paymentMethod: TransactionPaymentMethod.OTHER,
        date: new Date(),
        barbershopId: params.barbershopId,
      },
    })

    // Deletar o agendamento
    await prisma.booking.delete({
      where: { id: params.appointmentId },
    })
  })

  revalidatePath("/")
  revalidatePath(`/appointments/${params.barbershopId}`)
  revalidatePath(`/transactions/${params.barbershopId}`)
  revalidatePath(`/dashboard/${params.barbershopId}`)
}
