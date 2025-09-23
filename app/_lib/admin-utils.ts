import { AdminType } from "@prisma/client"

// ==================== VALIDATION ====================
export const validateAdminData = (data: {
  name: string
  email: string
  password: string
  type: AdminType
}) => {
  const errors: string[] = []

  // Validar nome
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Nome deve ter pelo menos 2 caracteres")
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Email deve ser válido")
  }

  // Validar senha
  if (!data.password || data.password.length < 6) {
    errors.push("Senha deve ter pelo menos 6 caracteres")
  }

  // Validar tipo
  if (!data.type || !["ADMIN", "SUPORTE"].includes(data.type)) {
    errors.push("Tipo deve ser ADMIN ou SUPORTE")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// ==================== ADMIN UTILITIES ====================
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

// ==================== PERMISSION HELPERS ====================
export const canAdminPerformAction = (
  currentAdminType: AdminType,
  action: "create" | "update" | "delete",
  targetAdminId?: string,
  currentAdminId?: string,
): boolean => {
  switch (action) {
    case "create":
      return currentAdminType === "ADMIN"

    case "update":
      if (currentAdminType === "ADMIN") return true
      if (currentAdminType === "SUPORTE" && currentAdminId === targetAdminId)
        return true
      return false

    case "delete":
      if (currentAdminType !== "ADMIN") return false
      if (currentAdminId === targetAdminId) return false // Não pode deletar a si mesmo
      return true

    default:
      return false
  }
}

// ==================== FORMATTING ====================
export const formatAdminName = (name: string | null): string => {
  if (!name) return "Sem nome"
  return name.trim()
}

export const formatAdminEmail = (email: string): string => {
  return email.toLowerCase().trim()
}

export const generateAdminInitials = (name: string | null): string => {
  if (!name) return "A"
  const words = name.trim().split(" ")
  if (words.length === 1) return words[0].charAt(0).toUpperCase()
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

// ==================== SECURITY HELPERS ====================
export const isStrongPassword = (password: string): boolean => {
  // Pelo menos 8 caracteres, 1 maiúscula, 1 minúscula, 1 número
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return strongPasswordRegex.test(password)
}

export const getPasswordStrength = (
  password: string,
): {
  score: number
  label: string
  color: string
} => {
  let score = 0
  let label = "Muito fraca"
  let color = "text-red-600"

  if (password.length >= 6) score++
  if (password.length >= 8) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z\d]/.test(password)) score++

  if (score >= 5) {
    label = "Muito forte"
    color = "text-green-600"
  } else if (score >= 4) {
    label = "Forte"
    color = "text-green-500"
  } else if (score >= 3) {
    label = "Média"
    color = "text-yellow-600"
  } else if (score >= 2) {
    label = "Fraca"
    color = "text-orange-600"
  }

  return { score, label, color }
}

// ==================== ADMIN STATS HELPERS ====================
export const calculateAdminStats = (
  admins: Array<{
    type: AdminType
    createdAt: Date
  }>,
) => {
  const totalAdmins = admins.length
  const adminCount = admins.filter((admin) => admin.type === "ADMIN").length
  const suporteCount = admins.filter((admin) => admin.type === "SUPORTE").length
  const recentAdmins = admins
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5)

  return {
    totalAdmins,
    adminCount,
    suporteCount,
    recentAdmins,
  }
}
