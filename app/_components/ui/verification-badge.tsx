"use client"

import { BarbershopVerification } from "@/app/generated/prisma"
import { Badge } from "./badge"

interface VerificationBadgeProps {
  verification?: BarbershopVerification | null
  className?: string
}

const VerificationBadge = ({
  verification,
  className = "",
}: VerificationBadgeProps) => {
  if (!verification) return null

  const getBadgeConfig = (verification: BarbershopVerification) => {
    switch (verification) {
      case "PIONEER":
        return {
          label: "Pioneiro",
          className:
            "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 border-yellow-500",
          icon: "🏆",
        }
      case "VERIFIED":
        return {
          label: "Verificado",
          className:
            "bg-gradient-to-r from-blue-400 to-blue-600 text-blue-900 border-blue-500",
          icon: "✓",
        }
      default:
        return null
    }
  }

  const config = getBadgeConfig(verification)
  if (!config) return null

  return (
    <Badge
      className={`${config.className} ${className} font-semibold shadow-sm`}
      variant="outline"
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  )
}

export default VerificationBadge
