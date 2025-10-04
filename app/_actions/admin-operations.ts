"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

// ==================== OPERAÇÕES ADMINISTRATIVAS SEGURAS ====================

// Backup de dados (apenas exportar dados, não resetar)
export async function exportDatabaseData() {
  try {
    const data = {
      users: await db.user.findMany({
        include: {
          bookings: true,
          Rating: true,
        },
      }),
      gestors: await db.gestor.findMany({
        include: {
          barbershopid: true,
        },
      }),
      barbershops: await db.barbershop.findMany({
        include: {
          services: true,
          workers: true,
          ratings: true,
          transactions: true,
        },
      }),
      services: await db.barbershopService.findMany({
        include: {
          barbershop: true,
          bookings: true,
        },
      }),
      workers: await db.worker.findMany({
        include: {
          barbershop: true,
          bookings: true,
          hors: true,
        },
      }),
      bookings: await db.booking.findMany({
        include: {
          service: true,
          worker: true,
          user: true,
          rating: true,
        },
      }),
      transactions: await db.transaction.findMany({
        include: {
          barbershop: true,
        },
      }),
      ratings: await db.rating.findMany({
        include: {
          barbershop: true,
          user: true,
          booking: true,
        },
      }),
      admins: await db.admin.findMany(),
    }

    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
      totalRecords: Object.values(data).flat().length,
    }
  } catch (error) {
    console.error("Erro ao exportar dados:", error)
    throw new Error("Erro ao exportar dados do banco")
  }
}

