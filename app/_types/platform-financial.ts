import {
  ExpenseCategory,
  RecurringType,
  RevenueSource,
  CustomerActivityType,
} from "@prisma/client"

export interface PlatformExpense {
  id: string
  name: string
  description?: string
  amount: number
  category: ExpenseCategory
  date: Date
  receipt?: string
  isRecurring: boolean
  recurringType?: RecurringType
  createdBy: string
  createdAt: Date
  updatedAt: Date
  admin: {
    id: string
    name: string
  }
}

export interface PlatformRevenue {
  id: string
  source: RevenueSource
  amount: number
  description?: string
  date: Date
  barbershopId?: string
  subscriptionId?: string
  createdAt: Date
  updatedAt: Date
  barbershop?: {
    id: string
    name: string
  }
}

export interface CustomerActivity {
  id: string
  barbershopId: string
  activity: CustomerActivityType
  amount?: number
  description?: string
  date: Date
  createdAt: Date
  barbershop: {
    id: string
    name: string
  }
}

export interface PlatformFinancialStats {
  // Receitas
  totalRevenue: number
  revenueThisMonth: number
  revenueLastMonth: number
  revenueGrowth: number

  // Despesas
  totalExpenses: number
  expensesThisMonth: number
  expensesLastMonth: number
  expensesGrowth: number

  // Lucro
  netProfit: number
  monthlyProfit: number
  profitGrowth: number

  // Clientes
  totalCustomers: number
  newCustomersThisMonth: number
  cancelledCustomersThisMonth: number
  activeCustomers: number
  churnRate: number

  // Categorias
  expensesByCategory: {
    category: ExpenseCategory
    total: number
    count: number
  }[]

  revenuesBySource: {
    source: RevenueSource
    total: number
    count: number
  }[]

  // Atividades recentes
  recentActivities: CustomerActivity[]
  recentExpenses: PlatformExpense[]
  recentRevenues: PlatformRevenue[]
}

export interface CreateExpenseData {
  name: string
  description?: string
  amount: number
  category: ExpenseCategory
  date: Date
  receipt?: string
  isRecurring: boolean
  recurringType?: RecurringType
}

export interface CreateRevenueData {
  source: RevenueSource
  amount: number
  description?: string
  date: Date
  barbershopId?: string
  subscriptionId?: string
}

export interface CreateActivityData {
  barbershopId: string
  activity: CustomerActivityType
  amount?: number
  description?: string
  date: Date
}

export interface MonthlyFinancialData {
  month: string
  revenue: number
  expenses: number
  profit: number
  newCustomers: number
  cancelledCustomers: number
}
