import { NextRequest, NextResponse } from "next/server"
import { getNotificationServiceStatus } from "@/app/_actions/notification-actions"

export async function GET() {
  try {
    const status = await getNotificationServiceStatus()

    return NextResponse.json({
      success: true,
      status,
      provider: "Development Service",
      environment: process.env.NODE_ENV || "development",
    })
  } catch (error) {
    console.error("Erro ao obter status dos serviços:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao obter status dos serviços",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
