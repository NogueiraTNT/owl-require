"use client"

import { Button } from "@/app/_components/ui/button"
import { createMercadoPagoCheckout } from "../_action/create-mp-checkout"
import { useState } from "react"
import { LoaderIcon } from "lucide-react"

interface SubscriptionButtonProps {
  planType: "BASIC" | "PRO" | "PREMIUM"
  gestorId: string
  currentPlan?: string | null
  disabled?: boolean
}

export default function SubscriptionButton({
  planType,
  gestorId,
  currentPlan,
  disabled = false,
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async () => {
    try {
      setIsLoading(true)

      const result = await createMercadoPagoCheckout({
        planType,
        gestorId,
      })

      console.log("Checkout criado:", result)

      // Redirecionar para o checkout do Mercado Pago
      if (result.checkoutUrl && result.checkoutUrl !== "#checkout-basic") {
        window.location.href = result.checkoutUrl
      } else {
        alert(`Checkout criado para ${result.title} - R$ ${result.price}`)
      }
    } catch (error) {
      console.error("Erro ao criar checkout:", error)
      alert("Erro ao processar assinatura. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Se o plano atual é o mesmo que o botão, mostrar "Plano Atual"
  if (currentPlan === planType) {
    return (
      <Button disabled className="w-full">
        Plano Atual
      </Button>
    )
  }

  // Se tem um plano ativo mas não é este, mostrar "Fazer Upgrade/Downgrade"
  const getButtonText = () => {
    if (!currentPlan) return "Assinar Agora"

    const planOrder = { BASIC: 1, PRO: 2, PREMIUM: 3 }
    const currentOrder = planOrder[currentPlan as keyof typeof planOrder] || 0
    const targetOrder = planOrder[planType]

    if (targetOrder > currentOrder) return "Fazer Upgrade"
    if (targetOrder < currentOrder) return "Fazer Downgrade"
    return "Assinar Agora"
  }

  return (
    <Button
      onClick={handleSubscribe}
      disabled={disabled || isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          Processando...
        </>
      ) : (
        getButtonText()
      )}
    </Button>
  )
}
