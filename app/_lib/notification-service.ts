export interface NotificationResult {
  success: boolean
  messageId?: string
  error?: string
  status?: string
}

export interface NotificationStatus {
  connected: boolean
  provider: string
  lastMessage?: Date
  messagesSent?: number
  error?: string
}

/**
 * Serviço de notificação simples para desenvolvimento
 * Compatível com Vercel e outros ambientes serverless
 */
export class NotificationService {
  private static instance: NotificationService
  private messageCount = 0
  private lastMessage?: Date

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  /**
   * Verifica o status do serviço
   */
  async getStatus(): Promise<NotificationStatus> {
    return {
      connected: true,
      provider: "Development Service",
      lastMessage: this.lastMessage,
      messagesSent: this.messageCount,
    }
  }

  /**
   * Envia uma notificação (simulada)
   */
  async sendNotification(
    to: string,
    message: string,
    options?: {
      type?: "booking" | "reminder" | "cancellation" | "reschedule" | "test"
    },
  ): Promise<NotificationResult> {
    try {
      // Simular delay de envio
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Log da mensagem
      console.log("📱 [NOTIFICATION] Enviando notificação:", {
        to,
        message:
          message.substring(0, 100) + (message.length > 100 ? "..." : ""),
        type: options?.type || "general",
        timestamp: new Date().toISOString(),
      })

      // Incrementar contador
      this.messageCount++
      this.lastMessage = new Date()

      // Simular sucesso
      return {
        success: true,
        messageId: `dev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: "sent",
      }
    } catch (error) {
      console.error("Erro ao enviar notificação:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }
  }

  /**
   * Envia notificação de agendamento confirmado
   */
  async sendBookingConfirmation(
    phoneNumber: string,
    bookingData: {
      clientName: string
      serviceName: string
      barbershopName: string
      workerName: string
      date: string
      time: string
    },
  ): Promise<NotificationResult> {
    const message = `✅ Agendamento Confirmado - ${bookingData.barbershopName}

Olá ${bookingData.clientName}! Seu agendamento foi confirmado:

📅 Data: ${bookingData.date}
🕐 Horário: ${bookingData.time}
✂️ Serviço: ${bookingData.serviceName}
👨‍💼 Profissional: ${bookingData.workerName}

📍 Local: ${bookingData.barbershopName}

Se precisar reagendar ou cancelar, entre em contato conosco.

Obrigado por escolher o CorteZapp! 🚀`

    return await this.sendNotification(phoneNumber, message, {
      type: "booking",
    })
  }

  /**
   * Envia lembrete de agendamento
   */
  async sendBookingReminder(
    phoneNumber: string,
    bookingData: {
      clientName: string
      serviceName: string
      barbershopName: string
      workerName: string
      date: string
      time: string
      reminderTime: string
    },
  ): Promise<NotificationResult> {
    const message = `⏰ Lembrete de Agendamento - ${bookingData.barbershopName}

Olá ${bookingData.clientName}!

Seu agendamento está chegando em ${bookingData.reminderTime}:

📅 Data: ${bookingData.date}
🕐 Horário: ${bookingData.time}
✂️ Serviço: ${bookingData.serviceName}
👨‍💼 Profissional: ${bookingData.workerName}

📍 Local: ${bookingData.barbershopName}

Te esperamos lá! 🎉`

    return await this.sendNotification(phoneNumber, message, {
      type: "reminder",
    })
  }

  /**
   * Envia notificação de cancelamento
   */
  async sendBookingCancellation(
    phoneNumber: string,
    bookingData: {
      clientName: string
      serviceName: string
      barbershopName: string
      date: string
      time: string
      reason?: string
    },
  ): Promise<NotificationResult> {
    const message = `❌ Agendamento Cancelado - ${bookingData.barbershopName}

Olá ${bookingData.clientName}!

Seu agendamento foi cancelado:

📅 Data: ${bookingData.date}
🕐 Horário: ${bookingData.time}
✂️ Serviço: ${bookingData.serviceName}

${bookingData.reason ? `Motivo: ${bookingData.reason}` : ""}

Para reagendar, entre em contato conosco.

Obrigado pela compreensão! 🙏`

    return await this.sendNotification(phoneNumber, message, {
      type: "cancellation",
    })
  }

  /**
   * Envia notificação de reagendamento
   */
  async sendBookingReschedule(
    phoneNumber: string,
    bookingData: {
      clientName: string
      serviceName: string
      barbershopName: string
      workerName: string
      oldDate: string
      oldTime: string
      newDate: string
      newTime: string
    },
  ): Promise<NotificationResult> {
    const message = `🔄 Agendamento Reagendado - ${bookingData.barbershopName}

Olá ${bookingData.clientName}!

Seu agendamento foi reagendado:

📅 Nova Data: ${bookingData.newDate}
🕐 Novo Horário: ${bookingData.newTime}
✂️ Serviço: ${bookingData.serviceName}
👨‍💼 Profissional: ${bookingData.workerName}

📍 Local: ${bookingData.barbershopName}

Data anterior: ${bookingData.oldDate} às ${bookingData.oldTime}

Te esperamos no novo horário! 🚀`

    return await this.sendNotification(phoneNumber, message, {
      type: "reschedule",
    })
  }

  /**
   * Envia mensagem de teste
   */
  async sendTestMessage(phoneNumber: string): Promise<NotificationResult> {
    const message = `🧪 CorteZapp - Teste de Conexão

Serviço de notificação funcionando!
📅 Data: ${new Date().toLocaleString("pt-BR")}

Esta é uma mensagem de teste do sistema de notificações.

Se você está vendo este log, a integração está funcionando perfeitamente! ✅

Nota: Este é um serviço de desenvolvimento. Em produção, configure um provedor real de notificações.`

    return await this.sendNotification(phoneNumber, message, { type: "test" })
  }

  /**
   * Obtém estatísticas do serviço
   */
  getStats() {
    return {
      messagesSent: this.messageCount,
      lastMessage: this.lastMessage,
      uptime: new Date(),
    }
  }
}

// Instância singleton
const notificationService = NotificationService.getInstance()

// Exportar funções para compatibilidade
export const getNotificationStatus = () => notificationService.getStatus()
export const sendNotification = (
  to: string,
  message: string,
  options?: Record<string, unknown>,
) => notificationService.sendNotification(to, message, options)
export const sendBookingConfirmation = (
  phoneNumber: string,
  bookingData: {
    clientName: string
    serviceName: string
    barbershopName: string
    workerName: string
    date: string
    time: string
  },
) => notificationService.sendBookingConfirmation(phoneNumber, bookingData)
export const sendBookingReminder = (
  phoneNumber: string,
  bookingData: {
    clientName: string
    serviceName: string
    barbershopName: string
    workerName: string
    date: string
    time: string
    reminderTime: string
  },
) => notificationService.sendBookingReminder(phoneNumber, bookingData)
export const sendBookingCancellation = (
  phoneNumber: string,
  bookingData: {
    clientName: string
    serviceName: string
    barbershopName: string
    date: string
    time: string
    reason?: string
  },
) => notificationService.sendBookingCancellation(phoneNumber, bookingData)
export const sendBookingReschedule = (
  phoneNumber: string,
  bookingData: {
    clientName: string
    serviceName: string
    barbershopName: string
    workerName: string
    oldDate: string
    oldTime: string
    newDate: string
    newTime: string
  },
) => notificationService.sendBookingReschedule(phoneNumber, bookingData)
export const sendTestMessage = (phoneNumber: string) =>
  notificationService.sendTestMessage(phoneNumber)
export const getNotificationStats = () => notificationService.getStats()
