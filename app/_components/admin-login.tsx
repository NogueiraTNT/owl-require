"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Label } from "./ui/label"
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "./ui/alert"
import { adminSignIn } from "../_actions/admin-signin"

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await adminSignIn(email, password)

      if (result.success) {
        router.push("/admin/dashboard")
      } else {
        setError(result.error || "Erro ao fazer login")
      }
    } catch {
      setError("Erro interno do servidor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Shield className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold">CorteZapp Admin</CardTitle>
          <CardDescription>
            Acesso administrativo ao sistema CorteZapp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@cortezapp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
                  Entrando...
                </div>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Entrar no Admin
                </>
              )}
            </Button>
          </form>

          <div className="text-muted-foreground mt-6 text-center text-sm">
            <p>Acesso restrito a administradores</p>
            <p className="mt-1">
              <span className="text-primary font-medium">ADMIN</span> - Acesso
              total |{" "}
              <span className="font-medium text-amber-600">SUPORTE</span> -
              Acesso limitado
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminLogin
