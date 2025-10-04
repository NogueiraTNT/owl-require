"use client"

import { useState } from "react"
import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { Textarea } from "@/app/_components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Save, X } from "lucide-react"

interface CrudModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "create" | "edit" | "view" | "delete"
  modelName: string
  modelDisplayName: string
  data?: Record<string, unknown>
  onSave?: (data: Record<string, unknown>) => Promise<void>
  onDelete?: (id: string) => Promise<void>
}

const getModelSchema = (modelName: string) => {
  const baseSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").optional(),
  })

  switch (modelName) {
    case "User":
      return baseSchema.extend({
        phone: z.string().optional(),
        image: z.string().optional(),
      })
    case "Gestor":
      return baseSchema.extend({
        password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
        type: z.enum(["ADMIN", "OWNER", "WORKER"]),
        plan: z.enum(["BASIC", "PRO", "PREMIUM"]).optional(),
      })
    case "Barbershop":
      return z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        corporateName: z.string().optional(),
        cpfCnpj: z.string().optional(),
        phones: z.array(z.string()).optional(),
        address: z.string().min(1, "Endereço é obrigatório"),
        city: z.string().optional(),
        state: z.string().optional(),
        description: z.string().min(1, "Descrição é obrigatória"),
        imageUrl: z.string().optional(),
        gestorid: z.string().min(1, "Gestor é obrigatório"),
      })
    case "BarbershopService":
      return z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        description: z.string().min(1, "Descrição é obrigatória"),
        price: z.string().min(1, "Preço é obrigatório"),
        barbershopId: z.string().min(1, "Barbearia é obrigatória"),
        active: z.boolean().default(true),
      })
    case "Worker":
      return z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido").optional(),
        phone: z.string().optional(),
        imageUrl: z.string().optional(),
        barbershopId: z.string().min(1, "Barbearia é obrigatória"),
        active: z.boolean().default(true),
      })
    case "Booking":
      return z.object({
        userId: z.string().optional(),
        serviceId: z.string().min(1, "Serviço é obrigatório"),
        workerId: z.string().min(1, "Barbeiro é obrigatório"),
        date: z.string().min(1, "Data é obrigatória"),
        clientName: z.string().optional(),
        clientPhone: z.string().optional(),
      })
    case "Transaction":
      return z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        type: z.enum(["DEPOSIT", "EXPENSE", "INVESTMENT"]),
        amount: z.string().min(1, "Valor é obrigatório"),
        category: z.enum([
          "SALARY",
          "FOOD",
          "TRANSPORT",
          "HOUSING",
          "UTILITIES",
          "OTHER",
          "BARBERSHOP",
        ]),
        paymentMethod: z.enum([
          "CREDIT_CARD",
          "DEBIT_CARD",
          "BANK_TRANSFER",
          "PIX",
          "CASH",
          "OTHER",
        ]),
        barbershopId: z.string().min(1, "Barbearia é obrigatória"),
      })
    case "Rating":
      return z.object({
        barbershopId: z.string().min(1, "Barbearia é obrigatória"),
        userId: z.string().optional(),
        bookingId: z.string().min(1, "Agendamento é obrigatório"),
        rate: z.number().min(1).max(5),
      })
    case "Admin":
      return z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
        type: z.enum(["SUPORTE", "ADMIN"]),
      })
    default:
      return baseSchema
  }
}

