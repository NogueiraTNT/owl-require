"use server"

import { db } from "./prisma"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export const getCurrentGestor = async () => {
  const token = (await cookies()).get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      gestorId: string
    }

    if (!decoded.gestorId) {
      return null
    }

    const gestor = await db.gestor.findUnique({
      where: {
        id: decoded.gestorId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        plan: true,
        planStartDate: true,
        planEndDate: true,
        subscriptionStatus: true,
        mercadoPagoCustomerId: true,
        lastPaymentId: true,
        barbershopid: true,
      },
    })

    if (!gestor) {
      return null
    }

    const { ...gestorWithoutPassword } = gestor
    return gestorWithoutPassword
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}
