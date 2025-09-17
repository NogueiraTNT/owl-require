// app/settings/[id]/_components/settings-form.tsx

"use client"

import { Barbershop } from "@prisma/client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import { Input } from "@/app/_components/ui/input"
import { Textarea } from "@/app/_components/ui/textarea"
import { Button } from "@/app/_components/ui/button"
import { updateBarbershop } from "@/app/_actions/update-barbershop"
import {
  CNAE_OPTIONS,
  ESTADOS_BRASIL,
  validateCPF,
  validateCNPJ,
  formatCPF,
  formatCNPJ,
  formatCEP,
} from "@/app/_constants/cnae"

// Schema de validação com Zod
const formSchema = z.object({
  // Dados básicos
  name: z.string().trim().min(1, "O nome fantasia é obrigatório."),
  corporateName: z.string().trim().min(1, "A razão social é obrigatória."),
  cnae: z.string().min(1, "O CNAE é obrigatório."),
  cpfCnpj: z
    .string()
    .trim()
    .min(1, "CPF/CNPJ é obrigatório.")
    .refine((val) => {
      const clean = val.replace(/[^\d]/g, "")
      return clean.length === 11
        ? validateCPF(val)
        : clean.length === 14
          ? validateCNPJ(val)
          : false
    }, "CPF/CNPJ inválido."),
  stateRegistration: z.string().optional(),

  // Contatos
  phones: z.string().trim().min(1, "Pelo menos um telefone é obrigatório."),

  // Endereço
  zipCode: z
    .string()
    .trim()
    .min(8, "CEP é obrigatório.")
    .max(9, "CEP inválido."),
  address: z.string().trim().min(1, "O endereço é obrigatório."),
  number: z.string().trim().min(1, "O número é obrigatório."),
  complement: z.string().optional(),
  neighborhood: z.string().trim().min(1, "O bairro é obrigatório."),
  city: z.string().trim().min(1, "A cidade é obrigatória."),
  state: z.string().min(1, "O estado é obrigatório."),

  // Outros
  description: z.string().trim().min(1, "A descrição é obrigatória."),
  theme: z.string().min(1, "O tema é obrigatório."),
})

type FormSchema = z.infer<typeof formSchema>

interface SettingsFormProps {
  barbershop: Barbershop
}

export const SettingsForm = ({ barbershop }: SettingsFormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    // Preenche o formulário com os dados existentes
    defaultValues: {
      name: barbershop.name,
      corporateName: barbershop.corporateName || "",
      cnae: barbershop.cnae || "",
      cpfCnpj: barbershop.cpfCnpj || "",
      stateRegistration: barbershop.stateRegistration || "",
      phones: barbershop.phones.join(", "),
      zipCode: barbershop.zipCode || "",
      address: barbershop.address,
      number: barbershop.number || "",
      complement: barbershop.complement || "",
      neighborhood: barbershop.neighborhood || "",
      city: barbershop.city || "",
      state: barbershop.state || "",
      description: barbershop.description,
      theme: barbershop.theme || "",
    },
  })

  // Função para buscar endereço pelo CEP
  const handleCepBlur = async (cep: string) => {
    const cleanCep = cep.replace(/[^\d]/g, "")
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`,
        )
        const data = await response.json()
        if (!data.erro) {
          form.setValue("address", data.logradouro || "")
          form.setValue("neighborhood", data.bairro || "")
          form.setValue("city", data.localidade || "")
          form.setValue("state", data.uf || "")
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error)
      }
    }
  }

  // Função para aplicar máscara no CPF/CNPJ
  const handleCpfCnpjChange = (value: string) => {
    const clean = value.replace(/[^\d]/g, "")
    if (clean.length <= 11) {
      return formatCPF(clean)
    } else {
      return formatCNPJ(clean)
    }
  }

  // Verificar se é CNPJ para mostrar campo de Inscrição Estadual
  const cpfCnpjValue = form.watch("cpfCnpj")
  const isCnpj = cpfCnpjValue?.replace(/[^\d]/g, "").length > 11

  const { isSubmitting } = form.formState

  const handleSubmit = async (data: FormSchema) => {
    try {
      await updateBarbershop({ id: barbershop.id, ...data })
      toast.success("Dados da barbearia atualizados com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao atualizar os dados.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Dados da Empresa */}
        <div className="rounded-lg border p-4 sm:p-6">
          <h3 className="mb-4 text-lg font-semibold">Dados da Empresa</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/50 rounded-lg border p-3 sm:col-span-2">
              <p className="text-muted-foreground text-sm font-medium">
                Código da Loja
              </p>
              <p className="font-mono text-lg">
                {barbershop.code || "Não definido"}
              </p>
            </div>

            <FormField
              control={form.control}
              name="corporateName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Razão Social *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Nome completo da empresa"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Fantasia *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Nome comercial"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cnae"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNAE *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o CNAE" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CNAE_OPTIONS.map((cnae) => (
                        <SelectItem key={cnae.value} value={cnae.value}>
                          {cnae.value} - {cnae.label}
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
              name="cpfCnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF/CNPJ *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="000.000.000-00 ou 00.000.000/0000-00"
                      onChange={(e) => {
                        const formatted = handleCpfCnpjChange(e.target.value)
                        field.onChange(formatted)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isCnpj && (
              <FormField
                control={form.control}
                name="stateRegistration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inscrição Estadual</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Inscrição Estadual (opcional para CNPJ)"
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Contato */}
        <div className="rounded-lg border p-4 sm:p-6">
          <h3 className="mb-4 text-lg font-semibold">Contato</h3>
          <FormField
            control={form.control}
            name="phones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefones *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="(11) 99999-9999, (11) 3333-3333"
                  />
                </FormControl>
                <p className="text-muted-foreground text-sm">
                  Separe múltiplos telefones com vírgula
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Endereço */}
        <div className="rounded-lg border p-4 sm:p-6">
          <h3 className="mb-4 text-lg font-semibold">Endereço</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="00000-000"
                      maxLength={9}
                      onChange={(e) => {
                        const formatted = formatCEP(e.target.value)
                        field.onChange(formatted)
                      }}
                      onBlur={(e) => handleCepBlur(e.target.value)}
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
                <FormItem className="sm:col-span-2">
                  <FormLabel>Endereço *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Rua, Avenida, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="123"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Apto, Sala, etc."
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Nome do bairro"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Nome da cidade"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ESTADOS_BRASIL.map((estado) => (
                        <SelectItem key={estado.value} value={estado.value}>
                          {estado.value} - {estado.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Descrição e Configurações */}
        <div className="rounded-lg border p-4 sm:p-6">
          <h3 className="mb-4 text-lg font-semibold">Configurações Gerais</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Descrição da Empresa *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Descreva sua empresa, serviços oferecidos, diferenciais..."
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tema *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="null">Padrão</SelectItem>
                      <SelectItem value="red">Vermelho</SelectItem>
                      <SelectItem value="redDark">Vermelho Escuro</SelectItem>
                      <SelectItem value="roseDark">Rosa Escuro</SelectItem>
                      <SelectItem value="orangeDark">Laranja Escuro</SelectItem>
                      <SelectItem value="greenDark">Verde Escuro</SelectItem>
                      <SelectItem value="blueDark">Azul Escuro</SelectItem>
                      <SelectItem value="yellowDark">Amarelo Escuro</SelectItem>
                      <SelectItem value="violetDark">Violeta Escuro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Botão de Submit */}
        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:min-w-[200px]"
          >
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
