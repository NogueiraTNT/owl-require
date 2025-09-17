"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client"

// Tipos temporários até regenerar o Prisma Client
interface BookingCreateData {
  serviceId: string
  userId?: string
  clientName?: string
  clientPhone?: string
  workerId: string
  date: Date
}

interface UpsertAppointmentParams {
  appointmentId?: string
  serviceId: string
  userId?: string
  clientName?: string
  clientPhone?: string
  workerId: string
  date: Date
  barbershopId: string
  paymentMethod?: TransactionPaymentMethod
}

export const upsertAppointment = async (params: UpsertAppointmentParams) => {
  const data = {
    serviceId: params.serviceId,
    userId: params.userId || undefined,
    clientName: params.clientName || undefined,
    clientPhone: params.clientPhone || undefined,
    workerId: params.workerId,
    date: params.date,
  }

  if (params.appointmentId && params.appointmentId.trim() !== "") {
    // Atualizar agendamento existente
    await db.booking.update({
      where: { id: params.appointmentId },
      data: {
        serviceId: data.serviceId,
        userId: data.userId,
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        workerId: data.workerId,
        date: data.date,
      } as BookingCreateData,
    })
  } else {
    // Criar novo agendamento e transação
    await db.$transaction(async (prisma) => {
      // Criar o agendamento
      await prisma.booking.create({
        data: {
          serviceId: data.serviceId,
          userId: data.userId,
          clientName: data.clientName,
          clientPhone: data.clientPhone,
          workerId: data.workerId,
          date: data.date,
        } as BookingCreateData,
      })

      // Buscar o serviço para obter as informações necessárias
      const service = await prisma.barbershopService.findUnique({
        where: { id: params.serviceId },
      })

      if (!service) {
        throw new Error("Serviço não encontrado")
      }

      // Criar transação de receita para o agendamento
      const clientDisplayName =
        params.clientName ||
        (params.userId
          ? (await prisma.user.findUnique({ where: { id: params.userId } }))
              ?.name || "Cliente"
          : "Cliente")

      await prisma.transaction.create({
        data: {
          name: `Agendamento - ${service.name} - ${clientDisplayName}`,
          type: TransactionType.DEPOSIT,
          amount: service.price,
          category: TransactionCategory.BARBERSHOP,
          paymentMethod: params.paymentMethod || TransactionPaymentMethod.CASH,
          date: params.date,
          barbershopId: params.barbershopId,
        },
      })
    })
  }

  revalidatePath("/")
  revalidatePath(`/appointments/${params.barbershopId}`)
  revalidatePath(`/transactions/${params.barbershopId}`)
  revalidatePath(`/dashboard/${params.barbershopId}`)
}
