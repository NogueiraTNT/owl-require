"use server"

import { db } from "@/app/_lib/prisma"
import {
  PlatformExpense,
  PlatformRevenue,
  CustomerActivity,
  PlatformFinancialStats,
  CreateExpenseData,
  CreateRevenueData,
  CreateActivityData,
} from "@/app/_types/platform-financial"

// ==================== EXPENSES ====================
export const getAllExpenses = async (): Promise<PlatformExpense[]> => {
  try {
    const expenses = await db.platformExpense.findMany({
      include: {
        admin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { date: "desc" },
    })

    return expenses.map((expense) => ({
      ...expense,
      amount: Number(expense.amount),
      description: expense.description || undefined,
      receipt: expense.receipt || undefined,
      recurringType: expense.recurringType || undefined,
    }))
  } catch (error) {
    console.error("Erro ao buscar despesas:", error)
    throw new Error("Erro ao buscar despesas")
  }
}

export const createExpense = async (
  data: CreateExpenseData,
  adminId: string,
): Promise<PlatformExpense> => {
  try {
    const expense = await db.platformExpense.create({
      data: {
        ...data,
        createdBy: adminId,
      },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return {
      ...expense,
      amount: Number(expense.amount),
      description: expense.description || undefined,
      receipt: expense.receipt || undefined,
      recurringType: expense.recurringType || undefined,
    }
  } catch (error) {
    console.error("Erro ao criar despesa:", error)
    throw new Error("Erro ao criar despesa")
  }
}

export const updateExpense = async (
  id: string,
  data: Partial<CreateExpenseData>,
): Promise<PlatformExpense> => {
  try {
    const expense = await db.platformExpense.update({
      where: { id },
      data,
      include: {
        admin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return {
      ...expense,
      amount: Number(expense.amount),
      description: expense.description || undefined,
      receipt: expense.receipt || undefined,
      recurringType: expense.recurringType || undefined,
    }
  } catch (error) {
    console.error("Erro ao atualizar despesa:", error)
    throw new Error("Erro ao atualizar despesa")
  }
}

export const deleteExpense = async (id: string): Promise<void> => {
  try {
    await db.platformExpense.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar despesa:", error)
    throw new Error("Erro ao deletar despesa")
  }
}

// ==================== REVENUES ====================
export const getAllRevenues = async (): Promise<PlatformRevenue[]> => {
  try {
    const revenues = await db.platformRevenue.findMany({
      include: {
        barbershop: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { date: "desc" },
    })

    return revenues.map((revenue) => ({
      ...revenue,
      amount: Number(revenue.amount),
      description: revenue.description || undefined,
      barbershopId: revenue.barbershopId || undefined,
      subscriptionId: revenue.subscriptionId || undefined,
      barbershop: revenue.barbershop || undefined,
    }))
  } catch (error) {
    console.error("Erro ao buscar receitas:", error)
    throw new Error("Erro ao buscar receitas")
  }
}

export const createRevenue = async (
  data: CreateRevenueData,
): Promise<PlatformRevenue> => {
  try {
    console.log("Dados recebidos para criar receita:", data)

    // Limpar campos vazios
    const cleanData = {
      ...data,
      barbershopId:
        data.barbershopId && data.barbershopId.trim() !== ""
          ? data.barbershopId
          : null,
      subscriptionId:
        data.subscriptionId && data.subscriptionId.trim() !== ""
          ? data.subscriptionId
          : null,
      description:
        data.description && data.description.trim() !== ""
          ? data.description
          : null,
    }

    const revenue = await db.platformRevenue.create({
      data: cleanData,
      include: {
        barbershop: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return {
      ...revenue,
      amount: Number(revenue.amount),
      description: revenue.description || undefined,
      barbershopId: revenue.barbershopId || undefined,
      subscriptionId: revenue.subscriptionId || undefined,
      barbershop: revenue.barbershop || undefined,
    }
  } catch (error) {
    console.error("Erro ao criar receita:", error)
    throw new Error("Erro ao criar receita")
  }
}

// ==================== CUSTOMER ACTIVITIES ====================
export const getAllCustomerActivities = async (): Promise<
  CustomerActivity[]
> => {
  try {
    const activities = await db.customerActivity.findMany({
      include: {
        barbershop: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { date: "desc" },
    })

    return activities.map((activity) => ({
      ...activity,
      amount: activity.amount ? Number(activity.amount) : undefined,
      description: activity.description || undefined,
    }))
  } catch (error) {
    console.error("Erro ao buscar atividades de clientes:", error)
    throw new Error("Erro ao buscar atividades de clientes")
  }
}

export const createCustomerActivity = async (
  data: CreateActivityData,
): Promise<CustomerActivity> => {
  try {
    const activity = await db.customerActivity.create({
      data,
      include: {
        barbershop: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return {
      ...activity,
      amount: activity.amount ? Number(activity.amount) : undefined,
      description: activity.description || undefined,
    }
  } catch (error) {
    console.error("Erro ao criar atividade de cliente:", error)
    throw new Error("Erro ao criar atividade de cliente")
  }
}

// ==================== STATISTICS ====================
export const getPlatformFinancialStats =
  async (): Promise<PlatformFinancialStats> => {
    try {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const startOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1,
      )
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

      // Receitas
      const [totalRevenue, revenueThisMonth, revenueLastMonth] =
        await Promise.all([
          db.platformRevenue.aggregate({
            _sum: { amount: true },
          }),
          db.platformRevenue.aggregate({
            where: { date: { gte: startOfMonth } },
            _sum: { amount: true },
          }),
          db.platformRevenue.aggregate({
            where: {
              date: {
                gte: startOfLastMonth,
                lte: endOfLastMonth,
              },
            },
            _sum: { amount: true },
          }),
        ])

      // Despesas
      const [totalExpenses, expensesThisMonth, expensesLastMonth] =
        await Promise.all([
          db.platformExpense.aggregate({
            _sum: { amount: true },
          }),
          db.platformExpense.aggregate({
            where: { date: { gte: startOfMonth } },
            _sum: { amount: true },
          }),
          db.platformExpense.aggregate({
            where: {
              date: {
                gte: startOfLastMonth,
                lte: endOfLastMonth,
              },
            },
            _sum: { amount: true },
          }),
        ])

      // Clientes
      const [
        totalCustomers,
        newCustomersThisMonth,
        cancelledCustomersThisMonth,
      ] = await Promise.all([
        db.barbershop.count(),
        db.customerActivity.count({
          where: {
            activity: "NEW_SUBSCRIPTION",
            date: { gte: startOfMonth },
          },
        }),
        db.customerActivity.count({
          where: {
            activity: "CANCELLATION",
            date: { gte: startOfMonth },
          },
        }),
      ])

      // Atividades recentes
      const [recentActivities, recentExpenses, recentRevenues] =
        await Promise.all([
          db.customerActivity.findMany({
            take: 10,
            include: {
              barbershop: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: { date: "desc" },
          }),
          db.platformExpense.findMany({
            take: 10,
            include: {
              admin: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: { date: "desc" },
          }),
          db.platformRevenue.findMany({
            take: 10,
            include: {
              barbershop: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: { date: "desc" },
          }),
        ])

      // Categorias de despesas
      const expensesByCategory = await db.platformExpense.groupBy({
        by: ["category"],
        _sum: { amount: true },
        _count: { id: true },
      })

      // Fontes de receita
      const revenuesBySource = await db.platformRevenue.groupBy({
        by: ["source"],
        _sum: { amount: true },
        _count: { id: true },
      })

      // Cálculos
      const totalRevenueValue = Number(totalRevenue._sum.amount || 0)
      const revenueThisMonthValue = Number(revenueThisMonth._sum.amount || 0)
      const revenueLastMonthValue = Number(revenueLastMonth._sum.amount || 0)
      const totalExpensesValue = Number(totalExpenses._sum.amount || 0)
      const expensesThisMonthValue = Number(expensesThisMonth._sum.amount || 0)
      const expensesLastMonthValue = Number(expensesLastMonth._sum.amount || 0)

      const netProfit = totalRevenueValue - totalExpensesValue
      const monthlyProfit = revenueThisMonthValue - expensesThisMonthValue

      const revenueGrowth =
        revenueLastMonthValue > 0
          ? ((revenueThisMonthValue - revenueLastMonthValue) /
              revenueLastMonthValue) *
            100
          : 0

      const expensesGrowth =
        expensesLastMonthValue > 0
          ? ((expensesThisMonthValue - expensesLastMonthValue) /
              expensesLastMonthValue) *
            100
          : 0

      const profitGrowth =
        revenueLastMonthValue > 0 && expensesLastMonthValue > 0
          ? ((revenueThisMonthValue -
              expensesThisMonthValue -
              (revenueLastMonthValue - expensesLastMonthValue)) /
              (revenueLastMonthValue - expensesLastMonthValue)) *
            100
          : 0

      const churnRate =
        totalCustomers > 0
          ? (cancelledCustomersThisMonth / totalCustomers) * 100
          : 0

      return {
        totalRevenue: totalRevenueValue,
        revenueThisMonth: revenueThisMonthValue,
        revenueLastMonth: revenueLastMonthValue,
        revenueGrowth,

        totalExpenses: totalExpensesValue,
        expensesThisMonth: expensesThisMonthValue,
        expensesLastMonth: expensesLastMonthValue,
        expensesGrowth,

        netProfit,
        monthlyProfit,
        profitGrowth,

        totalCustomers,
        newCustomersThisMonth,
        cancelledCustomersThisMonth,
        activeCustomers: totalCustomers - cancelledCustomersThisMonth,
        churnRate,

        expensesByCategory: expensesByCategory.map((item) => ({
          category: item.category,
          total: Number(item._sum.amount || 0),
          count: item._count.id,
        })),

        revenuesBySource: revenuesBySource.map((item) => ({
          source: item.source,
          total: Number(item._sum.amount || 0),
          count: item._count.id,
        })),

        recentActivities: recentActivities.map((activity) => ({
          ...activity,
          amount: activity.amount ? Number(activity.amount) : undefined,
          description: activity.description || undefined,
        })),

        recentExpenses: recentExpenses.map((expense) => ({
          ...expense,
          amount: Number(expense.amount),
          description: expense.description || undefined,
          receipt: expense.receipt || undefined,
          recurringType: expense.recurringType || undefined,
        })),

        recentRevenues: recentRevenues.map((revenue) => ({
          ...revenue,
          amount: Number(revenue.amount),
          description: revenue.description || undefined,
          barbershopId: revenue.barbershopId || undefined,
          subscriptionId: revenue.subscriptionId || undefined,
          barbershop: revenue.barbershop || undefined,
        })),
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas financeiras:", error)
      throw new Error("Erro ao buscar estatísticas financeiras")
    }
  }
