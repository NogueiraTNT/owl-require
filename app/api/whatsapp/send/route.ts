import { NextRequest, NextResponse } from "next/server"
import { sendWhatsAppMessage } from "@/app/_lib/whatsapp-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, message, source = "api" } = body

    if (!to || !message) {
      return NextResponse.json(
        { error: "Campos 'to' e 'message' são obrigatórios" },
        { status: 400 }
      )
    }

    const success = await sendWhatsAppMessage(to, message, source)
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: "Mensagem enviada com sucesso",
        to,
        source,
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        {
          error: "Falha ao enviar mensagem",
          details: "Verifique se o WhatsApp está conectado e o número é válido",
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Erro na API de envio:", error)
    
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    )
  }
}