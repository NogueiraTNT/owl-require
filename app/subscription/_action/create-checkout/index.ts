"use server"

import { getCurrentGestor } from "@/app/_lib/session"
import Stripe from "stripe"

interface CreateStripeCheckoutProps {
  productId: string
  barbershopId: string
}
export const createStripeCheckout = async ({
  productId,
  barbershopId,
}: CreateStripeCheckoutProps) => {
  const gestor = await getCurrentGestor()
  if (!gestor) {
    throw new Error("Acesso não autorizado.")
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Chave secreta do Stripe não configurada.")
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
  })

  let priceId = ""
  if (productId === "1") {
    priceId = process.env.STRIPE_BASIC_PLAN!
  } else if (productId === "2") {
    priceId = process.env.STRIPE_PRO_PLAN!
  } else if (productId === "3") {
    priceId = process.env.STRIPE_PREMIUM_PLAN!
  }

  if (!priceId) {
    throw new Error("ID do produto inválido.")
  }

  // Log para confirmar que os IDs estão corretos antes de criar a sessão
  console.log(
    `Creating checkout for gestorId: ${gestor.id} and barbershopId: ${barbershopId}`,
  )

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: `http://localhost:3000/dashboard/${barbershopId}`,
    cancel_url: `http://localhost:3000/dashboard/${barbershopId}`,
    metadata: {
      gestorId: gestor.id,
      // PONTO DE ATENÇÃO CORRIGIDO: Usando camelCase para consistência
      barbershopId: barbershopId,
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return { sessionId: session.id }
}
