"use server"

import { db } from "@/app/_lib/prisma"
import {
  sendBookingConfirmation,
  sendBookingReminder,
  sendBookingCancellation,
  sendBookingReschedule,
  sendTestMessage,
  getNotificationStatus,
} from "@/app/_lib/notification-service"

export interface NotificationResult {
  success: boolean
  messageId?: string
  error?: string
  channel: "whatsapp"
}

export interface BookingNotificationData {
  bookingId: string
  clientName: string
  clientPhone?: string
  clientEmail?: string
  serviceName: string
  barbershopName: string
  workerName: string
  date: Date
  time: string
}

/**
 * Envia notificação de agendamento confirmado
 */
export const sendBookingConfirmationNotification = async (
  bookingId: string,
  channels: ("whatsapp" | "email")[] = ["whatsapp"],
): Promise<NotificationResult[]> => {
  try {
    // Buscar dados do agendamento
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: {
          include: {
            barbershop: true,
          },
        },
        worker: true,
        user: true,
      },
    })

    if (!booking) {
      throw new Error("Agendamento não encontrado")
    }

    const results: NotificationResult[] = []

    // Preparar dados para notificação
    const notificationData = {
      clientName: booking.clientName || booking.user?.name || "Cliente",
      clientPhone: booking.clientPhone || booking.user?.phone,
      clientEmail: booking.user?.email,
      serviceName: booking.service.name,
      barbershopName: booking.service.barbershop.name,
      workerName: booking.worker.name,
      date: booking.date,
      time: booking.date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    // Enviar via WhatsApp se habilitado e telefone disponível
    if (channels.includes("whatsapp") && notificationData.clientPhone) {
      try {
        const whatsappResult = await sendBookingConfirmation(
          notificationData.clientPhone,
          {
            clientName: notificationData.clientName,
            serviceName: notificationData.serviceName,
            barbershopName: notificationData.barbershopName,
            workerName: notificationData.workerName,
            date: notificationData.date.toLocaleDateString("pt-BR"),
            time: notificationData.time,
          },
        )

        results.push({
          success: whatsappResult.success,
          messageId: whatsappResult.messageId,
          error: whatsappResult.error,
          channel: "whatsapp",
        })
      } catch (error) {
        results.push({
          success: false,
          error:
            error instanceof Error ? error.message : "Erro ao enviar WhatsApp",
          channel: "whatsapp",
        })
      }
    }

    // TODO: Implementar envio por email
    if (channels.includes("email") && notificationData.clientEmail) {
      // Implementar envio por email aqui
      results.push({
        success: false,
        error: "Envio por email não implementado ainda",
        channel: "whatsapp", // Temporário até implementar email
      })
    }

    return results
  } catch (error) {
    console.error("Erro ao enviar notificação de confirmação:", error)
    throw new Error("Erro ao enviar notificação de confirmação")
  }
}

/**
 * Envia lembrete de agendamento
 */
export const sendBookingReminderNotification = async (
  bookingId: string,
  reminderTime: string = "30 minutos",
): Promise<NotificationResult[]> => {
  try {
    // Buscar dados do agendamento
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: {
          include: {
            barbershop: true,
          },
        },
        worker: true,
        user: true,
      },
    })

    if (!booking) {
      throw new Error("Agendamento não encontrado")
    }

    const results: NotificationResult[] = []

    // Preparar dados para notificação
    const notificationData = {
      clientName: booking.clientName || booking.user?.name || "Cliente",
      clientPhone: booking.clientPhone || booking.user?.phone,
      serviceName: booking.service.name,
      barbershopName: booking.service.barbershop.name,
      workerName: booking.worker.name,
      date: booking.date,
      time: booking.date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    // Enviar via WhatsApp se telefone disponível
    if (notificationData.clientPhone) {
      try {
        const whatsappResult = await sendBookingReminder(
          notificationData.clientPhone,
          {
            clientName: notificationData.clientName,
            serviceName: notificationData.serviceName,
            barbershopName: notificationData.barbershopName,
            workerName: notificationData.workerName,
            date: notificationData.date.toLocaleDateString("pt-BR"),
            time: notificationData.time,
            reminderTime: reminderTime,
          },
        )

        results.push({
          success: whatsappResult.success,
          messageId: whatsappResult.messageId,
          error: whatsappResult.error,
          channel: "whatsapp",
        })
      } catch (error) {
        results.push({
          success: false,
          error:
            error instanceof Error ? error.message : "Erro ao enviar WhatsApp",
          channel: "whatsapp",
        })
      }
    }

    return results
  } catch (error) {
    console.error("Erro ao enviar lembrete:", error)
    throw new Error("Erro ao enviar lembrete")
  }
}

