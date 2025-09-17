import Link from "next/link"
import { Button } from "./_components/ui/button"
import { Shield, Users, Building2, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./_components/ui/card"

const Home = async () => {
  return (
    <div className="h-full space-y-6 overflow-y-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CorteZapp Admin</h1>
          <p className="text-muted-foreground">
            Painel administrativo para controle total do sistema
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/dashboard">
            <Shield className="mr-2 h-4 w-4" />
            Acessar Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Gestores
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Gestores cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Barbearias Ativas
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Barbearias no sistema
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
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Planos ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ -</div>
            <p className="text-xs text-muted-foreground">
              Receita do mês atual
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Acesso Rápido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" asChild className="w-full justify-start">
              <Link href="/admin/gestores">
                <Users className="mr-2 h-4 w-4" />
                Gerenciar Gestores
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link href="/admin/barbearias">
                <Building2 className="mr-2 h-4 w-4" />
                Ver Barbearias
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link href="/admin/assinaturas">
                <CreditCard className="mr-2 h-4 w-4" />
                Controlar Assinaturas
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Painel administrativo para controle completo do CorteZapp.
            </p>
            <p className="text-sm text-muted-foreground">
              Gerencie usuários, assinaturas e todas as operações do sistema.
            </p>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link href="/admin/login">
                <Shield className="mr-2 h-4 w-4" />
                Fazer Login Admin
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home