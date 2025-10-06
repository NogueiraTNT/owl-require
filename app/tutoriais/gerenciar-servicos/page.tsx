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
  Scissors,
  Plus,
  Edit,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  Info,
  Lightbulb,
  AlertTriangle,
  Shield,
  Star,
  Crown,
  Clock,
  DollarSign,
  Image,
  FileText,
  Trash2,
} from "lucide-react"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"

export const metadata: Metadata = {
  title: "Gerenciar Serviços - Tutorial CorteZapp",
  description:
    "Aprenda a cadastrar, editar, ativar e gerenciar todos os serviços da sua barbearia ou salão de beleza",
}

export default function GerenciarServicosPage() {
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
              <Scissors className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Gerenciar Serviços</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge>Serviços</Badge>
                <Badge variant="secondary">Leitura: 16 min</Badge>
                <Badge variant="secondary">Nível: Básico</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            Domine o cadastro e gerenciamento de serviços no CorteZapp. Aprenda
            a criar, editar, ativar/desativar e organizar todos os serviços da
            sua barbearia. Entenda os limites por plano e maximize sua oferta de
            serviços.
          </p>
        </div>

        {/* TL;DR */}
        <Alert className="mb-12 border-primary/20 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription>
            <strong className="font-bold">TL;DR (Resumo Rápido):</strong> A
            página de Serviços permite cadastrar todos os serviços da sua
            barbearia (corte, barba, etc.). Cada serviço tem nome, descrição,
            preço e imagem. Você pode ativar/desativar serviços e há limites por
            plano (BASIC: 3, PRO: 5, PREMIUM: ilimitado).
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
                <a
                  href="#adicionar-servico"
                  className="text-primary hover:underline"
                >
                  3. Adicionar Novo Serviço
                </a>
              </li>
              <li>
                <a
                  href="#cards-servicos"
                  className="text-primary hover:underline"
                >
                  4. Cards de Serviços
                </a>
              </li>
              <li>
                <a
                  href="#editar-servico"
                  className="text-primary hover:underline"
                >
                  5. Editar Serviço
                </a>
              </li>
              <li>
                <a
                  href="#ativar-inativar"
                  className="text-primary hover:underline"
                >
                  6. Ativar/Inativar Serviços
                </a>
              </li>
              <li>
                <a
                  href="#estado-vazio"
                  className="text-primary hover:underline"
                >
                  7. Estado Vazio (Primeira Vez)
                </a>
              </li>
              <li>
                <a
                  href="#dicas-gestao"
                  className="text-primary hover:underline"
                >
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
                  A página de Serviços é onde você cadastra e gerencia todos os
                  serviços oferecidos pela sua barbearia. É uma das páginas mais
                  importantes, pois os serviços são a base para os agendamentos.
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Elementos da página:</h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-blue-900">
                        <Info className="h-4 w-4" />
                        Card de Informações do Plano
                      </strong>
                      <p className="text-xs text-blue-700">
                        Mostra seu plano atual e quantos serviços você pode ter
                      </p>
                    </div>

                    <div className="rounded-lg bg-green-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-green-900">
                        <Plus className="h-4 w-4" />
                        Botão Adicionar Serviço
                      </strong>
                      <p className="text-xs text-green-700">
                        Aparece quando você pode adicionar mais serviços
                      </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-purple-900">
                        <Scissors className="h-4 w-4" />
                        Grid de Cards de Serviços
                      </strong>
                      <p className="text-xs text-purple-700">
                        Lista todos os serviços cadastrados em cards visuais
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Importante:</strong> Sem serviços cadastrados, seus
                    clientes não conseguem fazer agendamentos. É fundamental ter
                    pelo menos os serviços básicos cadastrados.
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
                  <div className="mb-4 text-center">
                    <div className="text-3xl font-bold text-gray-600">3</div>
                    <p className="text-sm text-muted-foreground">
                      Serviços máximos
                    </p>
                  </div>
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-xs text-blue-800">
                      Ideal para barbearias pequenas com serviços básicos
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
                  <div className="mb-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">5</div>
                    <p className="text-sm text-muted-foreground">
                      Serviços máximos
                    </p>
                  </div>
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-xs text-green-800">
                      Perfeito para barbearias com variedade de serviços
                    </AlertDescription>
                  </Alert>
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
                  <div className="mb-4 text-center">
                    <div className="text-3xl font-bold text-yellow-600">∞</div>
                    <p className="text-sm text-muted-foreground">
                      Serviços ilimitados
                    </p>
                  </div>
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <Crown className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-xs text-yellow-800">
                      Para barbearias com portfólio completo de serviços
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h4 className="mb-4 font-semibold">
                  Como funciona na prática:
                </h4>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <strong className="mb-2 block text-sm">
                      Quando você pode adicionar serviços:
                    </strong>
                    <p className="text-sm text-muted-foreground">
                      O botão &quot;Adicionar Serviço&quot; aparece apenas
                      quando você ainda não atingiu o limite do seu plano. Se já
                      tem 3 serviços no BASIC, o botão some.
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-4">
                    <strong className="mb-2 block text-sm">
                      Quando você atinge o limite:
                    </strong>
                    <p className="text-sm text-muted-foreground">
                      Aparece uma mensagem: &quot;Limite de serviços atingido
                      para o [Plano]&quot; com um botão &quot;Fazer
                      Upgrade&quot; que leva para a página de assinatura.
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-4">
                    <strong className="mb-2 block text-sm">
                      Plano inativo:
                    </strong>
                    <p className="text-sm text-muted-foreground">
                      Se seu plano não está ativo, aparece um card vermelho com
                      &quot;Plano Inativo&quot; e botão &quot;Ver Planos&quot;.
                    </p>
                  </div>
                </div>

                <Alert className="mt-6 border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Dica:</strong> Você pode editar e ativar/desativar
                    serviços mesmo no limite. Apenas a criação de novos serviços
                    é limitada.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section id="adicionar-servico">
            <h2 className="mb-6 text-3xl font-bold">
              3. Adicionar Novo Serviço
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-3">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Processo de cadastro</h3>
                    <p className="text-sm text-muted-foreground">
                      Aprenda a cadastrar um novo serviço passo a passo
                    </p>
                  </div>
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <p className="text-sm">
                      Clique no botão verde &quot;Adicionar serviço&quot; no
                      canto superior direito
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <p className="text-sm">
                      Abre um modal com o formulário de cadastro
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <p className="text-sm">
                      Preencha todos os campos obrigatórios
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <p className="text-sm">
                      Clique em &quot;Cadastrar Serviço&quot; para salvar
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Campos do formulário:</h4>
                  <div className="space-y-4">
                    {/* Nome */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Nome (Obrigatório)</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Exemplo: &quot;Corte Masculino&quot;, &quot;Barba&quot;,
                        &quot;Sobrancelha&quot;
                      </p>
                    </div>

                    {/* Descrição */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Descrição (Obrigatório)
                        </strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Exemplo: &quot;Corte moderno com acabamento&quot;,
                        &quot;Aparar e desenhar a barba&quot;
                      </p>
                    </div>

                    {/* Preço */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <strong className="text-sm">Preço (Obrigatório)</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Exemplo: R$ 25,00, R$ 15,00. Use vírgula para centavos
                      </p>
                    </div>

                    {/* Duração */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <strong className="text-sm">
                          Duração (Obrigatório)
                        </strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mínimo 15 minutos, máximo 180 minutos (3 horas)
                      </p>
                    </div>

                    {/* Imagem */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Image className="h-4 w-4 text-purple-600" />
                        <strong className="text-sm">Imagem (Opcional)</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Se não informar, usa uma imagem padrão automaticamente
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Dica:</strong> Use nomes claros e descrições que
                    ajudem o cliente a entender o que está incluído no serviço.
                    Isso reduz dúvidas e melhora a experiência.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section id="cards-servicos">
            <h2 className="mb-6 text-3xl font-bold">4. Cards de Serviços</h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 text-muted-foreground">
                  Cada serviço cadastrado aparece como um card visual na página.
                  Os cards mostram todas as informações importantes de forma
                  organizada e fácil de entender.
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Estrutura de cada card:
                  </h4>
                  <div className="rounded-lg border-2 p-4">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="h-12 w-12 rounded-full bg-gray-200" />
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="font-semibold">Nome do Serviço</h3>
                          <Badge>Ativo</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Descrição do serviço que aparece aqui...
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-lg font-bold text-green-600">
                        R$ 25,00
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">✏️ Editar</Button>
                      <Button variant="outline" size="sm">
                        👁️ Ativar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Elementos do card:</h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-blue-900">
                        <Image className="h-4 w-4" />
                        Imagem do Serviço
                      </strong>
                      <p className="text-xs text-blue-700">
                        Foto circular que representa o serviço (ou imagem
                        padrão)
                      </p>
                    </div>

                    <div className="rounded-lg bg-green-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-green-900">
                        <FileText className="h-4 w-4" />
                        Nome e Badge de Status
                      </strong>
                      <p className="text-xs text-green-700">
                        Nome do serviço + badge &quot;Ativo&quot; (verde) ou
                        &quot;Inativo&quot; (cinza)
                      </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-purple-900">
                        <FileText className="h-4 w-4" />
                        Descrição
                      </strong>
                      <p className="text-xs text-purple-700">
                        Descrição limitada a 2 linhas com &quot;...&quot; se
                        muito longa
                      </p>
                    </div>

                    <div className="rounded-lg bg-yellow-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-yellow-900">
                        <DollarSign className="h-4 w-4" />
                        Preço em Destaque
                      </strong>
                      <p className="text-xs text-yellow-700">
                        Valor formatado em verde e tamanho grande
                      </p>
                    </div>

                    <div className="rounded-lg bg-orange-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-orange-900">
                        <Edit className="h-4 w-4" />
                        Botões de Ação
                      </strong>
                      <p className="text-xs text-orange-700">
                        &quot;Editar&quot; (lápis) e &quot;Ativar/Inativar&quot;
                        (olho)
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Layout responsivo:</strong> Em telas pequenas, os
                    botões ficam empilhados verticalmente. Em telas grandes,
                    eles ficam lado a lado.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section id="editar-servico">
            <h2 className="mb-6 text-3xl font-bold">5. Editar Serviço</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Edit className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Modificar serviços existentes</h3>
                    <p className="text-sm text-muted-foreground">
                      Aprenda a alterar informações de serviços já cadastrados
                    </p>
                  </div>
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <p className="text-sm">
                      Clique no botão &quot;Editar&quot; (ícone de lápis) no
                      card do serviço
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <p className="text-sm">
                      Abre o mesmo modal do cadastro, mas com os dados
                      preenchidos
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <p className="text-sm">
                      Modifique os campos que deseja alterar
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <p className="text-sm">
                      Clique em &quot;Atualizar Serviço&quot; para salvar as
                      mudanças
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    O que você pode alterar:
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">✅ Nome do Serviço</strong>
                      <p className="text-xs text-muted-foreground">
                        Mude de &quot;Corte&quot; para &quot;Corte + Barba&quot;
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">✅ Descrição</strong>
                      <p className="text-xs text-muted-foreground">
                        Adicione mais detalhes sobre o serviço
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">✅ Preço</strong>
                      <p className="text-xs text-muted-foreground">
                        Ajuste valores conforme necessário
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">✅ Duração</strong>
                      <p className="text-xs text-muted-foreground">
                        Altere tempo estimado do serviço
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">✅ Imagem</strong>
                      <p className="text-xs text-muted-foreground">
                        Troque a foto do serviço
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Importante:</strong> Alterações no preço não afetam
                    agendamentos já feitos. Apenas novos agendamentos usarão o
                    preço atualizado.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section id="ativar-inativar">
            <h2 className="mb-6 text-3xl font-bold">
              6. Ativar/Inativar Serviços
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-3">
                    <Eye className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Controle de visibilidade</h3>
                    <p className="text-sm text-muted-foreground">
                      Gerencie quais serviços ficam disponíveis para agendamento
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Como funciona:</h4>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-green-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Eye className="h-4 w-4 text-green-600" />
                        <strong className="text-sm text-green-900">
                          Serviço Ativo
                        </strong>
                      </div>
                      <ul className="space-y-1 text-xs text-green-800">
                        <li>• Aparece para clientes no app</li>
                        <li>• Pode ser agendado normalmente</li>
                        <li>• Badge verde &quot;Ativo&quot;</li>
                        <li>• Card com opacidade normal</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <EyeOff className="h-4 w-4 text-gray-600" />
                        <strong className="text-sm text-gray-900">
                          Serviço Inativo
                        </strong>
                      </div>
                      <ul className="space-y-1 text-xs text-gray-800">
                        <li>• NÃO aparece para clientes</li>
                        <li>• NÃO pode ser agendado</li>
                        <li>• Badge cinza &quot;Inativo&quot;</li>
                        <li>• Card com opacidade reduzida (70%)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <p className="text-sm">
                      Clique no botão &quot;Ativar&quot; ou &quot;Inativar&quot;
                      (ícone de olho)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <p className="text-sm">
                      Aparece uma confirmação explicando o que vai acontecer
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <p className="text-sm">
                      Clique &quot;OK&quot; para confirmar ou
                      &quot;Cancelar&quot; para desistir
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <p className="text-sm">
                      O status muda imediatamente na tela
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Quando usar:</h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                      <strong className="text-sm text-red-900">
                        Inativar quando:
                      </strong>
                      <ul className="mt-2 space-y-1 text-xs text-red-800">
                        <li>• Temporariamente indisponível</li>
                        <li>• Barbeiro específico saiu de férias</li>
                        <li>• Serviço sazonal (ex: barba no verão)</li>
                        <li>• Testando novo serviço</li>
                      </ul>
                    </div>

                    <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                      <strong className="text-sm text-green-900">
                        Ativar quando:
                      </strong>
                      <ul className="mt-2 space-y-1 text-xs text-green-800">
                        <li>• Serviço volta a estar disponível</li>
                        <li>• Novo barbeiro contratado</li>
                        <li>• Temporada apropriada</li>
                        <li>• Serviço testado e aprovado</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Atenção:</strong> Agendamentos já feitos para um
                    serviço que foi inativado continuam válidos. Apenas novos
                    agendamentos são bloqueados.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section id="estado-vazio">
            <h2 className="mb-6 text-3xl font-bold">
              7. Estado Vazio (Primeira Vez)
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-gray-100 p-3">
                    <Scissors className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Quando não há serviços</h3>
                    <p className="text-sm text-muted-foreground">
                      O que aparece na primeira vez ou quando todos os serviços
                      foram removidos
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="rounded-lg border-2 border-dashed p-8 text-center">
                    <Scissors className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h2 className="mb-2 text-lg font-semibold">
                      Nenhum Serviço cadastrado
                    </h2>
                    <p className="text-muted-foreground">
                      Clique no botão &quot;Adicionar Serviço&quot; para
                      começar.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Elementos do estado vazio:
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-gray-900">
                        <Scissors className="h-4 w-4" />
                        Ícone de Tesoura
                      </strong>
                      <p className="text-xs text-gray-700">
                        Ícone grande e cinza no centro da área vazia
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-gray-900">
                        <FileText className="h-4 w-4" />
                        Título Explicativo
                      </strong>
                      <p className="text-xs text-gray-700">
                        &quot;Nenhum Serviço cadastrado&quot; em destaque
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-gray-900">
                        <Plus className="h-4 w-4" />
                        Instrução de Ação
                      </strong>
                      <p className="text-xs text-gray-700">
                        &quot;Clique no botão Adicionar Serviço para
                        começar&quot;
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-gray-900">
                        <Plus className="h-4 w-4" />
                        Botão de Ação
                      </strong>
                      <p className="text-xs text-gray-700">
                        Botão verde &quot;Adicionar serviço&quot; no canto
                        superior direito
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Primeira vez:</strong> Recomendamos começar com os
                    serviços básicos: Corte, Barba, Sobrancelha. Depois você
                    pode adicionar serviços mais específicos conforme sua
                    barbearia cresce.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 8 */}
          <section id="dicas-gestao">
            <h2 className="mb-6 text-3xl font-bold">8. Dicas de Gestão</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Organização
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Use nomes claros e descritivos</p>
                  <p>
                    • Agrupe serviços similares (ex: &quot;Corte + Barba&quot;)
                  </p>
                  <p>• Mantenha preços atualizados</p>
                  <p>• Use imagens que representem bem o serviço</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Preços
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Pesquise preços da concorrência</p>
                  <p>• Considere tempo de duração no preço</p>
                  <p>• Ofereça pacotes (corte + barba)</p>
                  <p>• Revise preços periodicamente</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Duração
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Corte simples: 30-45 minutos</p>
                  <p>• Barba: 20-30 minutos</p>
                  <p>• Corte + Barba: 60-75 minutos</p>
                  <p>• Sobrancelha: 15-20 minutos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-purple-500" />
                    Disponibilidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Ative apenas serviços disponíveis</p>
                  <p>• Use inativação temporária</p>
                  <p>• Teste novos serviços antes</p>
                  <p>• Monitore demanda por serviço</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Serviços Recomendados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-semibold">Essenciais</h4>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>• Corte Masculino</li>
                      <li>• Barba</li>
                      <li>• Sobrancelha</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-semibold">Complementares</h4>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>• Corte + Barba</li>
                      <li>• Hidratação</li>
                      <li>• Acabamento</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-semibold">Premium</h4>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>• Barba + Sobrancelha</li>
                      <li>• Corte Completo</li>
                      <li>• Tratamentos</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Reference */}
          <section>
            <h2 className="mb-6 text-3xl font-bold">Referência Rápida</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold">Limites por Plano:</h4>
                    <div className="space-y-2 text-sm">
                      <p>• BASIC: 3 serviços</p>
                      <p>• PRO: 5 serviços</p>
                      <p>• PREMIUM: Ilimitado</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold">Campos Obrigatórios:</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Nome do serviço</p>
                      <p>• Descrição</p>
                      <p>• Preço</p>
                      <p>• Duração (15-180 min)</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold">Ações Disponíveis:</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Adicionar novo serviço</p>
                      <p>• Editar serviço existente</p>
                      <p>• Ativar/Inativar serviço</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold">Lembre-se:</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Serviços inativos não aparecem no app</p>
                      <p>• Agendamentos existentes continuam válidos</p>
                      <p>• Use imagens representativas</p>
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
            <Link href="/tutoriais/configurar-notificacoes">
              <Button size="lg" variant="ghost">
                Configurar Notificações
              </Button>
            </Link>
          </div>
        </div>

        {/* Help CTA */}
        <Card className="mt-8 border-2">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Dúvidas sobre Serviços?
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
