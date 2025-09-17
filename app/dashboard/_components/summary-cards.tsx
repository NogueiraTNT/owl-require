import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"
import SummaryCard from "./summary-card"
import { getCurrentGestor } from "@/app/_lib/session"
import { redirect } from "next/navigation"

interface SummaryCardsProps {
  barbershopId: string
  month: string
  totalSaldo: number
  totalInvestido: number
  totalReceita: number
  totalDespesa: number
}

const SummaryCards = async ({
  barbershopId,
  totalSaldo,
  totalInvestido,
  totalReceita,
  totalDespesa,
}: SummaryCardsProps) => {
  const gestor = await getCurrentGestor()
  if (!gestor) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      {/* Primeiro Card Saldo */}
      <SummaryCard
        title="Saldo"
        amount={totalSaldo}
        icon={<WalletIcon size={16} />}
        size="large"
        barbershopId={barbershopId}
      />
      {/* Outros Cards */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Investido"
          amount={totalInvestido}
          icon={<PiggyBankIcon size={14} />}
          size="small"
        />
        <SummaryCard
          title="Receita"
          amount={totalReceita}
          icon={<TrendingUpIcon size={14} className="text-green-500" />}
          size="small"
        />
        <SummaryCard
          title="Despesas"
          amount={totalDespesa}
          icon={<TrendingDownIcon size={14} className="text-red-500" />}
          size="small"
        />
      </div>
    </div>
  )
}

export default SummaryCards
