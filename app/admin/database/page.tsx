import { getDatabaseStats } from "@/app/_actions/database-crud"
import {
  getModelDisplayName,
  getModelIcon,
  formatDate,
  formatDateTime,
} from "@/app/_lib/database-utils"
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
  Database,
  Users,
  UserCheck,
  Building2,
  Scissors,
  User,
  Calendar,
  DollarSign,
  Star,
  Shield,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banco de Dados</h1>
          <p className="text-muted-foreground">
            Controle total do banco de dados - CRUD completo para todos os
            modelos
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Logado como:{" "}
            <span className="font-medium">{adminSession.name}</span>
          </p>
          <p className="text-xs text-primary">Administrador</p>
        </div>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Registros
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRecords}</div>
            <p className="text-xs text-muted-foreground">
              Registros no banco de dados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Modelos Ativos
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.length}</div>
            <p className="text-xs text-muted-foreground">Modelos de dados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Status do Banco
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">Conexão ativa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Última Atualização
            </CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Agora</div>
            <p className="text-xs text-muted-foreground">Dados em tempo real</p>
          </CardContent>
        </Card>
      </div>

      {/* Aviso de Segurança */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            Aviso de Segurança
          </CardTitle>
          <CardDescription className="text-amber-700">
            Esta página fornece acesso completo ao banco de dados. Use com
            extrema cautela. Todas as operações são registradas e podem afetar o
            funcionamento do sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-800"
            >
              <Download className="mr-1 h-4 w-4" />
              Backup
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-800"
            >
              <Upload className="mr-1 h-4 w-4" />
              Restore
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-800"
            >
              <RefreshCw className="mr-1 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para diferentes modelos */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="models">Modelos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Grid de Modelos */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <Card
                key={model.name}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{model.icon}</span>
                      <CardTitle className="text-lg">
                        {model.displayName}
                      </CardTitle>
                    </div>
                    <Badge className={model.color}>{model.count}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-1 h-4 w-4" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Plus className="mr-1 h-4 w-4" />
                      Criar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-1 h-4 w-4" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          {/* Lista Detalhada de Modelos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Modelos do Banco de Dados
              </CardTitle>
              <CardDescription>
                Lista detalhada de todos os modelos com opções de CRUD
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Modelo</TableHead>
                      <TableHead>Registros</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {models.map((model) => (
                      <TableRow key={model.name}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{model.icon}</span>
                            <div>
                              <div className="font-medium">
                                {model.displayName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {model.name}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={model.color}>
                            {model.count.toLocaleString()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {model.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Ativo
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-4 w-4" />
                              Ver
                            </Button>
                            <Button variant="outline" size="sm">
                              <Plus className="mr-1 h-4 w-4" />
                              Criar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="mr-1 h-4 w-4" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="mr-1 h-4 w-4" />
                              Deletar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Filtros e Busca Global */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Busca Global
          </CardTitle>
          <CardDescription>
            Busque em todos os modelos do banco de dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Buscar em todos os modelos..."
                className="w-full"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os modelos</SelectItem>
                {models.map((model) => (
                  <SelectItem key={model.name} value={model.name}>
                    {model.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="count">Quantidade</SelectItem>
                <SelectItem value="created">Data de Criação</SelectItem>
                <SelectItem value="updated">Última Atualização</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Search className="mr-1 h-4 w-4" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ações Administrativas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Ações Administrativas
          </CardTitle>
          <CardDescription>
            Operações avançadas no banco de dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Download className="h-6 w-6" />
              <span>Backup Completo</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Upload className="h-6 w-6" />
              <span>Restore Backup</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <RefreshCw className="h-6 w-6" />
              <span>Otimizar DB</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-6 w-6" />
              <span>Limpar Cache</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDatabasePage
