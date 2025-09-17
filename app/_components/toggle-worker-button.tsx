"use client"

import { Button } from "./ui/button"
import { EyeOffIcon, EyeIcon } from "lucide-react"
import { toggleWorkerStatus } from "@/app/_actions/toggle-worker-status"

interface ToggleWorkerButtonProps {
  workerId: string
  barbershopId: string
  active: boolean
}

export default function ToggleWorkerButton({
  workerId,
  barbershopId,
  active,
}: ToggleWorkerButtonProps) {
  const handleToggle = async () => {
    const action = active ? "inativar" : "ativar"
    if (
      confirm(
        `Tem certeza que deseja ${action} este funcionário? ${
          active
            ? "Ele não ficará mais disponível para novos agendamentos."
            : "Ele ficará disponível para novos agendamentos novamente."
        }`,
      )
    ) {
      try {
        await toggleWorkerStatus({ workerId, barbershopId })
      } catch (error) {
        console.error("Erro ao alterar status do funcionário:", error)
        alert(
          "Ocorreu um erro ao alterar o status do funcionário. Tente novamente.",
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
