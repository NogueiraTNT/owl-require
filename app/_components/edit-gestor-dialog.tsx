"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
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
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { updateGestor } from "../_actions/update-gestor"
import {
  Gestor,
  GestorType,
  PlanType,
  SubscriptionStatus,
} from "@prisma/client"

interface EditGestorDialogProps {
  children: React.ReactNode
  gestor: Gestor
}

const EditGestorDialog = ({ children, gestor }: EditGestorDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: gestor.name || "",
    email: gestor.email,
    password: "",
    type: gestor.type,
    plan: gestor.plan || "NONE",
    subscriptionStatus: gestor.subscriptionStatus || "INACTIVE",
    planStartDate: gestor.planStartDate
      ? new Date(gestor.planStartDate).toISOString().split("T")[0]
      : "",
    planEndDate: gestor.planEndDate
      ? new Date(gestor.planEndDate).toISOString().split("T")[0]
      : "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await updateGestor({
        id: gestor.id,
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
        type: formData.type,
        plan: formData.plan === "NONE" ? null : (formData.plan as PlanType),
        subscriptionStatus: formData.subscriptionStatus as SubscriptionStatus,
        planStartDate: formData.planStartDate
          ? new Date(formData.planStartDate)
          : null,
        planEndDate: formData.planEndDate
          ? new Date(formData.planEndDate)
          : null,
      })

      if (result.success) {
        setOpen(false)
        router.refresh()
      } else {
        setError(result.error || "Erro ao atualizar gestor")
      }
    } catch (err) {
      setError("Erro interno do servidor")
    } finally {
      setIsLoading(false)
    }
  }

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData({ ...formData, password })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Gestor</DialogTitle>
          <DialogDescription>
            Atualize as informações do gestor {gestor.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite o nome completo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="gestor@exemplo.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Nova Senha (deixe vazio para manter atual)
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite uma nova senha ou deixe vazio"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={isLoading}
              />
              <div className="absolute top-1/2 right-2 flex -translate-y-1/2 space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-3 w-3" />
                  ) : (
                    <Eye className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={generatePassword}
                  disabled={isLoading}
                >
                  Gerar
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Gestor</Label>
              <Select
                value={formData.type}
                onValueChange={(value: GestorType) =>
                  setFormData({ ...formData, type: value })
                }
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OWNER">Proprietário</SelectItem>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                  <SelectItem value="WORKER">Funcionário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan">Plano</Label>
              <Select
                value={formData.plan}
                onValueChange={(value: PlanType | "NONE") =>
                  setFormData({ ...formData, plan: value })
                }
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">Sem Plano</SelectItem>
                  <SelectItem value="BASIC">Básico</SelectItem>
                  <SelectItem value="PRO">Pro</SelectItem>
                  <SelectItem value="PREMIUM">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subscriptionStatus">Status da Assinatura</Label>
            <Select
              value={formData.subscriptionStatus}
              onValueChange={(value: SubscriptionStatus) =>
                setFormData({ ...formData, subscriptionStatus: value })
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
                <SelectItem value="EXPIRED">Expirado</SelectItem>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="CANCELLED">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="planStartDate">Data de Início do Plano</Label>
              <Input
                id="planStartDate"
                type="date"
                value={formData.planStartDate}
                onChange={(e) =>
                  setFormData({ ...formData, planStartDate: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="planEndDate">Data de Vencimento do Plano</Label>
              <Input
                id="planEndDate"
                type="date"
                value={formData.planEndDate}
                onChange={(e) =>
                  setFormData({ ...formData, planEndDate: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditGestorDialog
