"use server"
import "server-only"
import { db } from "../_lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "")
  const password = String(formData.get("password") || "")
  if (!email || !password) return

  const gestor = await db.gestor.findUnique({ where: { email } })
  if (!gestor) return

  const ok = await bcrypt.compare(password, gestor.password)
  if (!ok) return

  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error("JWT_SECRET ausente nas variáveis de ambiente")

  const token = jwt.sign({ gestorId: gestor.id }, secret, { expiresIn: "1d" })

  // >>> AQUI: cookies() com await
  const jar = await cookies()
  jar.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  })

  redirect("/dashboard/0")
}
