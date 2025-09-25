"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { getAdminSession } from "@/app/_actions/admin-signin"
import { redirect } from "next/navigation"
import NotificationTestPanel from "@/app/_components/notification-test-panel"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Badge } from "@/app/_components/ui/badge"
import {
  MessageSquare,
  Settings,
  Activity,
  Users,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface AdminSession {
  id: string
  name: string
  type: string
}

interface NotificationStats {
  totalBookings: number
  bookingsThisMonth: number
  bookingsToday: number
  bookingsWithEmail: number
  bookingsWithPhone: number
  barbershopsWithNotifications: number
  recentBookings: {
    id: string
    clientName: string | null
    clientPhone: string | null
    serviceName: string
    barbershopName: string
    workerName: string
    date: Date
    createdAt: Date
    hasEmail: boolean
    hasPhone: boolean
  }[]
}

const AdminNotificationsPage = () => {
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<NotificationStats | null>(null)

  useEffect(() => {
    const initializeData = async () => {
      try {
        const session = await getAdminSession()
        if (!session) {
          redirect("/")
        }
        setAdminSession(session)

        // TODO: Implementar busca de estatísticas reais
        // const statsData = await getNotificationStats()
        // setStats(statsData)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast.error("Erro ao carregar dados")
      } finally {
        setLoading(false)
      }
    }

    initializeData()
  }, [])

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
          <h1 className="text-3xl font-bold tracking-tight">
            Notificações WhatsApp
          </h1>
          <p className="text-muted-foreground">
            Gerencie as notificações automáticas via WhatsApp usando Twilio
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
              Total de Agendamentos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalBookings || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Agendamentos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Com Telefone</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.bookingsWithPhone || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Podem receber WhatsApp
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.bookingsThisMonth || 0}
            </div>
            <p className="text-xs text-muted-foreground">Novos agendamentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.bookingsToday || 0}
            </div>
            <p className="text-xs text-muted-foreground">Agendamentos hoje</p>
          </CardContent>
        </Card>
      </div>

      {/* Status dos Serviços */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Status dos Serviços
          </CardTitle>
          <CardDescription>
            Verifique o status da integração com Twilio e outros serviços de
            notificação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">WhatsApp (Twilio)</div>
                  <div className="text-sm text-muted-foreground">
                    Integração ativa
                  </div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="mr-1 h-3 w-3" />
                Ativo
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">
                    Não configurado
                  </div>
                </div>
              </div>
              <Badge className="bg-gray-100 text-gray-800">
                <XCircle className="mr-1 h-3 w-3" />
                Inativo
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">SMS</div>
                  <div className="text-sm text-muted-foreground">
                    Não configurado
                  </div>
                </div>
              </div>
              <Badge className="bg-gray-100 text-gray-800">
                <XCircle className="mr-1 h-3 w-3" />
                Inativo
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Painel de Teste */}
      <NotificationTestPanel />

      {/* Informações sobre Configuração */}
      <Card>
        <CardHeader>
          <CardTitle>Configuração do Twilio</CardTitle>
          <CardDescription>
            Instruções para configurar a integração com Twilio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h4 className="mb-2 font-medium text-blue-900">
              📋 Próximos Passos:
            </h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>1. Configure as variáveis de ambiente do Twilio</li>
              <li>2. Configure o WhatsApp Sandbox no console do Twilio</li>
              <li>3. Teste a integração usando o painel acima</li>
              <li>4. Configure os templates de mensagem</li>
            </ul>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h4 className="mb-2 font-medium text-yellow-900">⚠️ Importante:</h4>
            <p className="text-sm text-yellow-800">
              Para produção, você precisará solicitar aprovação do WhatsApp
              Business API e configurar um número de telefone comercial
              aprovado.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminNotificationsPage
