"use client"

import { Pie, PieChart } from "recharts"

import { Card, CardContent } from "@/app/_components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart"
import { TransactionType } from "@prisma/client"
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

const chartConfig = {
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E", //Verde
  },
  [TransactionType.EXPENSE]: {
    label: "Despesa",
    color: "#E93030", //Vermelho
  },
  [TransactionType.INVESTMENT]: {
    label: "Investimento",
    color: "#FFC107", //Amarelo
  },
} satisfies ChartConfig

interface TransactionsPieChartProps {
  typePorcentage: {
    totalReceita: number
    totalDespesa: number
    totalInvestido: number
  }
}

const TransactionsPieChart = ({
  typePorcentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: typePorcentage.totalReceita,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: typePorcentage.totalDespesa,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: typePorcentage.totalInvestido,
      fill: "#FFC107",
    },
  ]
  return (
    <Card>
      <CardContent className="p-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={50}
            />
          </PieChart>
        </ChartContainer>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white/3 p-2">
                <TrendingUpIcon size={16} className="text-green-500" />
              </div>
              <p className="text-muted-foreground text-sm">Receita</p>
            </div>
            <p className="text-sm font-bold">{typePorcentage.totalReceita}%</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white/3 p-2">
                <TrendingDownIcon size={16} className="text-red-500" />
              </div>
              <p className="text-muted-foreground text-sm">Despesa</p>
            </div>
            <p className="text-sm font-bold">{typePorcentage.totalDespesa}%</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white/3 p-2">
                <PiggyBankIcon size={16} className="text-yellow-500" />
              </div>
              <p className="text-muted-foreground text-sm">Investimento</p>
            </div>
            <p className="text-sm font-bold">
              {typePorcentage.totalInvestido}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionsPieChart
