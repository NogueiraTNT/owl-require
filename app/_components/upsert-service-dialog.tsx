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
import { Input } from "./ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { upsertService } from "@/app/_actions/upsert-service"
import { deleteService } from "@/app/_actions/delete-service"
import { toggleServiceStatus } from "@/app/_actions/toggle-service-status"
import { MoneyInput } from "./money-input"
import { useRef, useState } from "react"
import Image from "next/image"

const DEFAULT_SERVICE_IMAGE =
  "https://img.freepik.com/vetores-gratis/circulo-azul-com-usuario-branco_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"

interface UpsertServiceData {
  name: string
  description: string
  price?: string // MoneyInput entrega string (ex: "R$ 20,00")
  imageUrl: string
  serviceId?: string // opcional
  active?: boolean
}

interface UpsertServiceDialogProps {
  isOpen: boolean
  defaultValues?: UpsertServiceData
  serviceId?: string
  barbershopId: string
  setIsOpen: (isOpen: boolean) => void
}

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório." }),
  description: z
    .string()
    .trim()
    .min(1, { message: "A descrição é obrigatória." }),
  price: z.string().trim().min(1, { message: "O preço é obrigatório." }),
  imageUrl: z.string().trim().min(1, { message: "A imagem é obrigatória." }),
})

type FormSchema = z.infer<typeof formSchema>

export default function UpsertServiceDialog({
  isOpen,
  defaultValues,
  serviceId,
  barbershopId,
  setIsOpen,
}: UpsertServiceDialogProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      price: defaultValues?.price ?? "",
      imageUrl: defaultValues?.imageUrl ?? "",
    },
  })

  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isUpdate = Boolean(serviceId)

  const handleDelete = async () => {
    if (!serviceId || !barbershopId) {
      return alert("Serviço ou barbearia não encontrada")
    }
    if (
      confirm(
        "Tem certeza que deseja deletar este serviço? Esta ação não pode ser desfeita.",
      )
    ) {
      try {
        await deleteService({ serviceId, barbershopId })
        setIsOpen(false)
      } catch (error) {
        console.error("Erro ao deletar serviço:", error)
        alert("Ocorreu um erro ao deletar o serviço. Tente novamente.")
      }
    }
  }

  const handleToggleStatus = async () => {
    if (!serviceId || !barbershopId) {
      return alert("Serviço ou barbearia não encontrada")
    }
    const action = defaultValues?.active ? "inativar" : "ativar"
    if (
      confirm(
        `Tem certeza que deseja ${action} este serviço? ${
          defaultValues?.active
            ? "Ele não ficará mais visível para os clientes."
            : "Ele ficará visível para os clientes novamente."
        }`,
      )
    ) {
      try {
        await toggleServiceStatus({ serviceId, barbershopId })
        setIsOpen(false)
      } catch (error) {
        console.error("Erro ao alterar status do serviço:", error)
        alert(
          "Ocorreu um erro ao alterar o status do serviço. Tente novamente.",
        )
      }
    }
  }

  const onSubmit = async (data: FormSchema) => {
    setIsUploading(true)

    try {
      const file = fileInputRef.current?.files?.[0]
      let imageUrl = defaultValues?.imageUrl || ""

      if (file) {
        try {
          console.log(
            "Iniciando upload do arquivo:",
            file.name,
            "Tamanho:",
            file.size,
          )

          const res = await fetch(
            `/api/upload?filename=${encodeURIComponent(file.name)}`,
            {
              method: "POST",
              body: file,
              headers: {
                "Content-Type": file.type,
              },
            },
          )

          console.log("Status da resposta:", res.status)

          if (res.ok) {
            const newBlob = await res.json()
            console.log("Upload response:", newBlob)

            if (newBlob.url) {
              imageUrl = newBlob.url
              console.log("Upload bem-sucedido! URL:", imageUrl)
            } else {
              console.error("Resposta não contém URL:", newBlob)
              throw new Error("Upload não retornou uma URL válida")
            }
          } else {
            const errorText = await res.text()
            console.error("Falha no upload:", res.status, errorText)
            throw new Error(`Upload falhou: ${res.status} - ${errorText}`)
          }
        } catch (e) {
          console.error("Erro no upload:", e)
          alert(
            `Erro no upload da imagem: ${e instanceof Error ? e.message : "Erro desconhecido"}. Usando imagem padrão.`,
          )
        }
      }
      if (!imageUrl) {
        imageUrl = DEFAULT_SERVICE_IMAGE
        console.log("Usando imagem padrão:", imageUrl)
      }

      await upsertService({
        ...(serviceId ? { serviceId } : {}), // não manda quando é novo
        name: data.name,
        description: data.description,
        price: data.price,
        barbershopId,
        imageUrl,
      })

      if (fileInputRef.current) fileInputRef.current.value = ""

      setIsOpen(false)
      form.reset({ name: "", description: "", price: "", imageUrl: "" })
    } catch (error) {
      console.error("Erro ao salvar serviço:", error)
      alert("Ocorreu um erro ao salvar o serviço. Tente novamente.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !isUploading && setIsOpen(open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Atualizar" : "Cadastrar"} Serviço
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Atualize as informações do serviço abaixo."
              : "Cadastre um novo serviço abaixo."}
          </DialogDescription>
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
                    <Input
                      placeholder="Digite o nome..."
                      {...field}
                      disabled={isUploading}
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
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a descrição..."
                      {...field}
                      disabled={isUploading}
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
                    <MoneyInput
                      placeholder="Digite o preço..."
                      {...field}
                      disabled={isUploading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload de imagem (arquivo) */}
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  disabled={isUploading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Preview opcional quando já tem imagem cadastrada */}
            {defaultValues?.imageUrl && (
              <div className="text-muted-foreground text-sm">
                Imagem atual:
                <div className="mt-2">
                  <Image
                    src={defaultValues.imageUrl}
                    alt="Imagem do serviço"
                    className="h-24 w-24 rounded object-cover"
                    width={96}
                    height={96}
                  />
                </div>
              </div>
            )}

            <DialogFooter className="flex-col gap-2 sm:flex-row">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isUploading}>
                  Cancelar
                </Button>
              </DialogClose>
              {isUpdate && (
                <>
                  <Button
                    type="button"
                    variant={defaultValues?.active ? "secondary" : "default"}
                    onClick={handleToggleStatus}
                    disabled={isUploading}
                  >
                    {defaultValues?.active ? "Inativar" : "Ativar"}
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isUploading}
                  >
                    Deletar
                  </Button>
                </>
              )}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isUploading}
              >
                {form.formState.isSubmitting || isUploading
                  ? "Salvando..."
                  : isUpdate
                    ? "Atualizar"
                    : "Cadastrar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
