"use client"

import { Button } from "./ui/button"
import { EyeOffIcon, EyeIcon } from "lucide-react"
import { toggleServiceStatus } from "@/app/_actions/toggle-service-status"

interface ToggleServiceButtonProps {
  serviceId: string
  barbershopId: string
  active: boolean
}

export default function ToggleServiceButton({
  serviceId,
  barbershopId,
  active,
}: ToggleServiceButtonProps) {
  const handleToggle = async () => {
    const action = active ? "inativar" : "ativar"
    if (
      confirm(
        `Tem certeza que deseja ${action} este serviço? ${
          active
            ? "Ele não ficará mais visível para os clientes."
            : "Ele ficará visível para os clientes novamente."
        }`,
      )
    ) {
      try {
        await toggleServiceStatus({ serviceId, barbershopId })
      } catch (error) {
        console.error("Erro ao alterar status do serviço:", error)
        alert(
          "Ocorreu um erro ao alterar o status do serviço. Tente novamente.",
        )
      }
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="sm:w-auto"
    >
      {active ? (
        <EyeOffIcon className="size-4" />
      ) : (
        <EyeIcon className="size-4" />
      )}
      <span className="ml-2 sm:hidden">{active ? "Inativar" : "Ativar"}</span>
    </Button>
  )
}
