import { db } from "./prisma"

export interface SubscriptionInfo {
  isActive: boolean
  isExpired: boolean
  daysRemaining: number
  plan: "BASIC" | "PRO" | "PREMIUM" | null
  status: "ACTIVE" | "INACTIVE" | "EXPIRED" | "PENDING" | "CANCELLED" | null
  startDate: Date | null
  endDate: Date | null
}

export const getSubscriptionInfo = async (
  gestorId: string,
): Promise<SubscriptionInfo> => {
  const gestor = await db.gestor.findUnique({
    where: { id: gestorId },
    select: {
      plan: true,
      planStartDate: true,
      planEndDate: true,
      subscriptionStatus: true,
    },
  })

  if (!gestor) {
    return {
      isActive: false,
      isExpired: false,
      daysRemaining: 0,
      plan: null,
      status: null,
      startDate: null,
      endDate: null,
    }
  }

  const now = new Date()
  const endDate = gestor.planEndDate

  // Verificar se a assinatura expirou
  const isExpired = endDate ? now > endDate : false

  // Calcular dias restantes
  const daysRemaining = endDate
    ? Math.max(
        0,
        Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
      )
    : 0

  // Determinar se está ativa
  const isActive = gestor.subscriptionStatus === "ACTIVE" && !isExpired

  // Se expirou, atualizar status no banco
  if (isExpired && gestor.subscriptionStatus === "ACTIVE") {
    await db.gestor.update({
      where: { id: gestorId },
      data: { subscriptionStatus: "EXPIRED" },
    })
  }

  return {
    isActive,
    isExpired,
    daysRemaining,
    plan: gestor.plan,
    status: isExpired ? "EXPIRED" : gestor.subscriptionStatus,
    startDate: gestor.planStartDate,
    endDate: gestor.planEndDate,
  }
}

export const hasValidSubscription = async (
  gestorId: string,
): Promise<boolean> => {
  const info = await getSubscriptionInfo(gestorId)
  return info.isActive
}

export const canAccessFeature = async (
  gestorId: string,
  requiredPlan: "BASIC" | "PRO" | "PREMIUM",
): Promise<boolean> => {
  const info = await getSubscriptionInfo(gestorId)

  if (!info.isActive || !info.plan) {
    return false
  }

  const planLevels = { BASIC: 1, PRO: 2, PREMIUM: 3 }
  const userLevel = planLevels[info.plan]
  const requiredLevel = planLevels[requiredPlan]

  return userLevel >= requiredLevel
}
