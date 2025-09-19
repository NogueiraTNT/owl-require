import { NextResponse } from "next/server"
import { connectWhatsApp } from "@/app/_lib/whatsapp-service"

export async function POST() {
  try {
    await connectWhatsApp()

    return NextResponse.json({
      success: true,
      message: "Iniciando conexão WhatsApp. Aguarde o QR Code...",
    })
  } catch (error) {
    console.error("Erro ao conectar WhatsApp:", error)

    return NextResponse.json(
      {
        error: "Erro ao iniciar conexão WhatsApp",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
