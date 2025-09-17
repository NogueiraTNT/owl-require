// app/store/new/_components/NewStoreForm.tsx

"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRef, useState } from "react"

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
import { Button } from "@/app/_components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import { createBarbershop } from "@/app/_actions/create-barbershop"
import type { PutBlobResult } from "@vercel/blob"
import {
  CNAE_OPTIONS,
  ESTADOS_BRASIL,
  validateCPF,
  validateCNPJ,
  formatCPF,
  formatCNPJ,
  formatCEP,
} from "@/app/_constants/cnae"

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
})

type FormSchema = z.infer<typeof formSchema>

interface NewStoreFormProps {
  gestorid: string
}

export const NewStoreForm = ({ gestorid }: NewStoreFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const inputFileRef = useRef<HTMLInputElement>(null)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      corporateName: "",
      cnae: "",
      cpfCnpj: "",
      stateRegistration: "",
      phones: "",
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      description: "",
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

  const handleSubmit = async (data: FormSchema) => {
    setIsSubmitting(true)
    try {
      const file = fileInputRef.current?.files?.[0]
      if (!file) {
        toast.error("Por favor, selecione uma imagem para a loja.")
        setIsSubmitting(false)
        return
      }

      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      })

      if (!response.ok) {
        throw new Error(
          "Falha no upload da imagem. Verifique os logs do servidor.",
        )
      }

      const newBlob = (await response.json()) as PutBlobResult

      const imageUrl = newBlob.url

      setBlob(newBlob)

      await createBarbershop({
        ...data,
        imageUrl,
        gestorid,
      })

      toast.success("Loja criada com sucesso! Redirecionando...")
    } catch (error) {
      console.error(error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao criar a loja.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Imagem da Loja */}
        <div className="rounded-lg border p-4 sm:p-6">
          <h3 className="mb-4 text-lg font-semibold">Imagem da Loja</h3>
          <FormItem>
            <FormLabel>Selecione uma imagem *</FormLabel>
            <FormControl>
              <Input
                type="file"
                ref={fileInputRef}
                disabled={isSubmitting}
                accept="image/*"
                className="file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>

        {/* Dados da Empresa */}
        <div className="rounded-lg border p-4 sm:p-6">
          <h3 className="mb-4 text-lg font-semibold">Dados da Empresa</h3>
          <div className="grid gap-4 sm:grid-cols-2">
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

        {/* Descrição */}
        <div className="rounded-lg border p-4 sm:p-6">
          <h3 className="mb-4 text-lg font-semibold">Descrição</h3>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
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
        </div>

        {/* Botão de Submit */}
        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:min-w-[200px]"
          >
            {isSubmitting ? "Criando Loja..." : "Criar Loja"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
