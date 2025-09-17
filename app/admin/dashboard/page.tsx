import Link from "next/link"
import { Button } from "../../_components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../_components/ui/card"
import {
  Users,
  Building2,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"
import { getAdminSession } from "../../_actions/admin-signin"
import { redirect } from "next/navigation"

const AdminDashboard = async () => {
  const adminSession = await getAdminSession()

  if (!adminSession) {
    redirect("/")
  }

  // TODO: Buscar dados reais do banco
  const stats = {
    totalGestores: 0,
    barbeariasAtivas: 0,
    assinaturasAtivas: 0,
    receitaMensal: 0,
    usuariosTotal: 0,
    agendamentosHoje: 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema CorteZapp
          </p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-sm">
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

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Gestores
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGestores}</div>
            <p className="text-muted-foreground text-xs">
              Gestores cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Barbearias Ativas
            </CardTitle>
            <Building2 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.barbeariasAtivas}</div>
            <p className="text-muted-foreground text-xs">Em funcionamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assinaturas Ativas
            </CardTitle>
            <CreditCard className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assinaturasAtivas}</div>
            <p className="text-muted-foreground text-xs">Planos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
            </CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {stats.receitaMensal.toLocaleString("pt-BR")}
            </div>
            <p className="text-muted-foreground text-xs">Este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Alertas Importantes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Nenhum alerta no momento</span>
            </div>
            <div className="text-muted-foreground flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>Sistema funcionando normalmente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Status do Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Banco de Dados</span>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API CorteZapp</span>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">Funcionando</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acesso Rápido */}
      <Card>
        <CardHeader>
          <CardTitle>Acesso Rápido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              asChild
              className="h-auto flex-col space-y-2 p-4"
            >
              <Link href="/admin/gestores">
                <Users className="h-6 w-6" />
                <span>Gerenciar Gestores</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="h-auto flex-col space-y-2 p-4"
            >
              <Link href="/admin/barbearias">
                <Building2 className="h-6 w-6" />
                <span>Ver Barbearias</span>
              </Link>
            </Button>

            {adminSession.type === "ADMIN" && (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="h-auto flex-col space-y-2 p-4"
                >
                  <Link href="/admin/assinaturas">
                    <CreditCard className="h-6 w-6" />
                    <span>Assinaturas</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="h-auto flex-col space-y-2 p-4"
                >
                  <Link href="/admin/financeiro">
                    <DollarSign className="h-6 w-6" />
                    <span>Financeiro</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard
