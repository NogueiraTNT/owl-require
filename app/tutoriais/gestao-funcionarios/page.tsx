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
  Users,
  UserPlus,
  Clock,
  Phone,
  Mail,
  TrendingUp,
  ArrowLeft,
  CheckCircle,
  Info,
  Lightbulb,
  AlertCircle,
  Edit,
  Trash2,
  Power,
  Shield,
  Crown,
  Star,
  DollarSign,
  CalendarClock,
  Coffee,
  UserCheck,
} from "lucide-react"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"

export const metadata: Metadata = {
  title: "Gestão de Funcionários - Tutorial CorteZapp",
  description:
    "Aprenda a gerenciar sua equipe: adicionar, editar, configurar horários e acompanhar o desempenho",
}

export default function FuncionariosTutorialPage() {
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
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Gestão de Funcionários</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge>Gestão de Equipe</Badge>
                <Badge variant="secondary">Leitura: 18 min</Badge>
                <Badge variant="secondary">Nível: Iniciante</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            Gerencie sua equipe de forma profissional. Adicione funcionários,
            configure horários de trabalho, acompanhe o faturamento individual e
            mantenha tudo organizado. Entenda também os limites de cada plano.
          </p>
        </div>

        {/* TL;DR */}
        <Alert className="mb-12 border-primary/20 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription>
            <strong className="font-bold">TL;DR (Resumo Rápido):</strong> A
            página de Funcionários permite gerenciar toda sua equipe. Você pode
            adicionar novos profissionais (respeitando o limite do seu plano),
            configurar horários de trabalho, visualizar faturamento mensal,
            ativar/desativar funcionários e editar informações. Cada plano tem
            um limite: BASIC (1), PRO (5), PREMIUM (ilimitado).
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
                  1. Visão Geral da Página
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
                <a href="#adicionar" className="text-primary hover:underline">
                  3. Adicionar Funcionário
                </a>
              </li>
              <li>
                <a href="#cards" className="text-primary hover:underline">
                  4. Cards de Funcionários
                </a>
              </li>
              <li>
                <a href="#horarios" className="text-primary hover:underline">
                  5. Configurar Horários
                </a>
              </li>
              <li>
                <a href="#faturamento" className="text-primary hover:underline">
                  6. Acompanhar Faturamento
                </a>
              </li>
              <li>
                <a href="#editar" className="text-primary hover:underline">
                  7. Editar e Gerenciar
                </a>
              </li>
              <li>
                <a
                  href="#estado-vazio"
                  className="text-primary hover:underline"
                >
                  8. Estado Vazio
                </a>
              </li>
              <li>
                <a href="#dicas" className="text-primary hover:underline">
                  9. Dicas de Gestão de Equipe
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
              1. Visão Geral da Página
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 text-muted-foreground">
                  A página de Funcionários é o centro de controle da sua equipe.
                  Aqui você gerencia todos os profissionais que trabalham na sua
                  barbearia.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-bold">Indicador de Plano</h3>
                      <p className="text-sm text-muted-foreground">
                        Banner no topo mostrando seu plano atual e quantos
                        funcionários você pode adicionar
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-bold">Botão de Adicionar</h3>
                      <p className="text-sm text-muted-foreground">
                        Localizado no canto superior direito, ativo apenas se
                        você tiver espaço disponível no plano
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-bold">Grade de Cards</h3>
                      <p className="text-sm text-muted-foreground">
                        Grid responsivo mostrando todos os funcionários em cards
                        organizados
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="mt-6">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Organização Inteligente:</strong> Funcionários
                    ativos aparecem primeiro, seguidos pelos inativos.
                    Alfabeticamente ordenados por nome.
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
                    <CardTitle>Plano BASIC</CardTitle>
                    <Shield className="h-5 w-5 text-gray-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4 text-center">
                    <p className="text-4xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Funcionário</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Ideal para começar
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Perfeito para solo
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Recursos completos
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Plano PRO */}
              <Card className="border-2 border-blue-500">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-blue-900">Plano PRO</CardTitle>
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4 text-center">
                    <p className="text-4xl font-bold text-blue-600">5</p>
                    <p className="text-sm text-muted-foreground">
                      Funcionários
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Para pequenas equipes
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Crescimento moderado
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Melhor custo-benefício
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Plano PREMIUM */}
              <Card className="border-2 border-yellow-500">
                <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-yellow-900">
                      Plano PREMIUM
                    </CardTitle>
                    <Crown className="h-5 w-5 text-yellow-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4 text-center">
                    <p className="text-4xl font-bold text-yellow-600">∞</p>
                    <p className="text-sm text-muted-foreground">Ilimitado</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Sem limites de equipe
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Para grandes salões
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Máxima flexibilidade
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h4 className="mb-4 font-semibold">O que acontece:</h4>
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <strong className="text-sm text-blue-900">
                      Dentro do Limite
                    </strong>
                    <p className="mt-1 text-sm text-blue-700">
                      O botão &quot;Adicionar Funcionário&quot; fica verde e
                      ativo. Você pode adicionar mais membros à equipe.
                    </p>
                  </div>

                  <div className="rounded-lg bg-orange-50 p-4">
                    <strong className="text-sm text-orange-900">
                      Limite Atingido
                    </strong>
                    <p className="mt-1 text-sm text-orange-700">
                      O botão é substituído por uma mensagem indicando que você
                      atingiu o limite, com opção de fazer upgrade do plano.
                    </p>
                  </div>

                  <div className="rounded-lg bg-red-50 p-4">
                    <strong className="text-sm text-red-900">
                      Sem Plano Ativo
                    </strong>
                    <p className="mt-1 text-sm text-red-700">
                      Um banner vermelho aparece no topo informando que você
                      precisa de um plano ativo para gerenciar funcionários, com
                      botão para ver planos disponíveis.
                    </p>
                  </div>
                </div>

                <Alert className="mt-6 border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Importante:</strong> Mesmo se você atingir o limite,
                    os funcionários já cadastrados continuam funcionando
                    normalmente. O limite só impede adicionar novos.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section id="adicionar">
            <h2 className="mb-6 text-3xl font-bold">
              3. Adicionar Funcionário
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-3">
                    <UserPlus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Botão &quot;Adicionar Funcionário&quot;
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Localizado no canto superior direito da página
                    </p>
                  </div>
                </div>

                <h4 className="mb-3 font-semibold">Passo a passo:</h4>
                <div className="mb-6 space-y-3 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <p className="text-sm">
                      Verifique se você tem espaço disponível no seu plano (veja
                      o banner no topo)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <p className="text-sm">
                      Clique no botão verde &quot;Adicionar Funcionário&quot;
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <p className="text-sm">
                      Um modal (janela) será aberto com o formulário de cadastro
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <p className="text-sm">
                      Preencha todas as informações necessárias
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">5.</span>
                    <p className="text-sm">
                      Clique em &quot;Salvar&quot; ou &quot;Confirmar&quot;
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">6.</span>
                    <p className="text-sm">
                      O novo funcionário aparecerá imediatamente na lista
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Informações obrigatórias:
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Nome Completo</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nome do profissional que aparecerá para os clientes
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Email</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Para login e recebimento de notificações (opcional)
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Telefone</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Contato do funcionário para comunicação (opcional)
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Foto de Perfil</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Imagem que aparecerá no card e para os clientes
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Dica:</strong> Após adicionar o funcionário, não
                    esqueça de configurar os horários de trabalho dele. Isso é
                    essencial para o sistema de agendamentos funcionar
                    corretamente!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section id="cards">
            <h2 className="mb-6 text-3xl font-bold">
              4. Cards de Funcionários
            </h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Estrutura do Card</CardTitle>
                <CardDescription>
                  Cada funcionário é exibido em um card completo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Exemplo Visual */}
                <div className="rounded-lg border-2 p-4">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/60" />
                      <div>
                        <h3 className="text-lg font-bold">Carlos Silva</h3>
                        <Badge className="mt-1 bg-green-500">Ativo</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>carlos@email.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>(85) 99999-9999</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>09:00 às 18:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="font-bold text-green-600">
                        R$ 1.250,00 (este mês)
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold">
                    O que cada card mostra:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                      <span className="font-bold text-primary">•</span>
                      <div>
                        <strong className="text-sm">Foto de Perfil</strong>
                        <p className="text-xs text-muted-foreground">
                          Imagem circular do funcionário (se não tiver, mostra
                          inicial do nome)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                      <span className="font-bold text-primary">•</span>
                      <div>
                        <strong className="text-sm">Nome e Status</strong>
                        <p className="text-xs text-muted-foreground">
                          Nome em destaque com badge verde (ativo) ou cinza
                          (inativo)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                      <span className="font-bold text-primary">•</span>
                      <div>
                        <strong className="text-sm">Contatos</strong>
                        <p className="text-xs text-muted-foreground">
                          Email e telefone com ícones (se cadastrados)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                      <span className="font-bold text-primary">•</span>
                      <div>
                        <strong className="text-sm">Horário de Trabalho</strong>
                        <p className="text-xs text-muted-foreground">
                          Mostra horário de entrada e saída (se configurado)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                      <span className="font-bold text-primary">•</span>
                      <div>
                        <strong className="text-sm">Faturamento Mensal</strong>
                        <p className="text-xs text-muted-foreground">
                          Valor total gerado pelo funcionário no mês atual em
                          verde
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status do Funcionário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge className="bg-green-500">Ativo</Badge>
                    <span className="text-sm font-medium text-green-900">
                      Funcionário Ativo
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Aparece nas opções de agendamento para clientes. Pode
                    receber novos horários e trabalhar normalmente.
                  </p>
                </div>

                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary">Inativo</Badge>
                    <span className="text-sm font-medium text-gray-900">
                      Funcionário Inativo
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    NÃO aparece para novos agendamentos. Agendamentos antigos
                    são mantidos. Útil para funcionários de férias ou
                    temporariamente afastados.
                  </p>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Boa Prática:</strong> Em vez de excluir um
                    funcionário que saiu, desative-o. Assim você mantém o
                    histórico de agendamentos e faturamento.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section id="horarios">
            <h2 className="mb-6 text-3xl font-bold">5. Configurar Horários</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <CalendarClock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Horários de Trabalho</h3>
                    <p className="text-sm text-muted-foreground">
                      Essencial para o sistema de agendamentos funcionar
                    </p>
                  </div>
                </div>

                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>MUITO IMPORTANTE:</strong> Sem horários
                    configurados, o funcionário NÃO aparecerá como opção para
                    agendamentos! Configure sempre após adicionar.
                  </AlertDescription>
                </Alert>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    O que você pode configurar:
                  </h4>
                  <div className="space-y-4">
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <strong>Horário de Entrada e Saída</strong>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Define quando o funcionário começa e termina o
                        expediente
                      </p>
                      <div className="flex items-center gap-4 rounded bg-muted/50 p-3 text-sm">
                        <span>Exemplo:</span>
                        <span className="font-medium">
                          Entrada: 09:00 | Saída: 18:00
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Coffee className="h-5 w-5 text-orange-500" />
                        <strong>Horário de Intervalo (Almoço)</strong>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Período em que o funcionário não pode receber
                        agendamentos
                      </p>
                      <div className="flex items-center gap-4 rounded bg-muted/50 p-3 text-sm">
                        <span>Exemplo:</span>
                        <span className="font-medium">
                          Intervalo: 12:00 às 13:00
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CalendarClock className="h-5 w-5 text-green-500" />
                        <strong>Dias da Semana</strong>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Selecione quais dias da semana o funcionário trabalha
                      </p>
                      <div className="rounded bg-muted/50 p-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge>Segunda</Badge>
                          <Badge>Terça</Badge>
                          <Badge>Quarta</Badge>
                          <Badge>Quinta</Badge>
                          <Badge>Sexta</Badge>
                          <Badge variant="outline">Sábado</Badge>
                          <Badge variant="outline">Domingo</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold">Como o sistema usa:</h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>
                        Gera automaticamente os horários disponíveis para
                        agendamento
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>
                        Bloqueia o horário de intervalo (almoço) de agendamentos
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>
                        Só mostra o funcionário nos dias que ele trabalha
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <span>Evita conflitos e sobrecarga de horários</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section id="faturamento">
            <h2 className="mb-6 text-3xl font-bold">
              6. Acompanhar Faturamento
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Faturamento Mensal Individual</h3>
                    <p className="text-sm text-muted-foreground">
                      Cada funcionário tem seu faturamento calculado
                      automaticamente
                    </p>
                  </div>
                </div>

                <div className="mb-6 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                  <h4 className="mb-3 font-semibold text-green-900">
                    Como funciona:
                  </h4>
                  <div className="space-y-3 text-sm text-green-800">
                    <p>
                      O sistema soma automaticamente o valor de todos os
                      serviços realizados pelo funcionário no mês atual.
                    </p>
                    <p>
                      O valor é calculado com base nos agendamentos concluídos
                      onde o funcionário foi o profissional responsável.
                    </p>
                    <p className="font-medium">
                      Exemplo: Se Carlos fez 10 cortes de R$ 40 e 5 barbas de R$
                      25, o faturamento será R$ 525,00.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Onde visualizar o faturamento:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <DollarSign className="mt-1 h-5 w-5 text-green-500" />
                      <div>
                        <strong className="text-sm">
                          No Card do Funcionário
                        </strong>
                        <p className="text-xs text-muted-foreground">
                          Valor aparece na parte inferior do card em verde com
                          &quot;(este mês)&quot;
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <TrendingUp className="mt-1 h-5 w-5 text-blue-500" />
                      <div>
                        <strong className="text-sm">
                          Atualização em Tempo Real
                        </strong>
                        <p className="text-xs text-muted-foreground">
                          A cada novo agendamento concluído, o valor é
                          recalculado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Dica para Gestão:</strong> Use esses dados para:
                    definir metas, calcular comissões, identificar melhores
                    profissionais e reconhecer alta performance.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section id="editar">
            <h2 className="mb-6 text-3xl font-bold">7. Editar e Gerenciar</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Ações disponíveis:</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Editar */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Edit className="h-5 w-5 text-blue-500" />
                        <strong>Editar Informações</strong>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Altere nome, foto, email, telefone e horários de
                        trabalho
                      </p>
                      <div className="rounded bg-blue-50 p-2 text-xs text-blue-700">
                        Clique no ícone de lápis no card do funcionário
                      </div>
                    </div>

                    {/* Ativar/Desativar */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Power className="h-5 w-5 text-orange-500" />
                        <strong>Ativar/Desativar</strong>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Controle se o funcionário aparece para agendamentos
                      </p>
                      <div className="rounded bg-orange-50 p-2 text-xs text-orange-700">
                        Use o botão de ativar/desativar no card
                      </div>
                    </div>

                    {/* Excluir */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Trash2 className="h-5 w-5 text-red-500" />
                        <strong>Excluir Funcionário</strong>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Remove permanentemente o funcionário do sistema
                      </p>
                      <div className="rounded bg-red-50 p-2 text-xs text-red-700">
                        ⚠️ Ação irreversível! Prefira desativar
                      </div>
                    </div>

                    {/* Ver Detalhes */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-500" />
                        <strong>Ver Detalhes Completos</strong>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Veja histórico, estatísticas e agendamentos
                      </p>
                      <div className="rounded bg-purple-50 p-2 text-xs text-purple-700">
                        Clique no card para abrir detalhes
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Atenção ao Excluir:</strong> Quando você exclui um
                    funcionário, todos os agendamentos futuros dele são
                    cancelados automaticamente. Considere desativar em vez de
                    excluir!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 8 */}
          <section id="estado-vazio">
            <h2 className="mb-6 text-3xl font-bold">8. Estado Vazio</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 rounded-lg border-2 border-dashed p-8 text-center">
                  <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">
                    Nenhum funcionário cadastrado
                  </h3>
                  <p className="text-muted-foreground">
                    Clique no botão &quot;Adicionar Funcionário&quot; para
                    começar.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">
                    Quando você vê esta mensagem:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        É a primeira vez que você acessa e ainda não adicionou
                        ninguém
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Você excluiu todos os funcionários (não recomendado)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>Está configurando uma nova barbearia</span>
                    </li>
                  </ul>

                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Primeiro Passo:</strong> Se você é o único
                      profissional, adicione você mesmo como funcionário! Isso
                      permite que clientes agendem diretamente com você.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 9 */}
          <section id="dicas">
            <h2 className="mb-6 text-3xl font-bold">
              9. Dicas de Gestão de Equipe
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Contratação e Onboarding
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>
                    • Adicione o funcionário antes do primeiro dia de trabalho
                  </p>
                  <p>• Configure horários com antecedência</p>
                  <p>• Mantenha foto profissional e dados atualizados</p>
                  <p>• Explique ao funcionário como usar o painel dele</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Gestão de Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Acompanhe o faturamento mensal de cada um</p>
                  <p>• Compare performance entre profissionais</p>
                  <p>• Use dados para definir metas realistas</p>
                  <p>• Reconheça e incentive os melhores</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    Horários e Escalas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Revise horários mensalmente</p>
                  <p>• Ajuste conforme demanda e sazonalidade</p>
                  <p>• Garanta cobertura em horários de pico</p>
                  <p>• Respeite intervalos e descansos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-500" />
                    Boas Práticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Prefira desativar a excluir funcionários</p>
                  <p>• Mantenha um histórico completo</p>
                  <p>• Comunique mudanças de horário com antecedência</p>
                  <p>• Treine a equipe sobre o sistema</p>
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
                    <h4 className="mb-3 font-semibold">Limites de Planos:</h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-gray-500" />
                        <span>BASIC: 1 funcionário</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-blue-500" />
                        <span>PRO: 5 funcionários</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        <span>PREMIUM: Ilimitado</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold">Informações do Card:</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Foto e nome em destaque</p>
                      <p>• Status ativo/inativo</p>
                      <p>• Email e telefone</p>
                      <p>• Horário de trabalho</p>
                      <p>• Faturamento mensal</p>
                      <p>• Botões de ação (editar, ativar/desativar)</p>
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
            <Link href="/tutoriais/gerenciar-agendamentos">
              <Button size="lg" variant="ghost">
                Gerenciar Agendamentos
              </Button>
            </Link>
          </div>
        </div>

        {/* Help CTA */}
        <Card className="mt-8 border-2">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Dúvidas sobre Gestão de Funcionários?
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
