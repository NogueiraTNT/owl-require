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
import { upsertWorker } from "@/app/_actions/upsert-worker"
import { useState, useRef } from "react"
import { Checkbox } from "./ui/checkbox"
import { deleteWorker } from "../_actions/delete-worker"
import { toggleWorkerStatus } from "../_actions/toggle-worker-status"

const HORARIOS_DISPONIVEIS = Array.from({ length: 15 }, (_, i) => {
  const hour = i + 8
  return `${hour.toString().padStart(2, "0")}:00`
})

const DEFAULT_AVATAR_URL =
  "https://img.freepik.com/vetores-gratis/circulo-azul-com-usuario-branco_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"

interface UpsertWorkerData {
  name: string
  imageUrl?: string
  horarios?: string[]
  active?: boolean
}

interface UpsertWorkerDialogProps {
  isOpen: boolean
  defaultValues?: UpsertWorkerData
  workerId?: string
  barbershopId: string
  setIsOpen: (isOpen: boolean) => void
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  horarios: z.array(z.string()).min(1, {
    message: "Selecione pelo menos um horário de trabalho.",
  }),
})

type FormSchema = z.infer<typeof formSchema>

const UpsertWorkerDialog = ({
  isOpen,
  defaultValues,
  workerId,
  barbershopId,
  setIsOpen,
}: UpsertWorkerDialogProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      horarios: defaultValues?.horarios ?? [],
    },
  })

  const onSubmit = async (data: FormSchema) => {
    setIsUploading(true)

    try {
      const file = fileInputRef.current?.files?.[0]
      let imageUrl = defaultValues?.imageUrl

      if (file) {
        try {
          const response = await fetch(`/api/upload?filename=${file.name}`, {
            method: "POST",
            body: file,
          })

          if (response.ok) {
            const newBlob = await response.json()
            imageUrl = newBlob.url
          } else {
            console.warn(
              "Falha no upload da imagem. O processo de cadastro continuará com a imagem padrão.",
            )
          }
        } catch (uploadError) {
          console.error("Erro crítico durante o upload da imagem:", uploadError)
        }
      }

      if (!imageUrl) {
        imageUrl = DEFAULT_AVATAR_URL
      }

      await upsertWorker({
        id: workerId,
        name: data.name,
        imageUrl: imageUrl,
        barbershopId,
        horarios: data.horarios,
      })

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      setIsOpen(false)
      form.reset({ name: "", horarios: [] })
    } catch (error) {
      console.error("Ocorreu um erro ao salvar o funcionário:", error)
      alert("Ocorreu um erro ao salvar o funcionário. Tente novamente.")
    } finally {
      setIsUploading(false)
    }
  }

  const isUpdate = Boolean(workerId)

  const handleDelete = async () => {
    if (!workerId || !barbershopId) {
      return alert("Funcionário ou barbearia não encontrado")
    }
    if (
      confirm(
        "Tem certeza que deseja deletar este funcionário? Esta ação não pode ser desfeita.",
      )
    ) {
      try {
        await deleteWorker({ workerId, barbershopId })
        setIsOpen(false)
      } catch (error) {
        console.error("Erro ao deletar funcionário:", error)
        alert("Ocorreu um erro ao deletar o funcionário. Tente novamente.")
      }
    }
  }

  const handleToggleStatus = async () => {
    if (!workerId || !barbershopId) {
      return alert("Funcionário ou barbearia não encontrado")
    }
    const action = defaultValues?.active ? "inativar" : "ativar"
    if (
      confirm(
        `Tem certeza que deseja ${action} este funcionário? ${
          defaultValues?.active
            ? "Ele não ficará mais disponível para novos agendamentos."
            : "Ele ficará disponível para novos agendamentos novamente."
        }`,
      )
    ) {
      try {
        await toggleWorkerStatus({ workerId, barbershopId })
        setIsOpen(false)
      } catch (error) {
        console.error("Erro ao alterar status do funcionário:", error)
        alert(
          "Ocorreu um erro ao alterar o status do funcionário. Tente novamente.",
        )
      }
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
            {isUpdate ? "Atualizar" : "Cadastrar"} Funcionário
          </DialogTitle>
          <DialogDescription>
            Insira as informações do funcionário abaixo.
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
            <FormItem>
              <FormLabel>Foto</FormLabel>
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
            <FormField
              control={form.control}
              name="horarios"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horários de Trabalho</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-4 gap-2 rounded-lg border p-4">
                      {HORARIOS_DISPONIVEIS.map((horario) => (
                        <FormItem
                          key={horario}
                          className="flex flex-row items-start space-y-0 space-x-3"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(horario)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([
                                    ...(field.value ?? []),
                                    horario,
                                  ])
                                } else {
                                  field.onChange(
                                    (field.value ?? []).filter(
                                      (value) => value !== horario,
                                    ),
                                  )
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {horario}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              <Button type="submit" disabled={isUploading}>
                {isUploading
                  ? "Salvando..."
                  : isUpdate
                    ? "Salvar Alterações"
                    : "Cadastrar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpsertWorkerDialog
