"use server"

import twilio from "twilio"

// Configuração do Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER // Número do Twilio WhatsApp (ex: whatsapp:+14155238886)

// Inicializar cliente Twilio
const client = twilio(accountSid, authToken)

/**
 * Formata um número de telefone para WhatsApp
 */
const formatWhatsAppNumber = (phoneNumber: string): string => {
  // Remove todos os caracteres não numéricos exceto +
  let cleaned = phoneNumber.replace(/[^\d+]/g, "")

  // Se não começar com +, adiciona
  if (!cleaned.startsWith("+")) {
    // Se começar com 55 (Brasil), adiciona +
    if (cleaned.startsWith("55")) {
      cleaned = "+" + cleaned
    } else {
      // Assume que é um número brasileiro sem código do país
      cleaned = "+55" + cleaned
    }
  }

  // Adiciona o prefixo whatsapp:
  return `whatsapp:${cleaned}`
}

/**
 * Obtém o número correto do WhatsApp Sandbox
 */
const getValidSandboxNumber = (): string => {
  // Números válidos do WhatsApp Sandbox (em ordem de preferência)
  const validSandboxNumbers = [
    "whatsapp:+14155238886", // Número padrão do sandbox
    "whatsapp:+12243780906", // Número alternativo do sandbox
  ]

  // Retorna o primeiro número válido
  return validSandboxNumbers[0]
}

/**
 * Sanitiza o conteúdo da mensagem para WhatsApp
 */
const sanitizeMessageContent = (message: string): string => {
  return (
    message
      // Remove emojis que podem causar problemas
      .replace(/[🚀🎉⏰📅🕐✂️👨‍💼📍✅🔄❌]/g, "")
      // Remove formatação markdown
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      // Remove caracteres especiais problemáticos
      .replace(/[^\w\s\.,!?\-:()]/g, "")
      // Limpa espaços extras
      .replace(/\s+/g, " ")
      .trim()
  )
}

/**
 * Valida se o número do Twilio é válido para WhatsApp
 */
const validateTwilioWhatsAppNumber = (number: string): boolean => {
  // Números válidos do WhatsApp Sandbox
  const validSandboxNumbers = [
    "whatsapp:+14155238886", // Número padrão do sandbox
    "whatsapp:+12243780906", // Número alternativo do sandbox
  ]

  // Verifica se é um número do sandbox válido
  if (validSandboxNumbers.includes(number)) {
    return true
  }

  // Para números de produção, verifica se tem o formato correto
  if (number.startsWith("whatsapp:+") && number.length > 15) {
    return true
  }

  return false
}

export interface TwilioMessageResult {
  success: boolean
  messageId?: string
  error?: string
  status?: string
}

export interface TwilioStatus {
  connected: boolean
  accountSid?: string
  whatsappNumber?: string
  lastMessage?: Date
  messagesSent?: number
  error?: string
}

/**
 * Verifica se o Twilio está configurado corretamente
 */
