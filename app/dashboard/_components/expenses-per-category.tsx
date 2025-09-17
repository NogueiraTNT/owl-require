import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Progress } from "@/app/_components/ui/progress"
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/type"
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions"

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[]
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-bold">
          Gastos por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {expensesPerCategory.length > 0 ? (
          <div className="max-h-80 space-y-4 overflow-y-auto [scrollbar-width:none]">
            {expensesPerCategory.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex w-full justify-between">
                  <p className="text-sm font-medium">
                    {TRANSACTION_CATEGORY_LABELS[category.category]}
                  </p>
                  <p className="text-sm font-bold">
                    {category.percentageOfTotal}%
                  </p>
                </div>
                <Progress value={category.percentageOfTotal} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground text-sm">
              Nenhuma despesa encontrada
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ExpensesPerCategory
