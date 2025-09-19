import { NextResponse } from "next/server"
import { disconnectWhatsApp } from "@/app/_lib/whatsapp-service"

export async function POST() {
  try {
    await disconnectWhatsApp()

    return NextResponse.json({
      success: true,
      message: "WhatsApp desconectado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao desconectar WhatsApp:", error)

    return NextResponse.json(
      {
        error: "Erro ao desconectar WhatsApp",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
