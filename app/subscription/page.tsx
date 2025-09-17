import Header from "../_components/header"
import { getCurrentGestor } from "../_lib/session"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card"
import { CheckIcon, XIcon, Calendar, AlertTriangle } from "lucide-react"
import SubscriptionButton from "./_components/subscription-button"
import { getSubscriptionInfo } from "../_lib/subscription"

const Subscription = async () => {
  const gestor = await getCurrentGestor()
  if (!gestor) {
    redirect("/")
  }

  const subscriptionInfo = await getSubscriptionInfo(gestor.id)

  return (
    <div>
      <Header />

      <main className="px-4 py-6 md:px-6">
        <h1 className="text-xl font-bold md:text-2xl">Assinaturas</h1>

        {/* Informações da Assinatura Atual */}
        {subscriptionInfo.plan && (
          <div className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Assinatura Atual</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Plano:</span>
                  <span className="font-bold">
                    {subscriptionInfo.plan === "BASIC" && "Plano Básico"}
                    {subscriptionInfo.plan === "PRO" && "Plano Pro"}
                    {subscriptionInfo.plan === "PREMIUM" && "Plano Premium"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Status:</span>
                  <span
                    className={`font-bold ${
                      subscriptionInfo.status === "ACTIVE"
                        ? "text-green-600"
                        : subscriptionInfo.status === "EXPIRED"
                          ? "text-red-600"
                          : subscriptionInfo.status === "PENDING"
                            ? "text-yellow-600"
                            : "text-gray-600"
                    }`}
                  >
                    {subscriptionInfo.status === "ACTIVE" && "Ativo"}
                    {subscriptionInfo.status === "EXPIRED" && "Expirado"}
                    {subscriptionInfo.status === "PENDING" && "Pendente"}
                    {subscriptionInfo.status === "INACTIVE" && "Inativo"}
                    {subscriptionInfo.status === "CANCELLED" && "Cancelado"}
                  </span>
                </div>

                {subscriptionInfo.endDate && (
                  <div className="flex justify-between">
                    <span>Válido até:</span>
                    <span className="font-bold">
                      {subscriptionInfo.endDate.toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                )}

                {subscriptionInfo.isActive &&
                  subscriptionInfo.daysRemaining <= 7 && (
                    <div className="flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-sm text-yellow-700">
                      <AlertTriangle className="h-4 w-4" />
                      <span>
                        Sua assinatura expira em{" "}
                        {subscriptionInfo.daysRemaining} dia(s)
                      </span>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        )}

        {!subscriptionInfo.plan && (
          <div className="mt-4">
            <div className="flex w-full items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-bold text-red-700 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M12 5a7 7 0 100 14a7 7 0 000-14z"
                />
              </svg>
              <span className="break-words">
                Você ainda <u>não possui nenhum plano ativo!</u>
              </span>
            </div>
          </div>
        )}

        {/* GRID RESPONSIVO: 1 col no mobile, 2 no md, 3 no xl */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* ==== Plano Básico ==== */}
          <Card className="h-full">
            <CardHeader className="border-b py-6">
              <div>
                {subscriptionInfo.plan === "BASIC" &&
                  subscriptionInfo.isActive && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                      Plano Atual
                    </span>
                  )}
              </div>
              <h2 className="text-center text-lg font-semibold md:text-xl">
                Plano Básico
              </h2>
              <div className="mt-2 flex items-end justify-center gap-1 md:gap-2">
                <span className="text-lg md:text-2xl">R$</span>
                <span className="text-2xl font-semibold md:text-4xl">
                  39,90
                </span>
                <span className="text-muted-foreground text-sm md:text-lg">
                  /mês
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3 py-6">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">1 Funcionário por loja</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">1 Loja</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Até 3 serviços por loja</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Dashboard básico</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon className="h-4 w-4 text-red-500" />
                <p className="text-sm">Relatórios de IA</p>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <SubscriptionButton
                planType="BASIC"
                gestorId={gestor.id}
                currentPlan={
                  subscriptionInfo.isActive ? subscriptionInfo.plan : null
                }
              />
            </CardFooter>
          </Card>

          {/* ==== Plano Pro ==== */}
          <Card className="h-full">
            <CardHeader className="border-b py-6">
              <div>
                {subscriptionInfo.plan === "PRO" &&
                  subscriptionInfo.isActive && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                      Plano Atual
                    </span>
                  )}
              </div>
              <h2 className="text-center text-lg font-semibold md:text-xl">
                Plano Pro
              </h2>
              <div className="mt-2 flex items-end justify-center gap-1 md:gap-2">
                <span className="text-lg md:text-2xl">R$</span>
                <span className="text-2xl font-semibold md:text-4xl">
                  89,90
                </span>
                <span className="text-muted-foreground text-sm md:text-lg">
                  /mês
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3 py-6">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Até 5 funcionários por loja</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">1 Loja</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Até 5 serviços por loja</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Dashboard completo</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Relatórios de IA</p>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <SubscriptionButton
                planType="PRO"
                gestorId={gestor.id}
                currentPlan={
                  subscriptionInfo.isActive ? subscriptionInfo.plan : null
                }
              />
            </CardFooter>
          </Card>

          {/* ==== Plano Premium ==== */}
          <Card className="h-full">
            <CardHeader className="border-b py-6">
              <div>
                {subscriptionInfo.plan === "PREMIUM" &&
                  subscriptionInfo.isActive && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                      Plano Atual
                    </span>
                  )}
              </div>
              <h2 className="text-center text-lg font-semibold md:text-xl">
                Plano Premium
              </h2>
              <div className="mt-2 flex items-end justify-center gap-1 md:gap-2">
                <span className="text-lg md:text-2xl">R$</span>
                <span className="text-2xl font-semibold md:text-4xl">
                  149,90
                </span>
                <span className="text-muted-foreground text-sm md:text-lg">
                  /mês
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3 py-6">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Funcionários ilimitados por loja</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Lojas ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Serviços ilimitados por loja</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Dashboard premium</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Relatórios de IA avançados</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">Suporte prioritário</p>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <SubscriptionButton
                planType="PREMIUM"
                gestorId={gestor.id}
                currentPlan={
                  subscriptionInfo.isActive ? subscriptionInfo.plan : null
                }
              />
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Subscription
