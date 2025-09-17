import { db } from "@/app/_lib/prisma"
import { TransactionType } from "@prisma/client"
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./type"

export const getDashboard = async (barbershopId: string, month: string) => {
  const now = new Date()
  const year = now.getFullYear()

  const where = {
    barbershopId,
    date: {
      gte: new Date(`${year}-${month}-01`),
      lt: new Date(`${year}-${month}-31`),
    },
  }
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  )
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  )
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  )
  const balance = depositsTotal - investmentsTotal - expensesTotal
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  )
  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  }
  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }))
  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  })

  // Buscar dados de avaliações
  const ratings = await db.rating.findMany({
    where: { barbershopId },
    include: {
      user: { select: { name: true } },
      booking: {
        include: {
          service: { select: { name: true } },
        },
      },
    },
    orderBy: { id: "desc" },
  })

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, rating) => sum + rating.rate, 0) / ratings.length
      : 0

  const lastRatings = ratings.slice(0, 10) // Últimas 10 avaliações

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
    averageRating,
    totalRatings: ratings.length,
    lastRatings,
  }
}
