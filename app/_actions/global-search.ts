"use server"

import { db } from "@/app/_lib/prisma"

interface SearchParams {
  query: string
  model?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

interface SearchResult {
  id: string
  model: string
  modelDisplayName: string
  data: Record<string, unknown>
  score: number
}

export async function globalSearch(
  params: SearchParams,
): Promise<SearchResult[]> {
  const { query, model, sortBy = "relevance", sortOrder = "desc" } = params
  const results: SearchResult[] = []

  try {
    // Buscar em Users
    if (!model || model === "User") {
      const users = await db.user.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { phone: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10,
      })

      users.forEach((user) => {
        let score = 0
        if (user.name?.toLowerCase().includes(query.toLowerCase())) score += 0.8
        if (user.email?.toLowerCase().includes(query.toLowerCase()))
          score += 0.6
        if (user.phone?.toLowerCase().includes(query.toLowerCase()))
          score += 0.4

        results.push({
          id: user.id,
          model: "User",
          modelDisplayName: "Usuário",
          data: user,
          score,
        })
      })
    }

    // Buscar em Gestors
    if (!model || model === "Gestor") {
      const gestors = await db.gestor.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10,
      })

      gestors.forEach((gestor) => {
        let score = 0
        if (gestor.name?.toLowerCase().includes(query.toLowerCase()))
          score += 0.8
        if (gestor.email?.toLowerCase().includes(query.toLowerCase()))
          score += 0.6

        results.push({
          id: gestor.id,
          model: "Gestor",
          modelDisplayName: "Gestor",
          data: gestor,
          score,
        })
      })
    }

    // Buscar em Barbershops
    if (!model || model === "Barbershop") {
      const barbershops = await db.barbershop.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { corporateName: { contains: query, mode: "insensitive" } },
            { address: { contains: query, mode: "insensitive" } },
            { city: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10,
      })

      barbershops.forEach((barbershop) => {
        let score = 0
        if (barbershop.name?.toLowerCase().includes(query.toLowerCase()))
          score += 0.8
        if (
          barbershop.corporateName?.toLowerCase().includes(query.toLowerCase())
        )
          score += 0.6
        if (barbershop.address?.toLowerCase().includes(query.toLowerCase()))
          score += 0.5
        if (barbershop.city?.toLowerCase().includes(query.toLowerCase()))
          score += 0.4
        if (barbershop.description?.toLowerCase().includes(query.toLowerCase()))
          score += 0.3

        results.push({
          id: barbershop.id,
          model: "Barbershop",
          modelDisplayName: "Barbearia",
          data: barbershop,
          score,
        })
      })
    }

    // Buscar em BarbershopServices
    if (!model || model === "BarbershopService") {
      const services = await db.barbershopService.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          barbershop: true,
        },
        take: 10,
      })

      services.forEach((service) => {
        let score = 0
        if (service.name?.toLowerCase().includes(query.toLowerCase()))
          score += 0.8
        if (service.description?.toLowerCase().includes(query.toLowerCase()))
          score += 0.6

        results.push({
          id: service.id,
          model: "BarbershopService",
          modelDisplayName: "Serviço",
          data: service,
          score,
        })
      })
    }

    // Buscar em Workers
    if (!model || model === "Worker") {
      const workers = await db.worker.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { phone: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          barbershop: true,
        },
        take: 10,
      })

      workers.forEach((worker) => {
        let score = 0
        if (worker.name?.toLowerCase().includes(query.toLowerCase()))
          score += 0.8
        if (worker.email?.toLowerCase().includes(query.toLowerCase()))
          score += 0.6
        if (worker.phone?.toLowerCase().includes(query.toLowerCase()))
          score += 0.4

        results.push({
          id: worker.id,
          model: "Worker",
          modelDisplayName: "Barbeiro",
          data: worker,
          score,
        })
      })
    }

    // Buscar em Bookings
    if (!model || model === "Booking") {
      const bookings = await db.booking.findMany({
        where: {
          OR: [
            { clientName: { contains: query, mode: "insensitive" } },
            { clientPhone: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
          worker: true,
          user: true,
        },
        take: 10,
      })

      bookings.forEach((booking) => {
        let score = 0
        if (booking.clientName?.toLowerCase().includes(query.toLowerCase()))
          score += 0.8
        if (booking.clientPhone?.toLowerCase().includes(query.toLowerCase()))
          score += 0.6

        results.push({
          id: booking.id,
          model: "Booking",
          modelDisplayName: "Agendamento",
          data: booking,
          score,
        })
      })
    }

    // Buscar em Transactions
    if (!model || model === "Transaction") {
      const transactions = await db.transaction.findMany({
        where: {
          OR: [{ name: { contains: query, mode: "insensitive" } }],
        },
        include: {
          barbershop: true,
        },
        take: 10,
      })

      transactions.forEach((transaction) => {
        let score = 0
        if (transaction.name?.toLowerCase().includes(query.toLowerCase()))
          score += 0.8

        results.push({
          id: transaction.id,
          model: "Transaction",
          modelDisplayName: "Transação",
          data: transaction,
          score,
        })
      })
    }

    // Buscar em Ratings
    if (!model || model === "Rating") {
      const ratings = await db.rating.findMany({
        include: {
          barbershop: true,
          user: true,
          booking: true,
        },
        take: 10,
      })

      ratings.forEach((rating) => {
        let score = 0
        // Buscar por avaliação numérica
        if (query.includes(rating.rate.toString())) score += 0.8

        results.push({
          id: rating.id,
          model: "Rating",
          modelDisplayName: "Avaliação",
          data: rating,
          score,
        })
      })
    }

    // Buscar em Admins
    if (!model || model === "Admin") {
      const admins = await db.admin.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10,
      })

      admins.forEach((admin) => {
        let score = 0
        if (admin.name?.toLowerCase().includes(query.toLowerCase()))
          score += 0.8
        if (admin.email?.toLowerCase().includes(query.toLowerCase()))
          score += 0.6

        results.push({
          id: admin.id,
          model: "Admin",
          modelDisplayName: "Administrador",
          data: admin,
          score,
        })
      })
    }

    // Ordenar resultados
    results.sort((a, b) => {
      if (sortBy === "relevance") {
        return sortOrder === "desc" ? b.score - a.score : a.score - b.score
      }
      if (sortBy === "name") {
        const nameA = (a.data.name as string) || ""
        const nameB = (b.data.name as string) || ""
        return sortOrder === "desc"
          ? nameB.localeCompare(nameA)
          : nameA.localeCompare(nameB)
      }
      if (sortBy === "created") {
        const dateA = new Date((a.data.createdAt as string) || 0).getTime()
        const dateB = new Date((b.data.createdAt as string) || 0).getTime()
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB
      }
      if (sortBy === "updated") {
        const dateA = new Date((a.data.updatedAt as string) || 0).getTime()
        const dateB = new Date((b.data.updatedAt as string) || 0).getTime()
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB
      }
      return 0
    })

    return results.slice(0, 50) // Limitar a 50 resultados
  } catch (error) {
    console.error("Erro na busca global:", error)
    throw new Error("Erro ao realizar busca global")
  }
}
