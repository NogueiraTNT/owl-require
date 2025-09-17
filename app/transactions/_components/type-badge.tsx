import { Transaction, TransactionType } from "@prisma/client"
import { Badge } from "@/app/_components/ui/badge"
import { CircleIcon } from "lucide-react"

interface TransactionTypeBadgeProps {
  transaction: Transaction
}

const transactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-green-700 font-bold text-white">
        <CircleIcon className="fill-green-500" size={10} /> Ganho
      </Badge>
    )
  } else if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-red-700 font-bold text-white">
        <CircleIcon size={10} className="fill-red-500" /> Despesa
      </Badge>
    )
  } else if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge className="bg-yellow-700 font-bold text-white">
        <CircleIcon size={10} className="fill-yellow-500" /> Investimento
      </Badge>
    )
  }
}

export default transactionTypeBadge
