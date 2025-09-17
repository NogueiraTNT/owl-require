import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client"

export const TRANSACTION_CATEGORY_LABELS = {
  FOOD: "Alimentação",
  HOUSING: "Moradia",
  OTHER: "Outros",
  SALARY: "Salário",
  TRANSPORT: "Transporte",
  UTILITIES: "Utilidades",
  BARBERSHOP: "Barbearia",
}

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Transferência Bancária",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  OTHER: "Outros",
  PIX: "Pix",
}

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TransactionPaymentMethod.CASH]: "money.svg",
  [TransactionPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TransactionPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TransactionPaymentMethod.OTHER]: "other.svg",
  [TransactionPaymentMethod.PIX]: "pix.svg",
}

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
]

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_TRANSFER],
  },
  {
    value: TransactionPaymentMethod.CASH,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CASH],
  },
  {
    value: TransactionPaymentMethod.CREDIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CREDIT_CARD],
  },
  {
    value: TransactionPaymentMethod.DEBIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.DEBIT_CARD],
  },
  {
    value: TransactionPaymentMethod.OTHER,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.OTHER],
  },
  {
    value: TransactionPaymentMethod.PIX,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.PIX],
  },
]

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: TransactionCategory.BARBERSHOP,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.BARBERSHOP],
  },
  {
    value: TransactionCategory.FOOD,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.FOOD],
  },
  {
    value: TransactionCategory.HOUSING,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HOUSING],
  },
  {
    value: TransactionCategory.UTILITIES,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.UTILITIES],
  },
  {
    value: TransactionCategory.OTHER,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.OTHER],
  },
  {
    value: TransactionCategory.SALARY,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SALARY],
  },
]
