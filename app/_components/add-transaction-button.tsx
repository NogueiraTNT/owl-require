"use client"

import { ArrowDownUpIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog"

interface AddTransactionButtonProps {
  barbershopId: string
}

const AddTransactionButton = ({ barbershopId }: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar transação
        <ArrowDownUpIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        barbershopId={barbershopId}
      />
    </>
  )
}

export default AddTransactionButton
