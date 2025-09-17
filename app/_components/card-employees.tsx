"use client"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import UpsertWorkerDialog from "./upsert-employees-dialog"
import ToggleWorkerButton from "./toggle-worker-button"
import { useState } from "react"
import { WorkerWithHors } from "../../types/prisma"

interface CardFuncionariosProps {
  workerAll: WorkerWithHors
  barbershopId: string
}

const CardFuncionarios = ({
  workerAll,
  barbershopId,
}: CardFuncionariosProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  return (
    <Card
      className={`group relative flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${!workerAll.active ? "bg-gray-50 opacity-70" : ""}`}
    >
      <div className="absolute top-2 right-2 flex gap-1">
        <ToggleWorkerButton
          workerId={workerAll.id}
          barbershopId={barbershopId}
          active={workerAll.active}
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full opacity-50 transition-opacity group-hover:opacity-100"
          onClick={() => setDialogIsOpen(true)}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        <UpsertWorkerDialog
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
          barbershopId={barbershopId}
          workerId={workerAll.id}
          defaultValues={{
            name: workerAll.name,
            imageUrl: workerAll.imageUrl,
            horarios: workerAll.hors?.horarios ?? [],
            active: workerAll.active,
          }}
        />
      </div>

      <CardContent className="flex flex-col items-center gap-4 p-0">
        <Avatar className="h-20 w-20">
          <AvatarImage src={workerAll.imageUrl} alt={workerAll.name} />
          <AvatarFallback>{workerAll.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold">{workerAll.name}</p>
          <Badge variant={workerAll.active ? "default" : "secondary"}>
            {workerAll.active ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        {workerAll.hors && workerAll.hors.horarios && (
          <p className="text-muted-foreground text-sm">
            {workerAll.hors.horarios.join(", ")}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

export default CardFuncionarios
