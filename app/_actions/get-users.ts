"use server"

import { db } from "@/app/_lib/prisma"

export interface UserWithBookings {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  phone: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    bookings: number
    Rating: number
  }
}

export const getUsers = async (): Promise<UserWithBookings[]> => {
  try {
    const users = await db.user.findMany({
      include: {
        _count: {
          select: {
            bookings: true,
            Rating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return users
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    throw new Error("Erro ao buscar usuários")
  }
}

export const getUserById = async (
  id: string,
): Promise<UserWithBookings | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            bookings: true,
            Rating: true,
          },
        },
      },
    })

    return user
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    throw new Error("Erro ao buscar usuário")
  }
}

export const getUsersStats = async () => {
  try {
    const [totalUsers, verifiedUsers, usersWithBookings, usersThisMonth] =
      await Promise.all([
        db.user.count(),
        db.user.count({
          where: {
            emailVerified: {
              not: null,
            },
          },
        }),
        db.user.count({
          where: {
            bookings: {
              some: {},
            },
          },
        }),
        db.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),
      ])

    return {
      totalUsers,
      verifiedUsers,
      usersWithBookings,
      usersThisMonth,
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas de usuários:", error)
    throw new Error("Erro ao buscar estatísticas de usuários")
  }
}
