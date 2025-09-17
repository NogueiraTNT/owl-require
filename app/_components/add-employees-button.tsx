"use client"

import { PlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import UpsertWorkerData from "@/app/_components/upsert-employees-dialog"

interface AddEmployeeButtonProps {
  barbershopId: string
}

const AddEmployeeButton = ({ barbershopId }: AddEmployeeButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar funcionário
        <PlusIcon />
      </Button>
      <UpsertWorkerData
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        barbershopId={barbershopId}
      />
    </>
  )
}

export default AddEmployeeButton
