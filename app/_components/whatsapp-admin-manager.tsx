"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/_components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"
import {
  QrCode,
  Smartphone,
  CheckCircle,
  XCircle,
  Loader2,
  Send,
  PowerOff,
  AlertTriangle,
  Info,
} from "lucide-react"

interface WhatsAppStatus {
  connected: boolean
  ready: boolean
  connecting: boolean
  available: boolean
  phone?: string
  lastConnection?: string
  systemStatus?: string
  serverTime?: string
}

export default function WhatsAppAdminManager() {
  const [status, setStatus] = useState<WhatsAppStatus>({
    connected: false,
    ready: false,
    connecting: false,
    available: false,
  })
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [testNumber, setTestNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  // Função para buscar status
  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/whatsapp/status")
      const data = await response.json()
      setStatus(data)
    } catch {
      console.error("Erro ao buscar status")
    }
  }

  // Função para buscar QR Code
  const fetchQRCode = async () => {
    try {
      const response = await fetch("/api/whatsapp/qr")
      if (response.ok) {
        const data = await response.json()
        setQrCode(data.qrCode)
      } else {
        setQrCode(null)
      }
    } catch {
      console.error("Erro ao buscar QR Code")
      setQrCode(null)
    }
  }

  // Atualizar status a cada 3 segundos
  useEffect(() => {
    fetchStatus()
    fetchQRCode()

    const interval = setInterval(() => {
      fetchStatus()
      if (!status.connected) {
        fetchQRCode()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [status.connected])

  // Conectar WhatsApp
  const handleConnect = async () => {
    setIsLoading(true)
    setMessage(null)
    setQrCode(null)

    try {
      const response = await fetch("/api/whatsapp/connect", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Conectando... Aguarde o QR Code aparecer!",
        })

        // Aguardar um pouco e buscar o QR Code
        setTimeout(() => {
          fetchQRCode()
          fetchStatus()
        }, 2000)
      } else {
        setMessage({ type: "error", text: data.error || "Erro ao conectar" })
      }
    } catch {
      setMessage({ type: "error", text: "Erro de conexão com o servidor" })
    } finally {
      setIsLoading(false)
    }
  }

  // Desconectar WhatsApp
  const handleDisconnect = async () => {
    if (
      !confirm(
        "Tem certeza que deseja desconectar o WhatsApp? Será necessário escanear o QR Code novamente.",
      )
    ) {
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/whatsapp/disconnect", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: "success",
          text: "WhatsApp desconectado com sucesso!",
        })
        setQrCode(null)
        fetchStatus()
      } else {
        setMessage({ type: "error", text: data.error || "Erro ao desconectar" })
      }
    } catch {
      setMessage({ type: "error", text: "Erro de conexão com o servidor" })
    } finally {
      setIsLoading(false)
    }
  }

  // Enviar mensagem de teste
  const handleTestMessage = async () => {
    if (!testNumber.trim()) {
      setMessage({ type: "error", text: "Digite um número para teste" })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/whatsapp/send-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testNumber: testNumber.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: "success",
          text: `Mensagem de teste enviada para ${testNumber}!`,
        })
      } else {
        setMessage({
          type: "error",
          text: data.error || "Erro ao enviar mensagem",
        })
      }
    } catch {
      setMessage({ type: "error", text: "Erro de conexão com o servidor" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Status do WhatsApp */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Status da Conexão WhatsApp
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              {status.connected ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm">
                {status.connected ? "Conectado" : "Desconectado"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {status.ready ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-sm">
                {status.ready ? "Pronto" : "Aguardando"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {status.connecting ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              ) : (
                <div className="h-4 w-4" />
              )}
              <span className="text-sm">
                {status.connecting ? "Conectando..." : "Inativo"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Sistema OK</span>
            </div>
          </div>

          {status.phone && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <p className="text-sm text-green-700">
                <strong>📱 Número Conectado:</strong> +55 {status.phone}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conexão via QR Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Conectar WhatsApp - QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!status.connected && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>📱 MÉTODO RECOMENDADO:</strong> Use o QR Code para
                conectar seu WhatsApp de forma estável e confiável.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col items-center space-y-4">
            {!status.connected && !status.connecting && (
              <Button
                onClick={handleConnect}
                disabled={isLoading}
                size="lg"
                className="w-full max-w-md"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <QrCode className="mr-2 h-4 w-4" />
                )}
                Gerar QR Code para Conectar
              </Button>
            )}

            {status.connected && (
              <Button
                onClick={handleDisconnect}
                disabled={isLoading}
                variant="destructive"
                size="lg"
                className="w-full max-w-md"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PowerOff className="mr-2 h-4 w-4" />
                )}
                Desconectar WhatsApp
              </Button>
            )}

            {/* QR Code Display */}
            {qrCode && !status.connected && (
              <div className="space-y-4 text-center">
                <div className="inline-block rounded-lg border-2 border-gray-200 bg-white p-4">
                  <img
                    src={qrCode}
                    alt="QR Code WhatsApp"
                    className="mx-auto h-64 w-64"
                  />
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>📱 PASSO A PASSO:</strong>
                    <div className="mt-2 space-y-1">
                      <p>
                        <strong>1.</strong> Abra o WhatsApp no SEU celular de
                        ADMIN
                      </p>
                      <p>
                        <strong>2.</strong> Toque nos{" "}
                        <strong>3 pontinhos</strong> (⋮) no canto superior
                      </p>
                      <p>
                        <strong>3.</strong> Toque em{" "}
                        <strong>&quot;Dispositivos conectados&quot;</strong>
                      </p>
                      <p>
                        <strong>4.</strong> Toque em{" "}
                        <strong>&quot;Conectar um dispositivo&quot;</strong>
                      </p>
                      <p>
                        <strong>5.</strong>{" "}
                        <strong>Escaneie este QR Code</strong> com a câmera
                      </p>
                      <p>
                        <strong>6.</strong> ✅ Aguarde a confirmação!
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {status.connecting && !qrCode && (
              <div className="space-y-2 text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm text-gray-600">Gerando QR Code...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Teste de Mensagem */}
      {status.connected && status.ready && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Teste de Envio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <Label htmlFor="testNumber">Número para Teste</Label>
                <Input
                  id="testNumber"
                  type="tel"
                  placeholder="Ex: 85999999999"
                  value={testNumber}
                  onChange={(e) => setTestNumber(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleTestMessage}
                  disabled={isLoading || !testNumber.trim()}
                  className="w-full"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Enviar Teste
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensagens de Status */}
      {message && (
        <Alert
          className={
            message.type === "success"
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }
        >
          {message.type === "success" ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription
            className={
              message.type === "success" ? "text-green-700" : "text-red-700"
            }
          >
            {message.text}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
