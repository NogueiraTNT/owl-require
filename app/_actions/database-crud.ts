"use server"

import { db } from "@/app/_lib/prisma"
import {
  AdminType,
  GestorType,
  PlanType,
  SubscriptionStatus,
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
  ThemeType,
} from "@prisma/client"

// ==================== USER CRUD ====================
export const getAllUsers = async () => {
  try {
    return await db.user.findMany({
      include: {
        _count: {
          select: {
            bookings: true,
            Rating: true,
            accounts: true,
            sessions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    throw new Error("Erro ao buscar usuários")
  }
}

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            service: {
              include: {
                barbershop: true,
              },
            },
            worker: true,
          },
        },
        Rating: {
          include: {
            barbershop: true,
          },
        },
        accounts: true,
        sessions: true,
      },
    })
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    throw new Error("Erro ao buscar usuário")
  }
}

export const createUser = async (data: {
  name?: string
  email: string
  phone?: string
  image?: string
}) => {
  try {
    return await db.user.create({
      data,
    })
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    throw new Error("Erro ao criar usuário")
  }
}

export const updateUser = async (
  id: string,
  data: {
    name?: string
    email?: string
    phone?: string
    image?: string
    emailVerified?: Date
  },
) => {
  try {
    return await db.user.update({
      where: { id },
      data,
    })
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error)
    throw new Error("Erro ao atualizar usuário")
  }
}

export const deleteUser = async (id: string) => {
  try {
    return await db.user.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar usuário:", error)
    throw new Error("Erro ao deletar usuário")
  }
}

