import { db } from "@/app/_lib/prisma"
import Header from "../../_components/header"
import AddEmployeeButton from "@/app/_components/add-employees-button"
import CardFuncionarios from "@/app/_components/card-employees"
import { getSubscriptionInfo } from "@/app/_lib/subscription"
import { getCurrentGestor } from "@/app/_lib/session"
import { redirect } from "next/navigation"
import { canCreateEmployee, getPlanDisplayName } from "@/app/_lib/plan-limits"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import { AlertTriangle, Users } from "lucide-react"

interface EmployeesProps {
  params: Promise<{ id: string }>
}

const Employees = async ({ params }: EmployeesProps) => {
  const { id } = await params

  const gestor = await getCurrentGestor()
  if (!gestor) {
    redirect("/")
  }

  const subscriptionInfo = await getSubscriptionInfo(gestor.id)

  const workers = (await db.$queryRaw`
    SELECT 
      w.id,
      w.name,
      w."imageUrl",
      w.active,
      w."createdAt",
      w."updatedAt",
      w."barbershopId",
      h.horarios
    FROM "Worker" w
    LEFT JOIN "Hors" h ON w.id = h."workerId"
    WHERE w."barbershopId" = ${id}
    ORDER BY w.active DESC, w.name ASC
  `) as Array<{
    id: string
    name: string
    imageUrl: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    barbershopId: string
    horarios: string[] | null
  }>

  // Transformar para o formato esperado pelo componente
  const workersFormatted = workers.map((worker) => ({
    id: worker.id,
    name: worker.name,
    imageUrl: worker.imageUrl,
    active: worker.active,
    createdAt: worker.createdAt,
    updatedAt: worker.updatedAt,
    barbershopId: worker.barbershopId,
    hors: worker.horarios
      ? {
          horarios: worker.horarios,
          createdAt: worker.createdAt,
          updatedAt: worker.updatedAt,
          workerId: worker.id,
        }
      : null,
  }))

  const hasActivePlan = subscriptionInfo.isActive
  const planType = subscriptionInfo.plan
  const canAddMoreEmployees =
    hasActivePlan &&
    planType &&
    canCreateEmployee(planType, workersFormatted.length)

  return (
    <div>
      <Header barbershopId={id} />

      <div className="space-y-6 p-4 sm:p-6">
        {/* Informações do plano e limites */}
        {hasActivePlan && planType && (
          <div className="rounded-lg border bg-blue-50 p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-blue-800">
                {getPlanDisplayName(planType)} - Funcionários
              </span>
            </div>
            <p className="mt-1 text-sm text-blue-700">
              {planType === "PREMIUM"
                ? `Funcionários: ${workersFormatted.length} (Ilimitados)`
                : planType === "PRO"
                  ? `Funcionários: ${workersFormatted.length}/5`
                  : `Funcionários: ${workersFormatted.length}/1`}
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
              Você precisa de um plano ativo para gerenciar funcionários.
            </p>
            <Link href="/subscription">
              <Button size="sm" className="mt-2">
                Ver Planos
              </Button>
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold sm:text-2xl">Funcionários</h1>
          {hasActivePlan && canAddMoreEmployees ? (
            <AddEmployeeButton barbershopId={id} />
          ) : hasActivePlan && !canAddMoreEmployees ? (
            <div className="text-center">
              <p className="mb-2 text-sm text-gray-600">
                Limite de funcionários atingido para o{" "}
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

        {workersFormatted && workersFormatted.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {workersFormatted.map((worker) => (
              <CardFuncionarios
                key={worker.id}
                workerAll={worker}
                barbershopId={id}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center sm:min-h-[300px] sm:p-8">
            <h2 className="text-lg font-semibold sm:text-xl">
              Nenhum funcionário cadastrado
            </h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Clique no botão &quot;Adicionar Funcionário&quot; para começar.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Employees
