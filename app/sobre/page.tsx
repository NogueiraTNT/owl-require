import { Metadata } from "next"
import Image from "next/image"
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
  Users,
  Star,
  MapPin,
  TrendingUp,
  Shield,
  Smartphone,
  Bell,
  BarChart3,
  Scissors,
  Mail,
  Phone,
  Sparkles,
  Building2,
  Zap,
  Check,
} from "lucide-react"
import { getBarbershopsForShowcase } from "@/app/_actions/get-barbershops-for-showcase"
import { ThemeType } from "@prisma/client"
import PreRegistrationForm from "@/app/_components/pre-registration-form"

export const metadata: Metadata = {
  title: "Sobre - CorteZapp",
  description:
    "Conheça o CorteZapp e transforme a gestão da sua barbearia ou salão de beleza",
}

const themeColors: Record<
  ThemeType,
  { bg: string; text: string; border: string }
> = {
  red: { bg: "bg-red-500", text: "text-white", border: "border-red-600" },
  redDark: { bg: "bg-red-700", text: "text-white", border: "border-red-800" },
  rose: { bg: "bg-rose-500", text: "text-white", border: "border-rose-600" },
  roseDark: {
    bg: "bg-rose-700",
    text: "text-white",
    border: "border-rose-800",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-white",
    border: "border-orange-600",
  },
  orangeDark: {
    bg: "bg-orange-700",
    text: "text-white",
    border: "border-orange-800",
  },
  green: { bg: "bg-green-500", text: "text-white", border: "border-green-600" },
  greenDark: {
    bg: "bg-green-700",
    text: "text-white",
    border: "border-green-800",
  },
  blue: { bg: "bg-blue-500", text: "text-white", border: "border-blue-600" },
  blueDark: {
    bg: "bg-blue-700",
    text: "text-white",
    border: "border-blue-800",
  },
  yellow: {
    bg: "bg-yellow-500",
    text: "text-gray-900",
    border: "border-yellow-600",
  },
  yellowDark: {
    bg: "bg-yellow-700",
    text: "text-white",
    border: "border-yellow-800",
  },
  violet: {
    bg: "bg-violet-500",
    text: "text-white",
    border: "border-violet-600",
  },
  violetDark: {
    bg: "bg-violet-700",
    text: "text-white",
    border: "border-violet-800",
  },
}

const features = [
  {
    icon: Calendar,
    title: "Agendamento Inteligente",
    description:
      "Sistema de agendamento online 24/7 com confirmação automática via WhatsApp",
  },
  {
    icon: Users,
    title: "Gestão de Equipe",
    description:
      "Controle completo de funcionários, horários e comissões em um só lugar",
  },
  {
    icon: BarChart3,
    title: "Relatórios Detalhados",
    description:
      "Acompanhe faturamento, serviços mais vendidos e performance da equipe",
  },
  {
    icon: Bell,
    title: "Notificações Automáticas",
    description: "Lembretes via email e WhatsApp para clientes e funcionários",
  },
  {
    icon: Smartphone,
    title: "App Responsivo",
    description:
      "Acesse de qualquer dispositivo - computador, tablet ou celular",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Seus dados protegidos com criptografia e backup automático",
  },
  {
    icon: TrendingUp,
    title: "Análise de Crescimento",
    description: "Métricas e insights para impulsionar seu negócio",
  },
  {
    icon: Zap,
    title: "Configuração Rápida",
    description:
      "Configure sua barbearia em minutos e comece a usar imediatamente",
  },
]

const benefits = [
  "Reduza até 70% no tempo gasto com agendamentos",
  "Elimine conflitos de horários e agendamentos duplicados",
  "Aumente a satisfação dos clientes com lembretes automáticos",
  "Controle financeiro completo com relatórios detalhados",
  "Personalize o sistema com as cores da sua marca",
  "Suporte técnico dedicado quando você precisar",
]

const teamMembers = [
  {
    name: "Daniel Nogueira",
    role: "Co-fundador & CTO",
    description:
      "Engenheira de software apaixonada por criar soluções que facilitam a vida de empreendedores.",
    image: "/team/daniel.jpg", // Você pode substituir por uma imagem real
    email: "coruja.js@require.store",
    phone: "(85) 99684-4565",
  },
  {
    name: "Wesley Lima",
    role: "Co-fundador & CEO",
    description:
      "Especialista em gestão de negócios com mais de 10 anos de experiência no setor de vendas.",
    image: "/team/wesley.jpg", // Você pode substituir por uma imagem real
    email: "wesley@equire.store",
    phone: "(85) 99756-4565",
  },
]

