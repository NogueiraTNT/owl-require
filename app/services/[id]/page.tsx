import AddServicesButton from "@/app/_components/add-service-button"
import Header from "@/app/_components/header"
import { db } from "@/app/_lib/prisma"
import { Badge } from "@/app/_components/ui/badge"
import Image from "next/image"
import ToggleServiceButton from "@/app/_components/toggle-service-button"
import { getSubscriptionInfo } from "@/app/_lib/subscription"
import { getCurrentGestor } from "@/app/_lib/session"
import { redirect } from "next/navigation"
import { canCreateService, getPlanDisplayName } from "@/app/_lib/plan-limits"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import { AlertTriangle, Scissors } from "lucide-react"

interface ServicesProps {
  params: Promise<{ id: string }>
}
const Services = async ({ params }: ServicesProps) => {
  const { id } = await params

  const gestor = await getCurrentGestor()
  if (!gestor) {
    redirect("/")
  }

  const subscriptionInfo = await getSubscriptionInfo(gestor.id)

  const services = (await db.$queryRaw`
    SELECT 
      id,
      name,
      description,
      "imageUrl",
      price,
      active
    FROM "BarbershopService" 
    WHERE "barbershopId" = ${id}
    ORDER BY active DESC, name ASC
  `) as Array<{
    id: string
    name: string
    description: string
    imageUrl: string
    price: number
    active: boolean
  }>

  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  const hasActivePlan = subscriptionInfo.isActive
  const planType = subscriptionInfo.plan
  const canAddMoreServices =
    hasActivePlan && planType && canCreateService(planType, services.length)

  return (
    <div>
      <Header barbershopId={id} />

      <div className="space-y-6 p-4 sm:p-6">
        {/* Informações do plano e limites */}
        {hasActivePlan && planType && (
          <div className="rounded-lg border bg-blue-50 p-4">
            <div className="flex items-center gap-2">
              <Scissors className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-blue-800">
                {getPlanDisplayName(planType)} - Serviços
              </span>
            </div>
            <p className="mt-1 text-sm text-blue-700">
              {planType === "PREMIUM"
                ? `Serviços: ${services.length} (Ilimitados)`
                : planType === "PRO"
                  ? `Serviços: ${services.length}/5`
                  : `Serviços: ${services.length}/3`}
            </p>
          </div>
        )}

        {!hasActivePlan && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="font-semibold text-red-800">Plano Inativo</span>
            </div>
            <p className="mt-1 text-sm text-red-700">
              Você precisa de um plano ativo para gerenciar serviços.
            </p>
            <Link href="/subscription">
              <Button size="sm" className="mt-2">
                Ver Planos
              </Button>
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold sm:text-2xl">Serviços</h1>
          {hasActivePlan && canAddMoreServices ? (
            <AddServicesButton barbershopId={id} />
          ) : hasActivePlan && !canAddMoreServices ? (
            <div className="text-center">
              <p className="mb-2 text-sm text-gray-600">
                Limite de serviços atingido para o{" "}
                {getPlanDisplayName(planType!)}
              </p>
              <Link href="/subscription">
                <Button variant="outline" size="sm">
                  Fazer Upgrade
                </Button>
              </Link>
            </div>
          ) : null}
        </div>

        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`rounded-lg border p-4 ${!service.active ? "bg-gray-50 opacity-70" : ""}`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      className="h-12 w-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h1 className="truncate text-lg font-semibold">
                          {service.name}
                        </h1>
                        <Badge
                          variant={service.active ? "default" : "secondary"}
                        >
                          {service.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-green-600">
                      {money.format(Number(service.price))}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <AddServicesButton
                      barbershopId={id}
                      serviceId={{
                        name: service.name,
                        description: service.description,
                        price: service.price.toString(),
                        imageUrl: service.imageUrl,
                        id: service.id,
                        active: service.active,
                      }}
                    />
                    <ToggleServiceButton
                      serviceId={service.id}
                      barbershopId={id}
                      active={service.active}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center sm:min-h-[300px] sm:p-8">
            <h2 className="text-lg font-semibold sm:text-xl">
              Nenhum Serviço cadastrado
            </h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Clique no botão &quot;Adicionar Serviço&quot; para começar.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Services
