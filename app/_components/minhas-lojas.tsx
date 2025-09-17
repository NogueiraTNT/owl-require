import { db } from "../_lib/prisma"
import { getCurrentGestor } from "../_lib/session"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Link from "next/link"
import { redirect } from "next/navigation"
import Image from "next/image"
import { ChevronRight, MapPin, Phone, Store, AlertTriangle } from "lucide-react"
import { getSubscriptionInfo } from "../_lib/subscription"
import { canCreateBarbershop, getPlanDisplayName } from "../_lib/plan-limits"

const MyStores = async () => {
  const gestor = await getCurrentGestor()
  if (!gestor) {
    redirect("/")
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      gestorid: gestor.id,
    },
  })

  const subscriptionInfo = await getSubscriptionInfo(gestor.id)

  // Verificar se o plano expirou ou está inativo
  const hasActivePlan = subscriptionInfo.isActive
  const planType = subscriptionInfo.plan

  if (barbershops.length === 0) {
    return (
      <div className="border-muted bg-muted/50 mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
        <Store className="text-muted-foreground h-12 w-12" />
        <h3 className="mt-4 text-lg font-semibold">Nenhuma loja encontrada</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Parece que você ainda não cadastrou nenhuma barbearia.
        </p>

        {!hasActivePlan && (
          <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-semibold">Plano Expirado/Inativo</span>
            </div>
            <p className="mt-1">
              Você precisa de um plano ativo para criar lojas. Acesse a página
              de assinaturas para renovar.
            </p>
            <Link href="/subscription">
              <Button size="sm" className="mt-2">
                Ver Planos
              </Button>
            </Link>
          </div>
        )}

        {hasActivePlan && planType && (
          <Link href="/store/new">
            <Button className="mt-6">Cadastrar Primeira Loja</Button>
          </Link>
        )}
      </div>
    )
  }

  const canAddMoreBarbershops =
    hasActivePlan &&
    planType &&
    canCreateBarbershop(planType, barbershops.length)

  return (
    <div className="mt-4 space-y-4">
      {/* Informações sobre limites do plano */}
      {hasActivePlan && planType && (
        <div className="rounded-lg border bg-blue-50 p-3 text-sm">
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-blue-800">
              {getPlanDisplayName(planType)}
            </span>
          </div>
          <p className="mt-1 text-blue-700">
            {planType === "PREMIUM"
              ? `Lojas: ${barbershops.length} (Ilimitadas)`
              : `Lojas: ${barbershops.length}/1`}
          </p>
        </div>
      )}

      {!hasActivePlan && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-semibold">Plano Expirado/Inativo</span>
          </div>
          <p className="mt-1">
            Renove sua assinatura para acessar todas as funcionalidades.
          </p>
        </div>
      )}

      <div className="flex max-h-[50vh] flex-col gap-4 overflow-y-auto p-1">
        {barbershops.map((barbershop) => (
          <Link
            key={barbershop.id}
            href={
              hasActivePlan ? `/dashboard/${barbershop.id}` : "/subscription"
            }
            className="group focus:ring-primary block rounded-lg outline-none focus:ring-2"
          >
            <Card
              className={`group-hover:bg-muted/80 transition-colors ${!hasActivePlan ? "opacity-60" : ""}`}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src={barbershop.imageUrl || "/logo.png"}
                    alt={barbershop.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{barbershop.name}</h3>
                    {!hasActivePlan && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <MapPin className="text-muted-foreground h-4 w-4" />
                    <p className="text-muted-foreground text-sm">
                      {barbershop.address}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Phone className="text-muted-foreground h-4 w-4" />
                    <p className="text-muted-foreground text-sm">
                      {barbershop.phones.join(", ")}
                    </p>
                  </div>
                </div>

                <ChevronRight className="text-muted-foreground h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Botão para adicionar nova loja */}
      {hasActivePlan && planType && (
        <div className="border-t pt-4">
          {canAddMoreBarbershops ? (
            <Link href="/store/new">
              <Button className="w-full">
                <Store className="mr-2 h-4 w-4" />
                Adicionar Nova Loja
              </Button>
            </Link>
          ) : (
            <div className="text-center">
              <p className="mb-2 text-sm text-gray-600">
                Limite de lojas atingido para o {getPlanDisplayName(planType)}
              </p>
              <Link href="/subscription">
                <Button variant="outline" className="w-full">
                  Fazer Upgrade do Plano
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MyStores
