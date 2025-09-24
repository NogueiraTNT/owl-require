"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  updateBarbershopAdmin,
  UpdateBarbershopData,
} from "@/app/_actions/update-barbershop-admin"
import { BarbershopVerification, ThemeType } from "@/app/generated/prisma"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Textarea } from "./textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Building2, MapPin, Phone, Mail, User, FileText } from "lucide-react"

interface BarbershopEditFormProps {
  barbershop: {
    id: string
    name: string
    corporateName: string | null
    cnae: string | null
    cpfCnpj: string | null
    stateRegistration: string | null
    phones: string[]
    zipCode: string | null
    address: string
    number: string | null
    complement: string | null
    neighborhood: string | null
    city: string | null
    state: string | null
    description: string
    imageUrl: string
    bannerUrl: string | null
    theme: ThemeType | null
    verification: BarbershopVerification | null
    latitude: number | null
    longitude: number | null
    createdAt: Date
    updatedAt: Date
    gestor: {
      id: string
      name: string | null
      email: string
    }
  }
  onClose: () => void
}

const BarbershopEditForm = ({
  barbershop,
  onClose,
}: BarbershopEditFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<UpdateBarbershopData>({
    name: barbershop.name,
    corporateName: barbershop.corporateName || "",
    cnae: barbershop.cnae || "",
    cpfCnpj: barbershop.cpfCnpj || "",
    stateRegistration: barbershop.stateRegistration || "",
    phones: barbershop.phones || [],
    zipCode: barbershop.zipCode || "",
    address: barbershop.address,
    number: barbershop.number || "",
    complement: barbershop.complement || "",
    neighborhood: barbershop.neighborhood || "",
    city: barbershop.city || "",
    state: barbershop.state || "",
    description: barbershop.description,
    imageUrl: barbershop.imageUrl,
    bannerUrl: barbershop.bannerUrl || "",
    theme: barbershop.theme,
    verification: barbershop.verification,
    latitude: barbershop.latitude,
    longitude: barbershop.longitude,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updateBarbershopAdmin(barbershop.id, formData)
      toast.success("Barbearia atualizada com sucesso!")
      onClose()
    } catch (error) {
      console.error("Erro ao atualizar barbearia:", error)
      toast.error("Erro ao atualizar barbearia")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    field: keyof UpdateBarbershopData,
    value:
      | string
      | string[]
      | number
      | null
      | ThemeType
      | BarbershopVerification,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePhonesChange = (phonesString: string) => {
    const phones = phonesString
      .split(",")
      .map((phone) => phone.trim())
      .filter(Boolean)
    handleInputChange("phones", phones)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Nome Fantasia *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="corporateName">Razão Social</Label>
              <Input
                id="corporateName"
                value={formData.corporateName}
                onChange={(e) =>
                  handleInputChange("corporateName", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="cnae">CNAE</Label>
              <Input
                id="cnae"
                value={formData.cnae}
                onChange={(e) => handleInputChange("cnae", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
              <Input
                id="cpfCnpj"
                value={formData.cpfCnpj}
                onChange={(e) => handleInputChange("cpfCnpj", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="stateRegistration">Inscrição Estadual</Label>
              <Input
                id="stateRegistration"
                value={formData.stateRegistration}
                onChange={(e) =>
                  handleInputChange("stateRegistration", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Localização */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Localização
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address">Endereço *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => handleInputChange("number", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={formData.complement}
                onChange={(e) =>
                  handleInputChange("complement", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={formData.neighborhood}
                onChange={(e) =>
                  handleInputChange("neighborhood", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="phones">Telefones (separados por vírgula)</Label>
            <Input
              id="phones"
              value={formData.phones?.join(", ") || ""}
              onChange={(e) => handlePhonesChange(e.target.value)}
              placeholder="Ex: (11) 99999-9999, (11) 88888-8888"
            />
          </div>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="theme">Tema</Label>
              <Select
                value={formData.theme || "default"}
                onValueChange={(value) =>
                  handleInputChange("theme", value === "default" ? null : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Padrão</SelectItem>
                  <SelectItem value="red">Vermelho</SelectItem>
                  <SelectItem value="redDark">Vermelho Escuro</SelectItem>
                  <SelectItem value="rose">Rosa</SelectItem>
                  <SelectItem value="roseDark">Rosa Escuro</SelectItem>
                  <SelectItem value="orange">Laranja</SelectItem>
                  <SelectItem value="orangeDark">Laranja Escuro</SelectItem>
                  <SelectItem value="green">Verde</SelectItem>
                  <SelectItem value="greenDark">Verde Escuro</SelectItem>
                  <SelectItem value="blue">Azul</SelectItem>
                  <SelectItem value="blueDark">Azul Escuro</SelectItem>
                  <SelectItem value="yellow">Amarelo</SelectItem>
                  <SelectItem value="yellowDark">Amarelo Escuro</SelectItem>
                  <SelectItem value="violet">Violeta</SelectItem>
                  <SelectItem value="violetDark">Violeta Escuro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="verification">Status de Verificação</Label>
              <Select
                value={formData.verification || "none"}
                onValueChange={(value) =>
                  handleInputChange(
                    "verification",
                    value === "none" ? null : value,
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem verificação</SelectItem>
                  <SelectItem value="PIONEER">🏆 Pioneiro</SelectItem>
                  <SelectItem value="VERIFIED">✓ Verificado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bannerUrl">URL do Banner</Label>
              <Input
                id="bannerUrl"
                value={formData.bannerUrl}
                onChange={(e) => handleInputChange("bannerUrl", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Gestor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações do Gestor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <div className="font-medium">
                {barbershop.gestor.name || "Sem nome"}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Mail className="h-3 w-3" />
                {barbershop.gestor.email}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  )
}

export default BarbershopEditForm
