"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Alert, AlertDescription } from "./ui/alert"
import { AlertTriangle, Trash2 } from "lucide-react"
import { deleteGestor } from "../_actions/delete-gestor"

interface DeleteGestorDialogProps {
  children: React.ReactNode
  gestorId: string
  gestorName: string
}

const DeleteGestorDialog = ({
  children,
  gestorId,
  gestorName,
}: DeleteGestorDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleDelete = async () => {
    setIsLoading(true)
    setError("")

    try {
      const result = await deleteGestor(gestorId)

      if (result.success) {
        setOpen(false)
        router.refresh()
      } else {
        setError(result.error || "Erro ao excluir gestor")
      }
    } catch {
      setError("Erro interno do servidor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>Excluir Gestor</DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Você está prestes a excluir o gestor <strong>{gestorName}</strong>
              .
              <br />
              <br />
              Esta ação irá:
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Remover o gestor permanentemente</li>
                <li>Desassociar todas as barbearias vinculadas</li>
                <li>Cancelar assinaturas ativas</li>
              </ul>
              <br />
              <strong>Esta ação não pode ser desfeita!</strong>
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
                Excluindo...
              </div>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir Gestor
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteGestorDialog
