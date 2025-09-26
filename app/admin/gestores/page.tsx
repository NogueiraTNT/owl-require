import { Button } from "../../_components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../_components/ui/card"
import { Badge } from "../../_components/ui/badge"
import { Plus, Users, Building2, CreditCard, AlertCircle } from "lucide-react"
import { getAdminSession } from "../../_actions/admin-signin"
import { redirect } from "next/navigation"
import { db } from "../../_lib/prisma"
import AddGestorDialog from "../../_components/add-gestor-dialog"
import EditGestorDialog from "../../_components/edit-gestor-dialog"
import DeleteGestorDialog from "../../_components/delete-gestor-dialog"

const GestoresPage = async () => {
  const adminSession = await getAdminSession()

  if (!adminSession) {
    redirect("/")
  }

  // Buscar todos os gestores com suas barbearias
  const gestores = await db.gestor.findMany({
    include: {
      barbershopid: {
        include: {
          _count: {
            select: {
              workers: true,
              services: true,
              transactions: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200"
      case "INACTIVE":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "EXPIRED":
        return "bg-red-100 text-red-800 border-red-200"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Ativo"
      case "INACTIVE":
        return "Inativo"
      case "EXPIRED":
        return "Expirado"
      case "PENDING":
        return "Pendente"
      case "CANCELLED":
        return "Cancelado"
      default:
        return "Sem Plano"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ADMIN":
        return "Administrador"
      case "OWNER":
        return "Proprietário"
      case "WORKER":
        return "Funcionário"
      default:
        return type
    }
  }

  const getPlanLabel = (plan: string | null) => {
    if (!plan) return "Sem Plano"
    switch (plan) {
      case "BASIC":
        return "Básico"
      case "PRO":
        return "Pro"
      case "PREMIUM":
        return "Premium"
      default:
        return plan
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestores</h1>
          <p className="text-muted-foreground">
            Gerencie todos os gestores do sistema CorteZapp
          </p>
        </div>
        <AddGestorDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Gestor
          </Button>
        </AddGestorDialog>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Gestores
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gestores.length}</div>
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
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                gestores.filter(
                  (gestor) => gestor.subscriptionStatus === "ACTIVE",
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Com planos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Barbearias
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gestores.reduce(
                (total, gestor) => total + gestor.barbershopid.length,
                0,
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Barbearias registradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pagamentos Pendentes
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                gestores.filter(
                  (gestor) => gestor.subscriptionStatus === "PENDING",
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Precisam atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Gestores */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Gestores</CardTitle>
        </CardHeader>
        <CardContent>
          {gestores.length === 0 ? (
            <div className="py-8 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Nenhum gestor encontrado
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Comece adicionando um novo gestor ao sistema.
              </p>
              <div className="mt-6">
                <AddGestorDialog>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Gestor
                  </Button>
                </AddGestorDialog>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {gestores.map((gestor) => (
                <div
                  key={gestor.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="font-semibold text-primary">
                          {gestor.name?.charAt(0).toUpperCase() || "?"}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {gestor.name || "Nome não informado"}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(gestor.type)}
                        </Badge>
                        {gestor.subscriptionStatus && (
                          <Badge
                            className={`text-xs ${getStatusColor(gestor.subscriptionStatus)}`}
                          >
                            {getStatusLabel(gestor.subscriptionStatus)}
                          </Badge>
                        )}
                      </div>
                      <p className="truncate text-sm text-gray-500">
                        {gestor.email}
                      </p>
                      <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                        <span>
                          {gestor.barbershopid.length}{" "}
                          {gestor.barbershopid.length === 1
                            ? "barbearia"
                            : "barbearias"}
                        </span>
                        {gestor.plan && (
                          <span>Plano: {getPlanLabel(gestor.plan)}</span>
                        )}
                        {gestor.planEndDate && (
                          <span>
                            Vence:{" "}
                            {new Date(gestor.planEndDate).toLocaleDateString(
                              "pt-BR",
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <EditGestorDialog gestor={gestor}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </EditGestorDialog>
                    {adminSession.type === "ADMIN" && (
                      <DeleteGestorDialog
                        gestorId={gestor.id}
                        gestorName={gestor.name || "Gestor"}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          Excluir
                        </Button>
                      </DeleteGestorDialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default GestoresPage
