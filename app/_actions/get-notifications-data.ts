"use server"

import { db } from "@/app/_lib/prisma"

export interface NotificationStats {
  totalBookings: number
  bookingsThisMonth: number
  bookingsToday: number
  bookingsWithEmail: number
  bookingsWithPhone: number
  barbershopsWithNotifications: number
  recentBookings: {
    id: string
    clientName: string | null
    clientPhone: string | null
    serviceName: string
    barbershopName: string
    workerName: string
    date: Date
    createdAt: Date
    hasEmail: boolean
    hasPhone: boolean
  }[]
}

export const getNotificationStats = async (): Promise<NotificationStats> => {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    )

    const [
      totalBookings,
      bookingsThisMonth,
      bookingsToday,
      bookingsWithEmail,
      bookingsWithPhone,
      barbershopsWithNotifications,
      recentBookings,
    ] = await Promise.all([
      // Total de agendamentos
      db.booking.count(),

      // Agendamentos deste mês
      db.booking.count({
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),

      // Agendamentos de hoje
      db.booking.count({
        where: {
          createdAt: {
            gte: startOfDay,
          },
        },
      }),

      // Agendamentos com email (usuário logado)
      db.booking.count({
        where: {
          user: {
            isNot: null,
          },
        },
      }),

      // Agendamentos com telefone
      db.booking.count({
        where: {
          OR: [
            {
              clientPhone: {
                not: null,
              },
            },
            {
              user: {
                phone: {
                  not: null,
                },
              },
            },
          ],
        },
      }),

      // Barbearias que têm agendamentos (com notificações)
      db.barbershop.count({
        where: {
          services: {
            some: {
              bookings: {
                some: {},
              },
            },
          },
        },
      }),

      // Agendamentos recentes (últimos 10)
      db.booking.findMany({
        take: 10,
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
          worker: true,
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ])

    return {
      totalBookings,
      bookingsThisMonth,
      bookingsToday,
      bookingsWithEmail,
      bookingsWithPhone,
      barbershopsWithNotifications,
      recentBookings: recentBookings.map((booking) => ({
        id: booking.id,
        clientName:
          booking.clientName || booking.user?.name || "Cliente sem nome",
        clientPhone: booking.clientPhone || booking.user?.phone || null,
        serviceName: booking.service.name,
        barbershopName: booking.service.barbershop.name,
        workerName: booking.worker.name,
        date: booking.date,
        createdAt: booking.createdAt,
        hasEmail: !!booking.user?.email,
        hasPhone: !!(booking.clientPhone || booking.user?.phone),
      })),
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas de notificações:", error)
    throw new Error("Erro ao buscar estatísticas de notificações")
  }
}

export const getWhatsAppStatus = async () => {
  try {
    // Simular status do WhatsApp (em produção, isso viria do serviço real)
    return {
      connected: true,
      phone: "+55 11 99999-9999",
      lastConnection: new Date(),
      messagesSent: 156,
      messagesToday: 12,
    }
  } catch (error) {
    console.error("Erro ao buscar status do WhatsApp:", error)
    throw new Error("Erro ao buscar status do WhatsApp")
  }
}

export const getEmailStatus = async () => {
  try {
    // Simular status do email (em produção, isso viria do serviço real)
    return {
      configured: true,
      provider: "Gmail SMTP",
      emailsSent: 1247,
      emailsToday: 8,
      lastSent: new Date(),
    }
  } catch (error) {
    console.error("Erro ao buscar status do email:", error)
    throw new Error("Erro ao buscar status do email")
  }
}

export const getNotificationSettings = async () => {
  try {
    // Simular configurações de notificação
    return {
      emailEnabled: true,
      whatsappEnabled: true,
      smsEnabled: false,
      pushEnabled: false,
      reminderEnabled: true,
      reminderTime: 30, // minutos antes
      workingHours: {
        start: "08:00",
        end: "18:00",
      },
      timezone: "America/Sao_Paulo",
    }
  } catch (error) {
    console.error("Erro ao buscar configurações de notificação:", error)
    throw new Error("Erro ao buscar configurações de notificação")
  }
}
