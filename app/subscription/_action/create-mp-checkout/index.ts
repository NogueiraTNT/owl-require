"use server"

import { getCurrentGestor } from "@/app/_lib/session"
import { MercadoPagoConfig, Preference } from "mercadopago"

interface CreateMercadoPagoCheckoutProps {
  planType: "BASIC" | "PRO" | "PREMIUM"
  gestorId: string
}

export const createMercadoPagoCheckout = async ({
  planType,
  gestorId,
}: CreateMercadoPagoCheckoutProps) => {
  const gestor = await getCurrentGestor()
  if (!gestor) {
    throw new Error("Acesso não autorizado.")
  }

  // Verificar se o gestor pode fazer a assinatura
  if (gestor.id !== gestorId) {
    throw new Error("Acesso não autorizado para este gestor.")
  }

  // Verificar se o token do Mercado Pago está configurado
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error("Token do Mercado Pago não configurado.")
  }

  // Configurar cliente do Mercado Pago
  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    options: {
      timeout: 5000,
      idempotencyKey: `checkout-${gestorId}-${planType}-${Date.now()}`,
    },
  })

  // Definir preços dos planos
  const planPrices = {
    BASIC: 39.9,
    PRO: 89.9,
    PREMIUM: 149.9,
  }

  const planTitles = {
    BASIC: "Plano Básico",
    PRO: "Plano Pro",
    PREMIUM: "Plano Premium",
  }

  const price = planPrices[planType]
  const title = planTitles[planType]

  console.log("=== CRIANDO CHECKOUT MERCADO PAGO ===")
  console.log(`Gestor ID: ${gestorId}`)
  console.log(`Plano: ${planType}`)
  console.log(`Título: ${title}`)
  console.log(`Preço: R$ ${price}`)

  try {
    const preference = new Preference(client)

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const preferenceData = {
      items: [
        {
          id: planType,
          title: title,
          quantity: 1,
          unit_price: price,
        },
      ],
      back_urls: {
        success: `${baseUrl}/subscription/success`,
        failure: `${baseUrl}/subscription/failure`,
        pending: `${baseUrl}/subscription/pending`,
      },
      external_reference: `${gestorId}-${planType}-${Date.now()}`,
      notification_url: `${baseUrl}/api/mercadopago/webhook`,
    }

    const result = await preference.create({ body: preferenceData })

    console.log("Preferência criada com sucesso:", result.id)
    console.log("URL de checkout:", result.init_point)
    console.log("===============================")

    return {
      checkoutUrl: result.init_point!,
      preferenceId: result.id!,
      planType,
      price,
      title,
    }
  } catch (error) {
    console.error("Erro ao criar preferência do Mercado Pago:", error)
    throw new Error("Erro ao processar pagamento. Tente novamente.")
  }
}
