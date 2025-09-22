import {
  getFinancialTransactions,
  getFinancialStats,
} from "@/app/_actions/get-financial-data"
import {
  getTransactionTypeDisplayName,
  getTransactionCategoryDisplayName,
  getPaymentMethodDisplayName,
  getTransactionTypeColor,
  getTransactionTypeIcon,
  getCategoryIcon,
  getPaymentMethodIcon,
  formatCurrency,
  formatDate,
  formatDateTime,
} from "@/app/_lib/financial-utils"
import { getAdminSession } from "@/app/_actions/admin-signin"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Building2,
  Calendar,
  Eye,
  Search,
  CreditCard,
  Banknote,
  PiggyBank,
  BarChart3,
  PieChart,
} from "lucide-react"
import { Input } from "@/app/_components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"

const AdminFinancialPage = async () => {
  const adminSession = await getAdminSession()

  if (!adminSession) {
    redirect("/")
  }

  const [transactions, stats] = await Promise.all([
    getFinancialTransactions(),
    getFinancialStats(),
  ])

  const netProfit = stats.totalRevenue - stats.totalExpenses
  const monthlyProfit = stats.revenueThisMonth - stats.expensesThisMonth

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">
            Gerencie todas as transações financeiras do sistema
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Logado como:{" "}
            <span className="font-medium">{adminSession.name}</span>
          </p>
          <p
            className={`text-xs ${
              adminSession.type === "ADMIN" ? "text-primary" : "text-amber-600"
            }`}
          >
            {adminSession.type === "ADMIN" ? "Administrador" : "Suporte"}
          </p>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Este mês: {formatCurrency(stats.revenueThisMonth)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Despesas Totais
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(stats.totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              Este mês: {formatCurrency(stats.expensesThisMonth)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatCurrency(netProfit)}
            </div>
            <p className="text-xs text-muted-foreground">
              Este mês: {formatCurrency(monthlyProfit)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Transações
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Este mês: {stats.transactionsThisMonth}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas por Categoria */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Transações por Categoria
            </CardTitle>
            <CardDescription>
              Distribuição das transações por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.transactionsByCategory.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {getCategoryIcon(item.category)}
                    </span>
                    <span className="text-sm font-medium">
                      {getTransactionCategoryDisplayName(item.category)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">
                      {formatCurrency(item.total)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.count} transações
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Métodos de Pagamento
            </CardTitle>
            <CardDescription>
              Distribuição por método de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.transactionsByPaymentMethod.map((item) => (
                <div
                  key={item.paymentMethod}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {getPaymentMethodIcon(item.paymentMethod)}
                    </span>
                    <span className="text-sm font-medium">
                      {getPaymentMethodDisplayName(item.paymentMethod)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">
                      {formatCurrency(item.total)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.count} transações
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros e Busca
          </CardTitle>
          <CardDescription>
            Encontre transações específicas usando os filtros abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome da transação ou barbearia..."
                className="w-full"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="DEPOSIT">Receita</SelectItem>
                <SelectItem value="EXPENSE">Despesa</SelectItem>
                <SelectItem value="INVESTMENT">Investimento</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="SALARY">Salário</SelectItem>
                <SelectItem value="FOOD">Alimentação</SelectItem>
                <SelectItem value="TRANSPORT">Transporte</SelectItem>
                <SelectItem value="HOUSING">Moradia</SelectItem>
                <SelectItem value="UTILITIES">Utilidades</SelectItem>
                <SelectItem value="BARBERSHOP">Barbearia</SelectItem>
                <SelectItem value="OTHER">Outros</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="amount">Valor</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="barbershop">Barbearia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Transações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Lista de Transações
          </CardTitle>
          <CardDescription>
            {transactions.length} transações registradas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="py-8 text-center">
              <DollarSign className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">
                Nenhuma transação encontrada
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Não há transações registradas no sistema ainda.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transação</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Barbearia</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {transaction.id.slice(0, 8)}...
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${getTransactionTypeColor(transaction.type)}`}
                        >
                          <span className="mr-1">
                            {getTransactionTypeIcon(transaction.type)}
                          </span>
                          {getTransactionTypeDisplayName(transaction.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{getCategoryIcon(transaction.category)}</span>
                          <span className="text-sm">
                            {getTransactionCategoryDisplayName(
                              transaction.category,
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`font-bold ${
                            transaction.type === "DEPOSIT"
                              ? "text-green-600"
                              : transaction.type === "EXPENSE"
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        >
                          {transaction.type === "EXPENSE" ? "-" : "+"}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>
                            {getPaymentMethodIcon(transaction.paymentMethod)}
                          </span>
                          <span className="text-sm">
                            {getPaymentMethodDisplayName(
                              transaction.paymentMethod,
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {transaction.barbershop.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.barbershop.gestor.name ||
                              "Gestor sem nome"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(transaction.date)}
                          </div>
                          <div className="text-muted-foreground">
                            {formatDateTime(transaction.createdAt)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" />
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminFinancialPage
