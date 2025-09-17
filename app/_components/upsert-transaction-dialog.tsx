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
  DialogTrigger,
} from "./ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { MoneyInput } from "./money-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import { DatePicker } from "@/app/_components/ui/date-picker"
import { z } from "zod"
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { upsertTransaction } from "@/app/_actions/upsert-transaction"
import { deleteTransaction } from "@/app/_actions/delete-transaction"
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/app/_constants/transactions"

interface UpsertTransactionDialogProps {
  isOpen: boolean
  defaultValues?: FormSchema
  transactionId?: string
  barbershopId: string
  setIsOpen: (isOpen: boolean) => void
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  amount: z
    .number({
      message: "O valor é obrigatório.",
    })
    .positive({
      message: "O valor deve ser positivo.",
    }),
  type: z.nativeEnum(TransactionType, {
    message: "O tipo é obrigatório.",
  }),
  category: z.nativeEnum(TransactionCategory, {
    message: "A categoria é obrigatória.",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    message: "O método de pagamento é obrigatório.",
  }),
  date: z
    .date({
      message: "A data é obrigatória.",
    })
    .refine(
      (date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Zera as horas para comparar apenas a data
        const selectedDate = new Date(date)
        selectedDate.setHours(0, 0, 0, 0) // Zera as horas da data selecionada
        return selectedDate >= today
      },
      { message: "A data deve ser hoje ou no futuro." },
    ),
})

type FormSchema = z.infer<typeof formSchema>

const UpsertTransactionDialog = ({
  isOpen,
  defaultValues,
  transactionId,
  barbershopId,
  setIsOpen,
}: UpsertTransactionDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      amount: 50,
      category: TransactionCategory.OTHER,
      date: (() => {
        const today = new Date()
        today.setHours(12, 0, 0, 0) // Normaliza para meio-dia
        return today
      })(),
      name: "",
      paymentMethod: TransactionPaymentMethod.CASH,
      type: TransactionType.EXPENSE,
    },
  })

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertTransaction({
        ...data,
        id: transactionId,
        barbershopId,
      })
      setIsOpen(false)
      form.reset({
        amount: 50,
        category: TransactionCategory.OTHER,
        date: (() => {
          const today = new Date()
          today.setHours(12, 0, 0, 0) // Normaliza para meio-dia
          return today
        })(),
        name: "",
        paymentMethod: TransactionPaymentMethod.CASH,
        type: TransactionType.EXPENSE,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const isUpdate = Boolean(transactionId)

  const handleDelete = async () => {
    if (!transactionId || !barbershopId) {
      return alert("Transação ou barbearia não encontrada")
    }
    if (
      confirm(
        "Tem certeza que deseja deletar esta transação? Esta ação não pode ser desfeita.",
      )
    ) {
      try {
        await deleteTransaction({ transactionId, barbershopId })
        setIsOpen(false)
      } catch (error) {
        console.error("Erro ao deletar transação:", error)
        alert("Ocorreu um erro ao deletar a transação. Tente novamente.")
      }
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          form.reset({
            amount: 50,
            category: TransactionCategory.OTHER,
            date: (() => {
              const today = new Date()
              today.setHours(12, 0, 0, 0) // Normaliza para meio-dia
              return today
            })(),
            name: "",
            paymentMethod: TransactionPaymentMethod.CASH,
            type: TransactionType.EXPENSE,
          })
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Atualizar" : "Criar"} transação
          </DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      value={field.value}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue)
                      }}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map(
                        (option: { value: TransactionType; label: string }) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map(
                        (option: {
                          value: TransactionCategory
                          label: string
                        }) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ),
                      )}
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
                  <FormLabel>Método de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um método de pagamento..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map(
                        (option: {
                          value: TransactionPaymentMethod
                          label: string
                        }) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ),
                      )}
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
            <DialogFooter className="flex-col gap-2 sm:flex-row">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              {isUpdate && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Deletar
                </Button>
              )}
              <Button type="submit">
                {isUpdate ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpsertTransactionDialog
