import { NextRequest, NextResponse } from "next/server"
import { connectWhatsApp } from "@/app/_lib/whatsapp-service"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          error: "Número de telefone é obrigatório",
        },
        { status: 400 },
      )
    }

    console.log(
      "📱 [API] Conectando WhatsApp central por número via API admin...",
    )

    await connectWhatsApp()
    const result = { success: true, message: "Conexão iniciada" }

    return NextResponse.json({
      ...result,
      system: "owl-require-admin",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ [API] Erro ao conectar por número:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
        system: "owl-require-admin",
      },
      { status: 500 },
    )
  }
}
