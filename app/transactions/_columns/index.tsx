"use client"

import {
  Transaction,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import TransactionTypeBadge from "../_components/type-badge"
import { Button } from "@/app/_components/ui/button"
import { PencilIcon, TrashIcon } from "lucide-react"
import EditTransactionButton from "../_components/edit-transaction-button"
import { formatCurrency } from "@/app/_utils/currency"

const TRANSACTION_CATEGORY_LABELS = {
  [TransactionCategory.SALARY]: "Salário",
  [TransactionCategory.FOOD]: "Alimentação",
  [TransactionCategory.TRANSPORT]: "Transporte",
  [TransactionCategory.HOUSING]: "Moradia",
  [TransactionCategory.UTILITIES]: "Utilidades",
  [TransactionCategory.OTHER]: "Outro",
  [TransactionCategory.BARBERSHOP]: "Barbearia",
}

const TRANSACTION_PAYMENT_METHOD_LABELS = {
  [TransactionPaymentMethod.CREDIT_CARD]: "Cartão de crédito",
  [TransactionPaymentMethod.DEBIT_CARD]: "Cartão de débito",
  [TransactionPaymentMethod.BANK_TRANSFER]: "Transferência bancária",
  [TransactionPaymentMethod.PIX]: "Pix",
  [TransactionPaymentMethod.CASH]: "Dinheiro",
  [TransactionPaymentMethod.OTHER]: "Outro",
}

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      formatCurrency(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => (
      <div className="space-x-1">
        <EditTransactionButton
          barbershopId={transaction.barbershopId}
          transaction={transaction}
        />
        <Button variant="outline" size="icon" className="text-muted-foreground">
          <TrashIcon className="size-4" />
        </Button>
      </div>
    ),
  },
]
