"use client"

import {
  getAllAdmins,
  getAdminStats,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  resetAdminPassword,
  canCreateAdmin,
  canUpdateAdmin,
  canDeleteAdmin,
} from "@/app/_actions/admin-crud"
import {
  getAdminTypeDisplayName,
  getAdminTypeColor,
  getAdminTypeIcon,
} from "@/app/_lib/admin-utils"
import { formatDateTime } from "@/app/_lib/database-utils"
import { getAdminSession } from "@/app/_actions/admin-signin"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  Admin,
  AdminSession,
  AdminStats,
  CreateAdminData,
  UpdateAdminData,
} from "@/app/_types/admin"
import { AdminType } from "@prisma/client"
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
  Shield,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Search,
  Users,
  Crown,
  Wrench,
  Calendar,
  Mail,
  Key,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog"
import { Label } from "@/app/_components/ui/label"

const AdminAdministratorsPage = () => {
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null)
  const [admins, setAdmins] = useState<Admin[]>([])
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [showLogsDialog, setShowLogsDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Estados dos formulários
  const [createForm, setCreateForm] = useState<CreateAdminData>({
    name: "",
    email: "",
    password: "",
    type: "SUPORTE",
  })
  const [editForm, setEditForm] = useState<UpdateAdminData>({
    name: "",
    email: "",
    type: "SUPORTE",
  })
  const [resetForm, setResetForm] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const initializeData = async () => {
      try {
        const session = await getAdminSession()
        if (!session || session.type !== "ADMIN") {
          redirect("/")
          return
        }

        setAdminSession(session)
        await loadData()
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast.error("Erro ao carregar dados dos administradores")
      } finally {
        setLoading(false)
      }
    }

    initializeData()
  }, [])

  // Funções de filtro e busca
  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || admin.type === filterType
    return matchesSearch && matchesType
  })

  const sortedAdmins = [...filteredAdmins].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name?.localeCompare(b.name) || 0
      case "email":
        return a.email?.localeCompare(b.email) || 0
      case "type":
        return a.type?.localeCompare(b.type) || 0
      case "created":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  // Funções de ação
  const handleCreateAdmin = () => {
    setCreateForm({
      name: "",
      email: "",
      password: "",
      type: "SUPORTE",
    })
    setShowCreateDialog(true)
  }

  const handleEditAdmin = (admin: Admin) => {
    setSelectedAdmin(admin)
    setEditForm({
      name: admin.name,
      email: admin.email,
      type: admin.type,
    })
    setShowEditDialog(true)
  }

  const handleViewAdmin = (admin: Admin) => {
    setSelectedAdmin(admin)
    setShowViewDialog(true)
  }

  const handleResetPassword = (admin: Admin) => {
    setSelectedAdmin(admin)
    setResetForm({
      newPassword: "",
      confirmPassword: "",
    })
    setShowResetDialog(true)
  }

  const handleDeleteAdmin = async (admin: Admin) => {
    if (!adminSession) return

    try {
      setIsSubmitting(true)

      // Verificar permissões
      const canDelete = await canDeleteAdmin(adminSession.id, admin.id)
      if (!canDelete) {
        toast.error("Você não tem permissão para deletar este administrador")
        return
      }

      await deleteAdmin(admin.id)
      toast.success(`Administrador ${admin.name} deletado com sucesso`)
      setShowDeleteDialog(false)

      // Recarregar dados
      await loadData()
    } catch (error) {
      console.error("Erro ao deletar administrador:", error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao deletar administrador",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClick = (admin: Admin) => {
    setSelectedAdmin(admin)
    setShowDeleteDialog(true)
  }

  const handleViewLogs = () => {
    setShowLogsDialog(true)
  }

  const handleSearch = () => {
    // A busca é feita automaticamente pelo filtro
    toast.info("Filtros aplicados")
  }

  const handleCreateSubmit = async () => {
    if (!adminSession) return

    try {
      setIsSubmitting(true)

      // Verificar permissões
      const canCreate = await canCreateAdmin(adminSession.id)
      if (!canCreate) {
        toast.error("Você não tem permissão para criar administradores")
        return
      }

      // Validações básicas
      if (
        !createForm.name.trim() ||
        !createForm.email.trim() ||
        !createForm.password.trim()
      ) {
        toast.error("Todos os campos são obrigatórios")
        return
      }

      await createAdmin(createForm)
      toast.success("Administrador criado com sucesso!")
      setShowCreateDialog(false)
      await loadData()
    } catch (error) {
      console.error("Erro ao criar administrador:", error)
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar administrador",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditSubmit = async () => {
    if (!adminSession || !selectedAdmin) return

    try {
      setIsSubmitting(true)

      // Verificar permissões
      const canEdit = await canUpdateAdmin(adminSession.id, selectedAdmin.id)
      if (!canEdit) {
        toast.error("Você não tem permissão para editar este administrador")
        return
      }

      // Validações básicas
      if (!editForm.name?.trim() || !editForm.email?.trim()) {
        toast.error("Nome e email são obrigatórios")
        return
      }

      await updateAdmin(selectedAdmin.id, editForm)
      toast.success("Administrador atualizado com sucesso!")
      setShowEditDialog(false)
      await loadData()
    } catch (error) {
      console.error("Erro ao atualizar administrador:", error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar administrador",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetSubmit = async () => {
    if (!selectedAdmin) return

    try {
      setIsSubmitting(true)

      // Validações
      if (!resetForm.newPassword.trim()) {
        toast.error("Nova senha é obrigatória")
        return
      }

      if (resetForm.newPassword !== resetForm.confirmPassword) {
        toast.error("As senhas não coincidem")
        return
      }

      if (resetForm.newPassword.length < 6) {
        toast.error("A senha deve ter pelo menos 6 caracteres")
        return
      }

      await resetAdminPassword(selectedAdmin.id, resetForm.newPassword)
      toast.success("Senha resetada com sucesso!")
      setShowResetDialog(false)
    } catch (error) {
      console.error("Erro ao resetar senha:", error)
      toast.error(
        error instanceof Error ? error.message : "Erro ao resetar senha",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const loadData = async () => {
    try {
      const [adminsData, statsData] = await Promise.all([
        getAllAdmins(),
        getAdminStats(),
      ])
      setAdmins(adminsData)
      setStats(statsData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast.error("Erro ao carregar dados dos administradores")
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Administradores</h1>
          <p className="text-muted-foreground">
            Gerencie os acessos administrativos e permissões do sistema
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Logado como:{" "}
            <span className="font-medium">
              {adminSession?.name || "Carregando..."}
            </span>
          </p>
          <p className="text-xs text-primary">Administrador</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Administradores
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalAdmins || 0}</div>
            <p className="text-xs text-muted-foreground">
              Usuários com acesso administrativo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Administradores
            </CardTitle>
            <Crown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.adminCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              Acesso completo ao sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suporte</CardTitle>
            <Wrench className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.suporteCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              Acesso limitado ao sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Status do Sistema
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Ativo</div>
            <p className="text-xs text-muted-foreground">
              Sistema funcionando normalmente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Aviso de Segurança */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            Aviso de Segurança
          </CardTitle>
          <CardDescription className="text-red-700">
            Esta página permite criar e gerenciar acessos administrativos. Use
            com extrema cautela. Todas as ações são registradas e auditadas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-red-300 text-red-800"
              onClick={handleViewLogs}
            >
              <Activity className="mr-1 h-4 w-4" />
              Ver Logs
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-300 text-red-800"
              onClick={() =>
                toast.info(
                  "Funcionalidade de reset em massa em desenvolvimento",
                )
              }
            >
              <Key className="mr-1 h-4 w-4" />
              Resetar Senhas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="admins">Administradores</TabsTrigger>
          <TabsTrigger value="recent">Recentes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Grid de Permissões */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-red-600" />
                  Permissões de Administrador
                </CardTitle>
                <CardDescription>Acesso completo ao sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      Criar/Editar/Deletar administradores
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      Acesso total ao banco de dados
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Configurações do sistema</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Relatórios e estatísticas</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  Permissões de Suporte
                </CardTitle>
                <CardDescription>Acesso limitado ao sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Visualizar dados do sistema</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Ajudar usuários</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm">
                      Criar/Editar administradores
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Configurações críticas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          {/* Filtros e Busca */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Filtros e Busca
              </CardTitle>
              <CardDescription>
                Encontre administradores específicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar por nome ou email..."
                    className="w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                    <SelectItem value="SUPORTE">Suporte</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nome</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="type">Tipo</SelectItem>
                    <SelectItem value="created">Data de Criação</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch}>
                  <Search className="mr-1 h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Administradores */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Lista de Administradores
                  </CardTitle>
                  <CardDescription>
                    Gerencie todos os acessos administrativos
                  </CardDescription>
                </div>
                <Button onClick={handleCreateAdmin}>
                  <UserPlus className="mr-1 h-4 w-4" />
                  Novo Administrador
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {admins.length === 0 ? (
                <div className="py-8 text-center">
                  <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">
                    Nenhum administrador encontrado
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Crie o primeiro administrador do sistema.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Administrador</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Criado em</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedAdmins.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {admin.name?.charAt(0).toUpperCase() || "A"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{admin.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  ID: {admin.id.slice(0, 8)}...
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getAdminTypeColor(admin.type)}>
                              <span className="mr-1">
                                {getAdminTypeIcon(admin.type)}
                              </span>
                              {getAdminTypeDisplayName(admin.type)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{admin.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                {formatDateTime(admin.createdAt)}
                              </span>
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => handleViewAdmin(admin)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver Detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleEditAdmin(admin)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleResetPassword(admin)}
                                >
                                  <Key className="mr-2 h-4 w-4" />
                                  Resetar Senha
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteClick(admin)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Deletar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {/* Administradores Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Administradores Recentes
              </CardTitle>
              <CardDescription>
                Últimos administradores criados no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.recentAdmins?.length === 0 ? (
                <div className="py-8 text-center">
                  <Activity className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">
                    Nenhum administrador recente
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Não há administradores criados recentemente.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats?.recentAdmins?.map((admin: Admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {admin.name?.charAt(0).toUpperCase() || "A"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{admin.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {admin.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getAdminTypeColor(admin.type)}>
                          {getAdminTypeDisplayName(admin.type)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDateTime(admin.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogos */}

      {/* Diálogo de Criar Administrador */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Administrador</DialogTitle>
            <DialogDescription>
              Adicione um novo administrador ao sistema
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Nome do administrador"
                value={createForm.name}
                onChange={(e) =>
                  setCreateForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={createForm.email}
                onChange={(e) =>
                  setCreateForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={createForm.type}
                onValueChange={(value: AdminType) =>
                  setCreateForm((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                  <SelectItem value="SUPORTE">Suporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Senha temporária"
                value={createForm.password}
                onChange={(e) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Editar Administrador */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Administrador</DialogTitle>
            <DialogDescription>
              Edite as informações do administrador {selectedAdmin?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nome</Label>
              <Input
                id="edit-name"
                value={editForm.name || ""}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email || ""}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Tipo</Label>
              <Select
                value={editForm.type || "SUPORTE"}
                onValueChange={(value: AdminType) =>
                  setEditForm((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                  <SelectItem value="SUPORTE">Suporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Ver Detalhes */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Administrador</DialogTitle>
            <DialogDescription>
              Informações completas do administrador
            </DialogDescription>
          </DialogHeader>
          {selectedAdmin && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedAdmin.name?.charAt(0).toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedAdmin.name}
                  </h3>
                  <p className="text-muted-foreground">{selectedAdmin.email}</p>
                  <Badge className={getAdminTypeColor(selectedAdmin.type)}>
                    {getAdminTypeDisplayName(selectedAdmin.type)}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ID</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedAdmin.id}
                  </p>
                </div>
                <div>
                  <Label>Criado em</Label>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(selectedAdmin.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowViewDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Reset de Senha */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resetar Senha</DialogTitle>
            <DialogDescription>
              Defina uma nova senha para {selectedAdmin?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Nova senha"
                value={resetForm.newPassword}
                onChange={(e) =>
                  setResetForm((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirmar Senha</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirmar senha"
                value={resetForm.confirmPassword}
                onChange={(e) =>
                  setResetForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleResetSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Resetando..." : "Resetar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Logs */}
      <Dialog open={showLogsDialog} onOpenChange={setShowLogsDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Logs do Sistema</DialogTitle>
            <DialogDescription>
              Registro de atividades administrativas
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="h-96 overflow-y-auto rounded-lg border p-4">
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">
                    [2024-01-15 10:30:00]
                  </span>
                  <span className="ml-2">
                    Administrador &quot;João Silva&quot; criou novo usuário
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">
                    [2024-01-15 09:15:00]
                  </span>
                  <span className="ml-2">
                    Administrador &quot;Maria Santos&quot; resetou senha do
                    usuário ID: 123
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">
                    [2024-01-14 16:45:00]
                  </span>
                  <span className="ml-2">Sistema iniciado com sucesso</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">
                    [2024-01-14 14:20:00]
                  </span>
                  <span className="ml-2">
                    Administrador &quot;Pedro Costa&quot; fez login no sistema
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogsDialog(false)}>
              Fechar
            </Button>
            <Button
              onClick={() =>
                toast.info("Funcionalidade de exportar logs em desenvolvimento")
              }
            >
              Exportar Logs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmação de Exclusão */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja deletar o administrador &quot;
              {selectedAdmin?.name}&quot;? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedAdmin && handleDeleteAdmin(selectedAdmin)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deletando..." : "Deletar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminAdministratorsPage
