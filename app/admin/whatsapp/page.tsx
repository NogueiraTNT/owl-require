import WhatsAppAdminManager from "@/app/_components/whatsapp-admin-manager"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"

const WhatsAppAdminPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">🔧 Gestão Central WhatsApp</h1>
          <p className="text-muted-foreground mt-2">
            Painel administrativo para gerenciar o WhatsApp de todo o sistema
            CorteZapp
          </p>
        </div>

        <div className="grid gap-6">
          {/* Card de Status */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <span>🎯</span>
                Sistema Centralizado
              </CardTitle>
              <CardDescription className="text-blue-700">
                Este é o painel CENTRAL de WhatsApp. Todas as notificações dos
                sistemas owl-barber e owl-dashboard passam por aqui.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-blue-700">
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                <div>
                  <strong>🏪 owl-barber:</strong> Notificações de agendamentos
                  para clientes
                </div>
                <div>
                  <strong>🎯 owl-dashboard:</strong> Notificações para donos de
                  barbearia
                </div>
                <div>
                  <strong>⚙️ owl-require:</strong> Controle administrativo (você
                  está aqui)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gerenciador WhatsApp */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📱</span>
                Controle WhatsApp Central
              </CardTitle>
              <CardDescription>
                Configure e monitore a conexão WhatsApp que atende todo o
                sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WhatsAppAdminManager />
            </CardContent>
          </Card>

          {/* Avisos importantes */}
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <span>⚠️</span>
                Avisos Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-amber-700">
              <p>
                <strong>🔐 Segurança:</strong> Apenas administradores do sistema
                devem ter acesso a esta página.
              </p>
              <p>
                <strong>📱 Responsabilidade:</strong> Este WhatsApp envia
                mensagens para TODOS os clientes do sistema.
              </p>
              <p>
                <strong>🚫 Banimento:</strong> Use com cuidado para evitar
                banimento do número.
              </p>
              <p>
                <strong>📊 Monitoramento:</strong> Todas as mensagens são
                logadas para auditoria.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default WhatsAppAdminPage
