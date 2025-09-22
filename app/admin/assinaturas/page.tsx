import {
  getSubscriptions,
  getSubscriptionsStats,
} from "@/app/_actions/get-subscriptions"
import {
  getPlanDisplayName,
  getStatusDisplayName,
  getStatusColor,
} from "@/app/_lib/subscription-utils"
import { getAdminSession } from "@/app/_actions/admin-signin"
import { redirect } from "next/navigation"
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
  CreditCard,
  Mail,
  Calendar,
  Eye,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Building2,
  Crown,
  Star,
  Zap,
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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar"

const AdminSubscriptionsPage = async () => {
  const adminSession = await getAdminSession()

  if (!adminSession) {
    redirect("/")
  }

  const [subscriptions, stats] = await Promise.all([
    getSubscriptions(),
    getSubscriptionsStats(),
  ])

  const getPlanIcon = (plan: string | null) => {
    switch (plan) {
      case "BASIC":
        return <Zap className="h-4 w-4" />
      case "PRO":
        return <Star className="h-4 w-4" />
      case "PREMIUM":
        return <Crown className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getPlanColor = (plan: string | null) => {
    switch (plan) {
      case "BASIC":
        return "bg-blue-100 text-blue-800"
      case "PRO":
        return "bg-purple-100 text-purple-800"
      case "PREMIUM":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assinaturas</h1>
          <p className="text-muted-foreground">
            Gerencie todas as assinaturas e planos dos gestores
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Logado como:{" "}
            <span className="font-medium">{adminSession.name}</span>
          </p>
          <p
            className={`text-xs ${
              adminSession.type === "ADMIN" ? "text-primary" : "text-amber-600"
            }`}
          >
            {adminSession.type === "ADMIN" ? "Administrador" : "Suporte"}
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Gestores
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGestors}</div>
            <p className="text-xs text-muted-foreground">
              Gestores cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assinaturas Ativas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.activeSubscriptions}
            </div>
            <p className="text-xs text-muted-foreground">Em funcionamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assinaturas Expiradas
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.expiredSubscriptions}
            </div>
            <p className="text-xs text-muted-foreground">Precisam renovar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pagamentos Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pendingSubscriptions}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando pagamento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição de Planos */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Zap className="h-4 w-4 text-blue-600" />
              Plano Básico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.basicPlans}
            </div>
            <p className="text-xs text-muted-foreground">
              Gestores no plano básico
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Star className="h-4 w-4 text-purple-600" />
              Plano Pro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.proPlans}
            </div>
            <p className="text-xs text-muted-foreground">
              Gestores no plano pro
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Crown className="h-4 w-4 text-yellow-600" />
              Plano Premium
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.premiumPlans}
            </div>
            <p className="text-xs text-muted-foreground">
              Gestores no plano premium
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros e Busca
          </CardTitle>
          <CardDescription>
            Encontre assinaturas específicas usando os filtros abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome ou email..."
                className="w-full"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ACTIVE">Ativa</SelectItem>
                <SelectItem value="INACTIVE">Inativa</SelectItem>
                <SelectItem value="EXPIRED">Expirada</SelectItem>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="CANCELLED">Cancelada</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os planos</SelectItem>
                <SelectItem value="BASIC">Básico</SelectItem>
                <SelectItem value="PRO">Pro</SelectItem>
                <SelectItem value="PREMIUM">Premium</SelectItem>
                <SelectItem value="none">Sem plano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Assinaturas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Lista de Assinaturas
          </CardTitle>
          <CardDescription>
            {subscriptions.length} gestores cadastrados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subscriptions.length === 0 ? (
            <div className="py-8 text-center">
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">
                Nenhuma assinatura encontrada
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Não há gestores cadastrados no sistema ainda.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gestor</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Barbearias</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={subscription.image || ""}
                              alt={subscription.name || ""}
                            />
                            <AvatarFallback>
                              {subscription.name
                                ? subscription.name.charAt(0).toUpperCase()
                                : "G"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {subscription.name || "Gestor sem nome"}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {subscription.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${getPlanColor(subscription.plan)}`}
                        >
                          <span className="mr-1">
                            {getPlanIcon(subscription.plan)}
                          </span>
                          {getPlanDisplayName(subscription.plan)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${getStatusColor(subscription.subscriptionStatus)}`}
                        >
                          {subscription.subscriptionStatus === "ACTIVE" && (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          )}
                          {subscription.subscriptionStatus === "EXPIRED" && (
                            <XCircle className="mr-1 h-3 w-3" />
                          )}
                          {subscription.subscriptionStatus === "PENDING" && (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {subscription.subscriptionStatus === "INACTIVE" && (
                            <AlertTriangle className="mr-1 h-3 w-3" />
                          )}
                          {getStatusDisplayName(
                            subscription.subscriptionStatus,
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {subscription.planStartDate &&
                          subscription.planEndDate ? (
                            <>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(
                                  subscription.planStartDate,
                                ).toLocaleDateString("pt-BR")}
                              </div>
                              <div className="text-muted-foreground">
                                até{" "}
                                {new Date(
                                  subscription.planEndDate,
                                ).toLocaleDateString("pt-BR")}
                              </div>
                            </>
                          ) : (
                            <span className="text-muted-foreground">
                              Sem período definido
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Building2 className="h-3 w-3" />
                          <span className="font-medium">
                            {subscription._count.barbershopid}
                          </span>
                          <span className="text-muted-foreground">
                            {subscription._count.barbershopid === 1
                              ? "barbearia"
                              : "barbearias"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" />
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminSubscriptionsPage
