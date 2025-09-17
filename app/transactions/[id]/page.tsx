import { DataTable } from "../../_components/ui/data-table"
import Header from "../../_components/header"
import { db } from "../../_lib/prisma"
import { getCurrentGestor } from "../../_lib/session"
import { transactionColumns } from "../_columns"
import { redirect } from "next/navigation"
import AddTransactionButton from "@/app/_components/add-transaction-button"

interface TransactionProps {
  params: Promise<{ id: string }>
}

const Transactions = async ({ params }: TransactionProps) => {
  const { id } = await params
  const gestor = await getCurrentGestor()
  if (!gestor) {
    redirect("/")
  }
  const transactions = await db.transaction.findMany({
    where: {
      barbershopId: id,
    },
    orderBy: {
      date: "desc",
    },
  })
  if (!transactions) {
    return <div>Nenhuma transação encontrada</div>
  }
  return (
    <div>
      <Header barbershopId={id} />
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold sm:text-2xl">Transações</h1>
          <AddTransactionButton barbershopId={id} />
        </div>
        <div className="overflow-x-auto">
          <DataTable
            columns={transactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </div>
      </div>
    </div>
  )
}

export default Transactions
