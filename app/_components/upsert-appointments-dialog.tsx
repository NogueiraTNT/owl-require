"use client"

import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Input } from "./ui/input"
import { DatePicker } from "./ui/date-picker"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { upsertAppointment } from "@/app/_actions/upsert-appointments"
import { deleteAppointment } from "@/app/_actions/delete-appointment"
import { useEffect, useState } from "react"
import { getServicesByBarbershop } from "@/app/_actions/get-services"
import { getWorkersWithSchedules } from "@/app/_actions/get-workers"
import { getUsers } from "@/app/_actions/get-users"
import { TRANSACTION_PAYMENT_METHOD_OPTIONS } from "@/app/_constants/transactions"
import { TransactionPaymentMethod } from "@prisma/client"

interface UpsertAppointmentData {
  serviceId: string
  userId?: string
  clientName?: string
  clientPhone?: string
  workerId: string
  date: Date
  time: string
  paymentMethod?: TransactionPaymentMethod
}

interface UpsertAppointmentDialogProps {
  isOpen: boolean
  defaultValues?: UpsertAppointmentData
  appointmentId?: string
  barbershopId: string
  setIsOpen: (isOpen: boolean) => void
}

const formSchema = z
  .object({
    serviceId: z
      .string()
      .trim()
      .min(1, { message: "O serviço é obrigatório." }),
    clientType: z.enum(["existing", "new"], {
      message: "Selecione o tipo de cliente.",
    }),
    userId: z.string().optional(),
    clientName: z.string().optional(),
    clientPhone: z.string().optional(),
    workerId: z
      .string()
      .trim()
      .min(1, { message: "O funcionário é obrigatório." }),
    date: z.date({ message: "A data é obrigatória." }).refine(
      (date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Zera as horas para comparar apenas a data
        const selectedDate = new Date(date)
        selectedDate.setHours(0, 0, 0, 0) // Zera as horas da data selecionada
        return selectedDate >= today
      },
      { message: "A data deve ser hoje ou no futuro." },
    ),
    time: z.string().trim().min(1, { message: "O horário é obrigatório." }),
    paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
      message: "O método de pagamento é obrigatório.",
    }),
  })
  .refine(
    (data) => {
      if (data.clientType === "existing") {
        return data.userId && data.userId.trim().length > 0
      } else {
        return data.clientName && data.clientName.trim().length > 0
      }
    },
    {
      message: "Selecione um usuário existente ou informe o nome do cliente.",
      path: ["clientType"],
    },
  )

type FormSchema = z.infer<typeof formSchema>

// Gera horários de 8h às 22h
const HORARIOS_DISPONIVEIS = Array.from({ length: 15 }, (_, i) => {
  const hour = i + 8
  return `${hour.toString().padStart(2, "0")}:00`
})

