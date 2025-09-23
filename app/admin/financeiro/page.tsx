"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  getAllExpenses,
  getAllRevenues,
  getAllCustomerActivities,
  getPlatformFinancialStats,
  createExpense,
  createRevenue,
  createCustomerActivity,
} from "@/app/_actions/platform-financial"
import {
  getExpenseCategoryIcon,
  getExpenseCategoryColor,
  getRevenueSourceIcon,
  getRevenueSourceColor,
  getActivityTypeIcon,
  getActivityTypeColor,
  getRecurringTypeIcon,
  formatCurrency,
  formatDate,
  formatPercentage,
  getGrowthColor,
  getGrowthIcon,
  getExpenseCategoryDisplayName,
  getRevenueSourceDisplayName,
  getActivityTypeDisplayName,
  getRecurringTypeDisplayName,
} from "@/app/_lib/platform-financial-utils"
import { getAdminSession } from "@/app/_actions/admin-signin"
import { redirect } from "next/navigation"
import {
  PlatformExpense,
  PlatformRevenue,
  CustomerActivity,
  PlatformFinancialStats,
  CreateExpenseData,
  CreateRevenueData,
  CreateActivityData,
} from "@/app/_types/platform-financial"
import {
  ExpenseCategory,
  RevenueSource,
  CustomerActivityType,
  RecurringType,
} from "@/app/generated/prisma"
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
  Eye,
  CreditCard,
  PieChart,
  Plus,
  Users,
  Receipt,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"
import { Input } from "@/app/_components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import { Label } from "@/app/_components/ui/label"
import { Textarea } from "@/app/_components/ui/textarea"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs"