export const getTwilioStatus = async (): Promise<TwilioStatus> => {
  try {
    if (!accountSid || !authToken || !whatsappNumber) {
      return {
        connected: false,
        error:
          "Configuração do Twilio incompleta. Verifique as variáveis de ambiente.",
      }
    }

    // Verificar se a conta está ativa
    const account = await client.api.accounts(accountSid).fetch()

    return {
      connected: true,
      accountSid: account.sid,
      whatsappNumber: whatsappNumber,
      lastMessage: new Date(), // Em produção, você salvaria isso no banco
      messagesSent: 0, // Em produção, você contaria do banco
    }
  } catch (error) {
    console.error("Erro ao verificar status do Twilio:", error)
    return {
      connected: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

/**
 * Envia uma mensagem WhatsApp via Twilio
 */
export const sendWhatsAppMessage = async (
  to: string,
  message: string,
  options?: {
    mediaUrl?: string
    from?: string
  },
): Promise<TwilioMessageResult> => {
  try {
    if (!accountSid || !authToken || !whatsappNumber) {
      return {
        success: false,
        error: "Twilio não configurado. Verifique as variáveis de ambiente.",
      }
    }

    // Validar se o número do Twilio está no formato correto
    if (!whatsappNumber.startsWith("whatsapp:")) {
      return {
        success: false,
        error:
          "TWILIO_WHATSAPP_NUMBER deve começar com 'whatsapp:' (ex: whatsapp:+14155238886)",
      }
    }

    // Validar se o número do Twilio é válido
    if (!validateTwilioWhatsAppNumber(whatsappNumber)) {
      return {
        success: false,
        error: `Número do Twilio inválido: ${whatsappNumber}. Use um número válido do WhatsApp Sandbox (ex: whatsapp:+14155238886)`,
      }
    }

    // Formatar números para WhatsApp
    const formattedTo = formatWhatsAppNumber(to)
    // Usar o número do sandbox válido se o configurado não for válido
    const validFromNumber = validateTwilioWhatsAppNumber(whatsappNumber)
      ? whatsappNumber
      : getValidSandboxNumber()
    const finalFrom = options?.from || validFromNumber

    // Log para debug
    console.log("📱 [TWILIO] Enviando mensagem:", {
      from: finalFrom,
      to: formattedTo,
      originalLength: message.length,
      sanitizedLength: sanitizeMessageContent(message).length,
    })

    // Sanitizar o conteúdo da mensagem
    const sanitizedMessage = sanitizeMessageContent(message)

    // Preparar payload da mensagem
    const messagePayload: {
      from: string
      to: string
      body: string
      mediaUrl?: string[]
    } = {
      from: finalFrom,
      to: formattedTo,
      body: sanitizedMessage,
    }

    // Adicionar mídia se fornecida
    if (options?.mediaUrl) {
      messagePayload.mediaUrl = [options.mediaUrl]
    }

    // Enviar mensagem
    const twilioMessage = await client.messages.create(messagePayload)

    return {
      success: true,
      messageId: twilioMessage.sid,
      status: twilioMessage.status,
    }
  } catch (error) {
    console.error("Erro ao enviar mensagem WhatsApp:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

/**
 * Envia notificação de agendamento confirmado
 */
export const sendBookingConfirmation = async (
  phoneNumber: string,
  bookingData: {
    clientName: string
    serviceName: string
    barbershopName: string
    workerName: string
    date: string
    time: string
  },
): Promise<TwilioMessageResult> => {
  const message = `Agendamento Confirmado - ${bookingData.barbershopName}

Ola ${bookingData.clientName}! Seu agendamento foi confirmado:

Data: ${bookingData.date}
Horario: ${bookingData.time}
Servico: ${bookingData.serviceName}
Profissional: ${bookingData.workerName}

Local: ${bookingData.barbershopName}

Se precisar reagendar ou cancelar, entre em contato conosco.

Obrigado por escolher o CorteZapp!`

  return await sendWhatsAppMessage(phoneNumber, message)
}

/**
 * Envia lembrete de agendamento
 */
export const sendBookingReminder = async (
  phoneNumber: string,
  bookingData: {
    clientName: string
    serviceName: string
    barbershopName: string
    workerName: string
    date: string
    time: string
    reminderTime: string // "30 minutos" ou "1 hora"
  },
): Promise<TwilioMessageResult> => {
  const message = `Lembrete de Agendamento - ${bookingData.barbershopName}

Ola ${bookingData.clientName}! 

Seu agendamento esta chegando em ${bookingData.reminderTime}:

Data: ${bookingData.date}
Horario: ${bookingData.time}
Servico: ${bookingData.serviceName}
Profissional: ${bookingData.workerName}

Local: ${bookingData.barbershopName}

Te esperamos la!`

  return await sendWhatsAppMessage(phoneNumber, message)
}

/**
 * Envia notificação de cancelamento
 */
export const sendBookingCancellation = async (
  phoneNumber: string,
  bookingData: {
    clientName: string
    serviceName: string
    barbershopName: string
    date: string
    time: string
    reason?: string
  },
): Promise<TwilioMessageResult> => {
  const message = `❌ *Agendamento Cancelado - ${bookingData.barbershopName}*

Olá ${bookingData.clientName}!

Seu agendamento foi cancelado:

📅 *Data:* ${bookingData.date}
🕐 *Horário:* ${bookingData.time}
✂️ *Serviço:* ${bookingData.serviceName}

${bookingData.reason ? `*Motivo:* ${bookingData.reason}` : ""}

Para reagendar, entre em contato conosco.

Obrigado pela compreensão! 🙏`

  return await sendWhatsAppMessage(phoneNumber, message)
}

/**
 * Envia notificação de reagendamento
 */
export const sendBookingReschedule = async (
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
): Promise<TwilioMessageResult> => {
  const message = `🔄 *Agendamento Reagendado - ${bookingData.barbershopName}*

Olá ${bookingData.clientName}!

Seu agendamento foi reagendado:

📅 *Nova Data:* ${bookingData.newDate}
🕐 *Novo Horário:* ${bookingData.newTime}
✂️ *Serviço:* ${bookingData.serviceName}
👨‍💼 *Profissional:* ${bookingData.workerName}

📍 *Local:* ${bookingData.barbershopName}

*Data anterior:* ${bookingData.oldDate} às ${bookingData.oldTime}

_Te esperamos no novo horário! 🚀_`

  return await sendWhatsAppMessage(phoneNumber, message)
}

/**
 * Envia mensagem de teste
 */
export const sendTestMessage = async (
  phoneNumber: string,
): Promise<TwilioMessageResult> => {
  const message = `CorteZapp - Teste de Conexao

WhatsApp via Twilio conectado com sucesso!
Data: ${new Date().toLocaleString("pt-BR")}

Esta e uma mensagem de teste do sistema de notificacoes.

Se voce recebeu esta mensagem, a integracao esta funcionando perfeitamente!`

  return await sendWhatsAppMessage(phoneNumber, message)
}

/**
 * Verifica o status de uma mensagem enviada
 */
export const getMessageStatus = async (
  messageId: string,
): Promise<TwilioMessageResult> => {
  try {
    const message = await client.messages(messageId).fetch()

    return {
      success: true,
      messageId: message.sid,
      status: message.status,
    }
  } catch (error) {
    console.error("Erro ao verificar status da mensagem:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

/**
 * Lista mensagens recentes (últimas 20)
 */
export const getRecentMessages = async () => {
  try {
    const messages = await client.messages.list({
      limit: 20,
      from: whatsappNumber,
    })

    return messages.map((message) => ({
      id: message.sid,
      to: message.to,
      from: message.from,
      body: message.body,
      status: message.status,
      dateCreated: message.dateCreated,
      dateSent: message.dateSent,
      errorCode: message.errorCode,
      errorMessage: message.errorMessage,
    }))
  } catch (error) {
    console.error("Erro ao buscar mensagens recentes:", error)
    throw new Error("Erro ao buscar mensagens recentes")
  }
}
