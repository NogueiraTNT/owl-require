"use client"

import { BarbershopVerification } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Label } from "./label"

interface VerificationSelectProps {
  value?: BarbershopVerification | null
  onValueChange: (value: BarbershopVerification | null) => void
  label?: string
}

const VerificationSelect = ({
  value,
  onValueChange,
  label = "Status de Verificação",
}: VerificationSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="verification">{label}</Label>
      <Select
        value={value || ""}
        onValueChange={(newValue) => {
          if (newValue === "") {
            onValueChange(null)
          } else {
            onValueChange(newValue as BarbershopVerification)
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione o status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Sem verificação</SelectItem>
          <SelectItem value="PIONEER">🏆 Pioneiro (Dourado)</SelectItem>
          <SelectItem value="VERIFIED">✓ Verificado (Azul)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default VerificationSelect