export default function CrudModal({
  isOpen,
  onClose,
  mode,
  modelName,
  modelDisplayName,
  data,
  onSave,
  onDelete,
}: CrudModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const schema = getModelSchema(modelName)
  type FormData = z.infer<typeof schema>

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: (data as FormData) || {},
  })

  const handleSave = async (formData: FormData) => {
    if (!onSave) return

    setIsLoading(true)
    try {
      await onSave(formData as Record<string, unknown>)
      onClose()
      form.reset()
    } catch (error) {
      console.error("Erro ao salvar:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!onDelete || !data?.id) return

    setIsLoading(true)
    try {
      await onDelete(data.id as string)
      onClose()
    } catch (error) {
      console.error("Erro ao deletar:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isReadOnly = mode === "view" || mode === "delete"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" && `Criar ${modelDisplayName}`}
            {mode === "edit" && `Editar ${modelDisplayName}`}
            {mode === "view" && `Visualizar ${modelDisplayName}`}
            {mode === "delete" && `Deletar ${modelDisplayName}`}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" &&
              `Criar um novo ${modelDisplayName.toLowerCase()}`}
            {mode === "edit" &&
              `Editar dados do ${modelDisplayName.toLowerCase()}`}
            {mode === "view" &&
              `Visualizar dados do ${modelDisplayName.toLowerCase()}`}
            {mode === "delete" &&
              `Tem certeza que deseja deletar este ${modelDisplayName.toLowerCase()}?`}
          </DialogDescription>
        </DialogHeader>

        {mode === "delete" ? (
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Esta ação não pode ser desfeita. Todos os dados relacionados serão
              perdidos permanentemente.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isReadOnly || isLoading}
                          placeholder="Digite o nome..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {modelName === "User" && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite o email..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phones"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite o telefone..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {modelName === "Gestor" && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite o email..."
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
                            disabled={isReadOnly || isLoading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ADMIN">Admin</SelectItem>
                              <SelectItem value="OWNER">
                                Proprietário
                              </SelectItem>
                              <SelectItem value="WORKER">
                                Trabalhador
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {mode === "create" && (
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                disabled={isReadOnly || isLoading}
                                placeholder="Digite a senha..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </>
                )}

                {modelName === "Barbershop" && (
                  <>
                    <FormField
                      control={form.control}
                      name="corporateName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Razão Social</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite a razão social..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cpfCnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF/CNPJ</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite CPF ou CNPJ..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite o endereço..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite a descrição..."
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {modelName === "BarbershopService" && (
                  <>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite a descrição..."
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite o preço..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {modelName === "Worker" && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite o email..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phones"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite o telefone..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {modelName === "Transaction" && (
                  <>
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isReadOnly || isLoading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="DEPOSIT">Depósito</SelectItem>
                              <SelectItem value="EXPENSE">Despesa</SelectItem>
                              <SelectItem value="INVESTMENT">
                                Investimento
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite o valor..."
                            />
                          </FormControl>
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
                            disabled={isReadOnly || isLoading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="SALARY">Salário</SelectItem>
                              <SelectItem value="FOOD">Alimentação</SelectItem>
                              <SelectItem value="TRANSPORT">
                                Transporte
                              </SelectItem>
                              <SelectItem value="HOUSING">Moradia</SelectItem>
                              <SelectItem value="UTILITIES">
                                Utilidades
                              </SelectItem>
                              <SelectItem value="BARBERSHOP">
                                Barbearia
                              </SelectItem>
                              <SelectItem value="OTHER">Outro</SelectItem>
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
                            disabled={isReadOnly || isLoading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o método" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="CREDIT_CARD">
                                Cartão de Crédito
                              </SelectItem>
                              <SelectItem value="DEBIT_CARD">
                                Cartão de Débito
                              </SelectItem>
                              <SelectItem value="BANK_TRANSFER">
                                Transferência
                              </SelectItem>
                              <SelectItem value="PIX">PIX</SelectItem>
                              <SelectItem value="CASH">Dinheiro</SelectItem>
                              <SelectItem value="OTHER">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {modelName === "Rating" && (
                  <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avaliação (1-5)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min="1"
                            max="5"
                            disabled={isReadOnly || isLoading}
                            placeholder="Digite a avaliação..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {modelName === "Admin" && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              disabled={isReadOnly || isLoading}
                              placeholder="Digite o email..."
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
                            disabled={isReadOnly || isLoading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="SUPORTE">Suporte</SelectItem>
                              <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {mode === "create" && (
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                disabled={isReadOnly || isLoading}
                                placeholder="Digite a senha..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </>
                )}
              </div>
            </form>
          </Form>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>

          {mode === "delete" ? (
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              Deletar
            </Button>
          ) : mode !== "view" ? (
            <Button
              type="button"
              onClick={form.handleSubmit(handleSave)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {mode === "create" ? "Criar" : "Salvar"}
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
