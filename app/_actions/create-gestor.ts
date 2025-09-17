"use server"

import { db } from "../_lib/prisma"
import bcrypt from "bcryptjs"
import { GestorType, PlanType } from "@prisma/client"

interface CreateGestorData {
  name: string
  email: string
  password: string
  type: GestorType
  plan: PlanType | null
}

interface CreateGestorResult {
  success: boolean
  error?: string
  gestor?: {
    id: string
    name: string
    email: string
  }
}

export async function createGestor(
  data: CreateGestorData,
): Promise<CreateGestorResult> {
  try {
    // Verificar se o email já existe
    const existingGestor = await db.gestor.findUnique({
      where: {
        email: data.email.toLowerCase().trim(),
      },
    })

    if (existingGestor) {
      return {
        success: false,
        error: "Já existe um gestor com este email",
      }
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(data.password, 12)

    // Definir datas do plano se um plano foi selecionado
    const planStartDate = data.plan ? new Date() : null
    const planEndDate = data.plan
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      : null // 30 dias
    const subscriptionStatus = data.plan ? "ACTIVE" : "INACTIVE"

    // Criar gestor
    const gestor = await db.gestor.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase().trim(),
        password: hashedPassword,
        type: data.type,
        plan: data.plan,
        planStartDate,
        planEndDate,
        subscriptionStatus,
      },
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
    console.error("Erro ao criar gestor:", error)
    return {
      success: false,
      error: "Erro interno do servidor",
    }
  }
}