/**
 * Envia notificação de cancelamento
 */
export const sendBookingCancellationNotification = async (
  bookingId: string,
  reason?: string,
): Promise<NotificationResult[]> => {
  try {
    // Buscar dados do agendamento
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: {
          include: {
            barbershop: true,
          },
        },
        worker: true,
        user: true,
      },
    })

    if (!booking) {
      throw new Error("Agendamento não encontrado")
    }

    const results: NotificationResult[] = []

    // Preparar dados para notificação
    const notificationData = {
      clientName: booking.clientName || booking.user?.name || "Cliente",
      clientPhone: booking.clientPhone || booking.user?.phone,
      serviceName: booking.service.name,
      barbershopName: booking.service.barbershop.name,
      date: booking.date,
      time: booking.date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    // Enviar via WhatsApp se telefone disponível
    if (notificationData.clientPhone) {
      try {
        const whatsappResult = await sendBookingCancellation(
          notificationData.clientPhone,
          {
            clientName: notificationData.clientName,
            serviceName: notificationData.serviceName,
            barbershopName: notificationData.barbershopName,
            date: notificationData.date.toLocaleDateString("pt-BR"),
            time: notificationData.time,
            reason: reason,
          },
        )

        results.push({
          success: whatsappResult.success,
          messageId: whatsappResult.messageId,
          error: whatsappResult.error,
          channel: "whatsapp",
        })
      } catch (error) {
        results.push({
          success: false,
          error:
            error instanceof Error ? error.message : "Erro ao enviar WhatsApp",
          channel: "whatsapp",
        })
      }
    }

    return results
  } catch (error) {
    console.error("Erro ao enviar notificação de cancelamento:", error)
    throw new Error("Erro ao enviar notificação de cancelamento")
  }
}

/**
 * Envia notificação de reagendamento
 */
export const sendBookingRescheduleNotification = async (
  bookingId: string,
  newDate: Date,
  newTime: string,
): Promise<NotificationResult[]> => {
  try {
    // Buscar dados do agendamento
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: {
          include: {
            barbershop: true,
          },
        },
        worker: true,
        user: true,
      },
    })

    if (!booking) {
      throw new Error("Agendamento não encontrado")
    }

    const results: NotificationResult[] = []

    // Preparar dados para notificação
    const notificationData = {
      clientName: booking.clientName || booking.user?.name || "Cliente",
      clientPhone: booking.clientPhone || booking.user?.phone,
      serviceName: booking.service.name,
      barbershopName: booking.service.barbershop.name,
      workerName: booking.worker.name,
      oldDate: booking.date,
      oldTime: booking.date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    // Enviar via WhatsApp se telefone disponível
    if (notificationData.clientPhone) {
      try {
        const whatsappResult = await sendBookingReschedule(
          notificationData.clientPhone,
          {
            clientName: notificationData.clientName,
            serviceName: notificationData.serviceName,
            barbershopName: notificationData.barbershopName,
            workerName: notificationData.workerName,
            oldDate: notificationData.oldDate.toLocaleDateString("pt-BR"),
            oldTime: notificationData.oldTime,
            newDate: newDate.toLocaleDateString("pt-BR"),
            newTime: newTime,
          },
        )

        results.push({
          success: whatsappResult.success,
          messageId: whatsappResult.messageId,
          error: whatsappResult.error,
          channel: "whatsapp",
        })
      } catch (error) {
        results.push({
          success: false,
          error:
            error instanceof Error ? error.message : "Erro ao enviar WhatsApp",
          channel: "whatsapp",
        })
      }
    }

    return results
  } catch (error) {
    console.error("Erro ao enviar notificação de reagendamento:", error)
    throw new Error("Erro ao enviar notificação de reagendamento")
  }
}

