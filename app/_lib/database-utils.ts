import {
  AdminType,
  GestorType,
  PlanType,
  SubscriptionStatus,
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
  ThemeType,
} from "@prisma/client"

// ==================== ENUM DISPLAY NAMES ====================
export const getAdminTypeDisplayName = (type: AdminType): string => {
  switch (type) {
    case "ADMIN":
      return "Administrador"
    case "SUPORTE":
      return "Suporte"
    default:
      return "Desconhecido"
  }
}

export const getGestorTypeDisplayName = (type: GestorType): string => {
  switch (type) {
    case "ADMIN":
      return "Administrador"
    case "OWNER":
      return "Proprietário"
    case "WORKER":
      return "Funcionário"
    default:
      return "Desconhecido"
  }
}

export const getPlanTypeDisplayName = (plan: PlanType | null): string => {
  switch (plan) {
    case "BASIC":
      return "Básico"
    case "PRO":
      return "Pro"
    case "PREMIUM":
      return "Premium"
    default:
      return "Sem Plano"
  }
}

export const getSubscriptionStatusDisplayName = (
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
      return "Sem Status"
  }
}

export const getTransactionTypeDisplayName = (
  type: TransactionType,
): string => {
  switch (type) {
    case "DEPOSIT":
      return "Receita"
    case "EXPENSE":
      return "Despesa"
    case "INVESTMENT":
      return "Investimento"
    default:
      return "Desconhecido"
  }
}

export const getTransactionCategoryDisplayName = (
  category: TransactionCategory,
): string => {
  switch (category) {
    case "SALARY":
      return "Salário"
    case "FOOD":
      return "Alimentação"
    case "TRANSPORT":
      return "Transporte"
    case "HOUSING":
      return "Moradia"
    case "UTILITIES":
      return "Utilidades"
    case "BARBERSHOP":
      return "Barbearia"
    case "OTHER":
      return "Outros"
    default:
      return "Desconhecido"
  }
}

export const getPaymentMethodDisplayName = (
  method: TransactionPaymentMethod,
): string => {
  switch (method) {
    case "CREDIT_CARD":
      return "Cartão de Crédito"
    case "DEBIT_CARD":
      return "Cartão de Débito"
    case "BANK_TRANSFER":
      return "Transferência Bancária"
    case "PIX":
      return "PIX"
    case "CASH":
      return "Dinheiro"
    case "OTHER":
      return "Outros"
    default:
      return "Desconhecido"
  }
}

export const getThemeTypeDisplayName = (theme: ThemeType | null): string => {
  switch (theme) {
    case "red":
      return "Vermelho"
    case "redDark":
      return "Vermelho Escuro"
    case "rose":
      return "Rosa"
    case "roseDark":
      return "Rosa Escuro"
    case "orange":
      return "Laranja"
    case "orangeDark":
      return "Laranja Escuro"
    case "green":
      return "Verde"
    case "greenDark":
      return "Verde Escuro"
    case "blue":
      return "Azul"
    case "blueDark":
      return "Azul Escuro"
    case "yellow":
      return "Amarelo"
    case "yellowDark":
      return "Amarelo Escuro"
    case "violet":
      return "Violeta"
    case "violetDark":
      return "Violeta Escuro"
    default:
      return "Padrão"
  }
}

