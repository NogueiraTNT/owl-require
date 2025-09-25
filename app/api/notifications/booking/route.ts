import { NextRequest, NextResponse } from "next/server"
import {
  sendBookingConfirmationNotification,
  sendBookingReminderNotification,
  sendBookingCancellationNotification,
  sendBookingRescheduleNotification,
} from "@/app/_actions/notification-actions"

export async function POST(request: NextRequest) {
  try {
    const { type, bookingId, ...additionalData } = await request.json()

    if (!type || !bookingId) {
      return NextResponse.json(
        { error: "Tipo de notificação e ID do agendamento são obrigatórios" },
        { status: 400 },
      )
    }

    let results

    switch (type) {
      case "confirmation":
        results = await sendBookingConfirmationNotification(
          bookingId,
          additionalData.channels || ["whatsapp"],
        )
        break

      case "reminder":
        results = await sendBookingReminderNotification(
          bookingId,
          additionalData.reminderTime || "30 minutos",
        )
        break

      case "cancellation":
        results = await sendBookingCancellationNotification(
          bookingId,
          additionalData.reason,
        )
        break

      case "reschedule":
        if (!additionalData.newDate || !additionalData.newTime) {
          return NextResponse.json(
            {
              error: "Nova data e horário são obrigatórios para reagendamento",
            },
            { status: 400 },
          )
        }
        results = await sendBookingRescheduleNotification(
          bookingId,
          new Date(additionalData.newDate),
          additionalData.newTime,
        )
        break

      default:
        return NextResponse.json(
          { error: "Tipo de notificação inválido" },
          { status: 400 },
        )
    }

    return NextResponse.json({
      success: results.some((r) => r.success),
      results: results,
    })
  } catch (error) {
    console.error("Erro ao enviar notificação de agendamento:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}
