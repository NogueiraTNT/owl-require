"use server"

import { db } from "@/app/_lib/prisma"
import { AdminType } from "@prisma/client"
import bcrypt from "bcryptjs"
import { validateAdminData } from "@/app/_lib/admin-utils"

// ==================== ADMIN CRUD ====================
export const getAllAdmins = async () => {
  try {
    return await db.admin.findMany({
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Erro ao buscar administradores:", error)
    throw new Error("Erro ao buscar administradores")
  }
}

export const getAdminById = async (id: string) => {
  try {
    return await db.admin.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao buscar administrador:", error)
    throw new Error("Erro ao buscar administrador")
  }
}

export const createAdmin = async (data: {
  name: string
  email: string
  password: string
  type: AdminType
}) => {
  try {
    // Verificar se já existe um admin com este email
    const existingAdmin = await db.admin.findUnique({
      where: { email: data.email },
    })

    if (existingAdmin) {
      throw new Error("Já existe um administrador com este email")
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(data.password, 12)

    return await db.admin.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        type: data.type,
      },
    })
  } catch (error) {
    console.error("Erro ao criar administrador:", error)
    throw new Error("Erro ao criar administrador")
  }
}

export const updateAdmin = async (
  id: string,
  data: {
    name?: string
    email?: string
    password?: string
    type?: AdminType
  },
) => {
  try {
    // Se estiver atualizando o email, verificar se já existe
    if (data.email) {
      const existingAdmin = await db.admin.findFirst({
        where: {
          email: data.email,
          id: { not: id },
        },
      })

      if (existingAdmin) {
        throw new Error("Já existe um administrador com este email")
      }
    }

    const updateData: any = {
      name: data.name,
      email: data.email,
      type: data.type,
    }

    // Se estiver atualizando a senha, fazer hash
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12)
    }

    return await db.admin.update({
      where: { id },
      data: updateData,
    })
  } catch (error) {
    console.error("Erro ao atualizar administrador:", error)
    throw new Error("Erro ao atualizar administrador")
  }
}

export const deleteAdmin = async (id: string) => {
  try {
    // Verificar se não é o último admin
    const adminCount = await db.admin.count()
    if (adminCount <= 1) {
      throw new Error(
        "Não é possível deletar o último administrador do sistema",
      )
    }

    return await db.admin.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar administrador:", error)
    throw new Error("Erro ao deletar administrador")
  }
}

// ==================== ADMIN STATS ====================
export const getAdminStats = async () => {
  try {
    const [totalAdmins, adminCount, suporteCount, recentAdmins] =
      await Promise.all([
        // Total de administradores
        db.admin.count(),

        // Administradores com permissão ADMIN
        db.admin.count({
          where: { type: "ADMIN" },
        }),

        // Administradores com permissão SUPORTE
        db.admin.count({
          where: { type: "SUPORTE" },
        }),

        // Administradores recentes (últimos 5)
        db.admin.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
        }),
      ])

    return {
      totalAdmins,
      adminCount,
      suporteCount,
      recentAdmins,
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas de administradores:", error)
    throw new Error("Erro ao buscar estatísticas de administradores")
  }
}

// ==================== PERMISSIONS ====================
export const canCreateAdmin = async (
  currentAdminId: string,
): Promise<boolean> => {
  try {
    const currentAdmin = await db.admin.findUnique({
      where: { id: currentAdminId },
    })

    return currentAdmin?.type === "ADMIN"
  } catch (error) {
    console.error("Erro ao verificar permissão:", error)
    return false
  }
}

export const canUpdateAdmin = async (
  currentAdminId: string,
  targetAdminId: string,
): Promise<boolean> => {
  try {
    const currentAdmin = await db.admin.findUnique({
      where: { id: currentAdminId },
    })

    const targetAdmin = await db.admin.findUnique({
      where: { id: targetAdminId },
    })

    if (!currentAdmin || !targetAdmin) return false

    // ADMIN pode atualizar qualquer um
    if (currentAdmin.type === "ADMIN") return true

    // SUPORTE só pode atualizar a si mesmo
    if (currentAdmin.type === "SUPORTE" && currentAdmin.id === targetAdmin.id)
      return true

    return false
  } catch (error) {
    console.error("Erro ao verificar permissão:", error)
    return false
  }
}

export const canDeleteAdmin = async (
  currentAdminId: string,
  targetAdminId: string,
): Promise<boolean> => {
  try {
    const currentAdmin = await db.admin.findUnique({
      where: { id: currentAdminId },
    })

    if (!currentAdmin) return false

    // Apenas ADMIN pode deletar
    if (currentAdmin.type !== "ADMIN") return false

    // Não pode deletar a si mesmo
    if (currentAdmin.id === targetAdminId) return false

    // Verificar se não é o último admin
    const adminCount = await db.admin.count()
    if (adminCount <= 1) return false

    return true
  } catch (error) {
    console.error("Erro ao verificar permissão:", error)
    return false
  }
}

// ==================== PASSWORD RESET ====================
export const resetAdminPassword = async (id: string, newPassword: string) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    return await db.admin.update({
      where: { id },
      data: { password: hashedPassword },
    })
  } catch (error) {
    console.error("Erro ao resetar senha:", error)
    throw new Error("Erro ao resetar senha")
  }
}

// ==================== ACTIVITY LOG ====================
export const getAdminActivity = async (adminId: string) => {
  try {
    // Aqui você pode implementar um sistema de logs de atividade
    // Por enquanto, retornamos dados mockados
    return [
      {
        id: "1",
        action: "LOGIN",
        description: "Login realizado com sucesso",
        timestamp: new Date(),
        ip: "192.168.1.1",
      },
      {
        id: "2",
        action: "CREATE_ADMIN",
        description: "Criou novo administrador",
        timestamp: new Date(Date.now() - 3600000),
        ip: "192.168.1.1",
      },
    ]
  } catch (error) {
    console.error("Erro ao buscar atividade:", error)
    throw new Error("Erro ao buscar atividade")
  }
}