// ==================== GESTOR CRUD ====================
export const getAllGestors = async () => {
  try {
    return await db.gestor.findMany({
      include: {
        _count: {
          select: {
            barbershopid: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Erro ao buscar gestores:", error)
    throw new Error("Erro ao buscar gestores")
  }
}

export const getGestorById = async (id: string) => {
  try {
    return await db.gestor.findUnique({
      where: { id },
      include: {
        barbershopid: {
          include: {
            _count: {
              select: {
                services: true,
                workers: true,
                ratings: true,
                transactions: true,
              },
            },
          },
        },
      },
    })
  } catch (error) {
    console.error("Erro ao buscar gestor:", error)
    throw new Error("Erro ao buscar gestor")
  }
}

export const createGestor = async (data: {
  name?: string
  email: string
  password: string
  image?: string
  type: GestorType
  plan?: PlanType
  planStartDate?: Date
  planEndDate?: Date
  subscriptionStatus?: SubscriptionStatus
  mercadoPagoCustomerId?: string
  lastPaymentId?: string
}) => {
  try {
    return await db.gestor.create({
      data,
    })
  } catch (error) {
    console.error("Erro ao criar gestor:", error)
    throw new Error("Erro ao criar gestor")
  }
}

export const updateGestor = async (
  id: string,
  data: {
    name?: string
    email?: string
    password?: string
    image?: string
    type?: GestorType
    plan?: PlanType
    planStartDate?: Date
    planEndDate?: Date
    subscriptionStatus?: SubscriptionStatus
    mercadoPagoCustomerId?: string
    lastPaymentId?: string
  },
) => {
  try {
    return await db.gestor.update({
      where: { id },
      data,
    })
  } catch (error) {
    console.error("Erro ao atualizar gestor:", error)
    throw new Error("Erro ao atualizar gestor")
  }
}

export const deleteGestor = async (id: string) => {
  try {
    return await db.gestor.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar gestor:", error)
    throw new Error("Erro ao deletar gestor")
  }
}

// ==================== BARBERSHOP CRUD ====================
export const getAllBarbershops = async () => {
  try {
    return await db.barbershop.findMany({
      include: {
        gestor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            services: true,
            workers: true,
            ratings: true,
            transactions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Erro ao buscar barbearias:", error)
    throw new Error("Erro ao buscar barbearias")
  }
}

export const getBarbershopById = async (id: string) => {
  try {
    return await db.barbershop.findUnique({
      where: { id },
      include: {
        gestor: true,
        services: {
          include: {
            _count: {
              select: {
                bookings: true,
              },
            },
          },
        },
        workers: {
          include: {
            _count: {
              select: {
                bookings: true,
              },
            },
          },
        },
        transactions: true,
      },
    })
  } catch (error) {
    console.error("Erro ao buscar barbearia:", error)
    throw new Error("Erro ao buscar barbearia")
  }
}

export const createBarbershop = async (data: {
  code?: string
  name: string
  corporateName?: string
  cnae?: string
  cpfCnpj?: string
  stateRegistration?: string
  phones: string[]
  zipCode?: string
  address: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
  description: string
  imageUrl: string
  gestorid: string
  latitude?: number
  longitude?: number
  theme?: ThemeType
}) => {
  try {
    return await db.barbershop.create({
      data,
    })
  } catch (error) {
    console.error("Erro ao criar barbearia:", error)
    throw new Error("Erro ao criar barbearia")
  }
}

export const updateBarbershop = async (
  id: string,
  data: {
    code?: string
    name?: string
    corporateName?: string
    cnae?: string
    cpfCnpj?: string
    stateRegistration?: string
    phones?: string[]
    zipCode?: string
    address?: string
    number?: string
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    description?: string
    imageUrl?: string
    gestorid?: string
    latitude?: number
    longitude?: number
    theme?: ThemeType
  },
) => {
  try {
    return await db.barbershop.update({
      where: { id },
      data,
    })
  } catch (error) {
    console.error("Erro ao atualizar barbearia:", error)
    throw new Error("Erro ao atualizar barbearia")
  }
}

export const deleteBarbershop = async (id: string) => {
  try {
    return await db.barbershop.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar barbearia:", error)
    throw new Error("Erro ao deletar barbearia")
  }
}

// ==================== SERVICE CRUD ====================
export const getAllServices = async () => {
  try {
    return await db.barbershopService.findMany({
      include: {
        barbershop: {
          include: {
            gestor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            bookings: true,
          },
        },
      },
      orderBy: { name: "asc" },
    })
  } catch (error) {
    console.error("Erro ao buscar serviços:", error)
    throw new Error("Erro ao buscar serviços")
  }
}

export const getServiceById = async (id: string) => {
  try {
    return await db.barbershopService.findUnique({
      where: { id },
      include: {
        barbershop: {
          include: {
            gestor: true,
          },
        },
        bookings: {
          include: {
            user: true,
            worker: true,
          },
        },
      },
    })
  } catch (error) {
    console.error("Erro ao buscar serviço:", error)
    throw new Error("Erro ao buscar serviço")
  }
}

export const createService = async (data: {
  name: string
  description: string
  imageUrl: string
  price: number
  barbershopId: string
  active?: boolean
}) => {
  try {
    return await db.barbershopService.create({
      data: {
        ...data,
        price: data.price,
      },
    })
  } catch (error) {
    console.error("Erro ao criar serviço:", error)
    throw new Error("Erro ao criar serviço")
  }
}

export const updateService = async (
  id: string,
  data: {
    name?: string
    description?: string
    imageUrl?: string
    price?: number
    barbershopId?: string
    active?: boolean
  },
) => {
  try {
    return await db.barbershopService.update({
      where: { id },
      data: data.price ? { ...data, price: data.price } : data,
    })
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error)
    throw new Error("Erro ao atualizar serviço")
  }
}

export const deleteService = async (id: string) => {
  try {
    return await db.barbershopService.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar serviço:", error)
    throw new Error("Erro ao deletar serviço")
  }
}

// ==================== WORKER CRUD ====================
export const getAllWorkers = async () => {
  try {
    return await db.worker.findMany({
      include: {
        barbershop: {
          include: {
            gestor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        hors: true,
        _count: {
          select: {
            bookings: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Erro ao buscar barbeiros:", error)
    throw new Error("Erro ao buscar barbeiros")
  }
}

export const getWorkerById = async (id: string) => {
  try {
    return await db.worker.findUnique({
      where: { id },
      include: {
        barbershop: {
          include: {
            gestor: true,
          },
        },
        hors: true,
        bookings: {
          include: {
            user: true,
            service: true,
          },
        },
      },
    })
  } catch (error) {
    console.error("Erro ao buscar barbeiro:", error)
    throw new Error("Erro ao buscar barbeiro")
  }
}

export const createWorker = async (data: {
  name: string
  email?: string
  phone?: string
  imageUrl: string
  barbershopId: string
  active?: boolean
  horarios?: string[]
}) => {
  try {
    return await db.worker.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        imageUrl: data.imageUrl,
        barbershopId: data.barbershopId,
        active: data.active ?? true,
        hors: data.horarios
          ? {
              create: {
                horarios: data.horarios,
              },
            }
          : undefined,
      },
    })
  } catch (error) {
    console.error("Erro ao criar barbeiro:", error)
    throw new Error("Erro ao criar barbeiro")
  }
}

export const updateWorker = async (
  id: string,
  data: {
    name?: string
    email?: string
    phone?: string
    imageUrl?: string
    barbershopId?: string
    active?: boolean
    horarios?: string[]
  },
) => {
  try {
    return await db.worker.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        imageUrl: data.imageUrl,
        barbershopId: data.barbershopId,
        active: data.active,
        ...(data.horarios && {
          hors: {
            upsert: {
              create: {
                horarios: data.horarios,
              },
              update: {
                horarios: data.horarios,
              },
            },
          },
        }),
      },
    })
  } catch (error) {
    console.error("Erro ao atualizar barbeiro:", error)
    throw new Error("Erro ao atualizar barbeiro")
  }
}

export const deleteWorker = async (id: string) => {
  try {
    return await db.worker.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar barbeiro:", error)
    throw new Error("Erro ao deletar barbeiro")
  }
}

// ==================== BOOKING CRUD ====================
export const getAllBookings = async () => {
  try {
    return await db.booking.findMany({
      include: {
        user: true,
        service: {
          include: {
            barbershop: {
              include: {
                gestor: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        worker: {
          include: {
            barbershop: true,
          },
        },
        rating: true,
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error)
    throw new Error("Erro ao buscar agendamentos")
  }
}

export const getBookingById = async (id: string) => {
  try {
    return await db.booking.findUnique({
      where: { id },
      include: {
        user: true,
        service: {
          include: {
            barbershop: {
              include: {
                gestor: true,
              },
            },
          },
        },
        worker: {
          include: {
            barbershop: true,
            hors: true,
          },
        },
        rating: true,
      },
    })
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error)
    throw new Error("Erro ao buscar agendamento")
  }
}

export const createBooking = async (data: {
  userId?: string
  serviceId: string
  workerId: string
  date: Date
  clientName?: string
  clientPhone?: string
}) => {
  try {
    return await db.booking.create({
      data,
    })
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    throw new Error("Erro ao criar agendamento")
  }
}

export const updateBooking = async (
  id: string,
  data: {
    userId?: string
    serviceId?: string
    workerId?: string
    date?: Date
    clientName?: string
    clientPhone?: string
  },
) => {
  try {
    return await db.booking.update({
      where: { id },
      data,
    })
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error)
    throw new Error("Erro ao atualizar agendamento")
  }
}

export const deleteBooking = async (id: string) => {
  try {
    return await db.booking.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar agendamento:", error)
    throw new Error("Erro ao deletar agendamento")
  }
}

// ==================== TRANSACTION CRUD ====================
export const getAllTransactions = async () => {
  try {
    return await db.transaction.findMany({
      include: {
        barbershop: {
          include: {
            gestor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Erro ao buscar transações:", error)
    throw new Error("Erro ao buscar transações")
  }
}

export const getTransactionById = async (id: string) => {
  try {
    return await db.transaction.findUnique({
      where: { id },
      include: {
        barbershop: {
          include: {
            gestor: true,
          },
        },
      },
    })
  } catch (error) {
    console.error("Erro ao buscar transação:", error)
    throw new Error("Erro ao buscar transação")
  }
}

export const createTransaction = async (data: {
  name: string
  type: TransactionType
  amount: number
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
  barbershopId: string
}) => {
  try {
    return await db.transaction.create({
      data: {
        ...data,
        amount: data.amount,
      },
    })
  } catch (error) {
    console.error("Erro ao criar transação:", error)
    throw new Error("Erro ao criar transação")
  }
}

export const updateTransaction = async (
  id: string,
  data: {
    name?: string
    type?: TransactionType
    amount?: number
    category?: TransactionCategory
    paymentMethod?: TransactionPaymentMethod
    date?: Date
    barbershopId?: string
  },
) => {
  try {
    return await db.transaction.update({
      where: { id },
      data: data.amount ? { ...data, amount: data.amount } : data,
    })
  } catch (error) {
    console.error("Erro ao atualizar transação:", error)
    throw new Error("Erro ao atualizar transação")
  }
}

export const deleteTransaction = async (id: string) => {
  try {
    return await db.transaction.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar transação:", error)
    throw new Error("Erro ao deletar transação")
  }
}

// ==================== RATING CRUD ====================
export const getAllRatings = async () => {
  try {
    return await db.rating.findMany({
      include: {
        user: true,
        barbershop: {
          include: {
            gestor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        booking: {
          include: {
            service: true,
            worker: true,
          },
        },
      },
      orderBy: { rate: "desc" },
    })
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error)
    throw new Error("Erro ao buscar avaliações")
  }
}

export const getRatingById = async (id: string) => {
  try {
    return await db.rating.findUnique({
      where: { id },
      include: {
        user: true,
        barbershop: {
          include: {
            gestor: true,
          },
        },
        booking: {
          include: {
            service: true,
            worker: true,
          },
        },
      },
    })
  } catch (error) {
    console.error("Erro ao buscar avaliação:", error)
    throw new Error("Erro ao buscar avaliação")
  }
}

export const createRating = async (data: {
  barbershopId: string
  userId?: string
  bookingId: string
  rate: number
}) => {
  try {
    return await db.rating.create({
      data,
    })
  } catch (error) {
    console.error("Erro ao criar avaliação:", error)
    throw new Error("Erro ao criar avaliação")
  }
}

export const updateRating = async (
  id: string,
  data: {
    barbershopId?: string
    userId?: string
    bookingId?: string
    rate?: number
  },
) => {
  try {
    return await db.rating.update({
      where: { id },
      data,
    })
  } catch (error) {
    console.error("Erro ao atualizar avaliação:", error)
    throw new Error("Erro ao atualizar avaliação")
  }
}

export const deleteRating = async (id: string) => {
  try {
    return await db.rating.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar avaliação:", error)
    throw new Error("Erro ao deletar avaliação")
  }
}

// ==================== ADMIN CRUD ====================
export const getAllAdmins = async () => {
  try {
    return await db.admin.findMany({
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Erro ao buscar administradores:", error)
    throw new Error("Erro ao buscar administradores")
  }
}

export const getAdminById = async (id: string) => {
  try {
    return await db.admin.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao buscar administrador:", error)
    throw new Error("Erro ao buscar administrador")
  }
}

export const createAdmin = async (data: {
  name: string
  email: string
  password: string
  type: AdminType
}) => {
  try {
    return await db.admin.create({
      data,
    })
  } catch (error) {
    console.error("Erro ao criar administrador:", error)
    throw new Error("Erro ao criar administrador")
  }
}

export const updateAdmin = async (
  id: string,
  data: {
    name?: string
    email?: string
    password?: string
    type?: AdminType
  },
) => {
  try {
    return await db.admin.update({
      where: { id },
      data,
    })
  } catch (error) {
    console.error("Erro ao atualizar administrador:", error)
    throw new Error("Erro ao atualizar administrador")
  }
}

export const deleteAdmin = async (id: string) => {
  try {
    return await db.admin.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Erro ao deletar administrador:", error)
    throw new Error("Erro ao deletar administrador")
  }
}

// ==================== DATABASE STATS ====================
export const getDatabaseStats = async () => {
  try {
    const [
      usersCount,
      gestorsCount,
      barbershopsCount,
      servicesCount,
      workersCount,
      bookingsCount,
      transactionsCount,
      ratingsCount,
      adminsCount,
    ] = await Promise.all([
      db.user.count(),
      db.gestor.count(),
      db.barbershop.count(),
      db.barbershopService.count(),
      db.worker.count(),
      db.booking.count(),
      db.transaction.count(),
      db.rating.count(),
      db.admin.count(),
    ])

    return {
      usersCount,
      gestorsCount,
      barbershopsCount,
      servicesCount,
      workersCount,
      bookingsCount,
      transactionsCount,
      ratingsCount,
      adminsCount,
      totalRecords:
        usersCount +
        gestorsCount +
        barbershopsCount +
        servicesCount +
        workersCount +
        bookingsCount +
        transactionsCount +
        ratingsCount +
        adminsCount,
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas do banco:", error)
    throw new Error("Erro ao buscar estatísticas do banco")
  }
}
