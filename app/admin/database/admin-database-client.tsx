"use client"

import { useState } from "react"
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
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Settings,
} from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs"
import CrudModal from "@/app/_components/admin-crud-modal"
import AdminSearch from "@/app/_components/admin-search"
import {
  exportDatabaseData,
  analyzeDatabasePerformance,
  clearApplicationCache,
  checkDataIntegrity,
  getSystemStatistics,
} from "@/app/_actions/admin-operations"
import {
  createUser,
  updateUser,
  deleteUser,
  createGestor,
  updateGestor,
  deleteGestor,
  createBarbershop,
  updateBarbershop,
  deleteBarbershop,
  createService,
  updateService,
  deleteService,
  createWorker,
  updateWorker,
  deleteWorker,
  createBooking,
  updateBooking,
  deleteBooking,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  createRating,
  updateRating,
  deleteRating,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "@/app/_actions/database-crud"
import { toast } from "sonner"

interface AdminDatabaseClientProps {
  adminSession: {
    id: string
    name: string
    email: string
    type: string
  }
  stats: {
    totalRecords: number
    tableStats: Array<{
      tableName: string
      recordCount: number
    }>
  }
  models: Array<{
    name: string
    displayName: string
    tableName: string
    recordCount: number
    fields: Array<{
      name: string
      type: string
      required: boolean
    }>
  }>
}

export default function AdminDatabaseClient({
  adminSession,
  stats,
  models,
}: AdminDatabaseClientProps) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [modalMode, setModalMode] = useState<
    "create" | "edit" | "view" | "delete"
  >("create")
  const [modalData, setModalData] = useState<Record<string, unknown> | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [systemStats] = useState<{
    memoryUsage: number
    cpuUsage: number
    diskUsage: number
    uptime: number
  } | null>(null)

  const handleModelAction = async (
    modelName: string,
    action: "create" | "edit" | "view" | "delete",
    data?: Record<string, unknown>,
  ) => {
    setSelectedModel(modelName)
    setModalMode(action)
    setModalData(data || null)
    setIsModalOpen(true)
  }

  const handleSave = async (formData: any) => {
    if (!selectedModel) return

    setIsLoading(true)
    try {
      switch (selectedModel) {
        case "User":
          if (modalMode === "create") {
            await createUser(formData)
          } else if (modalMode === "edit" && modalData?.id) {
            await updateUser(modalData.id as string, formData)
          }
          break
        case "Gestor":
          if (modalMode === "create") {
            await createGestor(formData)
          } else if (modalMode === "edit" && modalData?.id) {
            await updateGestor(modalData.id as string, formData)
          }
          break
        case "Barbershop":
          if (modalMode === "create") {
            await createBarbershop(formData)
          } else if (modalMode === "edit" && modalData?.id) {
            await updateBarbershop(modalData.id as string, formData)
          }
          break
        case "BarbershopService":
          if (modalMode === "create") {
            await createService(formData)
          } else if (modalMode === "edit" && modalData?.id) {
            await updateService(modalData.id as string, formData)
          }
          break
        case "Worker":
          if (modalMode === "create") {
            await createWorker(formData)
          } else if (modalMode === "edit" && modalData?.id) {
            await updateWorker(modalData.id as string, formData)
          }
          break
        case "Booking":
          if (modalMode === "create") {
            await createBooking(formData)
          } else if (modalMode === "edit" && modalData?.id) {
            await updateBooking(modalData.id as string, formData)
          }
          break
        case "Transaction":
          if (modalMode === "create") {
            await createTransaction(formData)
          } else if (modalMode === "edit" && modalData?.id) {
            await updateTransaction(modalData.id as string, formData)
          }
          break
        case "Rating":
          if (modalMode === "create") {
            await createRating(formData)
          } else if (modalMode === "edit" && modalData?.id) {
            await updateRating(modalData.id as string, formData)
          }
          break
        case "Admin":
          if (modalMode === "create") {
            await createAdmin(formData)
          } else if (modalMode === "edit" && modalData?.id) {
            await updateAdmin(modalData.id as string, formData)
          }
          break
      }
      toast.success(
        `${selectedModel} ${modalMode === "create" ? "criado" : "atualizado"} com sucesso!`,
      )
    } catch (error) {
      console.error("Erro ao salvar:", error)
      toast.error("Erro ao salvar dados")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!selectedModel) return

    setIsLoading(true)
    try {
      switch (selectedModel) {
        case "User":
          await deleteUser(id)
          break
        case "Gestor":
          await deleteGestor(id)
          break
        case "Barbershop":
          await deleteBarbershop(id)
          break
        case "BarbershopService":
          await deleteService(id)
          break
        case "Worker":
          await deleteWorker(id)
          break
        case "Booking":
          await deleteBooking(id)
          break
        case "Transaction":
          await deleteTransaction(id)
          break
        case "Rating":
          await deleteRating(id)
          break
        case "Admin":
          await deleteAdmin(id)
          break
      }
      toast.success(`${selectedModel} deletado com sucesso!`)
    } catch (error) {
      console.error("Erro ao deletar:", error)
      toast.error("Erro ao deletar dados")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminOperation = async (operation: string) => {
    setIsLoading(true)
    try {
      switch (operation) {
        case "export":
          const exportData = await exportDatabaseData()
          // Aqui você pode implementar download do arquivo
          console.log("Dados exportados:", exportData)
          toast.success("Dados exportados com sucesso!")
          break
        case "analyze":
          await analyzeDatabasePerformance()
          toast.success("Análise do banco concluída!")
          break
        case "cache":
          await clearApplicationCache()
          toast.success("Cache limpo com sucesso!")
          break
        case "integrity":
          const integrity = await checkDataIntegrity()
          console.log("Verificação de integridade:", integrity)
          toast.success("Verificação de integridade concluída!")
          break
        case "stats":
          await getSystemStatistics()
          toast.success("Estatísticas atualizadas!")
          break
      }
    } catch (error) {
      console.error("Erro na operação:", error)
      toast.error("Erro na operação administrativa")
    } finally {
      setIsLoading(false)
    }
  }

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
              onClick={() => handleAdminOperation("export")}
              disabled={isLoading}
            >
              <Download className="mr-1 h-4 w-4" />
              Backup
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-800"
              onClick={() => handleAdminOperation("analyze")}
              disabled={isLoading}
            >
              <RefreshCw className="mr-1 h-4 w-4" />
              Analisar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-800"
              onClick={() => handleAdminOperation("integrity")}
              disabled={isLoading}
            >
              <CheckCircle className="mr-1 h-4 w-4" />
              Integridade
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para diferentes modelos */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="models">Modelos</TabsTrigger>
          <TabsTrigger value="search">Busca Global</TabsTrigger>
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
                      <span className="text-2xl">📊</span>
                      <CardTitle className="text-lg">
                        {model.displayName}
                      </CardTitle>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {model.recordCount}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {model.tableName} - {model.recordCount} registros
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleModelAction(model.name, "view")}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Ver
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleModelAction(model.name, "create")}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Criar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleModelAction(model.name, "edit")}
                    >
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
                            <span className="text-lg">📊</span>
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
                          <Badge className="bg-blue-100 text-blue-800">
                            {model.recordCount.toLocaleString()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {model.tableName} - {model.recordCount} registros
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleModelAction(model.name, "view")
                              }
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              Ver
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleModelAction(model.name, "create")
                              }
                            >
                              <Plus className="mr-1 h-4 w-4" />
                              Criar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleModelAction(model.name, "edit")
                              }
                            >
                              <Edit className="mr-1 h-4 w-4" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() =>
                                handleModelAction(model.name, "delete")
                              }
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

        <TabsContent value="search" className="space-y-4">
          <AdminSearch />
        </TabsContent>
      </Tabs>

      {/* Ações Administrativas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Ações Administrativas
          </CardTitle>
          <CardDescription>
            Operações avançadas no banco de dados (SEGURAS - sem reset)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleAdminOperation("export")}
              disabled={isLoading}
            >
              <Download className="h-6 w-6" />
              <span>Exportar Dados</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleAdminOperation("analyze")}
              disabled={isLoading}
            >
              <RefreshCw className="h-6 w-6" />
              <span>Analisar DB</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleAdminOperation("cache")}
              disabled={isLoading}
            >
              <RefreshCw className="h-6 w-6" />
              <span>Limpar Cache</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleAdminOperation("integrity")}
              disabled={isLoading}
            >
              <CheckCircle className="h-6 w-6" />
              <span>Verificar Integridade</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal de CRUD */}
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        modelName={selectedModel || ""}
        modelDisplayName={
          models.find((m) => m.name === selectedModel)?.displayName || ""
        }
        data={modalData || undefined}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
