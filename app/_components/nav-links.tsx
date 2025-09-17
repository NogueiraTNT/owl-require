"use client"
import {
  ArrowDownUpIcon,
  Calendar,
  CreditCardIcon,
  LayoutDashboard,
  Lock,
  Scissors,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"
import LinkNav from "./link-nav"

interface NavLinksProps {
  barbershopId?: string
  hasActivePlan: boolean
}

const NavLinks = ({ barbershopId, hasActivePlan }: NavLinksProps) => {
  const pathname = usePathname()

  // Função para verificar se o link deve estar disponível
  const getLinkProps = (href: string, isRestricted: boolean = false) => {
    const isActive = pathname === href
    const isDisabled = isRestricted && !hasActivePlan

    return {
      href: isDisabled ? "/subscription" : href,
      className: `${
        isActive
          ? "text-primary"
          : isDisabled
            ? "text-muted-foreground/50"
            : "text-muted-foreground"
      } hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors ${
        isDisabled ? "cursor-not-allowed" : ""
      }`,
    }
  }

  return (
    <nav className="mt-6 flex flex-col gap-3 md:mt-0 md:flex-row md:items-center md:gap-6">
      {/* Dashboard - sempre disponível */}
      <LinkNav {...getLinkProps(`/dashboard/${barbershopId}`)}>
        <LayoutDashboard size={18} />
        Dashboard
        {!hasActivePlan && <Lock size={14} className="ml-1" />}
      </LinkNav>

      {/* Assinatura - sempre disponível */}
      <LinkNav {...getLinkProps(`/subscription`)}>
        <CreditCardIcon size={18} />
        Assinatura
      </LinkNav>

      {/* Links restritos - só disponíveis com plano ativo */}
      <LinkNav {...getLinkProps(`/appointments/${barbershopId}`, true)}>
        <Calendar size={18} />
        Agendamentos
        {!hasActivePlan && <Lock size={14} className="ml-1" />}
      </LinkNav>

      <LinkNav {...getLinkProps(`/transactions/${barbershopId}`, true)}>
        <ArrowDownUpIcon size={18} />
        Transações
        {!hasActivePlan && <Lock size={14} className="ml-1" />}
      </LinkNav>

      <LinkNav {...getLinkProps(`/settings/${barbershopId}`, true)}>
        <SettingsIcon size={18} />
        Configurações
        {!hasActivePlan && <Lock size={14} className="ml-1" />}
      </LinkNav>

      <LinkNav {...getLinkProps(`/employees/${barbershopId}`, true)}>
        <UsersIcon size={18} />
        Funcionários
        {!hasActivePlan && <Lock size={14} className="ml-1" />}
      </LinkNav>

      <LinkNav {...getLinkProps(`/services/${barbershopId}`, true)}>
        <Scissors size={18} />
        Serviços
        {!hasActivePlan && <Lock size={14} className="ml-1" />}
      </LinkNav>
    </nav>
  )
}

export default NavLinks
