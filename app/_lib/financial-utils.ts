import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client"

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

export const getTransactionTypeIcon = (type: TransactionType) => {
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

export const getCategoryIcon = (category: TransactionCategory) => {
  switch (category) {
    case "SALARY":
      return "💼"
    case "FOOD":
      return "🍽️"
    case "TRANSPORT":
      return "🚗"
    case "HOUSING":
      return "🏠"
    case "UTILITIES":
      return "⚡"
    case "BARBERSHOP":
      return "💈"
    case "OTHER":
      return "📦"
    default:
      return "❓"
  }
}

export const getPaymentMethodIcon = (method: TransactionPaymentMethod) => {
  switch (method) {
    case "CREDIT_CARD":
      return "💳"
    case "DEBIT_CARD":
      return "💳"
    case "BANK_TRANSFER":
      return "🏦"
    case "PIX":
      return "📱"
    case "CASH":
      return "💵"
    case "OTHER":
      return "❓"
    default:
      return "❓"
  }
}

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
