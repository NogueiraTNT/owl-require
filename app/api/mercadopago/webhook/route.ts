import { NextRequest, NextResponse } from "next/server"
import { MercadoPagoConfig, Payment } from "mercadopago"
import { db } from "@/app/_lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("=== WEBHOOK MERCADO PAGO ===")
    console.log("Dados recebidos:", JSON.stringify(body, null, 2))

    // Verificar se é uma notificação de pagamento
    if (body.type !== "payment") {
      console.log("Tipo de notificação ignorado:", body.type)
      return NextResponse.json({ status: "ignored" })
    }

    // Verificar se o token do Mercado Pago está configurado
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.error("Token do Mercado Pago não configurado")
      return NextResponse.json(
        { error: "Token não configurado" },
        { status: 500 },
      )
    }

    // Configurar cliente do Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    })

    // Buscar informações do pagamento
    const payment = new Payment(client)
    const paymentData = await payment.get({ id: body.data.id })

    console.log("Dados do pagamento:", JSON.stringify(paymentData, null, 2))

    // Extrair metadata
    const metadata = paymentData.metadata
    const gestorId = metadata?.gestor_id as string
    const planType = metadata?.plan_type as string

    if (!gestorId || !planType) {
      console.error("Metadata incompleta:", { gestorId, planType })
      return NextResponse.json(
        { error: "Metadata incompleta" },
        { status: 400 },
      )
    }

    // Processar conforme status do pagamento
    switch (paymentData.status) {
      case "approved":
        // Pagamento aprovado - ativar plano com controle de datas
        const now = new Date()
        const planEndDate = new Date(now)
        planEndDate.setMonth(planEndDate.getMonth() + 1) // Assinatura válida por 1 mês

        await db.gestor.update({
          where: { id: gestorId },
          data: {
            plan: planType as "BASIC" | "PRO" | "PREMIUM",
            planStartDate: now,
            planEndDate: planEndDate,
            subscriptionStatus: "ACTIVE",
            lastPaymentId: paymentData.id?.toString(),
            mercadoPagoCustomerId: paymentData.payer?.id?.toString(),
          },
        })

        console.log(`Plano ${planType} ativado para gestor ${gestorId}`)
        console.log(
          `Válido de ${now.toISOString()} até ${planEndDate.toISOString()}`,
        )
        break

      case "pending":
        // Pagamento pendente - marcar como pendente
        await db.gestor.update({
          where: { id: gestorId },
          data: {
            subscriptionStatus: "PENDING",
            lastPaymentId: paymentData.id?.toString(),
          },
        })
        console.log(`Pagamento pendente para gestor ${gestorId}`)
        break

      case "rejected":
      case "cancelled":
        // Pagamento rejeitado/cancelado - marcar como inativo
        await db.gestor.update({
          where: { id: gestorId },
          data: {
            subscriptionStatus: "INACTIVE",
            lastPaymentId: paymentData.id?.toString(),
          },
        })
        console.log(`Pagamento ${paymentData.status} para gestor ${gestorId}`)
        break

      default:
        console.log(`Status desconhecido: ${paymentData.status}`)
    }

    console.log("===============================")

    return NextResponse.json({ status: "processed" })
  } catch (error) {
    console.error("Erro no webhook do Mercado Pago:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}

// Método GET para teste
export async function GET() {
  return NextResponse.json({
    message: "Webhook do Mercado Pago ativo",
    timestamp: new Date().toISOString(),
  })
}
