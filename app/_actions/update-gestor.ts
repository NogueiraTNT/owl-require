"use server"

import { db } from "../_lib/prisma"
import bcrypt from "bcryptjs"
import { GestorType, PlanType, SubscriptionStatus } from "@prisma/client"

interface UpdateGestorData {
  id: string
  name: string
  email: string
  password?: string
  type: GestorType
  plan: PlanType | null
  subscriptionStatus: SubscriptionStatus
  planStartDate: Date | null
  planEndDate: Date | null
}

interface UpdateGestorResult {
  success: boolean
  error?: string
  gestor?: {
    id: string
    name: string
    email: string
  }
}

export async function updateGestor(
  data: UpdateGestorData,
): Promise<UpdateGestorResult> {
  try {
    // Verificar se o gestor existe
    const existingGestor = await db.gestor.findUnique({
      where: {
        id: data.id,
      },
    })

    if (!existingGestor) {
      return {
        success: false,
        error: "Gestor não encontrado",
      }
    }

    // Verificar se o email já existe em outro gestor
    if (data.email !== existingGestor.email) {
      const emailExists = await db.gestor.findFirst({
        where: {
          email: data.email.toLowerCase().trim(),
          id: {
            not: data.id,
          },
        },
      })

      if (emailExists) {
        return {
          success: false,
          error: "Já existe outro gestor com este email",
        }
      }
    }

    // Preparar dados para atualização
    const updateData: {
      name: string
      email: string
      type: GestorType
      plan: PlanType | null
      subscriptionStatus: SubscriptionStatus
      planStartDate?: Date | null
      planEndDate?: Date | null
      password?: string
    } = {
      name: data.name,
      email: data.email.toLowerCase().trim(),
      type: data.type as GestorType,
      plan: data.plan,
      subscriptionStatus: data.subscriptionStatus as SubscriptionStatus,
      planStartDate: data.planStartDate,
      planEndDate: data.planEndDate,
    }

    // Atualizar senha apenas se fornecida
    if (data.password && data.password.trim() !== "") {
      updateData.password = await bcrypt.hash(data.password, 12)
    }

    // Atualizar gestor
    const gestor = await db.gestor.update({
      where: {
        id: data.id,
      },
      data: updateData,
    })

    return {
      success: true,
      gestor: {
        id: gestor.id,
        name: gestor.name || "",
        email: gestor.email,
      },
    }
  } catch (error) {
    console.error("Erro ao atualizar gestor:", error)
    return {
      success: false,
      error: "Erro interno do servidor",
    }
  }
}