/**
 * Envia mensagem de teste
 */
export const sendTestNotification = async (
  phoneNumber: string,
): Promise<NotificationResult> => {
  try {
    const result = await sendTestMessage(phoneNumber)

    return {
      success: result.success,
      messageId: result.messageId,
      error: result.error,
      channel: "whatsapp",
    }
  } catch (error) {
    console.error("Erro ao enviar mensagem de teste:", error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao enviar mensagem de teste",
      channel: "whatsapp",
    }
  }
}

/**
 * Obtém status do serviço de notificação
 */
export const getNotificationServiceStatus = async () => {
  try {
    const notificationStatus = await getNotificationStatus()

    return {
      notification: {
        enabled: notificationStatus.connected,
        provider: notificationStatus.provider,
        status: notificationStatus.connected ? "connected" : "disconnected",
        messagesSent: notificationStatus.messagesSent,
        lastMessage: notificationStatus.lastMessage,
        error: notificationStatus.error,
      },
      email: {
        enabled: false,
        provider: "Not configured",
        status: "disabled",
      },
      sms: {
        enabled: false,
        provider: "Not configured",
        status: "disabled",
      },
    }
  } catch (error) {
    console.error("Erro ao obter status dos serviços:", error)
    throw new Error("Erro ao obter status dos serviços")
  }
}

/**
 * Obtém mensagens recentes do serviço de notificação
 */
export const getRecentNotificationMessages = async () => {
  try {
    // Serviço de desenvolvimento - retorna array vazio
    // Em produção, implemente persistência no banco de dados
    return []
  } catch (error) {
    console.error("Erro ao obter mensagens recentes:", error)
    throw new Error("Erro ao obter mensagens recentes")
  }
}

/**
 * Agenda lembretes automáticos para agendamentos
 */
export const scheduleBookingReminders = async () => {
  try {
    const now = new Date()
    const reminderTime = new Date(now.getTime() + 30 * 60 * 1000) // 30 minutos no futuro

    // Buscar agendamentos que precisam de lembrete
    const bookings = await db.booking.findMany({
      where: {
        date: {
          gte: now,
          lte: reminderTime,
        },
        // status: "confirmed", // Campo não existe no schema
        // reminderSent: false // Campo não existe no schema
      },
      include: {
        service: {
          include: {
            barbershop: true,
          },
        },
        worker: true,
        user: true,
      },
    })

    const results = []

    for (const booking of bookings) {
      try {
        const reminderResults = await sendBookingReminderNotification(
          booking.id,
        )

        // Marcar lembrete como enviado se bem-sucedido
        if (reminderResults.some((r) => r.success)) {
          // TODO: Adicionar campo reminderSent ao schema do Prisma
          // await db.booking.update({
          //   where: { id: booking.id },
          //   data: { reminderSent: true },
          // })
        }

        results.push({
          bookingId: booking.id,
          results: reminderResults,
        })
      } catch (error) {
        console.error(
          `Erro ao enviar lembrete para agendamento ${booking.id}:`,
          error,
        )
        results.push({
          bookingId: booking.id,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        })
      }
    }

    return results
  } catch (error) {
    console.error("Erro ao agendar lembretes:", error)
    throw new Error("Erro ao agendar lembretes")
  }
}
