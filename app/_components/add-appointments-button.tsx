"use client"

import { PencilIcon, PlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import UpsertAppointmentDialog from "@/app/_components/upsert-appointments-dialog"

interface AddAppointmentsButtonProps {
  barbershopId: string
  appointmentId?: {
    id: string
    serviceId: string
    userId: string | null
    clientName?: string | null
    clientPhone?: string | null
    workerId: string
    date: Date
    time: string
  }
}

const AddAppointmentsButton = ({
  barbershopId,
  appointmentId,
}: AddAppointmentsButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        {appointmentId ? (
          <PencilIcon className="size-4" />
        ) : (
          <>
            Adicionar agendamento <PlusIcon />
          </>
        )}
      </Button>
      {appointmentId ? (
        <UpsertAppointmentDialog
          isOpen={dialogIsOpen}
          defaultValues={{
            serviceId: appointmentId.serviceId,
            userId: appointmentId.userId || undefined,
            clientName: appointmentId.clientName || undefined,
            clientPhone: appointmentId.clientPhone || undefined,
            workerId: appointmentId.workerId,
            date: appointmentId.date,
            time: appointmentId.time,
          }}
          setIsOpen={setDialogIsOpen}
          appointmentId={appointmentId.id}
          barbershopId={barbershopId}
        />
      ) : (
        <UpsertAppointmentDialog
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
          barbershopId={barbershopId}
        />
      )}
    </>
  )
}

export default AddAppointmentsButton
