"use server"

import { db } from "../_lib/prisma"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { AdminType } from "@prisma/client"

interface AdminSignInResult {
  success: boolean
  error?: string
  admin?: {
    id: string
    name: string
    email: string
    type: AdminType
  }
}

export async function adminSignIn(
  email: string,
  password: string,
): Promise<AdminSignInResult> {
  try {
    // Buscar admin pelo email
    const admin = await db.admin.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    })

    if (!admin) {
      return {
        success: false,
        error: "Credenciais inválidas",
      }
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Credenciais inválidas",
      }
    }

    // Criar sessão admin
    const sessionData = {
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      type: admin.type,
      loginAt: new Date().toISOString(),
    }

    // Salvar sessão em cookie (em produção, usar JWT ou session store)
    const cookieStore = await cookies()
    cookieStore.set("admin-session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 horas
    })

    return {
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        type: admin.type,
      },
    }
  } catch (error) {
    console.error("Erro no login admin:", error)
    return {
      success: false,
      error: "Erro interno do servidor",
    }
  }
}

export async function adminSignOut(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
}

export async function getAdminSession(): Promise<
  AdminSignInResult["admin"] | null
> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin-session")

    if (!sessionCookie?.value) {
      return null
    }

    const sessionData = JSON.parse(sessionCookie.value)

    // Verificar se a sessão ainda é válida (admin ainda existe)
    const admin = await db.admin.findUnique({
      where: {
        id: sessionData.adminId,
      },
    })

    if (!admin) {
      // Admin foi deletado, remover sessão
      cookieStore.delete("admin-session")
      return null
    }

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      type: admin.type,
    }
  } catch (error) {
    console.error("Erro ao verificar sessão admin:", error)
    return null
  }
}