export default async function SobrePage() {
  const barbershops = await getBarbershopsForShowcase()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Scissors className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-4 text-5xl font-bold text-foreground">
            Conheça o CorteZapp
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            A plataforma completa para transformar a gestão da sua barbearia ou
            salão de beleza
          </p>
        </div>

        {/* What We Offer Section */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Tudo que seu negócio precisa em um só lugar
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Desenvolvemos uma solução completa pensada especialmente para
              proprietários de barbearias e salões de beleza
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="border-2 transition-all hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Benefits */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
                Benefícios Garantidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Barbershops Showcase */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Barbearias que confiam no CorteZapp
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Conheça alguns dos estabelecimentos que já estão transformando sua
              gestão com nossa plataforma
            </p>
          </div>

          {barbershops.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {barbershops.map((barbershop) => {
                const themeColor = barbershop.theme
                  ? themeColors[barbershop.theme]
                  : {
                      bg: "bg-primary",
                      text: "text-white",
                      border: "border-primary",
                    }

                return (
                  <Card
                    key={barbershop.id}
                    className="group overflow-hidden border-2 transition-all hover:shadow-xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={barbershop.imageUrl}
                        alt={barbershop.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 ${themeColor.bg} opacity-10`}
                      />
                      {barbershop.verification && (
                        <div className="absolute right-2 top-2">
                          <Badge
                            className={
                              barbershop.verification === "PIONEER"
                                ? "bg-yellow-500 text-yellow-950"
                                : "bg-blue-500 text-white"
                            }
                          >
                            {barbershop.verification === "PIONEER"
                              ? "🏆 Pioneiro"
                              : "✓ Verificado"}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader
                      className={`${themeColor.bg} ${themeColor.text}`}
                    >
                      <CardTitle className="text-lg">
                        {barbershop.name}
                      </CardTitle>
                      {barbershop.city && barbershop.state && (
                        <div className="flex items-center gap-1 text-sm opacity-90">
                          <MapPin className="h-3 w-3" />
                          <span>
                            {barbershop.city}, {barbershop.state}
                          </span>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                        {barbershop.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Scissors className="h-3 w-3" />
                          <span>{barbershop._count.services} serviços</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>{barbershop._count.ratings} avaliações</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {barbershops.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Em breve teremos barbearias parceiras para mostrar aqui!
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Conheça Nosso Time</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Somos apaixonados por tecnologia e empreendedorismo. Criamos o
              CorteZapp para ajudar você a focar no que realmente importa: seus
              clientes.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden border-2 transition-all hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/40">
                      {/* Placeholder for image - replace with actual image */}
                      <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-primary">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="mb-1">{member.name}</CardTitle>
                      <Badge variant="secondary">{member.role}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${member.email}`}
                        className="text-primary hover:underline"
                      >
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${member.phone}`}
                        className="text-primary hover:underline"
                      >
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border-2 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="py-8 text-center">
              <h3 className="mb-2 text-xl font-semibold">Nossa Missão</h3>
              <p className="mx-auto max-w-3xl text-muted-foreground">
                Acreditamos que todo empreendedor merece ferramentas
                profissionais para gerenciar seu negócio. Por isso,
                desenvolvemos uma plataforma completa, fácil de usar e
                acessível, que permite que você foque no que faz de melhor:
                cuidar dos seus clientes e fazer seu negócio crescer.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Pre-Registration Section */}
        <section className="mb-12">
          <div className="mx-auto max-w-3xl">
            <Card className="border-2 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl">
                  Pronto para Transformar Seu Negócio?
                </CardTitle>
                <CardDescription className="text-base">
                  Faça seu pré-cadastro e garanta acesso antecipado às
                  novidades. Entraremos em contato em breve!
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <PreRegistrationForm />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="text-center">
          <Card className="border-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
            <CardContent className="py-8">
              <h3 className="mb-2 text-xl font-semibold">Ainda tem dúvidas?</h3>
              <p className="mb-4 text-muted-foreground">
                Entre em contato conosco pelo WhatsApp ou email
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  (85) 99684-4565
                </Button>
                <Button size="lg" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  coruja.js@require.store
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
