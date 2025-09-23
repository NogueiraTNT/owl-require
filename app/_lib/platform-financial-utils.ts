import {
  ExpenseCategory,
  RevenueSource,
  CustomerActivityType,
  RecurringType,
} from "@/app/generated/prisma"

// ==================== EXPENSE CATEGORIES ====================
export const getExpenseCategoryIcon = (category: ExpenseCategory): string => {
  const icons = {
    SERVER: "🖥️",
    MARKETING: "📢",
    DEVELOPMENT: "💻",
    SUPPORT: "🎧",
    OFFICE: "🏢",
    LEGAL: "⚖️",
    OTHER: "📦",
  }
  return icons[category] || "📦"
}

export const getExpenseCategoryColor = (category: ExpenseCategory): string => {
  const colors = {
    SERVER: "bg-blue-100 text-blue-800",
    MARKETING: "bg-purple-100 text-purple-800",
    DEVELOPMENT: "bg-green-100 text-green-800",
    SUPPORT: "bg-orange-100 text-orange-800",
    OFFICE: "bg-gray-100 text-gray-800",
    LEGAL: "bg-red-100 text-red-800",
    OTHER: "bg-gray-100 text-gray-800",
  }
  return colors[category] || "bg-gray-100 text-gray-800"
}

// ==================== REVENUE SOURCES ====================
export const getRevenueSourceIcon = (source: RevenueSource): string => {
  const icons = {
    SUBSCRIPTION: "💳",
    COMMISSION: "💰",
    SETUP_FEE: "⚙️",
    PREMIUM_FEATURE: "⭐",
    OTHER: "📦",
  }
  return icons[source] || "📦"
}

export const getRevenueSourceColor = (source: RevenueSource): string => {
  const colors = {
    SUBSCRIPTION: "bg-green-100 text-green-800",
    COMMISSION: "bg-blue-100 text-blue-800",
    SETUP_FEE: "bg-purple-100 text-purple-800",
    PREMIUM_FEATURE: "bg-yellow-100 text-yellow-800",
    OTHER: "bg-gray-100 text-gray-800",
  }
  return colors[source] || "bg-gray-100 text-gray-800"
}

// ==================== CUSTOMER ACTIVITIES ====================
export const getActivityTypeIcon = (activity: CustomerActivityType): string => {
  const icons = {
    NEW_SUBSCRIPTION: "➕",
    RENEWAL: "🔄",
    CANCELLATION: "❌",
    UPGRADE: "⬆️",
    DOWNGRADE: "⬇️",
    PAYMENT_SUCCESS: "✅",
    PAYMENT_FAILED: "❌",
  }
  return icons[activity] || "📦"
}

export const getActivityTypeColor = (
  activity: CustomerActivityType,
): string => {
  const colors = {
    NEW_SUBSCRIPTION: "bg-green-100 text-green-800",
    RENEWAL: "bg-blue-100 text-blue-800",
    CANCELLATION: "bg-red-100 text-red-800",
    UPGRADE: "bg-purple-100 text-purple-800",
    DOWNGRADE: "bg-orange-100 text-orange-800",
    PAYMENT_SUCCESS: "bg-green-100 text-green-800",
    PAYMENT_FAILED: "bg-red-100 text-red-800",
  }
  return colors[activity] || "bg-gray-100 text-gray-800"
}

// ==================== RECURRING TYPES ====================
export const getRecurringTypeIcon = (type: RecurringType): string => {
  const icons = {
    MONTHLY: "📅",
    QUARTERLY: "📆",
    YEARLY: "🗓️",
  }
  return icons[type] || "📅"
}

export const getRecurringTypeColor = (type: RecurringType): string => {
  const colors = {
    MONTHLY: "bg-blue-100 text-blue-800",
    QUARTERLY: "bg-purple-100 text-purple-800",
    YEARLY: "bg-green-100 text-green-800",
  }
  return colors[type] || "bg-gray-100 text-gray-800"
}

// ==================== FORMATTING ====================
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`
}

// ==================== CALCULATIONS ====================
export const calculateGrowth = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

export const getGrowthColor = (growth: number): string => {
  if (growth > 0) return "text-green-600"
  if (growth < 0) return "text-red-600"
  return "text-gray-600"
}

export const getGrowthIcon = (growth: number): string => {
  if (growth > 0) return "📈"
  if (growth < 0) return "📉"
  return "➖"
}

// ==================== DISPLAY NAMES ====================
export const getExpenseCategoryDisplayName = (
  category: ExpenseCategory,
): string => {
  const names = {
    SERVER: "Servidor/Hosting",
    MARKETING: "Marketing",
    DEVELOPMENT: "Desenvolvimento",
    SUPPORT: "Suporte",
    OFFICE: "Escritório",
    LEGAL: "Jurídico",
    OTHER: "Outros",
  }
  return names[category] || category
}

export const getRevenueSourceDisplayName = (source: RevenueSource): string => {
  const names = {
    SUBSCRIPTION: "Assinatura",
    COMMISSION: "Comissão",
    SETUP_FEE: "Taxa de Setup",
    PREMIUM_FEATURE: "Recursos Premium",
    OTHER: "Outros",
  }
  return names[source] || source
}

export const getActivityTypeDisplayName = (
  activity: CustomerActivityType,
): string => {
  const names = {
    NEW_SUBSCRIPTION: "Nova Assinatura",
    RENEWAL: "Renovação",
    CANCELLATION: "Cancelamento",
    UPGRADE: "Upgrade",
    DOWNGRADE: "Downgrade",
    PAYMENT_SUCCESS: "Pagamento Realizado",
    PAYMENT_FAILED: "Falha no Pagamento",
  }
  return names[activity] || activity
}

export const getRecurringTypeDisplayName = (type: RecurringType): string => {
  const names = {
    MONTHLY: "Mensal",
    QUARTERLY: "Trimestral",
    YEARLY: "Anual",
  }
  return names[type] || type
}
