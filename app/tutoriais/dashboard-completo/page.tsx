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
  BarChart3,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Wallet,
  Star,
  ArrowLeft,
  CheckCircle,
  Info,
  Lightbulb,
  Eye,
  Filter,
} from "lucide-react"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"

export const metadata: Metadata = {
  title: "Dashboard Completo - Tutorial CorteZapp",
  description:
    "Aprenda a usar o Dashboard do CorteZapp para gerenciar suas finanças e métricas",
}

export default function DashboardTutorialPage() {
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
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Dashboard Completo</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge>Relatórios</Badge>
                <Badge variant="secondary">Leitura: 15 min</Badge>
                <Badge variant="secondary">Nível: Iniciante</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            O Dashboard é o coração do CorteZapp. Aprenda a interpretar todas as
            métricas e informações financeiras do seu negócio em tempo real.
          </p>
        </div>

        {/* TL;DR */}
        <Alert className="mb-12 border-primary/20 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription>
            <strong className="font-bold">TL;DR (Resumo Rápido):</strong> O
            Dashboard mostra seu saldo atual, receitas, despesas e
            investimentos. Você pode filtrar por mês, visualizar gráficos de
            distribuição, acompanhar transações recentes e ver avaliações dos
            clientes. Tudo em uma única tela organizada.
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
                  1. Visão Geral do Dashboard
                </a>
              </li>
              <li>
                <a href="#filtro-mes" className="text-primary hover:underline">
                  2. Filtro de Mês
                </a>
              </li>
              <li>
                <a
                  href="#cards-resumo"
                  className="text-primary hover:underline"
                >
                  3. Cards de Resumo Financeiro
                </a>
              </li>
              <li>
                <a href="#graficos" className="text-primary hover:underline">
                  4. Gráficos de Distribuição
                </a>
              </li>
              <li>
                <a href="#transacoes" className="text-primary hover:underline">
                  5. Últimas Transações
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="text-primary hover:underline">
                  6. Card de Avaliações
                </a>
              </li>
              <li>
                <a href="#dicas" className="text-primary hover:underline">
                  7. Dicas Avançadas
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
              1. Visão Geral do Dashboard
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 text-muted-foreground">
                  O Dashboard é a página principal onde você acompanha a saúde
                  financeira da sua barbearia. Ele está organizado em três áreas
                  principais:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-bold">Área Superior</h3>
                      <p className="text-sm text-muted-foreground">
                        Título &quot;Dashboard&quot; e seletor de mês no canto
                        superior direito
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-bold">Coluna Principal (Esquerda)</h3>
                      <p className="text-sm text-muted-foreground">
                        Cards de resumo financeiro e gráficos de distribuição
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-bold">Coluna Lateral (Direita)</h3>
                      <p className="text-sm text-muted-foreground">
                        Últimas transações e avaliações dos clientes
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section id="filtro-mes">
            <h2 className="mb-6 text-3xl font-bold">2. Filtro de Mês</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Filter className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Seletor de Período</h3>
                    <p className="text-sm text-muted-foreground">
                      Localizado no canto superior direito
                    </p>
                  </div>
                </div>

                <h4 className="mb-3 font-semibold">Como funciona:</h4>
                <div className="mb-4 space-y-2 rounded-lg bg-muted/50 p-4">
                  <p className="text-sm">
                    <strong>1.</strong> Clique no dropdown que mostra o mês
                    atual
                  </p>
                  <p className="text-sm">
                    <strong>2.</strong> Selecione qualquer mês do ano (Janeiro a
                    Dezembro)
                  </p>
                  <p className="text-sm">
                    <strong>3.</strong> Todos os dados da página são atualizados
                    automaticamente
                  </p>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Importante:</strong> O filtro afeta TODOS os
                    componentes do dashboard - cards de resumo, gráficos,
                    transações e métricas. É uma visão completa do mês
                    selecionado.
                  </AlertDescription>
                </Alert>

                <div className="mt-6">
                  <h4 className="mb-3 font-semibold">Comportamento padrão:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Ao acessar o dashboard, o mês atual é selecionado
                        automaticamente
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        A URL é atualizada com o parâmetro do mês (ex:
                        ?month=10)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Você pode compartilhar a URL com o mês específico para
                        mostrar aos outros
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section id="cards-resumo">
            <h2 className="mb-6 text-3xl font-bold">
              3. Cards de Resumo Financeiro
            </h2>

            {/* Card Saldo */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Wallet className="h-6 w-6 text-primary" />
                  <CardTitle>Card de Saldo (Principal)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  O card maior e mais destacado que mostra seu saldo atual do
                  mês.
                </p>

                <div className="rounded-lg bg-primary/5 p-4">
                  <h4 className="mb-2 font-semibold">O que mostra:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Título: &quot;Saldo&quot;</li>
                    <li>
                      • Valor em destaque (tamanho grande, formatado em R$)
                    </li>
                    <li>
                      • Botão &quot;Adicionar transação&quot; para registros
                      rápidos
                    </li>
                  </ul>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Cálculo do Saldo:</strong> Saldo = (Total de
                    Receitas) - (Total de Despesas) - (Total de Investimentos)
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="mb-2 font-semibold">
                    Botão &quot;Adicionar transação&quot;:
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Clique para abrir um modal onde você pode registrar
                    rapidamente uma nova receita, despesa ou investimento sem
                    sair do dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cards Menores */}
            <Card>
              <CardHeader>
                <CardTitle>Cards Menores (Trio)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Três cards menores dispostos lado a lado, mostrando detalhes
                  específicos:
                </p>

                {/* Investido */}
                <div className="rounded-lg border-2 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-lg bg-yellow-100 p-2">
                      <PiggyBank className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h4 className="font-bold">1. Investido</h4>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Mostra o total de investimentos realizados no mês.
                  </p>
                  <div className="rounded bg-muted/50 p-3 text-sm">
                    <strong>Exemplo:</strong> Compra de equipamentos, reformas,
                    marketing, cursos para a equipe, etc.
                  </div>
                </div>

                {/* Receita */}
                <div className="rounded-lg border-2 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-lg bg-green-100 p-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <h4 className="font-bold">2. Receita</h4>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Total de dinheiro que entrou no caixa durante o mês.
                  </p>
                  <div className="rounded bg-muted/50 p-3 text-sm">
                    <strong>Exemplo:</strong> Pagamentos de serviços, vendas de
                    produtos, gorjetas, etc.
                  </div>
                  <Alert className="mt-3 border-green-200 bg-green-50">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-sm text-green-800">
                      Ícone verde com seta para cima indica dinheiro entrando
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Despesas */}
                <div className="rounded-lg border-2 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-lg bg-red-100 p-2">
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    </div>
                    <h4 className="font-bold">3. Despesas</h4>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Total de gastos e despesas do mês selecionado.
                  </p>
                  <div className="rounded bg-muted/50 p-3 text-sm">
                    <strong>Exemplo:</strong> Aluguel, contas de luz/água,
                    salários, materiais de trabalho, etc.
                  </div>
                  <Alert className="mt-3 border-red-200 bg-red-50">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-sm text-red-800">
                      Ícone vermelho com seta para baixo indica dinheiro saindo
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section id="graficos">
            <h2 className="mb-6 text-3xl font-bold">
              4. Gráficos de Distribuição
            </h2>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              {/* Gráfico Pizza */}
              <Card>
                <CardHeader>
                  <CardTitle>Gráfico de Pizza - Transações</CardTitle>
                  <CardDescription>
                    Distribuição percentual dos tipos de transação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Visualização circular que mostra a proporção entre:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded bg-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Receita (Verde)</p>
                        <p className="text-xs text-muted-foreground">
                          Percentual do total
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded bg-red-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Despesa (Vermelho)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Percentual do total
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded bg-yellow-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Investimento (Amarelo)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Percentual do total
                        </p>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Dica:</strong> Um negócio saudável geralmente tem
                      a fatia verde (receita) maior que as outras. Se a vermelha
                      está muito grande, é hora de revisar gastos!
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Gráfico Barras */}
              <Card>
                <CardHeader>
                  <CardTitle>Gastos por Categoria</CardTitle>
                  <CardDescription>
                    Onde seu dinheiro está sendo gasto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Lista com barras de progresso mostrando:
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="mb-1 text-sm font-medium">
                        Nome da categoria (ex: Salários)
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: "65%" }}
                          />
                        </div>
                        <span className="text-sm font-bold">65%</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3">
                    <h4 className="mb-2 text-sm font-semibold">
                      Categorias disponíveis:
                    </h4>
                    <ul className="grid grid-cols-2 gap-1 text-xs">
                      <li>• Salários</li>
                      <li>• Alimentação</li>
                      <li>• Transporte</li>
                      <li>• Moradia</li>
                      <li>• Utilidades</li>
                      <li>• Barbearia</li>
                      <li>• Outros</li>
                    </ul>
                  </div>

                  <Alert>
                    <Eye className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Análise Rápida:</strong> Este gráfico ajuda a
                      identificar onde você está gastando mais e onde pode
                      economizar.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 5 */}
          <section id="transacoes">
            <h2 className="mb-6 text-3xl font-bold">5. Últimas Transações</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="mb-2 font-bold">O que mostra:</h3>
                  <p className="text-sm text-muted-foreground">
                    Lista das 8 transações mais recentes do mês selecionado,
                    cada uma contendo:
                  </p>
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-muted/30 p-4">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <div>
                      <p className="text-sm font-medium">
                        Ícone do método de pagamento
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PIX, Dinheiro, Cartão de Crédito/Débito, etc.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <div>
                      <p className="text-sm font-medium">Nome da transação</p>
                      <p className="text-xs text-muted-foreground">
                        Descrição do que foi pago ou recebido
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <div>
                      <p className="text-sm font-medium">Data</p>
                      <p className="text-xs text-muted-foreground">
                        Formato: DD Mês AAAA (ex: 15 Out 2025)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <div>
                      <p className="text-sm font-medium">Valor</p>
                      <p className="text-xs text-muted-foreground">
                        Com símbolo + (verde) ou - (vermelho/amarelo)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-2 font-semibold">Cores dos valores:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-green-500">
                        + R$ 150,00
                      </span>
                      <span className="text-muted-foreground">
                        = Receita (dinheiro entrando)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-red-500">- R$ 50,00</span>
                      <span className="text-muted-foreground">
                        = Despesa (dinheiro saindo)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-yellow-500">
                        - R$ 200,00
                      </span>
                      <span className="text-muted-foreground">
                        = Investimento (aplicando no negócio)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold">
                    <Eye className="h-4 w-4" />
                    Botão &quot;Ver todas&quot;
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Localizado no canto superior direito do card. Clique para ir
                    para a página completa de transações onde você pode:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Ver todas as transações do mês</li>
                    <li>• Filtrar por tipo, categoria e método de pagamento</li>
                    <li>• Editar ou excluir transações</li>
                    <li>• Adicionar novas transações</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section id="avaliacoes">
            <h2 className="mb-6 text-3xl font-bold">6. Card de Avaliações</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-yellow-100 p-3">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold">Avaliação Média</h3>
                      <p className="text-sm text-muted-foreground">
                        Feedback dos seus clientes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold">Informações exibidas:</h4>

                  <div className="rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-3xl font-bold">4.5</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 ${
                              star <= 4
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Excelente • 127 avaliações
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold">
                      Classificação por nota:
                    </h4>
                    <div className="space-y-2 rounded-lg bg-muted/30 p-3 text-sm">
                      <p>
                        • 4.5 - 5.0 = <strong>Excelente</strong>
                      </p>
                      <p>
                        • 4.0 - 4.4 = <strong>Muito Bom</strong>
                      </p>
                      <p>
                        • 3.5 - 3.9 = <strong>Bom</strong>
                      </p>
                      <p>
                        • 2.5 - 3.4 = <strong>Regular</strong>
                      </p>
                      <p>
                        • 0.0 - 2.4 = <strong>Precisa Melhorar</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Últimas Avaliações:</h4>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Lista das avaliações mais recentes, mostrando:
                  </p>
                  <div className="space-y-3">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">Corte de Cabelo</p>
                          <p className="text-xs text-muted-foreground">
                            João Silva
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="border-yellow-200 bg-yellow-50">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Por que é importante:</strong> Avaliações altas
                    atraem mais clientes! Mantenha um serviço de qualidade para
                    manter sua nota acima de 4.5 estrelas.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section id="dicas">
            <h2 className="mb-6 text-3xl font-bold">7. Dicas Avançadas</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Análise Mensal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Compare mês a mês usando o seletor de período</p>
                  <p>• Identifique tendências de crescimento ou queda</p>
                  <p>• Planeje investimentos baseado nos melhores meses</p>
                  <p>• Antecipe meses com gastos maiores (13º, férias)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Metas Financeiras
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Mantenha receitas sempre maiores que despesas</p>
                  <p>• Reserve 10-20% da receita para investimentos</p>
                  <p>• Controle despesas fixas (aluguel, contas)</p>
                  <p>• Invista em marketing nos meses mais fracos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Uso dos Gráficos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Gráfico de pizza: visualize proporções rapidamente</p>
                  <p>• Gastos por categoria: identifique onde economizar</p>
                  <p>• Use os dados para negociar com fornecedores</p>
                  <p>• Compartilhe insights com sua equipe</p>
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
                  <p>• Responda sempre às avaliações negativas</p>
                  <p>• Use feedback para melhorar serviços</p>
                  <p>• Incentive clientes satisfeitos a avaliar</p>
                  <p>• Meta: manter média acima de 4.5 estrelas</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Reference */}
          <section>
            <h2 className="mb-6 text-3xl font-bold">Referência Rápida</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold">Códigos de Cores:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded bg-green-500" />
                        <span>Verde = Receita / Positivo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded bg-red-500" />
                        <span>Vermelho = Despesa / Negativo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded bg-yellow-500" />
                        <span>Amarelo = Investimento</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded bg-blue-500" />
                        <span>Azul = Informações gerais</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold">Atalhos Rápidos:</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Card Saldo → Adicionar transação</p>
                      <p>• Últimas Transações → Ver todas</p>
                      <p>• Filtro de mês → Alterar período</p>
                      <p>• Gráficos → Análise visual rápida</p>
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
            <p className="text-sm text-muted-foreground">Próximo tutorial</p>
            <Button size="lg" variant="ghost" disabled>
              Em breve
            </Button>
          </div>
        </div>

        {/* Help CTA */}
        <Card className="mt-8 border-2">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Ainda tem dúvidas sobre o Dashboard?
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
