import { getDatabaseStats } from "@/app/_actions/database-crud"
import { getAdminSession } from "@/app/_actions/admin-signin"
import { redirect } from "next/navigation"
import AdminDatabaseClient from "./admin-database-client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import {
  Database,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Settings,
} from "lucide-react"
import { Input } from "@/app/_components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs"

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
      icon: "👤",
      count: stats.usersCount,
      description: "Clientes cadastrados no sistema",
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Gestor",
      displayName: "Gestores",
      icon: "👨‍💼",
      count: stats.gestorsCount,
      description: "Gestores de barbearias",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Barbershop",
      displayName: "Barbearias",
      icon: "🏪",
      count: stats.barbershopsCount,
      description: "Barbearias cadastradas",
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "BarbershopService",
      displayName: "Serviços",
      icon: "✂️",
      count: stats.servicesCount,
      description: "Serviços oferecidos",
      color: "bg-orange-100 text-orange-800",
    },
    {
      name: "Worker",
      displayName: "Barbeiros",
      icon: "👨‍💼",
      count: stats.workersCount,
      description: "Barbeiros cadastrados",
      color: "bg-cyan-100 text-cyan-800",
    },
    {
      name: "Booking",
      displayName: "Agendamentos",
      icon: "📅",
      count: stats.bookingsCount,
      description: "Agendamentos realizados",
      color: "bg-pink-100 text-pink-800",
    },
    {
      name: "Transaction",
      displayName: "Transações",
      icon: "💰",
      count: stats.transactionsCount,
      description: "Transações financeiras",
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      name: "Rating",
      displayName: "Avaliações",
      icon: "⭐",
      count: stats.ratingsCount,
      description: "Avaliações de serviços",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Admin",
      displayName: "Administradores",
      icon: "👑",
      count: stats.adminsCount,
      description: "Administradores do sistema",
      color: "bg-red-100 text-red-800",
    },
  ]

  return (
    <AdminDatabaseClient
      adminSession={adminSession}
      stats={stats}
      models={models}
    />
  )
}

export default AdminDatabasePage
