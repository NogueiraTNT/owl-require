import { Metadata } from "next"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/_components/ui/card"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import {
  Bell,
  Mail,
  MessageSquare,
  Clock,
  Sun,
  ArrowLeft,
  CheckCircle,
  Info,
  Lightbulb,
  AlertCircle,
  Shield,
  Star,
  Crown,
  UserCheck,
  Users,
  Check,
  X,
} from "lucide-react"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"

export const metadata: Metadata = {
  title: "Configurar Notificações - Tutorial CorteZapp",
  description:
    "Aprenda a configurar notificações por email e WhatsApp para clientes, barbeiros e gestores",
}

export default function NotificacoesTutorialPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/tutoriais"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Tutoriais
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Configurar Notificações</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge>Notificações</Badge>
                <Badge variant="secondary">Leitura: 20 min</Badge>
                <Badge variant="secondary">Nível: Intermediário</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            Domine o sistema de notificações do CorteZapp. Configure alertas por
            email e WhatsApp para clientes, barbeiros e gestores. Entenda os
            limites de cada plano e maximize a comunicação com sua equipe e
            clientes.
          </p>
        </div>

        {/* TL;DR */}
        <Alert className="mb-12 border-primary/20 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription>
            <strong className="font-bold">TL;DR (Resumo Rápido):</strong> O
            sistema de notificações permite enviar alertas automáticos por email
            e WhatsApp. Você configura separadamente para clientes, barbeiros e
            dono da barbearia. Há lembretes 1h antes e diários às 8h. BASIC não
            tem notificações, PRO tem email, PREMIUM tem email + WhatsApp.
          </AlertDescription>
        </Alert>

        {/* Table of Contents */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Índice do Tutorial</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#visao-geral" className="text-primary hover:underline">
                  1. Visão Geral das Notificações
                </a>
              </li>
              <li>
                <a
                  href="#limites-plano"
                  className="text-primary hover:underline"
                >
                  2. Limites por Plano
                </a>
              </li>
              <li>
                <a href="#acesso" className="text-primary hover:underline">
                  3. Acessar Configurações
                </a>
              </li>
              <li>
                <a href="#cliente" className="text-primary hover:underline">
                  4. Notificações para Cliente
                </a>
              </li>
              <li>
                <a href="#barbeiro" className="text-primary hover:underline">
                  5. Notificações para Barbeiro
                </a>
              </li>
              <li>
                <a href="#dono" className="text-primary hover:underline">
                  6. Notificações para Dono
                </a>
              </li>
              <li>
                <a href="#lembretes" className="text-primary hover:underline">
                  7. Lembretes Automáticos
                </a>
              </li>
              <li>
                <a href="#salvar" className="text-primary hover:underline">
                  8. Salvar Configurações
                </a>
              </li>
              <li>
                <a
                  href="#boas-praticas"
                  className="text-primary hover:underline"
                >
                  9. Boas Práticas
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Section 1 */}
          <section id="visao-geral">
            <h2 className="mb-6 text-3xl font-bold">
              1. Visão Geral das Notificações
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 text-muted-foreground">
                  O sistema de notificações do CorteZapp automatiza toda a
                  comunicação relacionada a agendamentos. Você controla
                  exatamente quem recebe o quê, quando e por qual canal (email
                  ou WhatsApp).
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Tipos de notificações disponíveis:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-blue-600" />
                      <div>
                        <strong className="text-sm text-blue-900">
                          Confirmação de Agendamento
                        </strong>
                        <p className="text-xs text-blue-700">
                          Enviada imediatamente quando um agendamento é criado
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg bg-green-50 p-3">
                      <Clock className="mt-0.5 h-5 w-5 text-green-600" />
                      <div>
                        <strong className="text-sm text-green-900">
                          Lembrete 1 Hora Antes
                        </strong>
                        <p className="text-xs text-green-700">
                          Enviado automaticamente 1 hora antes do horário
                          marcado
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg bg-orange-50 p-3">
                      <Sun className="mt-0.5 h-5 w-5 text-orange-600" />
                      <div>
                        <strong className="text-sm text-orange-900">
                          Lembrete Diário (8h da manhã)
                        </strong>
                        <p className="text-xs text-orange-700">
                          Enviado às 8h para quem tem agendamento no dia
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Quem pode receber:</h4>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-lg border-2 p-3 text-center">
                      <Users className="mx-auto mb-2 h-6 w-6 text-primary" />
                      <strong className="text-sm">Cliente</strong>
                      <p className="text-xs text-muted-foreground">
                        Quem agendou o serviço
                      </p>
                    </div>

                    <div className="rounded-lg border-2 p-3 text-center">
                      <UserCheck className="mx-auto mb-2 h-6 w-6 text-primary" />
                      <strong className="text-sm">Barbeiro</strong>
                      <p className="text-xs text-muted-foreground">
                        Profissional que vai atender
                      </p>
                    </div>

                    <div className="rounded-lg border-2 p-3 text-center">
                      <Shield className="mx-auto mb-2 h-6 w-6 text-primary" />
                      <strong className="text-sm">Dono</strong>
                      <p className="text-xs text-muted-foreground">
                        Gestor da barbearia
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Importante:</strong> Cada tipo de destinatário
                    (cliente, barbeiro, dono) tem configurações independentes.
                    Você pode ativar email para clientes e WhatsApp para
                    barbeiros, por exemplo.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section id="limites-plano">
            <h2 className="mb-6 text-3xl font-bold">2. Limites por Plano</h2>

            <div className="mb-6 grid gap-6 md:grid-cols-3">
              {/* Plano BASIC */}
              <Card className="border-2 border-gray-300">
                <CardHeader className="bg-gray-100">
                  <div className="flex items-center justify-between">
                    <CardTitle>BASIC</CardTitle>
                    <Shield className="h-5 w-5 text-gray-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <X className="h-4 w-4 text-red-500" />
                      <span>Sem email</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <X className="h-4 w-4 text-red-500" />
                      <span>Sem WhatsApp</span>
                    </div>
                  </div>
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-xs text-red-800">
                      Notificações automáticas não disponíveis neste plano
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Plano PRO */}
              <Card className="border-2 border-blue-500">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-blue-900">PRO</CardTitle>
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Email ativado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <X className="h-4 w-4 text-red-500" />
                      <span>Sem WhatsApp</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-2 text-xs text-blue-700">
                    Notificações por email para todos
                  </div>
                </CardContent>
              </Card>

              {/* Plano PREMIUM */}
              <Card className="border-2 border-yellow-500">
                <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-yellow-900">PREMIUM</CardTitle>
                    <Crown className="h-5 w-5 text-yellow-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Email ativado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="font-medium">WhatsApp ativado</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 p-2 text-xs text-yellow-800">
                    Notificações completas por ambos os canais
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h4 className="mb-4 font-semibold">
                  Como os limites funcionam:
                </h4>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <strong className="mb-2 block text-sm">
                      Plano BASIC - Sem Acesso
                    </strong>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Você verá uma tela informando que precisa de um plano
                      ativo para acessar as configurações de notificações. Um
                      botão &quot;Ver Planos&quot; direciona para a página de
                      assinatura.
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-4">
                    <strong className="mb-2 block text-sm">
                      Plano PRO - Email Liberado
                    </strong>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Todos os switches de email ficam ativos e funcionais. Os
                      switches de WhatsApp aparecem desabilitados (cinza) com um
                      aviso amarelo informando que WhatsApp é exclusivo do
                      Premium.
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-4">
                    <strong className="mb-2 block text-sm">
                      Plano PREMIUM - Tudo Liberado
                    </strong>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Todos os switches (email E WhatsApp) ficam ativos. Você
                      tem controle total sobre todas as notificações disponíveis
                      no sistema.
                    </p>
                  </div>
                </div>

                <Alert className="mt-6 border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Upgrade de Plano:</strong> Se você tentar ativar uma
                    funcionalidade bloqueada, verá um aviso explicando qual
                    plano é necessário e um link para fazer upgrade.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section id="acesso">
            <h2 className="mb-6 text-3xl font-bold">
              3. Acessar Configurações
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Como acessar:</h4>
                  <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">1.</span>
                      <p className="text-sm">
                        No menu lateral ou superior, localize a opção
                        &quot;Notificações&quot;
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">2.</span>
                      <p className="text-sm">
                        Clique para entrar na página de configurações
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">3.</span>
                      <p className="text-sm">
                        Você verá um card mostrando seu plano atual e suas
                        permissões
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">4.</span>
                      <p className="text-sm">
                        Abaixo estão os 5 cards de configurações
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-lg border-2 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <strong className="text-sm">Plano Pro</strong>
                      <p className="text-xs text-muted-foreground">
                        Notificações por email
                      </p>
                    </div>
                    <Badge className="bg-green-500">Ativo</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Este card sempre aparece no topo mostrando seu plano e
                    status
                  </p>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Primeira vez:</strong> Se nunca configurou antes,
                    todas as opções vêm com valores padrão (geralmente ativadas,
                    se o plano permitir). Você pode ajustar conforme sua
                    preferência.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section id="cliente">
            <h2 className="mb-6 text-3xl font-bold">
              4. Notificações para Cliente
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Configurações para quem agenda
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Controle como seus clientes receberão confirmações e
                      lembretes
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Opções disponíveis:</h4>
                  <div className="space-y-4">
                    {/* Email Cliente */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <strong className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4" />
                            Email para Cliente
                          </strong>
                          <p className="text-xs text-muted-foreground">
                            Enviar confirmação de agendamento por email
                          </p>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-primary" />
                      </div>
                      <div className="rounded bg-blue-50 p-3 text-xs text-blue-700">
                        <strong>Quando ativa:</strong> Assim que um agendamento
                        é criado, o cliente recebe um email com detalhes
                        (serviço, profissional, data, hora, local).
                      </div>
                      <div className="mt-2 rounded bg-gray-50 p-3 text-xs text-gray-700">
                        <strong>Plano necessário:</strong> PRO ou PREMIUM
                      </div>
                    </div>

                    {/* WhatsApp Cliente */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <strong className="flex items-center gap-2 text-sm">
                            <MessageSquare className="h-4 w-4" />
                            WhatsApp para Cliente
                          </strong>
                          <p className="text-xs text-muted-foreground">
                            Enviar confirmação de agendamento por WhatsApp
                          </p>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-primary" />
                      </div>
                      <div className="rounded bg-green-50 p-3 text-xs text-green-700">
                        <strong>Quando ativa:</strong> O cliente recebe uma
                        mensagem no WhatsApp com os mesmos detalhes do email, de
                        forma mais direta e imediata.
                      </div>
                      <div className="mt-2 rounded bg-yellow-50 p-3 text-xs text-yellow-800">
                        <strong>Plano necessário:</strong> PREMIUM apenas
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                  <h4 className="mb-3 font-semibold text-blue-900">
                    Exemplo de fluxo completo:
                  </h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>
                      1. Cliente agenda um corte pelo app para amanhã às 14h
                    </p>
                    <p>
                      2. <strong>Imediatamente:</strong> Recebe email de
                      confirmação (se ativo)
                    </p>
                    <p>
                      3. <strong>Imediatamente:</strong> Recebe WhatsApp de
                      confirmação (se ativo)
                    </p>
                    <p>
                      4. <strong>Amanhã às 8h:</strong> Recebe lembrete diário
                      (se ativo)
                    </p>
                    <p>
                      5. <strong>Amanhã às 13h:</strong> Recebe lembrete 1h
                      antes (se ativo)
                    </p>
                  </div>
                </div>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Recomendação:</strong> Mantenha pelo menos uma das
                    opções ativa. Clientes que recebem lembretes têm muito menos
                    chance de esquecer o horário (reduz no-show em até 70%!).
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section id="barbeiro">
            <h2 className="mb-6 text-3xl font-bold">
              5. Notificações para Barbeiro
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-3">
                    <UserCheck className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Alertas para sua equipe</h3>
                    <p className="text-sm text-muted-foreground">
                      Mantenha seus profissionais informados sobre novos
                      agendamentos
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Opções disponíveis:</h4>
                  <div className="space-y-4">
                    {/* Email Barbeiro */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <strong className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4" />
                            Email para Barbeiro
                          </strong>
                          <p className="text-xs text-muted-foreground">
                            Notificar barbeiro sobre novos agendamentos por
                            email
                          </p>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-primary" />
                      </div>
                      <div className="rounded bg-purple-50 p-3 text-xs text-purple-700">
                        <strong>Quando ativa:</strong> Quando um cliente marca
                        horário com este barbeiro, ele recebe um email com os
                        detalhes (cliente, serviço, data, hora).
                      </div>
                    </div>

                    {/* WhatsApp Barbeiro */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <strong className="flex items-center gap-2 text-sm">
                            <MessageSquare className="h-4 w-4" />
                            WhatsApp para Barbeiro
                          </strong>
                          <p className="text-xs text-muted-foreground">
                            Notificar barbeiro sobre novos agendamentos por
                            WhatsApp
                          </p>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-primary" />
                      </div>
                      <div className="rounded bg-green-50 p-3 text-xs text-green-700">
                        <strong>Quando ativa:</strong> Notificação instantânea
                        no WhatsApp, ideal para barbeiros que trabalham e não
                        checam email com frequência.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Por que é importante:</h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>
                        Barbeiro fica sabendo imediatamente de novos clientes
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>
                        Pode se preparar e organizar materiais com antecedência
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>
                        Reduz surpresas e melhora organização da agenda
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>
                        Profissional se sente mais integrado ao sistema
                      </span>
                    </p>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Requisito:</strong> Para receber notificações, o
                    barbeiro precisa ter email e/ou telefone cadastrados no
                    sistema (na página de Funcionários).
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section id="dono">
            <h2 className="mb-6 text-3xl font-bold">
              6. Notificações para Dono
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-3">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Fique por dentro de tudo</h3>
                    <p className="text-sm text-muted-foreground">
                      Receba cópias de todos os agendamentos da sua barbearia
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Opções disponíveis:</h4>
                  <div className="space-y-4">
                    {/* Email Dono */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <strong className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4" />
                            Email para Dono
                          </strong>
                          <p className="text-xs text-muted-foreground">
                            Receber notificações sobre agendamentos por email
                          </p>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-primary" />
                      </div>
                      <div className="rounded bg-orange-50 p-3 text-xs text-orange-700">
                        <strong>Quando ativa:</strong> Você recebe um email para
                        CADA novo agendamento, independente de qual barbeiro ou
                        serviço.
                      </div>
                    </div>

                    {/* WhatsApp Dono */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <strong className="flex items-center gap-2 text-sm">
                            <MessageSquare className="h-4 w-4" />
                            WhatsApp para Dono
                          </strong>
                          <p className="text-xs text-muted-foreground">
                            Receber notificações sobre agendamentos por WhatsApp
                          </p>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-gray-300" />
                      </div>
                      <div className="rounded bg-gray-50 p-3 text-xs text-gray-700">
                        <strong>Quando ativa:</strong> Notificação instantânea
                        no seu WhatsApp para cada novo agendamento.
                      </div>
                      <div className="mt-2 rounded bg-yellow-50 p-3 text-xs text-yellow-800">
                        ⚠️ <strong>Atenção:</strong> Se sua barbearia tem muitos
                        agendamentos por dia, você pode receber MUITAS
                        mensagens. Considere deixar apenas o email ativo.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 p-4">
                  <h4 className="mb-3 font-semibold text-orange-900">
                    Cenários de uso:
                  </h4>
                  <div className="space-y-3 text-sm text-orange-800">
                    <div>
                      <strong>Barbearia pequena (1-2 barbeiros):</strong>
                      <p className="text-xs">
                        Recomendado ATIVAR. Você fica sabendo de tudo e pode
                        acompanhar de perto.
                      </p>
                    </div>
                    <div>
                      <strong>Barbearia média (3-5 barbeiros):</strong>
                      <p className="text-xs">
                        Considere APENAS EMAIL. WhatsApp pode ser demais.
                      </p>
                    </div>
                    <div>
                      <strong>Barbearia grande (6+ barbeiros):</strong>
                      <p className="text-xs">
                        Considere DESATIVAR ou usar apenas relatórios diários no
                        dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Dica de Gestão:</strong> Se você quer acompanhar mas
                    não quer tantas notificações, mantenha apenas o email do
                    dono ativo e configure um filtro na sua caixa de entrada
                    para organizar automaticamente.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section id="lembretes">
            <h2 className="mb-6 text-3xl font-bold">
              7. Lembretes Automáticos
            </h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Lembrete 1 Hora Antes
                </CardTitle>
                <CardDescription>
                  Enviado automaticamente 60 minutos antes do horário marcado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                  <strong className="mb-2 block text-sm text-blue-900">
                    Como funciona:
                  </strong>
                  <p className="mb-3 text-sm text-blue-800">
                    Se um cliente tem agendamento às 15h, ele receberá o
                    lembrete às 14h (exatamente 1 hora antes).
                  </p>
                  <div className="space-y-1 text-xs text-blue-700">
                    <p>• Exemplo 1: Agendamento às 09:00 → Lembrete às 08:00</p>
                    <p>• Exemplo 2: Agendamento às 14:30 → Lembrete às 13:30</p>
                    <p>• Exemplo 3: Agendamento às 18:00 → Lembrete às 17:00</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <strong className="text-sm">Opções de canal:</strong>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <strong className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4" />
                        Email de Lembrete 1h
                      </strong>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Mais formal, vai para a caixa de entrada
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <strong className="flex items-center gap-2 text-sm">
                        <MessageSquare className="h-4 w-4" />
                        WhatsApp de Lembrete 1h
                      </strong>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Mais imediato, notificação no celular
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Eficiência comprovada:</strong> Lembretes 1h antes
                    reduzem no-show em até 70%! É uma das funcionalidades mais
                    valiosas do sistema.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Lembrete Diário (8h da manhã)
                </CardTitle>
                <CardDescription>
                  Enviado às 8h para quem tem agendamento no dia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50 p-4">
                  <strong className="mb-2 block text-sm text-orange-900">
                    Como funciona:
                  </strong>
                  <p className="mb-3 text-sm text-orange-800">
                    Todos os dias às 8h da manhã, o sistema verifica quem tem
                    agendamento naquele dia e envia um lembrete.
                  </p>
                  <div className="space-y-1 text-xs text-orange-700">
                    <p>• Agendamento às 10h → Recebe lembrete às 8h</p>
                    <p>• Agendamento às 15h → Recebe lembrete às 8h</p>
                    <p>• Agendamento às 19h → Recebe lembrete às 8h</p>
                    <p className="mt-2 font-medium">
                      Ou seja: sempre às 8h, independente da hora do agendamento
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <strong className="text-sm">Opções de canal:</strong>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <strong className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4" />
                        Email Diário
                      </strong>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Lembrete matinal na caixa de entrada
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <strong className="flex items-center gap-2 text-sm">
                        <MessageSquare className="h-4 w-4" />
                        WhatsApp Diário
                      </strong>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Notificação matinal no celular
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Estratégia Dupla:</strong> Muitos estabelecimentos
                    ativam AMBOS os lembretes (1h antes + diário). Isso garante
                    que o cliente seja lembrado pela manhã E próximo do horário.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 8 */}
          <section id="salvar">
            <h2 className="mb-6 text-3xl font-bold">8. Salvar Configurações</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Aplicar suas alterações</h3>
                    <p className="text-sm text-muted-foreground">
                      Depois de configurar tudo, não esqueça de salvar!
                    </p>
                  </div>
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <p className="text-sm">
                      Depois de ativar/desativar os switches desejados, role até
                      o final da página
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <p className="text-sm">
                      Clique no botão verde &quot;Salvar Configurações&quot; no
                      canto inferior direito
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <p className="text-sm">
                      O botão mudará para &quot;Salvando...&quot; enquanto
                      processa
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <p className="text-sm">
                      Uma notificação verde aparecerá confirmando:
                      &quot;Configurações salvas com sucesso!&quot;
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">5.</span>
                    <p className="text-sm">
                      Pronto! As configurações já estão ativas e funcionando
                    </p>
                  </div>
                </div>

                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>IMPORTANTE:</strong> Se você sair da página sem
                    clicar em &quot;Salvar&quot;, suas alterações serão
                    perdidas! O sistema NÃO salva automaticamente.
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="mb-3 font-semibold">
                    As configurações funcionam imediatamente:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>
                        Novos agendamentos já seguem as regras que você
                        configurou
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>
                        Lembretes agendados anteriormente continuam como estavam
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>Você pode voltar e alterar quando quiser</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 9 */}
          <section id="boas-praticas">
            <h2 className="mb-6 text-3xl font-bold">9. Boas Práticas</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Recomendações Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>
                    • Ative pelo menos uma forma de notificação para clientes
                  </p>
                  <p>• Mantenha lembretes 1h antes sempre ativos</p>
                  <p>• Email é mais confiável que WhatsApp (menos falhas)</p>
                  <p>• Teste as notificações após configurar</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Para Clientes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Ative confirmação imediata (email ou WhatsApp)</p>
                  <p>• Ative lembrete 1h antes (essencial!)</p>
                  <p>• Considere lembrete diário para reduzir no-show</p>
                  <p>• WhatsApp tem maior taxa de abertura</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-purple-500" />
                    Para Barbeiros
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Ative notificações imediatas (saberão na hora)</p>
                  <p>• WhatsApp é mais eficiente para profissionais ativos</p>
                  <p>• Certifique-se que os contatos estão cadastrados</p>
                  <p>• Explique para a equipe como funciona</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-500" />
                    Para Dono
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Avalie a quantidade de agendamentos por dia</p>
                  <p>• Se mais de 20/dia, considere apenas email</p>
                  <p>• Configure filtros de email para organizar</p>
                  <p>• Use dashboard para visão geral diária</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Reference */}
          <section>
            <h2 className="mb-6 text-3xl font-bold">Referência Rápida</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold">
                      Tipos de Notificação:
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>• Confirmação imediata</p>
                      <p>• Lembrete 1h antes</p>
                      <p>• Lembrete diário (8h)</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold">Destinatários:</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Cliente (quem agendou)</p>
                      <p>• Barbeiro (profissional)</p>
                      <p>• Dono (gestor)</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold">Canais Disponíveis:</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Email (PRO e PREMIUM)</p>
                      <p>• WhatsApp (PREMIUM apenas)</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold">Lembre-se:</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Sempre salve após configurar</p>
                      <p>• Teste antes de confiar 100%</p>
                      <p>• Revise mensalmente</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 flex items-center justify-between border-t pt-8">
          <Link href="/tutoriais">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Tutoriais
            </Button>
          </Link>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Tutorial anterior</p>
            <Link href="/tutoriais/gestao-funcionarios">
              <Button size="lg" variant="ghost">
                Gestão de Funcionários
              </Button>
            </Link>
          </div>
        </div>

        {/* Help CTA */}
        <Card className="mt-8 border-2">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Dúvidas sobre Notificações?
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Nossa equipe está pronta para ajudar você
            </p>
            <Button size="lg">Falar com Suporte</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
