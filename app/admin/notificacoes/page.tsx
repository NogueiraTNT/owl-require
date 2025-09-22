import {
  getNotificationStats,
  getWhatsAppStatus,
  getEmailStatus,
  getNotificationSettings,
} from "@/app/_actions/get-notifications-data"
import {
  formatDateTime,
  formatDate,
} from "@/app/_lib/notification-utils"
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
  Bell,
  Calendar,
  Eye,
  Search,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Wifi,
  WifiOff,
} from "lucide-react"
import { Input } from "@/app/_components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"

const AdminNotificationsPage = async () => {
  const adminSession = await getAdminSession()

  if (!adminSession) {
    redirect("/")
  }

  const [stats, whatsappStatus, emailStatus, settings] = await Promise.all([
    getNotificationStats(),
    getWhatsAppStatus(),
    getEmailStatus(),
    getNotificationSettings(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>
          <p className="text-muted-foreground">
            Gerencie o sistema de notificações e monitore o envio de mensagens
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

      {/* Status dos Canais de Notificação */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Status WhatsApp
            </CardTitle>
            {whatsappStatus.connected ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {whatsappStatus.connected ? "Conectado" : "Desconectado"}
            </div>
            <p className="text-xs text-muted-foreground">
              {whatsappStatus.messagesSent} mensagens enviadas
            </p>
            <p className="text-xs text-muted-foreground">
              {whatsappStatus.messagesToday} hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Email</CardTitle>
            {emailStatus.configured ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {emailStatus.configured ? "Configurado" : "Não Configurado"}
            </div>
            <p className="text-xs text-muted-foreground">
              {emailStatus.emailsSent} emails enviados
            </p>
            <p className="text-xs text-muted-foreground">
              {emailStatus.emailsToday} hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Agendamentos
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.bookingsThisMonth} este mês
            </p>
            <p className="text-xs text-muted-foreground">
              {stats.bookingsToday} hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cobertura de Notificações
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (stats.bookingsWithPhone / stats.totalBookings) * 100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.bookingsWithPhone} com telefone
            </p>
            <p className="text-xs text-muted-foreground">
              {stats.bookingsWithEmail} com email
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Configurações de Notificação */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações Ativas
            </CardTitle>
            <CardDescription>
              Canais de notificação habilitados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📧</span>
                  <span className="text-sm font-medium">Email</span>
                </div>
                <Badge
                  variant={settings.emailEnabled ? "default" : "secondary"}
                  className="text-xs"
                >
                  {settings.emailEnabled ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  <span className="text-sm font-medium">WhatsApp</span>
                </div>
                <Badge
                  variant={settings.whatsappEnabled ? "default" : "secondary"}
                  className="text-xs"
                >
                  {settings.whatsappEnabled ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  <span className="text-sm font-medium">SMS</span>
                </div>
                <Badge
                  variant={settings.smsEnabled ? "default" : "secondary"}
                  className="text-xs"
                >
                  {settings.smsEnabled ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔔</span>
                  <span className="text-sm font-medium">Push</span>
                </div>
                <Badge
                  variant={settings.pushEnabled ? "default" : "secondary"}
                  className="text-xs"
                >
                  {settings.pushEnabled ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Configurações de Lembrete
            </CardTitle>
            <CardDescription>
              Configurações de lembretes automáticos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Lembretes Ativos</span>
                <Badge
                  variant={settings.reminderEnabled ? "default" : "secondary"}
                  className="text-xs"
                >
                  {settings.reminderEnabled ? "Sim" : "Não"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Tempo de Antecedência
                </span>
                <span className="text-sm text-muted-foreground">
                  {settings.reminderTime} minutos
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Horário de Funcionamento
                </span>
                <span className="text-sm text-muted-foreground">
                  {settings.workingHours.start} - {settings.workingHours.end}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Fuso Horário</span>
                <span className="text-sm text-muted-foreground">
                  {settings.timezone}
                </span>
              </div>
            </div>
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
            Encontre agendamentos específicos para verificar notificações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Buscar por cliente, barbearia ou barbeiro..."
                className="w-full"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os canais</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="push">Push</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="sent">Enviado</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
                <SelectItem value="read">Lido</SelectItem>
                <SelectItem value="failed">Falhou</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="client">Cliente</SelectItem>
                <SelectItem value="barbershop">Barbearia</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Agendamentos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Agendamentos Recentes
          </CardTitle>
          <CardDescription>
            Últimos agendamentos que geraram notificações
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentBookings.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">
                Nenhum agendamento encontrado
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Não há agendamentos recentes no sistema.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Barbearia</TableHead>
                    <TableHead>Barbeiro</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Canais</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {booking.clientName}
                          </div>
                          {booking.clientPhone && (
                            <div className="text-sm text-muted-foreground">
                              📱 {booking.clientPhone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{booking.serviceName}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{booking.barbershopName}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{booking.workerName}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(booking.date)}
                          </div>
                          <div className="text-muted-foreground">
                            {formatDateTime(booking.createdAt)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {booking.hasEmail && (
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-xs text-blue-800"
                            >
                              📧 Email
                            </Badge>
                          )}
                          {booking.hasPhone && (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-xs text-green-800"
                            >
                              📱 WhatsApp
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="default"
                          className="bg-green-100 text-xs text-green-800"
                        >
                          ✅ Enviado
                        </Badge>
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

export default AdminNotificationsPage
