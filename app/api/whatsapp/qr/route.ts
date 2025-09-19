import { NextResponse } from "next/server"
import { getQRCode } from "@/app/_lib/whatsapp-service"

export async function GET() {
  try {
    const qrCode = await getQRCode()

    if (!qrCode) {
      return NextResponse.json(
        { error: "QR Code não disponível. Inicie uma conexão primeiro." },
        { status: 404 },
      )
    }

    return NextResponse.json({
      qrCode,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro ao buscar QR Code:", error)

    return NextResponse.json(
      {
        error: "Erro ao gerar QR Code",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
