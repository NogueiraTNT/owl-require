"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { getAllBarbershops } from "@/app/_actions/get-all-barbershops"
import { updateBarbershopVerification } from "@/app/_actions/update-barbershop-verification"
import { getAdminSession } from "@/app/_actions/admin-signin"
import { redirect } from "next/navigation"
import { BarbershopVerification } from "@/app/generated/prisma"
import VerificationSelect from "@/app/_components/ui/verification-select"
import VerificationBadge from "@/app/_components/ui/verification-badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import {
  SearchIcon,
  EditIcon,
  MapPinIcon,
  UserIcon,
  CalendarIcon,
} from "lucide-react"
import Image from "next/image"

interface Barbershop {
  id: string
  name: string
  address: string
  imageUrl: string
  verification: BarbershopVerification | null
  createdAt: Date
  gestor: {
    name: string | null
    email: string
  }
}

export default function BarbershopsPage() {
  const [barbershops, setBarbershops] = useState<Barbershop[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const initializeData = async () => {
      try {
        const session = await getAdminSession()
        if (!session) {
          redirect("/admin/login")
        }
        await loadBarbershops()
      } catch (error) {
        console.error("Erro ao inicializar dados:", error)
        toast.error("Erro ao carregar dados")
      } finally {
        setLoading(false)
      }
    }

    initializeData()
  }, [])

  const loadBarbershops = async () => {
    try {
      const data = await getAllBarbershops()
      setBarbershops(data)
    } catch (error) {
      console.error("Erro ao carregar barbearias:", error)
      toast.error("Erro ao carregar barbearias")
    }
  }

  const handleUpdateVerification = async (
    barbershopId: string,
    verification: BarbershopVerification | null,
  ) => {
    try {
      await updateBarbershopVerification(barbershopId, verification)
      toast.success("Verificação atualizada com sucesso!")
      await loadBarbershops()
    } catch (error) {
      console.error("Erro ao atualizar verificação:", error)
      toast.error("Erro ao atualizar verificação")
    }
  }

  const filteredBarbershops = barbershops.filter(
    (barbershop) =>
      barbershop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barbershop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (barbershop.gestor.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  )

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
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gerenciar Barbearias</h1>
        <p className="text-muted-foreground">
          Gerencie as barbearias e seus status de verificação
        </p>
      </div>

      {/* Barra de pesquisa */}
      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome, endereço ou gestor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{barbershops.length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 p-2">
                <UserIcon className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pioneiros</p>
                <p className="text-2xl font-bold">
                  {
                    barbershops.filter((b) => b.verification === "PIONEER")
                      .length
                  }
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-100 p-2">
                <span className="text-yellow-600">🏆</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verificados</p>
                <p className="text-2xl font-bold">
                  {
                    barbershops.filter((b) => b.verification === "VERIFIED")
                      .length
                  }
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 p-2">
                <span className="text-blue-600">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sem Verificação</p>
                <p className="text-2xl font-bold">
                  {barbershops.filter((b) => !b.verification).length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-100 p-2">
                <span className="text-gray-600">○</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de barbearias */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBarbershops.map((barbershop) => (
          <Card key={barbershop.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={barbershop.imageUrl}
                      alt={barbershop.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{barbershop.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <VerificationBadge
                        verification={barbershop.verification}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="h-4 w-4" />
                <span className="truncate">{barbershop.address}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserIcon className="h-4 w-4" />
                <span>{barbershop.gestor.name || "Sem nome"}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {new Date(barbershop.createdAt).toLocaleDateString()}
                </span>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    <EditIcon className="mr-2 h-4 w-4" />
                    Gerenciar Verificação
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Gerenciar Verificação - {barbershop.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src={barbershop.imageUrl}
                          alt={barbershop.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{barbershop.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {barbershop.address}
                        </p>
                        <div className="mt-1">
                          <VerificationBadge
                            verification={barbershop.verification}
                          />
                        </div>
                      </div>
                    </div>

                    <VerificationSelect
                      value={barbershop.verification}
                      onValueChange={(verification) =>
                        handleUpdateVerification(barbershop.id, verification)
                      }
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBarbershops.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Nenhuma barbearia encontrada.</p>
        </div>
      )}
    </div>
  )
}
