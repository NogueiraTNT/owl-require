import { NextRequest, NextResponse } from "next/server"
import { sendTestMessage } from "@/app/_lib/whatsapp-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { testNumber } = body

    if (!testNumber) {
      return NextResponse.json(
        { error: "Campo 'testNumber' é obrigatório" },
        { status: 400 }
      )
    }

    const success = await sendTestMessage(testNumber)
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: `Mensagem de teste enviada para ${testNumber}`,
        testNumber,
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        {
          error: "Falha ao enviar mensagem de teste",
          details: "Verifique se o WhatsApp está conectado e o número é válido",
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Erro ao enviar mensagem de teste:", error)
    
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    )
  }
}
