"use server"

import { db } from "../_lib/prisma"

export const getUsers = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      name: "asc",
    },
  })
  return users
}
