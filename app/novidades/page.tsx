import { Metadata } from "next"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Badge } from "@/app/_components/ui/badge"
import {
  Calendar,
  Clock,
  Star,
  Zap,
  Shield,
  Users,
  Bell,
  Database,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Novidades - CorteZapp",
  description:
    "Acompanhe as últimas atualizações e melhorias do sistema CorteZapp",
}

interface UpdateItem {
  id: string
  title: string
  description: string
  date: string
  version: string
  type: "feature" | "improvement" | "fix" | "security"
  icon: React.ComponentType<{ className?: string }>
  highlights: string[]
}

const updates: UpdateItem[] = [
  {
    id: "9",
    title: "Novos Tutoriais: Transações e Dashboard do Funcionário",
    description:
      "Adicionamos dois novos tutoriais completos para ajudar você a dominar o controle financeiro e o sistema de funcionários do CorteZapp.",
    date: "2025-10-06",
    version: "v2.3.0",
    type: "feature",
    icon: Database,
    highlights: [
      "Tutorial completo de Gerenciar Transações",
      "Tutorial detalhado do Dashboard do Funcionário",
      "Guia passo a passo para login via WhatsApp",
      "Explicação de todas as estatísticas pessoais",
      "Dicas de segurança e melhores práticas",
      "Categorização organizada por funcionalidade",
    ],
  },
  {
    id: "8",
    title: "Sistema de Transações Financeiras Completo",
    description:
      "Implementamos um sistema completo para gerenciar todas as transações financeiras da barbearia com categorização e métodos de pagamento.",
    date: "2025-10-06",
    version: "v2.2.2",
    type: "feature",
    icon: Database,
    highlights: [
      "Registro de receitas, despesas e investimentos",
      "Categorização automática de transações",
      "Múltiplos métodos de pagamento (PIX, cartões, dinheiro)",
      "Controle de datas e valores monetários",
      "Edição e exclusão de transações",
      "Validações de segurança integradas",
    ],
  },
  {
    id: "7",
    title: "Painel do Funcionário com Login via WhatsApp",
    description:
      "Agora os funcionários têm acesso ao seu próprio painel personalizado com login seguro via WhatsApp e código de verificação.",
    date: "2025-10-06",
    version: "v2.2.0",
    type: "feature",
    icon: Users,
    highlights: [
      "Login seguro via WhatsApp com código de verificação",
      "Dashboard personalizado para cada funcionário",
      "Visualização de agendamentos do dia/semana/mês",
      "Controle de faturamento e estatísticas pessoais",
      "Interface intuitiva e responsiva",
      "Acesso rápido aos dados da barbearia",
    ],
  },
  {
    id: "6",
    title: "Sistema de Agendamento Dinâmico",
    description:
      "Implementamos um novo sistema de agendamento baseado na duração real dos serviços, tornando a agenda mais eficiente e flexível.",
    date: "2025-10-06",
    version: "v2.1.0",
    type: "feature",
    icon: Clock,
    highlights: [
      "Agendamento baseado na duração real dos serviços",
      "Horários de trabalho e intervalos configuráveis",
      "Validação automática de conflitos de horário",
      "Interface melhorada para seleção de horários",
    ],
  },
  {
    id: "5",
    title: "Validações de Segurança Aprimoradas",
    description:
      "Adicionamos validações robustas para prevenir agendamentos no passado e garantir a integridade dos dados.",
    date: "2025-10-05",
    version: "v2.0.5",
    type: "security",
    icon: Shield,
    highlights: [
      "Bloqueio de agendamentos em datas passadas",
      "Validação de horários em tempo real",
      "Prevenção de conflitos de agendamento",
      "Verificação de disponibilidade automática",
    ],
  },
  {
    id: "4",
    title: "Painel de Gestão Aprimorado",
    description:
      "Melhorias significativas no painel administrativo com novas funcionalidades de gestão de funcionários e relatórios.",
    date: "2025-10-04",
    version: "v2.0.3",
    type: "improvement",
    icon: Users,
    highlights: [
      "Exibição correta dos horários de trabalho",
      "Cálculo automático de faturamento mensal",
      "Interface de edição de funcionários atualizada",
      "Relatórios de performance melhorados",
    ],
  },
  {
    id: "3",
    title: "Sistema de Notificações Inteligente",
    description:
      "Novo sistema de notificações que envia lembretes automáticos para clientes e gestores.",
    date: "2025-10-03",
    version: "v2.0.2",
    type: "feature",
    icon: Bell,
    highlights: [
      "Lembretes automáticos de agendamentos",
      "Notificações de confirmação",
      "Alertas de cancelamento",
      "Integração com WhatsApp",
    ],
  },
  {
    id: "2",
    title: "Otimizações de Performance",
    description:
      "Melhorias significativas na velocidade e responsividade do sistema.",
    date: "2025-10-02",
    version: "v2.0.1",
    type: "improvement",
    icon: Zap,
    highlights: [
      "Carregamento 40% mais rápido",
      "Interface mais responsiva",
      "Otimização de consultas ao banco",
      "Cache inteligente implementado",
    ],
  },
  {
    id: "1",
    title: "Correções de Bugs Críticos",
    description:
      "Correção de problemas importantes que afetavam a estabilidade do sistema.",
    date: "2025-10-01",
    version: "v2.0.0",
    type: "fix",
    icon: Database,
    highlights: [
      "Correção na exibição de profissionais inativos",
      "Resolução de problemas de sincronização",
      "Correção de validações de formulário",
      "Melhoria na estabilidade geral",
    ],
  },
]

const getTypeColor = (type: UpdateItem["type"]) => {
  switch (type) {
    case "feature":
      return "bg-green-100 text-green-800 border-green-200"
    case "improvement":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "fix":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "security":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getTypeLabel = (type: UpdateItem["type"]) => {
  switch (type) {
    case "feature":
      return "Nova Funcionalidade"
    case "improvement":
      return "Melhoria"
    case "fix":
      return "Correção"
    case "security":
      return "Segurança"
    default:
      return "Atualização"
  }
}

export default function NovidadesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            🚀 Novidades do CorteZapp
          </h1>
          <p className="text-lg text-muted-foreground">
            Acompanhe as últimas atualizações e melhorias do nosso sistema
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Última Atualização</p>
                  <p className="text-xs text-muted-foreground">06 Oct 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Versão Atual</p>
                  <p className="text-xs text-muted-foreground">v2.3.0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Melhorias</p>
                  <p className="text-xs text-muted-foreground">
                    9 atualizações
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Impacto</p>
                  <p className="text-xs text-muted-foreground">
                    100% dos usuários ativos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Updates List */}
        <div className="space-y-6">
          {updates.map((update) => {
            const Icon = update.icon
            return (
              <Card key={update.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {update.title}
                        </CardTitle>
                        <div className="mt-2 flex items-center space-x-2">
                          <Badge className={getTypeColor(update.type)}>
                            {getTypeLabel(update.type)}
                          </Badge>
                          <Badge variant="outline">{update.version}</Badge>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{update.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="mb-4 text-muted-foreground">
                    {update.description}
                  </p>

                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      Principais melhorias:
                    </h4>
                    <ul className="space-y-1">
                      {update.highlights.map((highlight, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 text-sm"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-semibold">
                Mantenha-se Atualizado
              </h3>
              <p className="text-muted-foreground">
                Esta página é atualizada regularmente com as últimas novidades
                do CorteZapp. Fique de olho para não perder nenhuma melhoria!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
