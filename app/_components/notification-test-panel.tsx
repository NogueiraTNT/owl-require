"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Send,
  RefreshCw,
} from "lucide-react"
import { toast } from "sonner"

interface NotificationStatus {
  twilio: {
    connected: boolean
    accountSid?: string
    whatsappNumber?: string
    error?: string
  }
  whatsapp: {
    enabled: boolean
    provider: string
    status: string
  }
  email: {
    enabled: boolean
    provider: string
    status: string
  }
  sms: {
    enabled: boolean
    provider: string
    status: string
  }
}

interface TestResult {
  success: boolean
  messageId?: string
  error?: string
  channel: string
}

export default function NotificationTestPanel() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<NotificationStatus | null>(null)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isLoadingStatus, setIsLoadingStatus] = useState(false)

  const loadStatus = async () => {
    setIsLoadingStatus(true)
    try {
      const response = await fetch("/api/notifications/test")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Erro ao carregar status:", error)
      toast.error("Erro ao carregar status dos serviços")
    } finally {
      setIsLoadingStatus(false)
    }
  }

  const sendTestMessage = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Digite um número de telefone")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/notifications/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phoneNumber.trim() }),
      })

      const data = await response.json()
      setTestResult(data)

      if (data.success) {
        toast.success("Mensagem de teste enviada com sucesso!")
      } else {
        toast.error(data.error || "Erro ao enviar mensagem")
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      toast.error("Erro ao enviar mensagem de teste")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (connected: boolean) => {
    return connected ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: "bg-green-100 text-green-800",
      disconnected: "bg-red-100 text-red-800",
      disabled: "bg-gray-100 text-gray-800",
    }

    return (
      <Badge
        className={
          variants[status as keyof typeof variants] || variants.disabled
        }
      >
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Status dos Serviços */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Status dos Serviços de Notificação
              </CardTitle>
              <CardDescription>
                Verifique o status da integração com Twilio e outros serviços
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={loadStatus}
              disabled={isLoadingStatus}
            >
              {isLoadingStatus ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Atualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {status ? (
            <div className="space-y-4">
              {/* Twilio Status */}
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(status.twilio.connected)}
                  <div>
                    <div className="font-medium">Twilio</div>
                    <div className="text-sm text-muted-foreground">
                      {status.twilio.accountSid
                        ? `SID: ${status.twilio.accountSid}`
                        : "Não configurado"}
                    </div>
                  </div>
                </div>
                {getStatusBadge(
                  status.twilio.connected ? "connected" : "disconnected",
                )}
              </div>

              {/* WhatsApp Status */}
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(status.whatsapp.enabled)}
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-sm text-muted-foreground">
                      {status.whatsapp.provider} -{" "}
                      {status.twilio.whatsappNumber}
                    </div>
                  </div>
                </div>
                {getStatusBadge(status.whatsapp.status)}
              </div>

              {/* Email Status */}
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(status.email.enabled)}
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      {status.email.provider}
                    </div>
                  </div>
                </div>
                {getStatusBadge(status.email.status)}
              </div>

              {/* SMS Status */}
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(status.sms.enabled)}
                  <div>
                    <div className="font-medium">SMS</div>
                    <div className="text-sm text-muted-foreground">
                      {status.sms.provider}
                    </div>
                  </div>
                </div>
                {getStatusBadge(status.sms.status)}
              </div>

              {status.twilio.error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Erro na configuração:</span>
                  </div>
                  <p className="mt-1 text-sm text-red-700">
                    {status.twilio.error}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Clock className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">
                Clique em "Atualizar" para verificar o status
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Teste de Mensagem */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Teste de Mensagem WhatsApp
          </CardTitle>
          <CardDescription>
            Envie uma mensagem de teste para verificar a integração
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="phone">Número de Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+5511999999999"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Use o formato internacional (ex: +5511999999999)
            </p>
          </div>

          <Button
            onClick={sendTestMessage}
            disabled={isLoading || !phoneNumber.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Mensagem de Teste
              </>
            )}
          </Button>

          {testResult && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Resultado do Teste:</h4>
                <div className="flex items-center gap-2">
                  {testResult.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span
                    className={
                      testResult.success ? "text-green-600" : "text-red-600"
                    }
                  >
                    {testResult.success ? "Sucesso" : "Falha"}
                  </span>
                </div>

                {testResult.messageId && (
                  <div className="text-sm text-muted-foreground">
                    <strong>ID da Mensagem:</strong> {testResult.messageId}
                  </div>
                )}

                {testResult.error && (
                  <div className="text-sm text-red-600">
                    <strong>Erro:</strong> {testResult.error}
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  <strong>Canal:</strong> {testResult.channel}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
