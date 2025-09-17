import AddTransactionButton from "@/app/_components/add-transaction-button"
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"
import { formatCurrency } from "@/app/_utils/currency"

interface SummaryCardProps {
  title: string
  amount: number
  icon: React.ReactNode
  size: "small" | "large"
  barbershopId?: string
}

const SummaryCard = ({
  title,
  amount,
  icon,
  size,
  barbershopId,
}: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-xl" : "text-4xl"} `}
        >
          {formatCurrency(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton barbershopId={barbershopId || ""} />
        )}
      </CardContent>
    </Card>
  )
}

export default SummaryCard
