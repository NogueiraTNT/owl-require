import { PlanType, SubscriptionStatus } from "@prisma/client"

export const getPlanDisplayName = (plan: PlanType | null): string => {
  switch (plan) {
    case "BASIC":
      return "Básico"
    case "PRO":
      return "Profissional"
    case "PREMIUM":
      return "Premium"
    default:
      return "Sem plano"
  }
}

export const getStatusDisplayName = (
  status: SubscriptionStatus | null,
): string => {
  switch (status) {
    case "ACTIVE":
      return "Ativa"
    case "INACTIVE":
      return "Inativa"
    case "EXPIRED":
      return "Expirada"
    case "PENDING":
      return "Pendente"
    case "CANCELLED":
      return "Cancelada"
    default:
      return "Sem status"
  }
}

export const getStatusColor = (status: SubscriptionStatus | null): string => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-800"
    case "INACTIVE":
      return "bg-gray-100 text-gray-800"
    case "EXPIRED":
      return "bg-red-100 text-red-800"
    case "PENDING":
      return "bg-yellow-100 text-yellow-800"
    case "CANCELLED":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
