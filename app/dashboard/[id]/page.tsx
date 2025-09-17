import Header from "../../_components/header"
import { db } from "../../_lib/prisma"
import MyStores from "../../_components/minhas-lojas"
import { getCurrentGestor } from "../../_lib/session"
import { redirect } from "next/navigation"
import SummaryCards from "../_components/summary-cards"
import TimeSelect from "../_components/time-select"
import { isMatch } from "date-fns"
import TransactionsPieChart from "../_components/transactions-pie-chart"
import { getDashboard } from "@/app/_data/get-dashboard"
import ExpensesPerCategory from "../_components/expenses-per-category"
import LastTransactions from "../_components/last-transactions"
import RatingsCard from "../_components/ratings-card"

interface DashboardPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ month: string }>
}

const Dashboard = async ({ params, searchParams }: DashboardPageProps) => {
  const { id } = await params
  const { month } = await searchParams

  const gestor = await getCurrentGestor()
  if (!gestor) {
    redirect("/")
  }
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: id,
    },
  })
  const monthIsInvalid = !month || !isMatch(month, "MM")

  if (monthIsInvalid) {
    const monthActual = new Date().getMonth() + 1
    redirect(`/dashboard/${id}?month=${monthActual}`)
  }
  if (!barbershop) {
    return <MyStores />
  }
  const dashboard = await getDashboard(id, month)
  return (
    <div>
      <Header barbershopId={id} />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect barbershopId={id} />
        </div>
        {/* Layout conforme diagrama - Colunas com altura alinhada */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-start">
          {/* COLUNA PRINCIPAL ESQUERDA */}
          <div className="space-y-6">
            {/* Cards de Resumo */}
            <SummaryCards
              barbershopId={id}
              month={month}
              totalSaldo={dashboard.balance}
              totalInvestido={dashboard.investmentsTotal}
              totalReceita={dashboard.depositsTotal}
              totalDespesa={dashboard.expensesTotal}
            />

            {/* Gráficos - lado a lado */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TransactionsPieChart
                typePorcentage={{
                  totalReceita: dashboard.typesPercentage.DEPOSIT,
                  totalDespesa: dashboard.typesPercentage.EXPENSE,
                  totalInvestido: dashboard.typesPercentage.INVESTMENT,
                }}
              />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          {/* COLUNA LATERAL DIREITA - Altura flexível para alinhar com a principal */}
          <div className="flex flex-col space-y-6">
            <div className="flex-1">
              <LastTransactions
                barbershopId={id}
                lastTransactions={dashboard.lastTransactions}
              />
            </div>

            <RatingsCard
              averageRating={dashboard.averageRating}
              totalRatings={dashboard.totalRatings}
              lastRatings={dashboard.lastRatings}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
