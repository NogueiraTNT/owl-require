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
  Calendar,
  Clock,
  User,
  Phone,
  Star,
  ArrowLeft,
  CheckCircle,
  Info,
  Lightbulb,
  AlertCircle,
  Plus,
  Edit,
  Scissors,
  UserCheck,
  CalendarPlus,
  Search,
  Filter,
} from "lucide-react"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"

export const metadata: Metadata = {
  title: "Gerenciar Agendamentos - Tutorial CorteZapp",
  description:
    "Aprenda a gerenciar todos os agendamentos da sua barbearia no CorteZapp",
}

export default function AgendamentosTutorialPage() {
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
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Gerenciar Agendamentos</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge>Agendamentos</Badge>
                <Badge variant="secondary">Leitura: 12 min</Badge>
                <Badge variant="secondary">Nível: Iniciante</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            Domine a gestão de agendamentos da sua barbearia. Aprenda a
            visualizar, adicionar, editar e acompanhar todos os horários
            marcados pelos seus clientes.
          </p>
        </div>

        {/* TL;DR */}
        <Alert className="mb-12 border-primary/20 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription>
            <strong className="font-bold">TL;DR (Resumo Rápido):</strong> A
            página de Agendamentos mostra todos os horários marcados da sua
            barbearia em ordem cronológica. Você pode adicionar novos
            agendamentos, editar os existentes, ver detalhes do serviço,
            cliente, profissional, valor e avaliações. Tudo organizado e fácil
            de gerenciar.
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
                <a href="#adicionar" className="text-primary hover:underline">
                  2. Adicionar Novo Agendamento
                </a>
              </li>
              <li>
                <a href="#lista" className="text-primary hover:underline">
                  3. Lista de Agendamentos
                </a>
              </li>
              <li>
                <a
                  href="#detalhes-card"
                  className="text-primary hover:underline"
                >
                  4. Detalhes de Cada Agendamento
                </a>
              </li>
              <li>
                <a href="#editar" className="text-primary hover:underline">
                  5. Editar Agendamento
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="text-primary hover:underline">
                  6. Sistema de Avaliações
                </a>
              </li>
              <li>
                <a
                  href="#estado-vazio"
                  className="text-primary hover:underline"
                >
                  7. Primeira Vez (Estado Vazio)
                </a>
              </li>
              <li>
                <a href="#dicas" className="text-primary hover:underline">
                  8. Dicas de Gestão
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
                  A página de Agendamentos é onde você controla toda a agenda da
                  sua barbearia. Ela é dividida em três partes principais:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-bold">Cabeçalho</h3>
                      <p className="text-sm text-muted-foreground">
                        Título &quot;Agendamentos&quot; e botão para adicionar
                        novos agendamentos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-bold">Lista de Agendamentos</h3>
                      <p className="text-sm text-muted-foreground">
                        Cards com todos os agendamentos organizados por data (do
                        mais próximo ao mais distante)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-bold">Informações Detalhadas</h3>
                      <p className="text-sm text-muted-foreground">
                        Cada card mostra serviço, cliente, profissional,
                        horário, valor e avaliação
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="mt-6">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Ordem Cronológica:</strong> Os agendamentos são
                    organizados automaticamente do mais próximo (em cima) para o
                    mais distante (embaixo), facilitando ver o que está por vir.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section id="adicionar">
            <h2 className="mb-6 text-3xl font-bold">
              2. Adicionar Novo Agendamento
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-3">
                    <CalendarPlus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Botão &quot;Adicionar agendamento&quot;
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Localizado no canto superior direito da página
                    </p>
                  </div>
                </div>

                <h4 className="mb-3 font-semibold">Como adicionar:</h4>
                <div className="mb-6 space-y-3 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <p className="text-sm">
                      Clique no botão verde &quot;Adicionar agendamento&quot;
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <p className="text-sm">
                      Um modal (janela) será aberto com o formulário
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <p className="text-sm">
                      Preencha as informações necessárias
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <p className="text-sm">
                      Clique em &quot;Salvar&quot; ou &quot;Confirmar&quot;
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">5.</span>
                    <p className="text-sm">
                      O agendamento aparecerá imediatamente na lista
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Informações que você precisa fornecer:
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Scissors className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Serviço</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Escolha qual serviço será realizado (corte, barba,
                        hidratação, etc.)
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Cliente</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nome do cliente que receberá o serviço
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Telefone</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Número de contato do cliente (opcional mas recomendado)
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Profissional</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Selecione qual barbeiro/cabeleireiro fará o atendimento
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Data</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Escolha o dia do agendamento no calendário
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Horário</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Selecione a hora do atendimento
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Importante:</strong> O sistema só mostra horários
                    disponíveis baseados na duração do serviço e nos horários de
                    trabalho do profissional. Isso evita conflitos de agenda!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section id="lista">
            <h2 className="mb-6 text-3xl font-bold">
              3. Lista de Agendamentos
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 text-muted-foreground">
                  Todos os agendamentos são exibidos em cards organizados, cada
                  um contendo todas as informações importantes.
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Características da lista:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-3">
                      <Search className="mt-0.5 h-5 w-5 text-blue-600" />
                      <div>
                        <strong className="text-sm text-blue-900">
                          Ordem Cronológica
                        </strong>
                        <p className="text-xs text-blue-700">
                          Agendamentos mais próximos aparecem primeiro,
                          facilitando ver o que vem a seguir
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg bg-green-50 p-3">
                      <Filter className="mt-0.5 h-5 w-5 text-green-600" />
                      <div>
                        <strong className="text-sm text-green-900">
                          Atualização Automática
                        </strong>
                        <p className="text-xs text-green-700">
                          Quando você adiciona ou edita um agendamento, a lista
                          atualiza instantaneamente
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-purple-600" />
                      <div>
                        <strong className="text-sm text-purple-900">
                          Visual Organizado
                        </strong>
                        <p className="text-xs text-purple-700">
                          Cards com espaçamento adequado e todas as informações
                          visíveis de relance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Dica:</strong> Role a página para ver agendamentos
                    futuros. Os que já passaram continuam visíveis para você
                    manter um histórico completo.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section id="detalhes-card">
            <h2 className="mb-6 text-3xl font-bold">
              4. Detalhes de Cada Agendamento
            </h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Lado Esquerdo do Card</CardTitle>
                <CardDescription>Informações sobre o serviço</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 p-4">
                  <h4 className="mb-3 text-lg font-bold">Corte de Cabelo</h4>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Corte moderno com máquina e tesoura
                  </p>
                  <p className="text-lg font-bold text-green-600">R$ 35,00</p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">O que é exibido:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Nome do Serviço:</strong> Em destaque, fonte
                        maior e negrito
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Descrição:</strong> Texto menor explicando o que
                        está incluso
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Valor:</strong> Preço formatado em reais (R$),
                        fácil de visualizar
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lado Direito do Card</CardTitle>
                <CardDescription>
                  Informações do agendamento e cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border-2 p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <strong>Cliente:</strong>
                      <span>João Silva</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        Tel: (85) 99999-9999
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-primary" />
                      <strong>Profissional:</strong>
                      <span>Carlos Barbeiro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>20/10/2025 às 14:30</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold">
                    Cada agendamento mostra:
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <strong className="text-sm">Cliente</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nome completo de quem agendou. Se foi pelo app, aparece
                        o nome cadastrado.
                      </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <strong className="text-sm">Telefone</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Número de contato para confirmar ou remarcar (se
                        fornecido)
                      </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        <strong className="text-sm">Profissional</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nome do barbeiro/cabeleireiro que fará o atendimento
                      </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <strong className="text-sm">Data e Hora</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Formato brasileiro: DD/MM/AAAA às HH:MM
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Observação:</strong> Se o cliente agendou pelo
                    aplicativo, o nome vem do cadastro dele. Se foi agendamento
                    manual, aparece o nome que você digitou.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section id="editar">
            <h2 className="mb-6 text-3xl font-bold">5. Editar Agendamento</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-3">
                    <Edit className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Botão de Editar</h3>
                    <p className="text-sm text-muted-foreground">
                      Localizado no lado direito de cada card de agendamento
                    </p>
                  </div>
                </div>

                <h4 className="mb-3 font-semibold">Como editar:</h4>
                <div className="mb-6 space-y-3 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <p className="text-sm">
                      Localize o agendamento que deseja alterar na lista
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <p className="text-sm">
                      Clique no botão de editar (ícone de lápis/editar)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <p className="text-sm">
                      O mesmo modal de adicionar abrirá, mas com os dados
                      preenchidos
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <p className="text-sm">
                      Altere as informações que precisar (data, hora,
                      profissional, etc.)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">5.</span>
                    <p className="text-sm">
                      Clique em &quot;Salvar&quot; para confirmar as alterações
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">6.</span>
                    <p className="text-sm">
                      O agendamento será atualizado instantaneamente
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    O que você pode editar:
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-start gap-2 rounded-lg border p-3">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Serviço</p>
                        <p className="text-xs text-muted-foreground">
                          Trocar por outro serviço disponível
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border p-3">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Cliente</p>
                        <p className="text-xs text-muted-foreground">
                          Corrigir nome ou telefone
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border p-3">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Profissional</p>
                        <p className="text-xs text-muted-foreground">
                          Alterar para outro barbeiro
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border p-3">
                      <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Data e Hora</p>
                        <p className="text-xs text-muted-foreground">
                          Remarcar para outro dia/horário
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Atenção:</strong> Ao alterar a data/hora, o sistema
                    verifica automaticamente se o novo horário está disponível
                    para o profissional selecionado. Se houver conflito, você
                    será avisado.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section id="avaliacoes">
            <h2 className="mb-6 text-3xl font-bold">
              6. Sistema de Avaliações
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-yellow-100 p-3">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold">Avaliações dos Clientes</h3>
                      <p className="text-sm text-muted-foreground">
                        Visível abaixo das informações do agendamento
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
                  <h4 className="mb-3 font-semibold">Como funciona:</h4>
                  <div className="space-y-3 text-sm">
                    <p>
                      Quando um cliente conclui o atendimento, ele pode avaliar
                      o serviço através do app ou site. A avaliação aparece
                      automaticamente no card do agendamento.
                    </p>
                    <div className="flex items-center gap-2">
                      <span>Exemplo:</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground">(5)</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Estados de avaliação:</h4>
                  <div className="space-y-3">
                    <div className="rounded-lg border-2 border-green-200 bg-green-50 p-3">
                      <strong className="text-sm text-green-900">
                        Com Avaliação
                      </strong>
                      <p className="mt-1 text-xs text-green-700">
                        Mostra as estrelas douradas (1 a 5) e o número da nota
                        entre parênteses
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= 4
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          (4)
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-3">
                      <strong className="text-sm text-gray-900">
                        Sem Avaliação
                      </strong>
                      <p className="mt-1 text-xs text-gray-700">
                        Mostra o texto &quot;Sem avaliação&quot; em cinza,
                        indicando que o cliente ainda não avaliou
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Sem avaliação
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Dica Importante:</strong> Avaliações positivas (4-5
                    estrelas) ajudam a atrair novos clientes! Incentive seus
                    clientes satisfeitos a avaliarem o serviço.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section id="estado-vazio">
            <h2 className="mb-6 text-3xl font-bold">
              7. Primeira Vez (Estado Vazio)
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 rounded-lg border-2 border-dashed p-8 text-center">
                  <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">
                    Nenhum agendamento cadastrado
                  </h3>
                  <p className="text-muted-foreground">
                    Clique no botão &quot;Adicionar agendamento&quot; para
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
                        É a primeira vez que você acessa a página e ainda não há
                        agendamentos
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Todos os agendamentos foram concluídos ou cancelados
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Você está começando um novo período de agendamentos
                      </span>
                    </li>
                  </ul>

                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Não se preocupe!</strong> Esta tela só aparece
                      quando não há agendamentos. Assim que você adicionar o
                      primeiro, verá todos os detalhes organizados em cards.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 8 */}
          <section id="dicas">
            <h2 className="mb-6 text-3xl font-bold">8. Dicas de Gestão</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Organização da Agenda
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>
                    • Confira a página de agendamentos todos os dias pela manhã
                  </p>
                  <p>• Priorize visualizar os agendamentos do dia</p>
                  <p>• Mantenha intervalos entre serviços longos</p>
                  <p>• Reserve horários para imprevistos e atrasos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-500" />
                    Comunicação com Clientes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Sempre peça o telefone ao fazer agendamento manual</p>
                  <p>• Ligue para confirmar agendamentos do dia seguinte</p>
                  <p>• Avise o cliente se houver atrasos</p>
                  <p>• Mantenha contato para fidelizar</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Avaliações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Incentive clientes satisfeitos a avaliarem</p>
                  <p>• Use avaliações negativas para melhorar</p>
                  <p>• Compartilhe avaliações 5 estrelas nas redes sociais</p>
                  <p>• Meta: manter 90% das avaliações acima de 4 estrelas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-orange-500" />
                    Boas Práticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Evite remarcar agendamentos de última hora</p>
                  <p>• Mantenha histórico de agendamentos dos clientes</p>
                  <p>• Identifique horários de maior movimento</p>
                  <p>• Use dados para otimizar a escala de profissionais</p>
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
                    <h4 className="mb-3 font-semibold">Ações Principais:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4 text-green-500" />
                        <span>Adicionar agendamento → Botão verde no topo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4 text-orange-500" />
                        <span>Editar agendamento → Ícone no card</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Ver avaliação → Abaixo dos detalhes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>Ver lista → Organizada por data</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold">Informações do Card:</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Serviço, descrição e valor (esquerda)</p>
                      <p>• Cliente e telefone (direita)</p>
                      <p>• Profissional responsável (direita)</p>
                      <p>• Data e horário (direita)</p>
                      <p>• Avaliação em estrelas (se houver)</p>
                      <p>• Botão de editar (canto direito)</p>
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
            <Link href="/tutoriais/dashboard-completo">
              <Button size="lg" variant="ghost">
                Dashboard Completo
              </Button>
            </Link>
          </div>
        </div>

        {/* Help CTA */}
        <Card className="mt-8 border-2">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Dúvidas sobre Agendamentos?
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