// ==================== COLORS ====================
export const getAdminTypeColor = (type: AdminType): string => {
  switch (type) {
    case "ADMIN":
      return "bg-red-100 text-red-800"
    case "SUPORTE":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getGestorTypeColor = (type: GestorType): string => {
  switch (type) {
    case "ADMIN":
      return "bg-red-100 text-red-800"
    case "OWNER":
      return "bg-green-100 text-green-800"
    case "WORKER":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getPlanTypeColor = (plan: PlanType | null): string => {
  switch (plan) {
    case "BASIC":
      return "bg-blue-100 text-blue-800"
    case "PRO":
      return "bg-purple-100 text-purple-800"
    case "PREMIUM":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getSubscriptionStatusColor = (
  status: SubscriptionStatus | null,
): string => {
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

export const getTransactionTypeColor = (type: TransactionType): string => {
  switch (type) {
    case "DEPOSIT":
      return "bg-green-100 text-green-800"
    case "EXPENSE":
      return "bg-red-100 text-red-800"
    case "INVESTMENT":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// ==================== ICONS ====================
export const getAdminTypeIcon = (type: AdminType): string => {
  switch (type) {
    case "ADMIN":
      return "👑"
    case "SUPORTE":
      return "🛠️"
    default:
      return "❓"
  }
}

export const getGestorTypeIcon = (type: GestorType): string => {
  switch (type) {
    case "ADMIN":
      return "👑"
    case "OWNER":
      return "🏢"
    case "WORKER":
      return "👷"
    default:
      return "❓"
  }
}

export const getPlanTypeIcon = (plan: PlanType | null): string => {
  switch (plan) {
    case "BASIC":
      return "⚡"
    case "PRO":
      return "⭐"
    case "PREMIUM":
      return "👑"
    default:
      return "❓"
  }
}

export const getTransactionTypeIcon = (type: TransactionType): string => {
  switch (type) {
    case "DEPOSIT":
      return "💰"
    case "EXPENSE":
      return "💸"
    case "INVESTMENT":
      return "📈"
    default:
      return "❓"
  }
}

// ==================== FORMATTING ====================
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount)
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

export const formatPhone = (phone: string | null): string => {
  if (!phone) return "Não informado"

  // Remove todos os caracteres não numéricos
  const cleaned = phone.replace(/\D/g, "")

  // Formata como (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
  }

  return phone
}

export const formatCPFCNPJ = (cpfCnpj: string | null): string => {
  if (!cpfCnpj) return "Não informado"

  // Remove todos os caracteres não numéricos
  const cleaned = cpfCnpj.replace(/\D/g, "")

  // Formata CPF (11 dígitos) ou CNPJ (14 dígitos)
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  } else if (cleaned.length === 14) {
    return cleaned.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    )
  }

  return cpfCnpj
}

export const formatCEP = (cep: string | null): string => {
  if (!cep) return "Não informado"

  // Remove todos os caracteres não numéricos
  const cleaned = cep.replace(/\D/g, "")

  // Formata como XXXXX-XXX
  if (cleaned.length === 8) {
    return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  return cep
}

// ==================== VALIDATION ====================
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/
  return phoneRegex.test(phone)
}

export const isValidCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, "")
  return cleaned.length === 11
}

export const isValidCNPJ = (cnpj: string): boolean => {
  const cleaned = cnpj.replace(/\D/g, "")
  return cleaned.length === 14
}

export const isValidCEP = (cep: string): boolean => {
  const cleaned = cep.replace(/\D/g, "")
  return cleaned.length === 8
}

// ==================== TRUNCATE TEXT ====================
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

// ==================== GET MODEL DISPLAY NAME ====================
export const getModelDisplayName = (model: string): string => {
  switch (model) {
    case "User":
      return "Usuários"
    case "Gestor":
      return "Gestores"
    case "Barbershop":
      return "Barbearias"
    case "BarbershopService":
      return "Serviços"
    case "Worker":
      return "Barbeiros"
    case "Booking":
      return "Agendamentos"
    case "Transaction":
      return "Transações"
    case "Rating":
      return "Avaliações"
    case "Admin":
      return "Administradores"
    default:
      return model
  }
}

export const getModelIcon = (model: string): string => {
  switch (model) {
    case "User":
      return "👤"
    case "Gestor":
      return "👨‍💼"
    case "Barbershop":
      return "🏪"
    case "BarbershopService":
      return "✂️"
    case "Worker":
      return "👨‍💼"
    case "Booking":
      return "📅"
    case "Transaction":
      return "💰"
    case "Rating":
      return "⭐"
    case "Admin":
      return "👑"
    default:
      return "📊"
  }
}
