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
  ArrowDownUp,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  DollarSign,
  Tag,
  CreditCard,
  ArrowLeft,
  Info,
  Lightbulb,
  AlertTriangle,
  Circle,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"

export const metadata: Metadata = {
  title: "Gerenciar Transações - Tutorial CorteZapp",
  description:
    "Aprenda a gerenciar transações financeiras da sua barbearia: receitas, despesas e investimentos",
}

export default function GerenciarTransacoesPage() {
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
              <ArrowDownUp className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Gerenciar Transações</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge>Financeiro</Badge>
                <Badge variant="secondary">Leitura: 16 min</Badge>
                <Badge variant="secondary">Nível: Básico</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            Aprenda a gerenciar todas as transações financeiras da sua
            barbearia. Controle receitas, despesas e investimentos de forma
            organizada e eficiente.
          </p>
        </div>

        {/* TL;DR */}
        <Alert className="mb-12 border-primary/20 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription>
            <strong className="font-bold">TL;DR (Resumo Rápido):</strong> A
            página de Transações permite registrar e gerenciar todas as
            movimentações financeiras. Há 3 tipos: Ganhos (receitas), Despesas
            (gastos) e Investimentos. Cada transação tem nome, valor, categoria,
            método de pagamento e data.
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
                  href="#tabela-transacoes"
                  className="text-primary hover:underline"
                >
                  2. Tabela de Transações
                </a>
              </li>
              <li>
                <a
                  href="#adicionar-transacao"
                  className="text-primary hover:underline"
                >
                  3. Adicionar Transação
                </a>
              </li>
              <li>
                <a
                  href="#tipos-transacao"
                  className="text-primary hover:underline"
                >
                  4. Tipos de Transação
                </a>
              </li>
              <li>
                <a href="#categorias" className="text-primary hover:underline">
                  5. Categorias Disponíveis
                </a>
              </li>
              <li>
                <a
                  href="#metodos-pagamento"
                  className="text-primary hover:underline"
                >
                  6. Métodos de Pagamento
                </a>
              </li>
              <li>
                <a
                  href="#editar-excluir"
                  className="text-primary hover:underline"
                >
                  7. Editar e Excluir Transações
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
              1. Visão Geral da Página
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 text-muted-foreground">
                  A página de Transações é o centro de controle financeiro da
                  sua barbearia. Aqui você registra, visualiza e gerencia todas
                  as movimentações financeiras do seu negócio.
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Elementos principais da página:
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-blue-900">
                        <ArrowDownUp className="h-4 w-4" />
                        Título &quot;Transações&quot;
                      </strong>
                      <p className="text-xs text-blue-700">
                        Cabeçalho da página com descrição da funcionalidade
                      </p>
                    </div>

                    <div className="rounded-lg bg-green-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-green-900">
                        <Plus className="h-4 w-4" />
                        Botão &quot;Adicionar transação&quot;
                      </strong>
                      <p className="text-xs text-green-700">
                        Abre o formulário para criar nova transação
                      </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-purple-900">
                        <DollarSign className="h-4 w-4" />
                        Tabela de Transações
                      </strong>
                      <p className="text-xs text-purple-700">
                        Lista todas as transações com colunas organizadas
                      </p>
                    </div>

                    <div className="rounded-lg bg-orange-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-orange-900">
                        <Pencil className="h-4 w-4" />
                        Ações por Transação
                      </strong>
                      <p className="text-xs text-orange-700">
                        Botões para editar e excluir cada transação
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Estado vazio:</strong> Se não há transações
                    cadastradas, a página mostra uma mensagem incentivando a
                    adicionar a primeira transação.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section id="tabela-transacoes">
            <h2 className="mb-6 text-3xl font-bold">2. Tabela de Transações</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Lista organizada</h3>
                    <p className="text-sm text-muted-foreground">
                      Visualize todas as transações em uma tabela estruturada
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Colunas da tabela:</h4>
                  <div className="space-y-4">
                    {/* Nome */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Nome</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Descrição ou nome da transação (ex: &quot;Venda de
                        corte&quot;, &quot;Aluguel&quot;)
                      </p>
                    </div>

                    {/* Tipo */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Circle className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Tipo</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Badge colorido indicando: Ganho (verde), Despesa
                        (vermelho) ou Investimento (amarelo)
                      </p>
                    </div>

                    {/* Categoria */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Categoria</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Classificação da transação (ex: Salário, Alimentação,
                        Barbearia)
                      </p>
                    </div>

                    {/* Método de Pagamento */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Método de Pagamento</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Como foi pago (ex: Dinheiro, PIX, Cartão de crédito)
                      </p>
                    </div>

                    {/* Data */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Data</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Data da transação no formato brasileiro (dia de mês de
                        ano)
                      </p>
                    </div>

                    {/* Valor */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Valor</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Valor monetário formatado em reais (R$)
                      </p>
                    </div>

                    {/* Ações */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Pencil className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Ações</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Botões para editar (lápis) e excluir (lixeira) a
                        transação
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Ordenação:</strong> As transações são exibidas em
                    ordem decrescente por data, mostrando as mais recentes
                    primeiro.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section id="adicionar-transacao">
            <h2 className="mb-6 text-3xl font-bold">3. Adicionar Transação</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-3">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Criar nova transação</h3>
                    <p className="text-sm text-muted-foreground">
                      Formulário completo para registrar movimentações
                      financeiras
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Campos do formulário:</h4>
                  <div className="space-y-4">
                    {/* Nome */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Nome *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Descrição da transação (máximo 100 caracteres)
                      </p>
                    </div>

                    {/* Valor */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Valor *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Valor monetário (máximo R$ 999.999,99)
                      </p>
                    </div>

                    {/* Tipo */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Circle className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Tipo *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Selecione: Ganho, Despesa ou Investimento
                      </p>
                    </div>

                    {/* Categoria */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Categoria *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Classificação específica da transação
                      </p>
                    </div>

                    {/* Método de Pagamento */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Método de Pagamento *
                        </strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Como a transação foi realizada
                      </p>
                    </div>

                    {/* Data */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Data *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Data da transação (deve ser hoje ou no futuro)
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Valores padrão:</strong> O formulário vem
                    pré-preenchido com valores padrão: R$ 50,00, categoria
                    &quot;Outro&quot;, método &quot;Dinheiro&quot; e data atual.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section id="tipos-transacao">
            <h2 className="mb-6 text-3xl font-bold">4. Tipos de Transação</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Os 3 tipos disponíveis:
                  </h4>
                  <div className="space-y-4">
                    {/* Ganho */}
                    <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-700">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <strong className="text-sm text-green-900">
                          Ganho
                        </strong>
                        <Badge className="bg-green-700 text-white">
                          Receita
                        </Badge>
                      </div>
                      <p className="text-xs text-green-700">
                        Transações que aumentam o dinheiro da barbearia. Ex:
                        vendas de serviços, produtos vendidos, receitas
                        diversas.
                      </p>
                    </div>

                    {/* Despesa */}
                    <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-700">
                          <TrendingDown className="h-4 w-4 text-white" />
                        </div>
                        <strong className="text-sm text-red-900">
                          Despesa
                        </strong>
                        <Badge className="bg-red-700 text-white">Gasto</Badge>
                      </div>
                      <p className="text-xs text-red-700">
                        Transações que diminuem o dinheiro da barbearia. Ex:
                        aluguel, salários, compras de produtos, contas pagas.
                      </p>
                    </div>

                    {/* Investimento */}
                    <div className="rounded-lg border-2 border-yellow-300 bg-yellow-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-700">
                          <PiggyBank className="h-4 w-4 text-white" />
                        </div>
                        <strong className="text-sm text-yellow-900">
                          Investimento
                        </strong>
                        <Badge className="bg-yellow-700 text-white">
                          Aplicação
                        </Badge>
                      </div>
                      <p className="text-xs text-yellow-900">
                        Transações de longo prazo para crescimento do negócio.
                        Ex: compra de equipamentos, melhorias na barbearia,
                        cursos de capacitação.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Identificação visual:</strong> Cada tipo tem uma cor
                    específica nos badges: verde para ganhos, vermelho para
                    despesas e amarelo para investimentos.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section id="categorias">
            <h2 className="mb-6 text-3xl font-bold">
              5. Categorias Disponíveis
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-3">
                    <Tag className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Classificação detalhada</h3>
                    <p className="text-sm text-muted-foreground">
                      Organize suas transações por categorias específicas
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Categorias disponíveis:
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Salário</strong>
                      <p className="text-xs text-muted-foreground">
                        Pagamentos de funcionários
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Alimentação</strong>
                      <p className="text-xs text-muted-foreground">
                        Gastos com comida e bebida
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Transporte</strong>
                      <p className="text-xs text-muted-foreground">
                        Combustível, transporte público
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Moradia</strong>
                      <p className="text-xs text-muted-foreground">
                        Aluguel, condomínio
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Utilidades</strong>
                      <p className="text-xs text-muted-foreground">
                        Luz, água, telefone, internet
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Barbearia</strong>
                      <p className="text-xs text-muted-foreground">
                        Gastos específicos do negócio
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Outro</strong>
                      <p className="text-xs text-muted-foreground">
                        Categoria geral para outros gastos
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-purple-200 bg-purple-50">
                  <Info className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>Dica:</strong> Use categorias específicas para
                    facilitar a análise financeira posterior. Isso ajuda a
                    identificar onde estão os maiores gastos e receitas.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section id="metodos-pagamento">
            <h2 className="mb-6 text-3xl font-bold">6. Métodos de Pagamento</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-100 p-3">
                    <CreditCard className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Formas de pagamento</h3>
                    <p className="text-sm text-muted-foreground">
                      Registre como cada transação foi realizada
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Métodos disponíveis:</h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Dinheiro</strong>
                      <p className="text-xs text-muted-foreground">
                        Pagamento em espécie
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">PIX</strong>
                      <p className="text-xs text-muted-foreground">
                        Transferência instantânea
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Cartão de crédito</strong>
                      <p className="text-xs text-muted-foreground">
                        Pagamento a prazo
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Cartão de débito</strong>
                      <p className="text-xs text-muted-foreground">
                        Pagamento à vista
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">
                        Transferência bancária
                      </strong>
                      <p className="text-xs text-muted-foreground">
                        TED ou DOC
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">Outro</strong>
                      <p className="text-xs text-muted-foreground">
                        Outras formas de pagamento
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-indigo-200 bg-indigo-50">
                  <Info className="h-4 w-4 text-indigo-600" />
                  <AlertDescription className="text-indigo-800">
                    <strong>Controle financeiro:</strong> Registrar o método de
                    pagamento ajuda a entender o fluxo de caixa e identificar
                    preferências dos clientes.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section id="editar-excluir">
            <h2 className="mb-6 text-3xl font-bold">
              7. Editar e Excluir Transações
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-3">
                    <Pencil className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Gerenciar transações existentes
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Modifique ou remova transações quando necessário
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Ações disponíveis:</h4>
                  <div className="space-y-4">
                    {/* Editar */}
                    <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Pencil className="h-4 w-4 text-blue-600" />
                        <strong className="text-sm text-blue-900">
                          Editar Transação
                        </strong>
                      </div>
                      <p className="text-xs text-blue-700">
                        Clique no ícone de lápis para abrir o formulário de
                        edição com os dados atuais preenchidos. Permite alterar
                        todos os campos.
                      </p>
                    </div>

                    {/* Excluir */}
                    <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Trash2 className="h-4 w-4 text-red-600" />
                        <strong className="text-sm text-red-900">
                          Excluir Transação
                        </strong>
                      </div>
                      <p className="text-xs text-red-700">
                        Clique no ícone de lixeira para remover a transação
                        permanentemente. Aparece uma confirmação antes da
                        exclusão.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Atenção:</strong> A exclusão de transações é
                    permanente e não pode ser desfeita. Certifique-se de que
                    realmente deseja excluir antes de confirmar.
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
                            Registre todas as movimentações
                          </h5>
                          <p className="text-sm text-blue-800">
                            Mantenha o controle total registrando cada receita e
                            despesa, mesmo os valores pequenos.
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
                            Use categorias específicas
                          </h5>
                          <p className="text-sm text-green-800">
                            Categorize corretamente para facilitar análises
                            financeiras e identificar padrões de gastos.
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
                            Registre na data correta
                          </h5>
                          <p className="text-sm text-purple-800">
                            Use a data real da transação, não a data de registro
                            no sistema. Isso mantém o histórico financeiro
                            preciso.
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
                            Revise regularmente
                          </h5>
                          <p className="text-sm text-orange-800">
                            Faça revisões periódicas das transações para
                            identificar erros ou categorizações incorretas.
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
                            Separe investimentos de despesas
                          </h5>
                          <p className="text-sm text-red-800">
                            Use a categoria &quot;Investimento&quot; para gastos
                            que trazem retorno a longo prazo, como equipamentos
                            e melhorias.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Importante:</strong> O controle financeiro adequado
                    é fundamental para o sucesso do negócio. Use as transações
                    para tomar decisões informadas sobre sua barbearia.
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
            <Link href="/tutoriais/gerenciar-assinaturas">
              <Button size="lg" variant="ghost">
                Gerenciar Assinaturas
              </Button>
            </Link>
          </div>
        </div>

        {/* Help CTA */}
        <Card className="mt-8 border-2">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Dúvidas sobre Transações?
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
