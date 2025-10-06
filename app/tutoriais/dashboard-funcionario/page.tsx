import { Metadata } from "next"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import {
  Shield,
  Smartphone,
  LogIn,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  ArrowLeft,
  Info,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Eye,
} from "lucide-react"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"

export const metadata: Metadata = {
  title: "Dashboard do Funcionário - Tutorial CorteZapp",
  description:
    "Aprenda a usar o sistema de login e dashboard para funcionários da barbearia",
}

export default function DashboardFuncionarioPage() {
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
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Dashboard do Funcionário</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge>Funcionários</Badge>
                <Badge variant="secondary">Leitura: 14 min</Badge>
                <Badge variant="secondary">Nível: Básico</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            Aprenda a usar o sistema de login e dashboard para funcionários da
            barbearia. Acesso via WhatsApp e visualização de estatísticas
            pessoais.
          </p>
        </div>

        {/* TL;DR */}
        <Alert className="mb-12 border-primary/20 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription>
            <strong className="font-bold">TL;DR (Resumo Rápido):</strong> Os
            funcionários acessam o sistema via login com telefone e código OTP
            enviado pelo WhatsApp. O dashboard mostra estatísticas pessoais,
            agendamentos do dia e informações do perfil.
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
                  1. Visão Geral do Sistema
                </a>
              </li>
              <li>
                <a
                  href="#login-funcionario"
                  className="text-primary hover:underline"
                >
                  2. Login do Funcionário
                </a>
              </li>
              <li>
                <a
                  href="#processo-autenticacao"
                  className="text-primary hover:underline"
                >
                  3. Processo de Autenticação
                </a>
              </li>
              <li>
                <a
                  href="#dashboard-principal"
                  className="text-primary hover:underline"
                >
                  4. Dashboard Principal
                </a>
              </li>
              <li>
                <a
                  href="#estatisticas"
                  className="text-primary hover:underline"
                >
                  5. Estatísticas Pessoais
                </a>
              </li>
              <li>
                <a
                  href="#agendamentos"
                  className="text-primary hover:underline"
                >
                  6. Agendamentos do Dia
                </a>
              </li>
              <li>
                <a href="#perfil" className="text-primary hover:underline">
                  7. Informações do Perfil
                </a>
              </li>
              <li>
                <a href="#dicas" className="text-primary hover:underline">
                  8. Dicas Importantes
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
              1. Visão Geral do Sistema
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 text-muted-foreground">
                  O sistema de funcionários do CorteZapp permite que barbeiros e
                  outros funcionários da barbearia acessem informações
                  específicas sobre seus atendimentos, estatísticas e
                  agendamentos.
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Características do sistema:
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-blue-900">
                        <Shield className="h-4 w-4" />
                        Login via WhatsApp
                      </strong>
                      <p className="text-xs text-blue-700">
                        Autenticação segura usando código OTP enviado pelo
                        WhatsApp
                      </p>
                    </div>

                    <div className="rounded-lg bg-green-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-green-900">
                        <Calendar className="h-4 w-4" />
                        Dashboard Personalizado
                      </strong>
                      <p className="text-xs text-green-700">
                        Visualização de dados específicos do funcionário
                      </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-purple-900">
                        <TrendingUp className="h-4 w-4" />
                        Estatísticas Pessoais
                      </strong>
                      <p className="text-xs text-purple-700">
                        Acompanhamento de performance e faturamento individual
                      </p>
                    </div>

                    <div className="rounded-lg bg-orange-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-orange-900">
                        <Users className="h-4 w-4" />
                        Agendamentos do Dia
                      </strong>
                      <p className="text-xs text-orange-700">
                        Lista de clientes e serviços agendados para hoje
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Importante:</strong> O acesso é restrito apenas aos
                    funcionários cadastrados na barbearia. Cada funcionário vê
                    apenas suas próprias informações.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section id="login-funcionario">
            <h2 className="mb-6 text-3xl font-bold">2. Login do Funcionário</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <LogIn className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Acesso via WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">
                      Sistema de autenticação em duas etapas
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Elementos da tela de login:
                  </h4>
                  <div className="space-y-4">
                    {/* Título */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Título &quot;Login do Barbeiro&quot;
                        </strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Identificação clara da funcionalidade
                      </p>
                    </div>

                    {/* Descrição */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Descrição Dinâmica</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Muda conforme a etapa: solicitação ou verificação
                      </p>
                    </div>

                    {/* Campo Telefone */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Campo de Telefone</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Formato: +5585999999999 (com código do país e DDD)
                      </p>
                    </div>

                    {/* Botão Enviar */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Botão &quot;Enviar Código&quot;
                        </strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Inicia o processo de autenticação
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Formato do telefone:</strong> Use sempre o formato
                    internacional: +55 (código do Brasil) + DDD + número.
                    Exemplo: +5585999999999.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section id="processo-autenticacao">
            <h2 className="mb-6 text-3xl font-bold">
              3. Processo de Autenticação
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Duas etapas de segurança</h3>
                    <p className="text-sm text-muted-foreground">
                      Verificação via código OTP no WhatsApp
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Etapas do processo:</h4>
                  <div className="space-y-4">
                    {/* Etapa 1 */}
                    <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                          1
                        </div>
                        <strong className="text-sm text-blue-900">
                          Solicitação do Código
                        </strong>
                      </div>
                      <p className="text-xs text-blue-700">
                        Digite o número de telefone e clique em &quot;Enviar
                        Código&quot;. O sistema enviará um código de 6 dígitos
                        via WhatsApp.
                      </p>
                    </div>

                    {/* Etapa 2 */}
                    <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                          2
                        </div>
                        <strong className="text-sm text-green-900">
                          Verificação do Código
                        </strong>
                      </div>
                      <p className="text-xs text-green-700">
                        Digite o código de 6 dígitos recebido no WhatsApp e
                        clique em &quot;Verificar Código&quot; para acessar o
                        dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Recursos de segurança:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">
                        <strong>Expiração:</strong> Código válido por 5 minutos
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>Validação:</strong> Apenas números, máximo 6
                        dígitos
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">
                        <strong>Segurança:</strong> Verificação em tempo real
                      </span>
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Dica:</strong> Se não receber o código, verifique se
                    o número está correto e se o WhatsApp está funcionando. Você
                    pode voltar e tentar novamente.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section id="dashboard-principal">
            <h2 className="mb-6 text-3xl font-bold">4. Dashboard Principal</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-3">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Interface principal</h3>
                    <p className="text-sm text-muted-foreground">
                      Tela inicial após o login bem-sucedido
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Elementos do dashboard:
                  </h4>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Header com Perfil</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Foto, nome do funcionário, nome da barbearia e botão de
                        logout
                      </p>
                    </div>

                    {/* Cards de Estatísticas */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          4 Cards de Estatísticas
                        </strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Agendamentos hoje, semana, faturamento e avaliação média
                      </p>
                    </div>

                    {/* Agendamentos */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Próximos Agendamentos
                        </strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Lista dos clientes e serviços agendados para hoje
                      </p>
                    </div>

                    {/* Informações Pessoais */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Informações do Perfil
                        </strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Dados pessoais e botão para editar perfil
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-purple-200 bg-purple-50">
                  <Info className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>Tema escuro:</strong> O dashboard usa tema escuro
                    por padrão para melhor visualização e economia de bateria em
                    dispositivos móveis.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section id="estatisticas">
            <h2 className="mb-6 text-3xl font-bold">
              5. Estatísticas Pessoais
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-100 p-3">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Métricas de performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Acompanhamento individual de resultados
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Cards de estatísticas:</h4>
                  <div className="space-y-4">
                    {/* Agendamentos Hoje */}
                    <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <strong className="text-sm text-blue-900">
                          Agendamentos Hoje
                        </strong>
                      </div>
                      <p className="text-xs text-blue-700">
                        Número de clientes agendados para hoje. Mostra também a
                        variação em relação ao dia anterior.
                      </p>
                    </div>

                    {/* Esta Semana */}
                    <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <strong className="text-sm text-green-900">
                          Esta Semana
                        </strong>
                      </div>
                      <p className="text-xs text-green-700">
                        Total de agendamentos da semana atual. Inclui comparação
                        percentual com a semana anterior.
                      </p>
                    </div>

                    {/* Faturamento */}
                    <div className="rounded-lg border-2 border-purple-300 bg-purple-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                        <strong className="text-sm text-purple-900">
                          Faturamento
                        </strong>
                      </div>
                      <p className="text-xs text-purple-700">
                        Valor total faturado no mês atual. Mostra apenas os
                        serviços realizados pelo funcionário.
                      </p>
                    </div>

                    {/* Avaliação Média */}
                    <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                        <strong className="text-sm text-orange-900">
                          Avaliação Média
                        </strong>
                      </div>
                      <p className="text-xs text-orange-700">
                        Nota média recebida dos clientes. Baseada no total de
                        atendimentos do mês.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-emerald-200 bg-emerald-50">
                  <Info className="h-4 w-4 text-emerald-600" />
                  <AlertDescription className="text-emerald-800">
                    <strong>Dados em tempo real:</strong> As estatísticas são
                    atualizadas automaticamente conforme novos agendamentos e
                    avaliações são registrados.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section id="agendamentos">
            <h2 className="mb-6 text-3xl font-bold">6. Agendamentos do Dia</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-100 p-3">
                    <Calendar className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Lista de clientes</h3>
                    <p className="text-sm text-muted-foreground">
                      Agendamentos específicos para o dia atual
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Informações dos agendamentos:
                  </h4>
                  <div className="space-y-4">
                    {/* Cliente */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Nome do Cliente</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nome completo do cliente agendado
                      </p>
                    </div>

                    {/* Serviços */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Serviços Solicitados
                        </strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Lista dos serviços (ex: Corte + Barba, Apenas Corte)
                      </p>
                    </div>

                    {/* Horário */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Horário do Agendamento
                        </strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Hora exata do atendimento (ex: 14:30, 16:00)
                      </p>
                    </div>

                    {/* Status Visual */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-blue-100"></div>
                        <strong className="text-sm">Indicador Visual</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Cores diferentes para identificar tipos de serviços ou
                        status dos agendamentos
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-indigo-200 bg-indigo-50">
                  <Info className="h-4 w-4 text-indigo-600" />
                  <AlertDescription className="text-indigo-800">
                    <strong>Organização:</strong> Os agendamentos são exibidos
                    em ordem cronológica, facilitando o planejamento da agenda
                    do funcionário.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section id="perfil">
            <h2 className="mb-6 text-3xl font-bold">
              7. Informações do Perfil
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-teal-100 p-3">
                    <Shield className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Dados pessoais</h3>
                    <p className="text-sm text-muted-foreground">
                      Informações do funcionário e da barbearia
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Informações exibidas:</h4>
                  <div className="space-y-4">
                    {/* Foto e Nome */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Foto e Nome</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Foto de perfil e nome completo do funcionário
                      </p>
                    </div>

                    {/* Barbearia */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Nome da Barbearia</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Estabelecimento onde o funcionário trabalha
                      </p>
                    </div>

                    {/* Telefone */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Telefone</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Número de telefone cadastrado (se disponível)
                      </p>
                    </div>

                    {/* Email */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Email</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Endereço de email cadastrado (se disponível)
                      </p>
                    </div>

                    {/* Botão Editar */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Botão &quot;Editar Perfil&quot;
                        </strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Permite modificar informações pessoais
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-teal-200 bg-teal-50">
                  <Info className="h-4 w-4 text-teal-600" />
                  <AlertDescription className="text-teal-800">
                    <strong>Funcionalidade futura:</strong> O botão &quot;Editar
                    Perfil&quot; está preparado para futuras implementações de
                    edição de dados pessoais.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 8 */}
          <section id="dicas">
            <h2 className="mb-6 text-3xl font-bold">8. Dicas Importantes</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Melhores práticas:</h4>
                  <div className="space-y-4">
                    {/* Dica 1 */}
                    <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="mt-1 h-5 w-5 text-blue-600" />
                        <div>
                          <h5 className="font-semibold text-blue-900">
                            Mantenha o telefone atualizado
                          </h5>
                          <p className="text-sm text-blue-800">
                            Certifique-se de que o número cadastrado está
                            correto e com WhatsApp ativo para receber os códigos
                            de acesso.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dica 2 */}
                    <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="mt-1 h-5 w-5 text-green-600" />
                        <div>
                          <h5 className="font-semibold text-green-900">
                            Acesse regularmente
                          </h5>
                          <p className="text-sm text-green-800">
                            Verifique seus agendamentos diariamente para se
                            preparar adequadamente para os atendimentos.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dica 3 */}
                    <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="mt-1 h-5 w-5 text-purple-600" />
                        <div>
                          <h5 className="font-semibold text-purple-900">
                            Monitore suas estatísticas
                          </h5>
                          <p className="text-sm text-purple-800">
                            Acompanhe seu desempenho através das métricas para
                            identificar oportunidades de melhoria.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dica 4 */}
                    <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="mt-1 h-5 w-5 text-orange-600" />
                        <div>
                          <h5 className="font-semibold text-orange-900">
                            Faça logout ao terminar
                          </h5>
                          <p className="text-sm text-orange-800">
                            Sempre clique em &quot;Sair&quot; quando terminar de
                            usar o sistema, especialmente em dispositivos
                            compartilhados.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dica 5 */}
                    <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="mt-1 h-5 w-5 text-red-600" />
                        <div>
                          <h5 className="font-semibold text-red-900">
                            Código expira rapidamente
                          </h5>
                          <p className="text-sm text-red-800">
                            O código OTP expira em 5 minutos. Se não conseguir
                            acessar a tempo, solicite um novo código.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Segurança:</strong> Nunca compartilhe códigos de
                    acesso com outras pessoas. O sistema é pessoal e individual
                    para cada funcionário.
                  </AlertDescription>
                </Alert>
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
            <Link href="/tutoriais/gerenciar-transacoes">
              <Button size="lg" variant="ghost">
                Gerenciar Transações
              </Button>
            </Link>
          </div>
        </div>

        {/* Help CTA */}
        <Card className="mt-8 border-2">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Dúvidas sobre o Dashboard do Funcionário?
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