// Otimização do banco (apenas análise, sem alterações)
export async function analyzeDatabasePerformance() {
  try {
    const stats = (await db.$queryRaw`
      SELECT 
        schemaname,
        tablename,
        attname,
        n_distinct,
        correlation
      FROM pg_stats 
      WHERE schemaname = 'public'
      ORDER BY tablename, attname
    `) as Array<{
      schemaname: string
      tablename: string
      attname: string
      n_distinct: number
      correlation: number
    }>

    const tableSizes = (await db.$queryRaw`
      SELECT 
        schemaname,
        tablename,
        pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
    `) as Array<{
      schemaname: string
      tablename: string
      size: string
    }>

    const indexUsage = (await db.$queryRaw`
      SELECT 
        schemaname,
        tablename,
        indexname,
        idx_scan,
        idx_tup_read,
        idx_tup_fetch
      FROM pg_stat_user_indexes 
      WHERE schemaname = 'public'
      ORDER BY idx_scan DESC
    `) as Array<{
      schemaname: string
      tablename: string
      indexname: string
      idx_scan: number
      idx_tup_read: number
      idx_tup_fetch: number
    }>

    return {
      success: true,
      analysis: {
        tableStats: stats,
        tableSizes,
        indexUsage,
        timestamp: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Erro na análise do banco:", error)
    throw new Error("Erro ao analisar performance do banco")
  }
}

// Limpeza de cache (apenas cache da aplicação, não dados)
export async function clearApplicationCache() {
  try {
    // Aqui você pode implementar limpeza de cache específica da aplicação
    // Por exemplo, limpar cache de sessões expiradas, etc.

    // Exemplo: Limpar sessões expiradas (se existir tabela de cache)
    // await db.session.deleteMany({
    //   where: {
    //     expires: {
    //       lt: new Date()
    //     }
    //   }
    // })

    revalidatePath("/admin/database")

    return {
      success: true,
      message: "Cache da aplicação limpo com sucesso",
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Erro ao limpar cache:", error)
    throw new Error("Erro ao limpar cache da aplicação")
  }
}

// Verificação de integridade dos dados
export async function checkDataIntegrity() {
  try {
    const issues = []

    // Verificar usuários órfãos
    const orphanUsers = await db.user.findMany({
      where: {
        bookings: {
          none: {},
        },
        Rating: {
          none: {},
        },
      },
    })
    if (orphanUsers.length > 0) {
      issues.push({
        type: "warning",
        message: `${orphanUsers.length} usuários sem agendamentos ou avaliações`,
        data: orphanUsers.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
        })),
      })
    }

    // Verificar barbearias sem serviços
    const barbershopsWithoutServices = await db.barbershop.findMany({
      where: {
        services: {
          none: {},
        },
      },
    })
    if (barbershopsWithoutServices.length > 0) {
      issues.push({
        type: "warning",
        message: `${barbershopsWithoutServices.length} barbearias sem serviços`,
        data: barbershopsWithoutServices.map((b) => ({
          id: b.id,
          name: b.name,
        })),
      })
    }

    // Verificar agendamentos sem barbeiro
    const allBookings = await db.booking.findMany({
      include: {
        worker: true,
      },
    })
    const bookingsWithoutWorker = allBookings.filter(
      (booking) => !booking.worker,
    )
    if (bookingsWithoutWorker.length > 0) {
      issues.push({
        type: "error",
        message: `${bookingsWithoutWorker.length} agendamentos sem barbeiro`,
        data: bookingsWithoutWorker.map((b) => ({ id: b.id, date: b.date })),
      })
    }

    // Verificar transações sem barbearia
    const allTransactions = await db.transaction.findMany({
      include: {
        barbershop: true,
      },
    })
    const transactionsWithoutBarbershop = allTransactions.filter(
      (transaction) => !transaction.barbershop,
    )
    if (transactionsWithoutBarbershop.length > 0) {
      issues.push({
        type: "error",
        message: `${transactionsWithoutBarbershop.length} transações sem barbearia`,
        data: transactionsWithoutBarbershop.map((t) => ({
          id: t.id,
          name: t.name,
        })),
      })
    }

    return {
      success: true,
      integrity: {
        issues,
        totalIssues: issues.length,
        criticalIssues: issues.filter((i) => i.type === "error").length,
        warnings: issues.filter((i) => i.type === "warning").length,
        timestamp: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Erro na verificação de integridade:", error)
    throw new Error("Erro ao verificar integridade dos dados")
  }
}

// Estatísticas detalhadas do sistema
export async function getSystemStatistics() {
  try {
    const stats = {
      users: {
        total: await db.user.count(),
        active: await db.user.count({
          where: {
            bookings: {
              some: {},
            },
          },
        }),
        withRatings: await db.user.count({
          where: {
            Rating: {
              some: {},
            },
          },
        }),
      },
      gestors: {
        total: await db.gestor.count(),
        byType: await db.gestor.groupBy({
          by: ["type"],
          _count: true,
        }),
        withActivePlans: await db.gestor.count({
          where: {
            subscriptionStatus: "ACTIVE",
          },
        }),
      },
      barbershops: {
        total: await db.barbershop.count(),
        verified: await db.barbershop.count({
          where: {
            verification: {
              not: null,
            },
          },
        }),
        withServices: await db.barbershop.count({
          where: {
            services: {
              some: {},
            },
          },
        }),
      },
      bookings: {
        total: await db.booking.count(),
        thisMonth: await db.booking.count({
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),
        completed: await db.booking.count({
          where: {
            rating: {
              isNot: null,
            },
          },
        }),
      },
      transactions: {
        total: await db.transaction.count(),
        totalValue: await db.transaction.aggregate({
          _sum: {
            amount: true,
          },
        }),
        byType: await db.transaction.groupBy({
          by: ["type"],
          _count: true,
          _sum: {
            amount: true,
          },
        }),
      },
      ratings: {
        total: await db.rating.count(),
        average: await db.rating.aggregate({
          _avg: {
            rate: true,
          },
        }),
        distribution: await db.rating.groupBy({
          by: ["rate"],
          _count: true,
        }),
      },
    }

    return {
      success: true,
      statistics: stats,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Erro ao obter estatísticas:", error)
    throw new Error("Erro ao obter estatísticas do sistema")
  }
}
