import { getDatabaseStats } from "@/app/_actions/database-crud"
import { getAdminSession } from "@/app/_actions/admin-signin"
import { redirect } from "next/navigation"
import AdminDatabaseClient from "./admin-database-client"
// Removed unused imports

const AdminDatabasePage = async () => {
  const adminSession = await getAdminSession()

  if (!adminSession || adminSession.type !== "ADMIN") {
    redirect("/")
  }

  const stats = await getDatabaseStats()

  const models = [
    {
      name: "User",
      displayName: "Usuários",
      tableName: "User",
      recordCount: stats.usersCount,
      fields: [
        { name: "id", type: "string", required: true },
        { name: "name", type: "string", required: true },
        { name: "email", type: "string", required: true },
        { name: "phone", type: "string", required: false },
      ],
    },
    {
      name: "Gestor",
      displayName: "Gestores",
      tableName: "Gestor",
      recordCount: stats.gestorsCount,
      fields: [
        { name: "id", type: "string", required: true },
        { name: "name", type: "string", required: true },
        { name: "email", type: "string", required: true },
        { name: "type", type: "string", required: true },
      ],
    },
    {
      name: "Barbershop",
      displayName: "Barbearias",
      tableName: "Barbershop",
      recordCount: stats.barbershopsCount,
      fields: [
        { name: "id", type: "string", required: true },
        { name: "name", type: "string", required: true },
        { name: "address", type: "string", required: true },
        { name: "phone", type: "string", required: false },
      ],
    },
    {
      name: "BarbershopService",
      displayName: "Serviços",
      tableName: "BarbershopService",
      recordCount: stats.servicesCount,
      fields: [
        { name: "id", type: "string", required: true },
        { name: "name", type: "string", required: true },
        { name: "description", type: "string", required: false },
        { name: "price", type: "number", required: true },
      ],
    },
    {
      name: "Worker",
      displayName: "Barbeiros",
      tableName: "Worker",
      recordCount: stats.workersCount,
      fields: [
        { name: "id", type: "string", required: true },
        { name: "name", type: "string", required: true },
        { name: "email", type: "string", required: false },
        { name: "phone", type: "string", required: false },
      ],
    },
    {
      name: "Booking",
      displayName: "Agendamentos",
      tableName: "Booking",
      recordCount: stats.bookingsCount,
      fields: [
        { name: "id", type: "string", required: true },
        { name: "date", type: "date", required: true },
        { name: "time", type: "string", required: true },
        { name: "status", type: "string", required: true },
      ],
    },
    {
      name: "Transaction",
      displayName: "Transações",
      tableName: "Transaction",
      recordCount: stats.transactionsCount,
      fields: [
        { name: "id", type: "string", required: true },
        { name: "amount", type: "number", required: true },
        { name: "type", type: "string", required: true },
        { name: "status", type: "string", required: true },
      ],
    },
    {
      name: "Rating",
      displayName: "Avaliações",
      tableName: "Rating",
      recordCount: stats.ratingsCount,
      fields: [
        { name: "id", type: "string", required: true },
        { name: "rate", type: "number", required: true },
        { name: "comment", type: "string", required: false },
        { name: "createdAt", type: "date", required: true },
      ],
    },
    {
      name: "Admin",
      displayName: "Administradores",
      tableName: "Admin",
      recordCount: stats.adminsCount,
      fields: [
        { name: "id", type: "string", required: true },
        { name: "name", type: "string", required: true },
        { name: "email", type: "string", required: true },
        { name: "type", type: "string", required: true },
      ],
    },
  ]

  const statsWithTableStats = {
    ...stats,
    tableStats: models.map((model) => ({
      tableName: model.tableName,
      recordCount: model.recordCount,
    })),
  }

  return (
    <AdminDatabaseClient
      adminSession={adminSession}
      stats={statsWithTableStats}
      models={models}
    />
  )
}

export default AdminDatabasePage
