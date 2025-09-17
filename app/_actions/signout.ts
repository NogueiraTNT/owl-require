"use server"

import { cookies } from "next/headers"

export const signOut = async () => {
  // A ação de logout é simplesmente deletar o cookie de autenticação.
  // Para isso, definimos o mesmo cookie com um valor vazio e maxAge como 0.
  ;(await cookies()).set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/", // O path deve ser o mesmo usado no signIn
    maxAge: 0, // Define a validade do cookie como 0 para expirá-lo imediatamente
  })
}
