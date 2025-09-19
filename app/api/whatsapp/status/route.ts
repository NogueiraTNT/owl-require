import { NextResponse } from "next/server"
import { getWhatsAppStatus } from "@/app/_lib/whatsapp-service"

export async function GET() {
  try {
    const status = await getWhatsAppStatus()

    return NextResponse.json({
      ...status,
      systemStatus: "operational",
      serverTime: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro ao buscar status WhatsApp:", error)

    return NextResponse.json(
      {
        connected: false,
        ready: false,
        connecting: false,
        available: false,
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
