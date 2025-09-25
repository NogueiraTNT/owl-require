import { NextRequest, NextResponse } from "next/server"
import {
  sendTestNotification,
  getNotificationServiceStatus,
} from "@/app/_actions/notification-actions"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Número de telefone é obrigatório" },
        { status: 400 },
      )
    }

    // Validar formato do número
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      return NextResponse.json(
        {
          error:
            "Formato de número inválido. Use o formato internacional (ex: +5511999999999)",
        },
        { status: 400 },
      )
    }

    const result = await sendTestNotification(phoneNumber)

    return NextResponse.json({
      success: result.success,
      messageId: result.messageId,
      error: result.error,
      channel: result.channel,
    })
  } catch (error) {
    console.error("Erro ao enviar mensagem de teste:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const status = await getNotificationServiceStatus()

    return NextResponse.json(status)
  } catch (error) {
    console.error("Erro ao obter status dos serviços:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}
