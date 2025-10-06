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
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Info,
  Lightbulb,
  DollarSign,
  Users,
  Building2,
  BarChart3,
} from "lucide-react"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"

export const metadata: Metadata = {
  title: "Gerenciar Assinaturas - Tutorial CorteZapp",
  description:
    "Aprenda a gerenciar assinaturas, escolher planos e entender os limites de cada plano no CorteZapp",
}

export default function GerenciarAssinaturasPage() {
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
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Gerenciar Assinaturas</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge>Assinaturas</Badge>
                <Badge variant="secondary">Leitura: 15 min</Badge>
                <Badge variant="secondary">Nível: Básico</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            Aprenda a gerenciar suas assinaturas no CorteZapp. Entenda os
            diferentes planos disponíveis, suas funcionalidades e como fazer
            upgrade ou downgrade.
          </p>
        </div>

        {/* TL;DR */}
        <Alert className="mb-12 border-primary/20 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription>
            <strong className="font-bold">TL;DR (Resumo Rápido):</strong> A
            página de Assinaturas mostra 3 planos: Básico (R$ 39,90), Pro (R$
            89,90) e Premium (R$ 149,90). Cada plano tem limites diferentes para
            funcionários, lojas e serviços. Você pode fazer upgrade/downgrade a
            qualquer momento.
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
                  href="#assinatura-atual"
                  className="text-primary hover:underline"
                >
                  2. Informações da Assinatura Atual
                </a>
              </li>
              <li>
                <a
                  href="#plano-basico"
                  className="text-primary hover:underline"
                >
                  3. Plano Básico (R$ 39,90/mês)
                </a>
              </li>
              <li>
                <a href="#plano-pro" className="text-primary hover:underline">
                  4. Plano Pro (R$ 89,90/mês)
                </a>
              </li>
              <li>
                <a
                  href="#plano-premium"
                  className="text-primary hover:underline"
                >
                  5. Plano Premium (R$ 149,90/mês)
                </a>
              </li>
              <li>
                <a href="#botoes-acao" className="text-primary hover:underline">
                  6. Botões de Ação
                </a>
              </li>
              <li>
                <a href="#comparacao" className="text-primary hover:underline">
                  7. Comparação de Planos
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
                  A página de Assinaturas é onde você gerencia seu plano de uso
                  do CorteZapp. Aqui você pode visualizar sua assinatura atual,
                  comparar planos e fazer mudanças quando necessário.
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Elementos principais da página:
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-blue-900">
                        <Calendar className="h-4 w-4" />
                        Informações da Assinatura Atual
                      </strong>
                      <p className="text-xs text-blue-700">
                        Mostra plano, status, validade e alertas de expiração
                      </p>
                    </div>

                    <div className="rounded-lg bg-green-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-green-900">
                        <CreditCard className="h-4 w-4" />3 Cards de Planos
                      </strong>
                      <p className="text-xs text-green-700">
                        Básico, Pro e Premium com preços e funcionalidades
                      </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-purple-900">
                        <CheckCircle className="h-4 w-4" />
                        Comparação Visual
                      </strong>
                      <p className="text-xs text-purple-700">
                        Ícones verdes (✓) e vermelhos (✗) para comparar recursos
                      </p>
                    </div>

                    <div className="rounded-lg bg-orange-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-orange-900">
                        <DollarSign className="h-4 w-4" />
                        Botões de Ação
                      </strong>
                      <p className="text-xs text-orange-700">
                        Assinar, Upgrade ou Downgrade dependendo da situação
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Importante:</strong> Sem assinatura ativa, você terá
                    acesso limitado ao sistema. Algumas funcionalidades podem
                    ficar bloqueadas.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section id="assinatura-atual">
            <h2 className="mb-6 text-3xl font-bold">
              2. Informações da Assinatura Atual
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Status da sua assinatura</h3>
                    <p className="text-sm text-muted-foreground">
                      Informações sobre o plano atual e validade
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Informações exibidas:</h4>
                  <div className="space-y-4">
                    {/* Plano */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Plano</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mostra o plano atual: Básico, Pro ou Premium
                      </p>
                    </div>

                    {/* Status */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Status</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Ativo, Expirado, Pendente, Inativo ou Cancelado
                      </p>
                    </div>

                    {/* Válido até */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Válido até</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Data de expiração da assinatura atual
                      </p>
                    </div>

                    {/* Alerta de expiração */}
                    <div className="rounded-lg border-2 border-yellow-300 bg-yellow-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <strong className="text-sm">Alerta de Expiração</strong>
                      </div>
                      <p className="text-xs text-yellow-700">
                        Aparece quando restam 7 dias ou menos para expirar
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Sem assinatura:</strong> Se você não tem nenhum
                    plano ativo, aparecerá um alerta vermelho indicando que
                    precisa assinar um plano.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section id="plano-basico">
            <h2 className="mb-6 text-3xl font-bold">
              3. Plano Básico (R$ 39,90/mês)
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-3">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Ideal para começar</h3>
                    <p className="text-sm text-muted-foreground">
                      Perfeito para barbearias pequenas ou individuais
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Recursos incluídos:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">1 Funcionário por loja</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">1 Loja</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Até 3 serviços por loja</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Dashboard básico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Notificações automáticas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Relatórios de IA</span>
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Recomendado para:</strong> Barbeiros autônomos ou
                    barbearias pequenas que estão começando a usar o sistema.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section id="plano-pro">
            <h2 className="mb-6 text-3xl font-bold">
              4. Plano Pro (R$ 89,90/mês)
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Para barbearias em crescimento
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ideal para estabelecimentos com equipe pequena
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Recursos incluídos:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Até 5 funcionários por loja
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">1 Loja</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Até 5 serviços por loja</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Dashboard completo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Notificações por email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Relatórios de IA</span>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Recomendado para:</strong> Barbearias com equipe de
                    2-5 pessoas que querem notificações por email e relatórios
                    mais detalhados.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section id="plano-premium">
            <h2 className="mb-6 text-3xl font-bold">
              5. Plano Premium (R$ 149,90/mês)
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-3">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Máxima funcionalidade</h3>
                    <p className="text-sm text-muted-foreground">
                      Para barbearias grandes ou redes
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Recursos incluídos:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Funcionários ilimitados por loja
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Lojas ilimitadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Serviços ilimitados por loja
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Dashboard premium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Notificações por email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Notificações por WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Relatórios de IA avançados
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Suporte prioritário</span>
                    </div>
                  </div>
                </div>

                <Alert className="border-purple-200 bg-purple-50">
                  <Info className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>Recomendado para:</strong> Barbearias grandes, redes
                    de barbearias ou estabelecimentos que precisam de todas as
                    funcionalidades e suporte prioritário.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section id="botoes-acao">
            <h2 className="mb-6 text-3xl font-bold">6. Botões de Ação</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-3">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Ações disponíveis</h3>
                    <p className="text-sm text-muted-foreground">
                      Botões que mudam conforme sua situação atual
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Tipos de botões:</h4>
                  <div className="space-y-4">
                    {/* Assinar Agora */}
                    <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <strong className="text-sm">Assinar Agora</strong>
                      </div>
                      <p className="text-xs text-green-700">
                        Aparece quando você não tem nenhum plano ativo
                      </p>
                    </div>

                    {/* Plano Atual */}
                    <div className="rounded-lg border-2 border-gray-300 bg-gray-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Info className="h-4 w-4 text-gray-600" />
                        <strong className="text-sm">Plano Atual</strong>
                      </div>
                      <p className="text-xs text-gray-700">
                        Aparece no plano que você já possui ativo
                      </p>
                    </div>

                    {/* Fazer Upgrade */}
                    <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4 text-blue-600" />
                        <strong className="text-sm">Fazer Upgrade</strong>
                      </div>
                      <p className="text-xs text-blue-700">
                        Aparece para planos superiores ao seu atual
                      </p>
                    </div>

                    {/* Fazer Downgrade */}
                    <div className="rounded-lg border-2 border-yellow-300 bg-yellow-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4 text-yellow-600" />
                        <strong className="text-sm">Fazer Downgrade</strong>
                      </div>
                      <p className="text-xs text-yellow-700">
                        Aparece para planos inferiores ao seu atual
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-orange-200 bg-orange-50">
                  <Info className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Processo de pagamento:</strong> Ao clicar em
                    qualquer botão de ação, você será redirecionado para o
                    Mercado Pago para finalizar o pagamento.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section id="comparacao">
            <h2 className="mb-6 text-3xl font-bold">7. Comparação de Planos</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h4 className="mb-4 font-semibold">Tabela comparativa:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-left">
                            Recurso
                          </th>
                          <th className="border border-gray-300 p-3 text-center">
                            Básico
                          </th>
                          <th className="border border-gray-300 p-3 text-center">
                            Pro
                          </th>
                          <th className="border border-gray-300 p-3 text-center">
                            Premium
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">
                            Preço mensal
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            R$ 39,90
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            R$ 89,90
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            R$ 149,90
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3 font-medium">
                            Funcionários
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            1
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            Até 5
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            Ilimitados
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">
                            Lojas
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            1
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            1
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            Ilimitadas
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3 font-medium">
                            Serviços
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            Até 3
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            Até 5
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            Ilimitados
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">
                            Notificações Email
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <XCircle className="mx-auto h-4 w-4 text-red-500" />
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <CheckCircle className="mx-auto h-4 w-4 text-green-500" />
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <CheckCircle className="mx-auto h-4 w-4 text-green-500" />
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3 font-medium">
                            Notificações WhatsApp
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <XCircle className="mx-auto h-4 w-4 text-red-500" />
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <XCircle className="mx-auto h-4 w-4 text-red-500" />
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <CheckCircle className="mx-auto h-4 w-4 text-green-500" />
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">
                            Relatórios IA
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <XCircle className="mx-auto h-4 w-4 text-red-500" />
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <CheckCircle className="mx-auto h-4 w-4 text-green-500" />
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <CheckCircle className="mx-auto h-4 w-4 text-green-500" />
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3 font-medium">
                            Suporte Prioritário
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <XCircle className="mx-auto h-4 w-4 text-red-500" />
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <XCircle className="mx-auto h-4 w-4 text-red-500" />
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <CheckCircle className="mx-auto h-4 w-4 text-green-500" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <Alert className="border-purple-200 bg-purple-50">
                  <Info className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>Escolha o plano ideal:</strong> Considere o tamanho
                    da sua equipe, número de lojas e funcionalidades necessárias
                    para escolher o plano mais adequado.
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
                            Comece com o Básico
                          </h5>
                          <p className="text-sm text-blue-800">
                            Se está começando, teste o Plano Básico primeiro.
                            Você pode fazer upgrade a qualquer momento.
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
                            Monitore os limites
                          </h5>
                          <p className="text-sm text-green-800">
                            Fique atento aos limites do seu plano. Se precisar
                            de mais funcionários ou serviços, considere fazer
                            upgrade.
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
                            Renovação automática
                          </h5>
                          <p className="text-sm text-purple-800">
                            As assinaturas são renovadas automaticamente.
                            Certifique-se de ter saldo suficiente no cartão.
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
                            Mudanças imediatas
                          </h5>
                          <p className="text-sm text-orange-800">
                            Upgrades e downgrades são aplicados imediatamente. O
                            novo limite estará disponível assim que o pagamento
                            for confirmado.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Atenção:</strong> Sem assinatura ativa, você terá
                    acesso limitado ao sistema. Algumas funcionalidades podem
                    ficar bloqueadas até a assinatura ser renovada.
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
            <Link href="/tutoriais/configuracoes-barbearia">
              <Button size="lg" variant="ghost">
                Configurações da Barbearia
              </Button>
            </Link>
          </div>
        </div>

        {/* Help CTA */}
        <Card className="mt-8 border-2">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Dúvidas sobre Assinaturas?
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