const AdminFinancialPage = () => {
  const [adminSession, setAdminSession] = useState<{
    id: string
    name: string
    type: string
  } | null>(null)
  const [stats, setStats] = useState<PlatformFinancialStats | null>(null)
  const [expenses, setExpenses] = useState<PlatformExpense[]>([])
  const [revenues, setRevenues] = useState<PlatformRevenue[]>([])
  const [activities, setActivities] = useState<CustomerActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Estados dos formulários
  const [showExpenseDialog, setShowExpenseDialog] = useState(false)
  const [showRevenueDialog, setShowRevenueDialog] = useState(false)
  const [showActivityDialog, setShowActivityDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Formulário de despesa
  const [expenseForm, setExpenseForm] = useState<CreateExpenseData>({
    name: "",
    description: "",
    amount: 0,
    category: "OTHER",
    date: new Date(),
    receipt: "",
    isRecurring: false,
    recurringType: "MONTHLY",
  })

  // Formulário de receita
  const [revenueForm, setRevenueForm] = useState<CreateRevenueData>({
    source: "OTHER",
    amount: 0,
    description: "",
    date: new Date(),
    barbershopId: "",
    subscriptionId: "",
  })

  // Formulário de atividade
  const [activityForm, setActivityForm] = useState<CreateActivityData>({
    barbershopId: "",
    activity: "NEW_SUBSCRIPTION",
    amount: 0,
    description: "",
    date: new Date(),
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const session = await getAdminSession()
        if (!session) {
          redirect("/")
          return
        }

        setAdminSession(session)
        await loadAllData()
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast.error("Erro ao carregar dados financeiros")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const loadAllData = async () => {
    try {
      const [statsData, expensesData, revenuesData, activitiesData] =
        await Promise.all([
          getPlatformFinancialStats(),
          getAllExpenses(),
          getAllRevenues(),
          getAllCustomerActivities(),
        ])

      setStats(statsData)
      setExpenses(expensesData)
      setRevenues(revenuesData)
      setActivities(activitiesData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast.error("Erro ao carregar dados")
    }
  }

  // Funções de ação
  const handleCreateExpense = async () => {
    if (!adminSession) return

    try {
      setIsSubmitting(true)
      await createExpense(expenseForm, adminSession.id)
      toast.success("Despesa registrada com sucesso!")
      setShowExpenseDialog(false)
      await loadAllData()
    } catch (error) {
      console.error("Erro ao criar despesa:", error)
      toast.error("Erro ao registrar despesa")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateRevenue = async () => {
    try {
      setIsSubmitting(true)
      await createRevenue(revenueForm)
      toast.success("Receita registrada com sucesso!")
      setShowRevenueDialog(false)
      await loadAllData()
    } catch (error) {
      console.error("Erro ao criar receita:", error)
      toast.error("Erro ao registrar receita")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateActivity = async () => {
    try {
      setIsSubmitting(true)
      await createCustomerActivity(activityForm)
      toast.success("Atividade registrada com sucesso!")
      setShowActivityDialog(false)
      await loadAllData()
    } catch (error) {
      console.error("Erro ao criar atividade:", error)
      toast.error("Erro ao registrar atividade")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Controle Financeiro da Plataforma
          </h1>
          <p className="text-muted-foreground">
            Acompanhe receitas, despesas e atividades dos clientes da sua
            plataforma
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Logado como:{" "}
            <span className="font-medium">
              {adminSession?.name || "Carregando..."}
            </span>
          </p>
          <p
            className={`text-xs ${
              adminSession?.type === "ADMIN" ? "text-primary" : "text-amber-600"
            }`}
          >
            {adminSession?.type === "ADMIN" ? "Administrador" : "Suporte"}
          </p>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita da Plataforma
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats?.totalRevenue || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Este mês: {formatCurrency(stats?.revenueThisMonth || 0)}
            </p>
            <div className="mt-1 flex items-center gap-1">
              {getGrowthIcon(stats?.revenueGrowth || 0)}
              <span
                className={`text-xs ${getGrowthColor(stats?.revenueGrowth || 0)}`}
              >
                {formatPercentage(stats?.revenueGrowth || 0)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Despesas da Empresa
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(stats?.totalExpenses || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Este mês: {formatCurrency(stats?.expensesThisMonth || 0)}
            </p>
            <div className="mt-1 flex items-center gap-1">
              {getGrowthIcon(stats?.expensesGrowth || 0)}
              <span
                className={`text-xs ${getGrowthColor(stats?.expensesGrowth || 0)}`}
              >
                {formatPercentage(stats?.expensesGrowth || 0)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${(stats?.netProfit || 0) >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatCurrency(stats?.netProfit || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Este mês: {formatCurrency(stats?.monthlyProfit || 0)}
            </p>
            <div className="mt-1 flex items-center gap-1">
              {getGrowthIcon(stats?.profitGrowth || 0)}
              <span
                className={`text-xs ${getGrowthColor(stats?.profitGrowth || 0)}`}
              >
                {formatPercentage(stats?.profitGrowth || 0)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.activeCustomers || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Total: {stats?.totalCustomers || 0}
            </p>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs text-red-600">
                Churn: {formatPercentage(stats?.churnRate || 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas por Categoria */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Despesas por Categoria
            </CardTitle>
            <CardDescription>
              Distribuição das despesas da empresa por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.expensesByCategory.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {getExpenseCategoryIcon(item.category)}
                    </span>
                    <span className="text-sm font-medium">
                      {getExpenseCategoryDisplayName(item.category)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">
                      {formatCurrency(item.total)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.count} despesas
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
              Receitas por Fonte
            </CardTitle>
            <CardDescription>
              Distribuição das receitas da plataforma por fonte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.revenuesBySource.map((item) => (
                <div
                  key={item.source}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {getRevenueSourceIcon(item.source)}
                    </span>
                    <span className="text-sm font-medium">
                      {getRevenueSourceDisplayName(item.source)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">
                      {formatCurrency(item.total)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.count} receitas
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Controle */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="expenses">Despesas</TabsTrigger>
          <TabsTrigger value="revenues">Receitas</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Atividades Recentes */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Atividades Recentes dos Clientes
                </CardTitle>
                <CardDescription>
                  Últimas atividades registradas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentActivities.slice(0, 5).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        {getActivityTypeIcon(activity.activity)}
                        <div>
                          <div className="font-medium">
                            {activity.barbershop.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {getActivityTypeDisplayName(activity.activity)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.amount && (
                          <div className="font-bold">
                            {formatCurrency(activity.amount)}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {formatDate(activity.date)}
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
                  <Receipt className="h-5 w-5" />
                  Despesas Recentes
                </CardTitle>
                <CardDescription>Últimas despesas registradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentExpenses.slice(0, 5).map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        {getExpenseCategoryIcon(expense.category)}
                        <div>
                          <div className="font-medium">{expense.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {getExpenseCategoryDisplayName(expense.category)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">
                          -{formatCurrency(expense.amount)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(expense.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Despesas da Empresa
                  </CardTitle>
                  <CardDescription>
                    Controle de todas as despesas da plataforma
                  </CardDescription>
                </div>
                <Button onClick={() => setShowExpenseDialog(true)}>
                  <Plus className="mr-1 h-4 w-4" />
                  Nova Despesa
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <div className="py-8 text-center">
                  <Receipt className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">
                    Nenhuma despesa registrada
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Registre a primeira despesa da empresa.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Despesa</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Recorrente</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{expense.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {expense.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getExpenseCategoryColor(
                                expense.category,
                              )}
                            >
                              {getExpenseCategoryIcon(expense.category)}
                              <span className="ml-1">
                                {getExpenseCategoryDisplayName(
                                  expense.category,
                                )}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-bold text-red-600">
                              -{formatCurrency(expense.amount)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDate(expense.date)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {expense.isRecurring && expense.recurringType && (
                              <Badge variant="outline">
                                {getRecurringTypeIcon(expense.recurringType)}
                                <span className="ml-1">
                                  {getRecurringTypeDisplayName(
                                    expense.recurringType,
                                  )}
                                </span>
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver Detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Deletar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenues" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Receitas da Plataforma
                  </CardTitle>
                  <CardDescription>
                    Controle de todas as receitas da plataforma
                  </CardDescription>
                </div>
                <Button onClick={() => setShowRevenueDialog(true)}>
                  <Plus className="mr-1 h-4 w-4" />
                  Nova Receita
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {revenues.length === 0 ? (
                <div className="py-8 text-center">
                  <DollarSign className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">
                    Nenhuma receita registrada
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Registre a primeira receita da plataforma.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Receita</TableHead>
                        <TableHead>Fonte</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Barbearia</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {revenues.map((revenue) => (
                        <TableRow key={revenue.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {getRevenueSourceDisplayName(revenue.source)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {revenue.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getRevenueSourceColor(revenue.source)}
                            >
                              {getRevenueSourceIcon(revenue.source)}
                              <span className="ml-1">
                                {getRevenueSourceDisplayName(revenue.source)}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-bold text-green-600">
                              +{formatCurrency(revenue.amount)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {revenue.barbershop?.name || "N/A"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDate(revenue.date)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver Detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Deletar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Atividades dos Clientes
                  </CardTitle>
                  <CardDescription>
                    Acompanhe as atividades dos clientes da plataforma
                  </CardDescription>
                </div>
                <Button onClick={() => setShowActivityDialog(true)}>
                  <Plus className="mr-1 h-4 w-4" />
                  Nova Atividade
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <div className="py-8 text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">
                    Nenhuma atividade registrada
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Registre a primeira atividade de cliente.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Barbearia</TableHead>
                        <TableHead>Atividade</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>
                            <div className="font-medium">
                              {activity.barbershop.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getActivityTypeColor(
                                activity.activity,
                              )}
                            >
                              {getActivityTypeIcon(activity.activity)}
                              <span className="ml-1">
                                {getActivityTypeDisplayName(activity.activity)}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {activity.amount && (
                              <div
                                className={`font-bold ${
                                  activity.activity.includes("SUCCESS") ||
                                  activity.activity.includes("NEW") ||
                                  activity.activity.includes("UPGRADE")
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {activity.activity.includes("CANCELLATION") ||
                                activity.activity.includes("FAILED") ||
                                activity.activity.includes("DOWNGRADE")
                                  ? "-"
                                  : "+"}
                                {formatCurrency(activity.amount)}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDate(activity.date)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {activity.description}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver Detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Deletar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogos de Formulário */}

      {/* Diálogo de Nova Despesa */}
      <Dialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Despesa</DialogTitle>
            <DialogDescription>
              Registre uma nova despesa da empresa
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="expense-name">Nome da Despesa</Label>
              <Input
                id="expense-name"
                placeholder="Ex: Servidor AWS"
                value={expenseForm.name}
                onChange={(e) =>
                  setExpenseForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="expense-description">Descrição</Label>
              <Textarea
                id="expense-description"
                placeholder="Descrição opcional"
                value={expenseForm.description}
                onChange={(e) =>
                  setExpenseForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="expense-amount">Valor</Label>
              <Input
                id="expense-amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={expenseForm.amount}
                onChange={(e) =>
                  setExpenseForm((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="expense-category">Categoria</Label>
              <Select
                value={expenseForm.category}
                onValueChange={(value: ExpenseCategory) =>
                  setExpenseForm((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SERVER">Servidor/Hosting</SelectItem>
                  <SelectItem value="MARKETING">Marketing</SelectItem>
                  <SelectItem value="DEVELOPMENT">Desenvolvimento</SelectItem>
                  <SelectItem value="SUPPORT">Suporte</SelectItem>
                  <SelectItem value="OFFICE">Escritório</SelectItem>
                  <SelectItem value="LEGAL">Jurídico</SelectItem>
                  <SelectItem value="OTHER">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expense-date">Data</Label>
              <Input
                id="expense-date"
                type="date"
                value={expenseForm.date.toISOString().split("T")[0]}
                onChange={(e) =>
                  setExpenseForm((prev) => ({
                    ...prev,
                    date: new Date(e.target.value),
                  }))
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="expense-recurring"
                checked={expenseForm.isRecurring}
                onChange={(e) =>
                  setExpenseForm((prev) => ({
                    ...prev,
                    isRecurring: e.target.checked,
                  }))
                }
              />
              <Label htmlFor="expense-recurring">Despesa recorrente</Label>
            </div>
            {expenseForm.isRecurring && (
              <div>
                <Label htmlFor="expense-recurring-type">
                  Tipo de Recorrência
                </Label>
                <Select
                  value={expenseForm.recurringType}
                  onValueChange={(value: RecurringType) =>
                    setExpenseForm((prev) => ({
                      ...prev,
                      recurringType: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MONTHLY">Mensal</SelectItem>
                    <SelectItem value="QUARTERLY">Trimestral</SelectItem>
                    <SelectItem value="YEARLY">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowExpenseDialog(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateExpense} disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar Despesa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Nova Receita */}
      <Dialog open={showRevenueDialog} onOpenChange={setShowRevenueDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Receita</DialogTitle>
            <DialogDescription>
              Registre uma nova receita da plataforma
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="revenue-source">Fonte da Receita</Label>
              <Select
                value={revenueForm.source}
                onValueChange={(value: RevenueSource) =>
                  setRevenueForm((prev) => ({ ...prev, source: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a fonte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUBSCRIPTION">Assinatura</SelectItem>
                  <SelectItem value="COMMISSION">Comissão</SelectItem>
                  <SelectItem value="SETUP_FEE">Taxa de Setup</SelectItem>
                  <SelectItem value="PREMIUM_FEATURE">
                    Recursos Premium
                  </SelectItem>
                  <SelectItem value="OTHER">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="revenue-amount">Valor</Label>
              <Input
                id="revenue-amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={revenueForm.amount}
                onChange={(e) =>
                  setRevenueForm((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="revenue-description">Descrição</Label>
              <Textarea
                id="revenue-description"
                placeholder="Descrição opcional"
                value={revenueForm.description}
                onChange={(e) =>
                  setRevenueForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="revenue-date">Data</Label>
              <Input
                id="revenue-date"
                type="date"
                value={revenueForm.date.toISOString().split("T")[0]}
                onChange={(e) =>
                  setRevenueForm((prev) => ({
                    ...prev,
                    date: new Date(e.target.value),
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRevenueDialog(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateRevenue} disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar Receita"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Nova Atividade */}
      <Dialog open={showActivityDialog} onOpenChange={setShowActivityDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Atividade de Cliente</DialogTitle>
            <DialogDescription>
              Registre uma nova atividade de cliente
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="activity-type">Tipo de Atividade</Label>
              <Select
                value={activityForm.activity}
                onValueChange={(value: CustomerActivityType) =>
                  setActivityForm((prev) => ({ ...prev, activity: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW_SUBSCRIPTION">
                    Nova Assinatura
                  </SelectItem>
                  <SelectItem value="RENEWAL">Renovação</SelectItem>
                  <SelectItem value="CANCELLATION">Cancelamento</SelectItem>
                  <SelectItem value="UPGRADE">Upgrade</SelectItem>
                  <SelectItem value="DOWNGRADE">Downgrade</SelectItem>
                  <SelectItem value="PAYMENT_SUCCESS">
                    Pagamento Realizado
                  </SelectItem>
                  <SelectItem value="PAYMENT_FAILED">
                    Falha no Pagamento
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="activity-amount">Valor (opcional)</Label>
              <Input
                id="activity-amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={activityForm.amount}
                onChange={(e) =>
                  setActivityForm((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="activity-description">Descrição</Label>
              <Textarea
                id="activity-description"
                placeholder="Descrição da atividade"
                value={activityForm.description}
                onChange={(e) =>
                  setActivityForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="activity-date">Data</Label>
              <Input
                id="activity-date"
                type="date"
                value={activityForm.date.toISOString().split("T")[0]}
                onChange={(e) =>
                  setActivityForm((prev) => ({
                    ...prev,
                    date: new Date(e.target.value),
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowActivityDialog(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateActivity} disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar Atividade"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminFinancialPage
