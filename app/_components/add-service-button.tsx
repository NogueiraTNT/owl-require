"use client"

import { PencilIcon, PlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import UpsertServiceData from "@/app/_components/upsert-service-dialog"

interface AddServicesButtonProps {
  barbershopId: string
  serviceId?: {
    name: string
    description: string
    price: string
    imageUrl: string
    id: string
    active: boolean
  }
}

const AddServicesButton = ({
  barbershopId,
  serviceId,
}: AddServicesButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        {serviceId ? (
          <PencilIcon className="size-4" />
        ) : (
          <>
            Adicionar serviço <PlusIcon />
          </>
        )}
      </Button>
      {serviceId ? (
        <UpsertServiceData
          isOpen={dialogIsOpen}
          defaultValues={{
            name: serviceId.name,
            description: serviceId.description,
            price: serviceId.price,
            imageUrl: serviceId.imageUrl,
            active: serviceId.active,
          }}
          setIsOpen={setDialogIsOpen}
          serviceId={serviceId.id}
          barbershopId={barbershopId}
        />
      ) : (
        <UpsertServiceData
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
          barbershopId={barbershopId}
        />
      )}
    </>
  )
}

export default AddServicesButton
