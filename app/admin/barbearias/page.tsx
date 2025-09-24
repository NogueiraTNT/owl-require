"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  getBarbershops,
  BarbershopWithGestor,
} from "@/app/_actions/get-barbershops"
import { getBarbershopById } from "@/app/_actions/get-barbershop-by-id"
import { getAdminSession } from "@/app/_actions/admin-signin"
import { BarbershopVerification, ThemeType } from "@prisma/client"
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog"
import BarbershopEditForm from "@/app/_components/ui/barbershop-edit-form"
import VerificationBadge from "@/app/_components/ui/verification-badge"
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Search,
  Edit,
} from "lucide-react"
import { Input } from "@/app/_components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import Image from "next/image"

interface AdminSession {
  id: string
  name: string
  type: string
}

const AdminBarbershopsPage = () => {
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null)
  const [barbershops, setBarbershops] = useState<BarbershopWithGestor[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBarbershop, setSelectedBarbershop] =
    useState<BarbershopWithGestor | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    const initializeData = async () => {
      try {
        const session = await getAdminSession()
        if (!session) {
          redirect("/")
        }
        setAdminSession(session)

        const data = await getBarbershops()
        setBarbershops(data)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast.error("Erro ao carregar dados")
      } finally {
        setLoading(false)
      }
    }

    initializeData()
  }, [])

  const handleEditBarbershop = async (barbershopId: string) => {
    try {
      const barbershop = await getBarbershopById(barbershopId)
      setSelectedBarbershop(barbershop)
      setShowEditDialog(true)
    } catch (error) {
      console.error("Erro ao carregar barbearia:", error)
      toast.error("Erro ao carregar barbearia")
    }
  }

  const handleCloseEditDialog = () => {
    setShowEditDialog(false)
    setSelectedBarbershop(null)
    // Recarregar dados
    getBarbershops()
      .then((data: BarbershopWithGestor[]) => setBarbershops(data))
      .catch(console.error)
  }

  // Filtrar e ordenar barbearias
  const filteredBarbershops = barbershops
    .filter((barbershop) => {
      const matchesSearch =
        barbershop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        barbershop.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        barbershop.gestor.name?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesState =
        stateFilter === "all" || barbershop.state === stateFilter

      return matchesSearch && matchesState
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case "city":
          return (a.city || "").localeCompare(b.city || "")
        case "state":
          return (a.state || "").localeCompare(b.state || "")
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Barbearias</h1>
          <p className="text-muted-foreground">
            Gerencie todas as barbearias cadastradas no sistema
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Logado como:{" "}
            <span className="font-medium">{adminSession?.name}</span>
          </p>
          <p
            className={`text-xs ${
              adminSession?.type === "ADMIN" ? "text-primary" : "text-amber-600"
            }`}
          >
            {adminSession?.type === "ADMIN" ? "Administrador" : "Suporte"}
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Barbearias
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{barbershops.length}</div>
            <p className="text-xs text-muted-foreground">
              Barbearias cadastradas
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
            <div className="text-2xl font-bold">{barbershops.length}</div>
            <p className="text-xs text-muted-foreground">Em funcionamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Estados Atendidos
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                new Set(barbershops.map((b: BarbershopWithGestor) => b.state))
                  .size
              }
            </div>
            <p className="text-xs text-muted-foreground">Estados diferentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cadastros Este Mês
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                barbershops.filter((b) => {
                  const thisMonth = new Date()
                  const barbershopDate = new Date(b.createdAt)
                  return (
                    barbershopDate.getMonth() === thisMonth.getMonth() &&
                    barbershopDate.getFullYear() === thisMonth.getFullYear()
                  )
                }).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Novas barbearias</p>
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
            Encontre barbearias específicas usando os filtros abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome, cidade ou gestor..."
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os estados</SelectItem>
                {Array.from(
                  new Set(
                    barbershops
                      .map((b: BarbershopWithGestor) => b.state)
                      .filter(Boolean),
                  ),
                ).map((state: string | null) => (
                  <SelectItem key={state} value={state || "unknown"}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="created">Data de Cadastro</SelectItem>
                <SelectItem value="city">Cidade</SelectItem>
                <SelectItem value="state">Estado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Barbearias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Lista de Barbearias
          </CardTitle>
          <CardDescription>
            {filteredBarbershops.length} de {barbershops.length} barbearias
            cadastradas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredBarbershops.length === 0 ? (
            <div className="py-8 text-center">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">
                Nenhuma barbearia encontrada
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {barbershops.length === 0
                  ? "Não há barbearias cadastradas no sistema ainda."
                  : "Nenhuma barbearia corresponde aos filtros aplicados."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Barbearia</TableHead>
                    <TableHead>Gestor</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Cadastro</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBarbershops.map((barbershop) => (
                    <TableRow key={barbershop.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            {barbershop.imageUrl ? (
                              <Image
                                src={barbershop.imageUrl}
                                alt={barbershop.name}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <Building2 className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="font-medium">
                                {barbershop.name}
                              </div>
                              <VerificationBadge
                                verification={
                                  barbershop.verification as BarbershopVerification
                                }
                              />
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {barbershop.corporateName}
                            </div>
                            {barbershop.code && (
                              <Badge variant="outline" className="text-xs">
                                {barbershop.code}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {barbershop.gestor.name}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {barbershop.gestor.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {barbershop.city}, {barbershop.state}
                          </div>
                          <div className="text-muted-foreground">
                            {barbershop.neighborhood}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {barbershop.phones.map(
                            (phone: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-1"
                              >
                                <Phone className="h-3 w-3" />
                                {phone}
                              </div>
                            ),
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(barbershop.createdAt).toLocaleDateString(
                              "pt-BR",
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditBarbershop(barbershop.id)}
                          >
                            <Edit className="mr-1 h-4 w-4" />
                            Editar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Edição */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Barbearia</DialogTitle>
          </DialogHeader>
          {selectedBarbershop && (
            <BarbershopEditForm
              barbershop={{
                ...selectedBarbershop,
                theme: selectedBarbershop.theme as ThemeType,
                verification:
                  selectedBarbershop.verification as BarbershopVerification,
              }}
              onClose={handleCloseEditDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminBarbershopsPage
