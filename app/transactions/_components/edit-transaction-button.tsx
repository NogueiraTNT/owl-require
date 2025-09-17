"use client"

import { PencilIcon } from "lucide-react"
import { Button } from "@/app/_components/ui/button"
import { useState } from "react"
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog"
import { Transaction } from "@prisma/client"

interface EditTransactionButtonProps {
  barbershopId: string
  transaction: Transaction
}

const EditTransactionButton = ({
  barbershopId,
  transaction,
}: EditTransactionButtonProps) => {
  const defaultValues = {
    ...transaction,
    amount: Number(transaction.amount),
  }
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon className="size-4" />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        barbershopId={barbershopId}
        defaultValues={defaultValues}
        transactionId={transaction.id}
      />
    </>
  )
}

export default EditTransactionButton
