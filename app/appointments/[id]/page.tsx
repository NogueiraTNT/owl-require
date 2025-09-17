import AddAppointmentsButton from "@/app/_components/add-appointments-button"
import Header from "@/app/_components/header"
import { db } from "@/app/_lib/prisma"
import { getCurrentGestor } from "@/app/_lib/session"
import { notFound } from "next/navigation"
import { redirect } from "next/navigation"
import { Star } from "lucide-react"

interface AppointmentsProps {
  params: Promise<{ id: string }>
}

const Appointments = async ({ params }: AppointmentsProps) => {
  const { id } = await params

  const gestor = await getCurrentGestor()
  if (!gestor) {
    redirect("/")
  }

  // só valida a barbearia existir
  const shop = await db.barbershop.findUnique({
    where: { id },
    select: { id: true, name: true },
  })
  if (!shop) return notFound()

  const bookings = (await db.$queryRaw`
    SELECT 
      b.id,
      b."userId",
      b."clientName",
      b."clientPhone",
      b."serviceId",
      b."workerId",
      b.date,
      s.name as "serviceName",
      s.description as "serviceDescription", 
      s.price as "servicePrice",
      u.name as "userName",
      w.name as "workerName",
      r.rate as "rating",
      r.id as "ratingId"
    FROM "Booking" b
    LEFT JOIN "BarbershopService" s ON b."serviceId" = s.id
    LEFT JOIN "User" u ON b."userId" = u.id
    LEFT JOIN "Worker" w ON b."workerId" = w.id
    LEFT JOIN "Rating" r ON b.id = r."bookingId"
    WHERE s."barbershopId" = ${id}
    ORDER BY b.date ASC
  `) as Array<{
    id: string
    userId: string | null
    clientName: string | null
    clientPhone: string | null
    serviceId: string
    workerId: string
    date: Date
    serviceName: string
    serviceDescription: string
    servicePrice: number
    userName: string | null
    workerName: string | null
    rating: number | null
    ratingId: string | null
  }>

  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  // Componente para renderizar estrelas
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-muted-foreground ml-1 text-sm">({rating})</span>
      </div>
    )
  }

  return (
    <div>
      <Header barbershopId={id} />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Agendamentos</h1>
          <AddAppointmentsButton barbershopId={id} />
        </div>

        {bookings.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <h2 className="text-xl font-semibold">
              Nenhum agendamento cadastrado
            </h2>
            <p className="text-muted-foreground mt-2">
              Clique no botão &quot;Adicionar agendamento&quot; para começar.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4">
            {bookings.map((b) => {
              const date = new Date(b.date)
              const timeString = date.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })

              return (
                <li key={b.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h2 className="text-lg font-semibold">{b.serviceName}</h2>
                      <p className="text-muted-foreground text-sm">
                        {b.serviceDescription}
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {money.format(Number(b.servicePrice))}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <p>Cliente: {b.clientName || b.userName || "—"}</p>
                        {b.clientPhone && (
                          <p className="text-muted-foreground text-xs">
                            Tel: {b.clientPhone}
                          </p>
                        )}
                        <p>Profissional: {b.workerName ?? "—"}</p>
                        <p>
                          {date.toLocaleDateString("pt-BR")} às {timeString}
                        </p>
                        {b.rating ? (
                          <div className="mt-2 flex justify-end">
                            <StarRating rating={b.rating} />
                          </div>
                        ) : (
                          <p className="text-muted-foreground mt-2 text-xs">
                            Sem avaliação
                          </p>
                        )}
                      </div>

                      <AddAppointmentsButton
                        barbershopId={id}
                        appointmentId={{
                          id: b.id,
                          serviceId: b.serviceId,
                          userId: b.userId,
                          clientName: b.clientName,
                          clientPhone: b.clientPhone,
                          workerId: b.workerId,
                          date: b.date,
                          time: timeString,
                        }}
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Appointments
