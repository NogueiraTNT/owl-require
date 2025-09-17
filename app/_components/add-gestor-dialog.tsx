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
import { createGestor } from "../_actions/create-gestor"

interface AddGestorDialogProps {
  children: React.ReactNode
}

const AddGestorDialog = ({ children }: AddGestorDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "OWNER" as "ADMIN" | "OWNER" | "WORKER",
    plan: "NONE" as "BASIC" | "PRO" | "PREMIUM" | "NONE",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await createGestor({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: formData.type,
        plan: formData.plan === "NONE" ? null : formData.plan,
      })

      if (result.success) {
        setOpen(false)
        setFormData({
          name: "",
          email: "",
          password: "",
          type: "OWNER",
          plan: "NONE",
        })
        router.refresh()
      } else {
        setError(result.error || "Erro ao criar gestor")
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Gestor</DialogTitle>
          <DialogDescription>
            Crie um novo gestor para o sistema CorteZapp
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite uma senha segura"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
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

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Gestor</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "ADMIN" | "OWNER" | "WORKER") =>
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
            <Label htmlFor="plan">Plano Inicial</Label>
            <Select
              value={formData.plan}
              onValueChange={(value: "BASIC" | "PRO" | "PREMIUM" | "NONE") =>
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
              {isLoading ? "Criando..." : "Criar Gestor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddGestorDialog
