"use server"

import { db } from "@/app/_lib/prisma"
import { PlanType, SubscriptionStatus } from "@prisma/client"

export interface SubscriptionWithGestor {
  id: string
  name: string | null
  email: string
  image: string | null
  createdAt: Date
  updatedAt: Date
  type: string
  plan: PlanType | null
  planStartDate: Date | null
  planEndDate: Date | null
  subscriptionStatus: SubscriptionStatus | null
  mercadoPagoCustomerId: string | null
  lastPaymentId: string | null
  _count: {
    barbershopid: number
  }
}

export const getSubscriptions = async (): Promise<SubscriptionWithGestor[]> => {
  try {
    const gestors = await db.gestor.findMany({
      include: {
        _count: {
          select: {
            barbershopid: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return gestors
  } catch (error) {
    console.error("Erro ao buscar assinaturas:", error)
    throw new Error("Erro ao buscar assinaturas")
  }
}

export const getSubscriptionById = async (
  id: string,
): Promise<SubscriptionWithGestor | null> => {
  try {
    const gestor = await db.gestor.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            barbershopid: true,
          },
        },
      },
    })

    return gestor
  } catch (error) {
    console.error("Erro ao buscar assinatura:", error)
    throw new Error("Erro ao buscar assinatura")
  }
}

export const getSubscriptionsStats = async () => {
  try {
    const [
      totalGestors,
      activeSubscriptions,
      expiredSubscriptions,
      pendingSubscriptions,
      basicPlans,
      proPlans,
      premiumPlans,
    ] = await Promise.all([
      db.gestor.count(),
      db.gestor.count({
        where: {
          subscriptionStatus: "ACTIVE",
        },
      }),
      db.gestor.count({
        where: {
          subscriptionStatus: "EXPIRED",
        },
      }),
      db.gestor.count({
        where: {
          subscriptionStatus: "PENDING",
        },
      }),
      db.gestor.count({
        where: {
          plan: "BASIC",
        },
      }),
      db.gestor.count({
        where: {
          plan: "PRO",
        },
      }),
      db.gestor.count({
        where: {
          plan: "PREMIUM",
        },
      }),
    ])

    return {
      totalGestors,
      activeSubscriptions,
      expiredSubscriptions,
      pendingSubscriptions,
      basicPlans,
      proPlans,
      premiumPlans,
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas de assinaturas:", error)
    throw new Error("Erro ao buscar estatísticas de assinaturas")
  }
}
