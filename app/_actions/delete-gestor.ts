"use server"

import { db } from "../_lib/prisma"

interface DeleteGestorResult {
  success: boolean
  error?: string
}

export async function deleteGestor(
  gestorId: string,
): Promise<DeleteGestorResult> {
  try {
    // Verificar se o gestor existe
    const existingGestor = await db.gestor.findUnique({
      where: {
        id: gestorId,
      },
      include: {
        barbershopid: true,
      },
    })

    if (!existingGestor) {
      return {
        success: false,
        error: "Gestor não encontrado",
      }
    }

    // Verificar se há barbearias associadas
    if (existingGestor.barbershopid.length > 0) {
      // Por segurança, vamos desassociar as barbearias primeiro
      // Em um sistema real, isso poderia precisar de mais validações
      await db.barbershop.updateMany({
        where: {
          gestorid: gestorId,
        },
        data: {
          gestorid: "", // Você pode querer criar um gestor "órfão" padrão
        },
      })
    }

    // Excluir o gestor
    await db.gestor.delete({
      where: {
        id: gestorId,
      },
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error("Erro ao excluir gestor:", error)

    // Verificar se é erro de constraint de chave estrangeira
    if (
      error instanceof Error &&
      error.message.includes("Foreign key constraint")
    ) {
      return {
        success: false,
        error:
          "Não é possível excluir este gestor pois existem dados relacionados. Remova primeiro as barbearias associadas.",
      }
    }

    return {
      success: false,
      error: "Erro interno do servidor",
    }
  }
}
