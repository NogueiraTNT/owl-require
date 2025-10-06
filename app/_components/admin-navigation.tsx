"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../_lib/utils"
import { AdminType } from "@prisma/client"
import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  UserCheck,
  BarChart3,
  Settings,
  Database,
  Bell,
  Shield,
  MessageSquare,
  Newspaper,
} from "lucide-react"

interface AdminNavigationProps {
  adminType: AdminType
}

const AdminNavigation = ({ adminType }: AdminNavigationProps) => {
  const pathname = usePathname()

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      roles: ["ADMIN", "SUPORTE"],
    },
    {
      title: "Gestores",
      href: "/admin/gestores",
      icon: UserCheck,
      roles: ["ADMIN", "SUPORTE"],
    },
    {
      title: "Barbearias",
      href: "/admin/barbearias",
      icon: Building2,
      roles: ["ADMIN", "SUPORTE"],
    },
    {
      title: "Usuários",
      href: "/admin/usuarios",
      icon: Users,
      roles: ["ADMIN", "SUPORTE"],
    },
    {
      title: "Assinaturas",
      href: "/admin/assinaturas",
      icon: CreditCard,
      roles: ["ADMIN"],
    },
    {
      title: "Financeiro",
      href: "/admin/financeiro",
      icon: BarChart3,
      roles: ["ADMIN"],
    },
    {
      title: "Notificações",
      href: "/admin/notificacoes",
      icon: Bell,
      roles: ["ADMIN", "SUPORTE"],
    },
    {
      title: "WhatsApp",
      href: "/admin/whatsapp",
      icon: MessageSquare,
      roles: ["ADMIN"],
    },
    {
      title: "Banco de Dados",
      href: "/admin/database",
      icon: Database,
      roles: ["ADMIN"],
    },
    {
      title: "Administradores",
      href: "/admin/administradores",
      icon: Shield,
      roles: ["ADMIN"],
    },
    {
      title: "Configurações",
      href: "/admin/configuracoes",
      icon: Settings,
      roles: ["ADMIN"],
    },
    {
      title: "Novidades",
      href: "/novidades",
      icon: Newspaper,
      roles: ["ADMIN", "SUPORTE"],
    },
  ]

  const filteredNavItems = adminNavItems.filter((item) =>
    item.roles.includes(adminType),
  )

  return (
    <nav className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="space-y-1 p-4">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </div>

      {adminType === "SUPORTE" && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-medium text-amber-800">
                Acesso de Suporte
              </span>
            </div>
            <p className="mt-1 text-xs text-amber-700">
              Algumas funcionalidades são restritas
            </p>
          </div>
        </div>
      )}
    </nav>
  )
}

export default AdminNavigation
