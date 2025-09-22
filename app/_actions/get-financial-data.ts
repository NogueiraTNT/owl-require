"use server"

import { db } from "@/app/_lib/prisma"
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client"

export interface FinancialTransaction {
  id: string
  name: string
  type: TransactionType
  amount: number
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
  createdAt: Date
  updatedAt: Date
  barbershop: {
    id: string
    name: string
    gestor: {
      id: string
      name: string | null
      email: string
    }
  }
}

export const getFinancialTransactions = async (): Promise<
  FinancialTransaction[]
> => {
  try {
    const transactions = await db.transaction.findMany({
      include: {
        barbershop: {
          include: {
            gestor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    })

    return transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
    }))
  } catch (error) {
    console.error("Erro ao buscar transações financeiras:", error)
    throw new Error("Erro ao buscar transações financeiras")
  }
}

export const getFinancialStats = async () => {
  try {
    const [
      totalTransactions,
      totalRevenue,
      totalExpenses,
      totalInvestments,
      transactionsThisMonth,
      revenueThisMonth,
      expensesThisMonth,
      transactionsByCategory,
      transactionsByPaymentMethod,
    ] = await Promise.all([
      // Total de transações
      db.transaction.count(),

      // Receita total (DEPOSIT)
      db.transaction.aggregate({
        where: { type: "DEPOSIT" },
        _sum: { amount: true },
      }),

      // Despesas totais (EXPENSE)
      db.transaction.aggregate({
        where: { type: "EXPENSE" },
        _sum: { amount: true },
      }),

      // Investimentos totais (INVESTMENT)
      db.transaction.aggregate({
        where: { type: "INVESTMENT" },
        _sum: { amount: true },
      }),

      // Transações deste mês
      db.transaction.count({
        where: {
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),

      // Receita deste mês
      db.transaction.aggregate({
        where: {
          type: "DEPOSIT",
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
        _sum: { amount: true },
      }),

      // Despesas deste mês
      db.transaction.aggregate({
        where: {
          type: "EXPENSE",
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
        _sum: { amount: true },
      }),

      // Transações por categoria
      db.transaction.groupBy({
        by: ["category"],
        _count: { category: true },
        _sum: { amount: true },
      }),

      // Transações por método de pagamento
      db.transaction.groupBy({
        by: ["paymentMethod"],
        _count: { paymentMethod: true },
        _sum: { amount: true },
      }),
    ])

    return {
      totalTransactions,
      totalRevenue: Number(totalRevenue._sum.amount || 0),
      totalExpenses: Number(totalExpenses._sum.amount || 0),
      totalInvestments: Number(totalInvestments._sum.amount || 0),
      transactionsThisMonth,
      revenueThisMonth: Number(revenueThisMonth._sum.amount || 0),
      expensesThisMonth: Number(expensesThisMonth._sum.amount || 0),
      transactionsByCategory: transactionsByCategory.map((item) => ({
        category: item.category,
        count: item._count.category,
        total: Number(item._sum.amount || 0),
      })),
      transactionsByPaymentMethod: transactionsByPaymentMethod.map((item) => ({
        paymentMethod: item.paymentMethod,
        count: item._count.paymentMethod,
        total: Number(item._sum.amount || 0),
      })),
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas financeiras:", error)
    throw new Error("Erro ao buscar estatísticas financeiras")
  }
}

export const getTransactionById = async (
  id: string,
): Promise<FinancialTransaction | null> => {
  try {
    const transaction = await db.transaction.findUnique({
      where: { id },
      include: {
        barbershop: {
          include: {
            gestor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!transaction) return null

    return {
      ...transaction,
      amount: Number(transaction.amount),
    }
  } catch (error) {
    console.error("Erro ao buscar transação:", error)
    throw new Error("Erro ao buscar transação")
  }
}