export default function UpsertAppointmentDialog({
  isOpen,
  defaultValues,
  appointmentId,
  barbershopId,
  setIsOpen,
}: UpsertAppointmentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [services, setServices] = useState<
    Array<{ id: string; name: string; price: number }>
  >([])
  const [workers, setWorkers] = useState<
    Array<{ id: string; name: string; hors?: { horarios: string[] } | null }>
  >([])
  const [users, setUsers] = useState<
    Array<{ id: string; name: string | null; email: string }>
  >([])
  const [availableHours, setAvailableHours] = useState<string[]>([])

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: defaultValues?.serviceId ?? "",
      clientType: (defaultValues?.userId ? "existing" : "new") as
        | "existing"
        | "new",
      userId: defaultValues?.userId ?? "",
      clientName: defaultValues?.clientName ?? "",
      clientPhone: defaultValues?.clientPhone ?? "",
      workerId: defaultValues?.workerId ?? "",
      date:
        defaultValues?.date ??
        (() => {
          const today = new Date()
          today.setHours(12, 0, 0, 0) // Normaliza para meio-dia
          return today
        })(),
      time: defaultValues?.time ?? "",
      paymentMethod:
        defaultValues?.paymentMethod ?? TransactionPaymentMethod.CASH,
    },
  })

  const isUpdate = Boolean(appointmentId)

  // Carrega os dados quando o diálogo abre
  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        try {
          const [servicesData, workersData, usersData] = await Promise.all([
            getServicesByBarbershop(barbershopId),
            getWorkersWithSchedules(barbershopId),
            getUsers(),
          ])
          setServices(servicesData)
          setWorkers(workersData)
          setUsers(usersData)
        } catch (error) {
          console.error("Erro ao carregar dados:", error)
        }
      }
      loadData()
    }
  }, [isOpen, barbershopId])

  // Monitora mudanças no workerId
  const watchedWorkerId = form.watch("workerId")

  // Atualiza horários disponíveis quando um funcionário é selecionado
  useEffect(() => {
    if (watchedWorkerId && workers.length > 0) {
      const selectedWorker = workers.find((w) => w.id === watchedWorkerId)
      if (
        selectedWorker?.hors?.horarios &&
        selectedWorker.hors.horarios.length > 0
      ) {
        setAvailableHours(selectedWorker.hors.horarios)
      } else {
        setAvailableHours(HORARIOS_DISPONIVEIS)
      }
    } else {
      setAvailableHours([])
    }
  }, [watchedWorkerId, workers])

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true)

    try {
      // Combina data e hora em um único DateTime
      const [hours, minutes] = data.time.split(":").map(Number)
      const appointmentDate = new Date(data.date)
      appointmentDate.setHours(hours, minutes || 0, 0, 0)

      await upsertAppointment({
        ...(appointmentId ? { appointmentId } : {}),
        serviceId: data.serviceId,
        userId: data.clientType === "existing" ? data.userId : undefined,
        clientName: data.clientType === "new" ? data.clientName : undefined,
        clientPhone: data.clientType === "new" ? data.clientPhone : undefined,
        workerId: data.workerId,
        date: appointmentDate,
        barbershopId,
        paymentMethod: data.paymentMethod,
      })

      setIsOpen(false)
      form.reset({
        serviceId: "",
        clientType: "new",
        userId: "",
        clientName: "",
        clientPhone: "",
        workerId: "",
        date: (() => {
          const today = new Date()
          today.setHours(12, 0, 0, 0) // Normaliza para meio-dia
          return today
        })(),
        time: "",
        paymentMethod: TransactionPaymentMethod.CASH,
      })
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error)
      alert("Ocorreu um erro ao salvar o agendamento. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!appointmentId || !barbershopId) {
      return alert("Agendamento ou barbearia não encontrado")
    }

    if (
      confirm(
        "Tem certeza que deseja cancelar este agendamento? O cancelamento será registrado como uma despesa no sistema financeiro.",
      )
    ) {
      try {
        await deleteAppointment({ appointmentId, barbershopId })
        setIsOpen(false)
      } catch (error) {
        console.error("Erro ao deletar agendamento:", error)
        alert("Ocorreu um erro ao deletar o agendamento. Tente novamente.")
      }
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !isSubmitting && setIsOpen(open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Atualizar" : "Criar"} Agendamento
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Atualize as informações do agendamento abaixo."
              : "Insira as informações do agendamento abaixo."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serviço</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um serviço..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} -{" "}
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(service.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cliente</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de cliente..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new">Novo Cliente (Manual)</SelectItem>
                      <SelectItem value="existing">
                        Cliente Cadastrado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("clientType") === "existing" && (
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente Cadastrado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cliente..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name || user.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {form.watch("clientType") === "new" && (
              <>
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Cliente</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o nome do cliente..."
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone do Cliente (Opcional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o telefone do cliente..."
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="workerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funcionário</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um funcionário..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workers.map((worker) => (
                        <SelectItem key={worker.id} value={worker.id}>
                          {worker.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting || availableHours.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            availableHours.length === 0
                              ? "Selecione um funcionário primeiro..."
                              : "Selecione um horário..."
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableHours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método de pagamento..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex-col gap-2 sm:flex-row">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancelar
                </Button>
              </DialogClose>
              {isUpdate && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  Cancelar Agendamento
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Salvando..."
                  : isUpdate
                    ? "Atualizar"
                    : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
