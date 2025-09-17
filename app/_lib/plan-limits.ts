export const PLAN_LIMITS = {
  BASIC: {
    barbershops: 1,
    employees: 1, // por loja
    services: 3, // por loja
    features: {
      aiReports: false,
    },
  },
  PRO: {
    barbershops: 1,
    employees: 5, // por loja
    services: 5, // por loja
    features: {
      aiReports: true,
    },
  },
  PREMIUM: {
    barbershops: -1, // ilimitado
    employees: -1, // ilimitado por loja
    services: -1, // ilimitado por loja
    features: {
      aiReports: true,
    },
  },
} as const

export type PlanType = keyof typeof PLAN_LIMITS

export const getPlanLimits = (planType: PlanType) => {
  return PLAN_LIMITS[planType]
}

export const canCreateBarbershop = (
  planType: PlanType,
  currentCount: number,
): boolean => {
  const limits = getPlanLimits(planType)
  return limits.barbershops === -1 || currentCount < limits.barbershops
}

export const canCreateEmployee = (
  planType: PlanType,
  currentCount: number,
): boolean => {
  const limits = getPlanLimits(planType)
  return limits.employees === -1 || currentCount < limits.employees
}

export const canCreateService = (
  planType: PlanType,
  currentCount: number,
): boolean => {
  const limits = getPlanLimits(planType)
  return limits.services === -1 || currentCount < limits.services
}

export const getRemainingSlots = (
  planType: PlanType,
  currentCount: number,
  type: "barbershops" | "employees" | "services",
): number => {
  const limits = getPlanLimits(planType)
  const limit = limits[type]

  if (limit === -1) return -1 // ilimitado
  return Math.max(0, limit - currentCount)
}

export const getPlanDisplayName = (planType: PlanType): string => {
  const names = {
    BASIC: "Plano Básico",
    PRO: "Plano Pro",
    PREMIUM: "Plano Premium",
  }
  return names[planType]
}
