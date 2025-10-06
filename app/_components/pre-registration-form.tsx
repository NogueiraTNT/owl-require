"use client"

import { useState } from "react"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { Textarea } from "@/app/_components/ui/textarea"
import { Label } from "@/app/_components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"
import { Loader2, Check, CheckCircle } from "lucide-react"

export default function PreRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulando envio - você pode conectar isso a uma API depois
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    console.log("Dados do pré-cadastro:", data)

    // Simula um delay de envio
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form
    ;(e.target as HTMLFormElement).reset()

    // Reset success state after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Nome Completo */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Nome Completo <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Seu nome completo"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Telefone/WhatsApp <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Tipo de Negócio */}
        <div className="space-y-2">
          <Label htmlFor="businessType">
            Tipo de Negócio <span className="text-red-500">*</span>
          </Label>
          <Select name="businessType" required disabled={isSubmitting}>
            <SelectTrigger id="businessType">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="barbershop">Barbearia</SelectItem>
              <SelectItem value="salon">Salão de Beleza</SelectItem>
              <SelectItem value="spa">Spa</SelectItem>
              <SelectItem value="clinic">Clínica de Estética</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Nome do Estabelecimento */}
        <div className="space-y-2">
          <Label htmlFor="businessName">
            Nome do Estabelecimento <span className="text-red-500">*</span>
          </Label>
          <Input
            id="businessName"
            name="businessName"
            placeholder="Nome da sua barbearia/salão"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Cidade */}
        <div className="space-y-2">
          <Label htmlFor="city">
            Cidade <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            name="city"
            placeholder="Sua cidade"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Estado */}
        <div className="space-y-2">
          <Label htmlFor="state">
            Estado <span className="text-red-500">*</span>
          </Label>
          <Select name="state" required disabled={isSubmitting}>
            <SelectTrigger id="state">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AC">Acre</SelectItem>
              <SelectItem value="AL">Alagoas</SelectItem>
              <SelectItem value="AP">Amapá</SelectItem>
              <SelectItem value="AM">Amazonas</SelectItem>
              <SelectItem value="BA">Bahia</SelectItem>
              <SelectItem value="CE">Ceará</SelectItem>
              <SelectItem value="DF">Distrito Federal</SelectItem>
              <SelectItem value="ES">Espírito Santo</SelectItem>
              <SelectItem value="GO">Goiás</SelectItem>
              <SelectItem value="MA">Maranhão</SelectItem>
              <SelectItem value="MT">Mato Grosso</SelectItem>
              <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
              <SelectItem value="MG">Minas Gerais</SelectItem>
              <SelectItem value="PA">Pará</SelectItem>
              <SelectItem value="PB">Paraíba</SelectItem>
              <SelectItem value="PR">Paraná</SelectItem>
              <SelectItem value="PE">Pernambuco</SelectItem>
              <SelectItem value="PI">Piauí</SelectItem>
              <SelectItem value="RJ">Rio de Janeiro</SelectItem>
              <SelectItem value="RN">Rio Grande do Norte</SelectItem>
              <SelectItem value="RS">Rio Grande do Sul</SelectItem>
              <SelectItem value="RO">Rondônia</SelectItem>
              <SelectItem value="RR">Roraima</SelectItem>
              <SelectItem value="SC">Santa Catarina</SelectItem>
              <SelectItem value="SP">São Paulo</SelectItem>
              <SelectItem value="SE">Sergipe</SelectItem>
              <SelectItem value="TO">Tocantins</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Número de Funcionários */}
        <div className="space-y-2">
          <Label htmlFor="employeeCount">Número de Profissionais</Label>
          <Select name="employeeCount" disabled={isSubmitting}>
            <SelectTrigger id="employeeCount">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Apenas eu</SelectItem>
              <SelectItem value="2-5">2 a 5 profissionais</SelectItem>
              <SelectItem value="6-10">6 a 10 profissionais</SelectItem>
              <SelectItem value="11-20">11 a 20 profissionais</SelectItem>
              <SelectItem value="20+">Mais de 20 profissionais</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <Label htmlFor="message">Mensagem (Opcional)</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Conte-nos um pouco sobre seu negócio e suas necessidades..."
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      {/* Como conheceu */}
      <div className="space-y-2">
        <Label htmlFor="howFound">Como conheceu o CorteZapp?</Label>
        <Select name="howFound" disabled={isSubmitting}>
          <SelectTrigger id="howFound">
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google / Busca na Internet</SelectItem>
            <SelectItem value="social">Redes Sociais</SelectItem>
            <SelectItem value="friend">Indicação de Amigo/Colega</SelectItem>
            <SelectItem value="event">Evento/Feira</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Success Message */}
      {isSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Pré-cadastro realizado com sucesso! Entraremos em contato em breve.
            Obrigado pelo interesse!
          </AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : isSuccess ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Cadastro Enviado!
          </>
        ) : (
          "Fazer Pré-Cadastro"
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Ao enviar este formulário, você concorda em receber comunicações do
        CorteZapp sobre nossos produtos e serviços.
      </p>
    </form>
  )
}
