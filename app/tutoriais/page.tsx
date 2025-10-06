import { Metadata } from "next"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/_components/ui/card"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import {
  BookOpen,
  Search,
  Users,
  Calendar,
  Settings,
  DollarSign,
  Bell,
  BarChart3,
  Smartphone,
  HelpCircle,
  FileText,
  Video,
  Lightbulb,
  Star,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  MessageSquare,
  Gift,
  Scissors,
  Mail,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Tutoriais - CorteZapp",
  description:
    "Central de ajuda e tutoriais completos para você aproveitar ao máximo o CorteZapp",
}

// Categorias principais de tutoriais
const categories = [
  {
    id: "primeiros-passos",
    icon: Lightbulb,
    title: "Primeiros Passos",
    description: "Aprenda o básico para começar a usar o CorteZapp",
    count: 0,
    color: "bg-blue-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "agendamentos",
    icon: Calendar,
    title: "Agendamentos",
    description: "Gerencie agendamentos, horários e disponibilidade",
    count: 1,
    color: "bg-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "gestao-equipe",
    icon: Users,
    title: "Gestão de Equipe",
    description: "Configure funcionários, permissões e comissões",
    count: 1,
    color: "bg-purple-500",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "funcionarios",
    icon: Users,
    title: "Funcionários",
    description: "Dashboard e acesso para funcionários",
    count: 1,
    color: "bg-indigo-500",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: "servicos",
    icon: Scissors,
    title: "Serviços",
    description: "Cadastre e organize os serviços da sua barbearia",
    count: 1,
    color: "bg-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: "financeiro",
    icon: DollarSign,
    title: "Financeiro",
    description: "Controle receitas, despesas e relatórios financeiros",
    count: 1,
    color: "bg-emerald-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: "notificacoes",
    icon: Bell,
    title: "Notificações",
    description: "Configure lembretes via WhatsApp e email",
    count: 1,
    color: "bg-pink-500",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: "relatorios",
    icon: BarChart3,
    title: "Relatórios",
    description: "Analise métricas e performance do seu negócio",
    count: 1,
    color: "bg-indigo-500",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: "configuracoes",
    icon: Settings,
    title: "Configurações",
    description: "Personalize seu sistema e preferências",
    count: 2,
    color: "bg-gray-500",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    id: "app-cliente",
    icon: Smartphone,
    title: "App do Cliente",
    description: "Saiba como seus clientes usam o aplicativo",
    count: 0,
    color: "bg-cyan-500",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    id: "seguranca",
    icon: Shield,
    title: "Segurança",
    description: "Proteja seus dados e configure acessos",
    count: 0,
    color: "bg-red-500",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    id: "integracao",
    icon: Zap,
    title: "Integrações",
    description: "Conecte o CorteZapp com outras ferramentas",
    count: 0,
    color: "bg-yellow-500",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    id: "suporte",
    icon: MessageSquare,
    title: "Suporte",
    description: "Tire dúvidas e entre em contato conosco",
    count: 0,
    color: "bg-violet-500",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
]

// Tutoriais em destaque
const featuredTutorials = [
  {
    id: "dashboard-completo",
    category: "relatorios",
    title: "Dashboard Completo: Entenda todas as métricas do seu negócio",
    description:
      "Tutorial detalhado sobre cada componente do dashboard, gráficos, cards financeiros e como interpretar os dados",
    duration: "15 min",
    type: "article",
    slug: "dashboard-completo",
  },
  {
    id: "gerenciar-agendamentos",
    category: "agendamentos",
    title: "Gerenciar Agendamentos: Controle completo da sua agenda",
    description:
      "Aprenda a visualizar, adicionar, editar e organizar todos os agendamentos da sua barbearia de forma eficiente",
    duration: "12 min",
    type: "article",
    slug: "gerenciar-agendamentos",
  },
  {
    id: "gestao-funcionarios",
    category: "gestao-equipe",
    title: "Gestão de Funcionários: Monte e gerencie sua equipe",
    description:
      "Tutorial completo sobre adicionar funcionários, configurar horários, acompanhar desempenho e entender limites dos planos",
    duration: "18 min",
    type: "article",
    slug: "gestao-funcionarios",
  },
  {
    id: "configurar-notificacoes",
    category: "notificacoes",
    title: "Configurar Notificações: Email e WhatsApp automáticos",
    description:
      "Configure alertas por email e WhatsApp para clientes, barbeiros e gestores. Entenda lembretes e limites por plano",
    duration: "20 min",
    type: "article",
    slug: "configurar-notificacoes",
  },
  {
    id: "gerenciar-servicos",
    category: "servicos",
    title: "Gerenciar Serviços: Cadastre e organize seus serviços",
    description:
      "Aprenda a cadastrar, editar, ativar/desativar e organizar todos os serviços da sua barbearia. Entenda limites por plano",
    duration: "16 min",
    type: "article",
    slug: "gerenciar-servicos",
  },
  {
    id: "configuracoes-barbearia",
    category: "configuracoes",
    title: "Configurações da Barbearia: Dados, contato, endereço e tema",
    description:
      "Configure todos os dados da sua barbearia: empresa, contato, endereço, imagens e tema personalizado. Validações automáticas",
    duration: "18 min",
    type: "article",
    slug: "configuracoes-barbearia",
  },
  {
    id: "gerenciar-assinaturas",
    category: "assinaturas",
    title: "Gerenciar Assinaturas: Planos, limites e funcionalidades",
    description:
      "Aprenda a gerenciar suas assinaturas no CorteZapp. Entenda os diferentes planos, limites e como fazer upgrade ou downgrade",
    duration: "15 min",
    type: "article",
    slug: "gerenciar-assinaturas",
  },
  {
    id: "gerenciar-transacoes",
    category: "financeiro",
    title: "Gerenciar Transações: Controle financeiro completo",
    description:
      "Aprenda a gerenciar todas as transações financeiras da sua barbearia: receitas, despesas e investimentos",
    duration: "16 min",
    type: "article",
    slug: "gerenciar-transacoes",
  },
  {
    id: "dashboard-funcionario",
    category: "funcionarios",
    title: "Dashboard do Funcionário: Login e estatísticas pessoais",
    description:
      "Aprenda a usar o sistema de login e dashboard para funcionários da barbearia",
    duration: "14 min",
    type: "article",
    slug: "dashboard-funcionario",
  },
]

// Tutoriais populares
const popularTopics = [
  {
    icon: Calendar,
    question: "Como configurar horários de funcionamento?",
    category: "Agendamentos",
  },
  {
    icon: Users,
    question: "Como adicionar funcionários ao sistema?",
    category: "Gestão de Equipe",
  },
  {
    icon: Bell,
    question: "Como ativar notificações no WhatsApp?",
    category: "Notificações",
  },
  {
    icon: Scissors,
    question: "Como cadastrar novos serviços?",
    category: "Serviços",
  },
  {
    icon: DollarSign,
    question: "Como visualizar relatórios financeiros?",
    category: "Financeiro",
  },
  {
    icon: Settings,
    question: "Como personalizar as cores do meu tema?",
    category: "Configurações",
  },
]

// Recursos disponíveis
const resources = [
  {
    icon: Video,
    title: "Vídeo Tutoriais",
    description: "Aprenda visualmente com nossos vídeos explicativos",
    badge: "Em breve",
  },
  {
    icon: FileText,
    title: "Documentação",
    description: "Guias detalhados e documentação técnica",
    badge: "Em breve",
  },
  {
    icon: MessageSquare,
    title: "Suporte Direto",
    description: "Fale com nossa equipe de suporte",
    badge: "Disponível",
  },
  {
    icon: Gift,
    title: "Dicas & Truques",
    description: "Descubra recursos ocultos e otimize seu uso",
    badge: "Em breve",
  },
]

export default function TutoriaisPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-4 text-5xl font-bold text-foreground">
            Central de Ajuda
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Encontre tutoriais, guias e respostas para todas as suas dúvidas
            sobre o CorteZapp
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-16">
          <Card className="border-2 shadow-lg">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Busque por tutoriais, guias ou palavras-chave..."
                  className="h-14 pl-12 pr-4 text-lg"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">
                  Buscar por:
                </span>
                <Badge variant="secondary" className="cursor-pointer">
                  Agendamentos
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  Notificações
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  Relatórios
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  Configurações
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {featuredTutorials.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Tutoriais</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <Video className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Vídeos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{categories.length}</p>
                  <p className="text-sm text-muted-foreground">Categorias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-orange-100 p-2">
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">-</p>
                  <p className="text-sm text-muted-foreground">Avaliação</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Tutorials */}
        {featuredTutorials.length > 0 && (
          <section className="mb-20">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold">Tutoriais em Destaque</h2>
              <p className="text-muted-foreground">
                Comece por aqui! Tutoriais essenciais para dominar o CorteZapp
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredTutorials.map((tutorial) => (
                <Card
                  key={tutorial.id}
                  className="group cursor-pointer border-2 transition-all hover:border-primary hover:shadow-xl"
                >
                  <a href={`/tutoriais/${tutorial.slug}`}>
                    <CardHeader>
                      <div className="mb-4 flex items-start justify-between">
                        <Badge className="bg-gradient-to-r from-primary to-primary/80">
                          ⭐ Destaque
                        </Badge>
                        <Badge variant="secondary">{tutorial.duration}</Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary">
                        {tutorial.title}
                      </CardTitle>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          Artigo
                        </span>
                        <span className="font-medium text-primary">
                          Ler tutorial →
                        </span>
                      </div>
                    </CardContent>
                  </a>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Categories Grid */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">Categorias de Tutoriais</h2>
            <p className="text-muted-foreground">
              Explore nossos tutoriais organizados por categoria
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.id}
                  className="group cursor-pointer border-2 transition-all hover:border-primary hover:shadow-lg"
                >
                  <CardHeader>
                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${category.iconBg} transition-transform group-hover:scale-110`}
                    >
                      <Icon className={`h-7 w-7 ${category.iconColor}`} />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {category.count} tutoriais
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Em breve →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Popular Topics */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">Perguntas Frequentes</h2>
            <p className="text-muted-foreground">
              Os tópicos mais buscados por nossos usuários
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {popularTopics.map((topic, index) => {
              const Icon = topic.icon
              return (
                <Card
                  key={index}
                  className="cursor-pointer transition-all hover:shadow-md"
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{topic.question}</p>
                      <p className="text-sm text-muted-foreground">
                        {topic.category}
                      </p>
                    </div>
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Resources Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">Recursos de Aprendizado</h2>
            <p className="text-muted-foreground">
              Diferentes formas de aprender a usar o CorteZapp
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <Card
                  key={index}
                  className="border-2 transition-all hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge
                        variant={
                          resource.badge === "Disponível"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {resource.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="mb-12">
          <Card className="border-2 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="py-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold">
                Tutoriais em Desenvolvimento
              </h3>
              <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
                Estamos preparando tutoriais completos e detalhados sobre todas
                as funcionalidades do CorteZapp. Em breve você terá acesso a
                guias em texto, vídeos explicativos e muito mais!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-background px-4 py-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    Tutoriais em texto
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-background px-4 py-2">
                  <Video className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Vídeo tutoriais</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-background px-4 py-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Documentação PDF</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Support CTA */}
        <div className="text-center">
          <Card className="border-2 shadow-lg">
            <CardContent className="py-8">
              <h3 className="mb-2 text-xl font-semibold">
                Não encontrou o que procurava?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Nossa equipe de suporte está pronta para ajudar você
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Falar com Suporte
                </Button>
                <Button size="lg" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
