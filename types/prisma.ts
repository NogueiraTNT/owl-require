// app/types/prisma.ts

// Tipo para Worker com Hors incluindo active (temporário até regenerar Prisma)
export type WorkerWithHors = {
  id: string
  name: string
  imageUrl: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  barbershopId: string
  hors: {
    horarios: string[]
    createdAt: Date
    updatedAt: Date
    workerId: string
  } | null
}
