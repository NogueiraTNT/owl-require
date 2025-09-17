import { Button } from "@/app/_components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Transaction, TransactionType } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/app/_utils/currency"
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions"

interface LastTransactionsProps {
  barbershopId: string
  lastTransactions: Transaction[]
}

const LastTransactions = ({
  barbershopId,
  lastTransactions,
}: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-green-500"
    }
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500"
    }
    return "text-yellow-500"
  }
  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+"
    }
    return "-"
  }
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href={`/transactions/${barbershopId}`}>Ver todas</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-62 space-y-4 overflow-y-auto [scrollbar-width:none]">
          {lastTransactions.slice(0, 8).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/3 p-3">
                  <Image
                    src={`/${
                      TRANSACTION_PAYMENT_METHOD_ICONS[
                        transaction.paymentMethod
                      ]
                    }`}
                    alt="logo"
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold">{transaction.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {transaction.date.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
                {getAmountPrefix(transaction)}
                {formatCurrency(Number(transaction.amount))}
              </p>
            </div>
          ))}
        </div>

        {lastTransactions.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-muted-foreground text-sm">
              Nenhuma transação encontrada
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default LastTransactions
