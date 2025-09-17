"use client"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Shield, LogOut, Settings, User } from "lucide-react"
import { adminSignOut } from "../_actions/admin-signin"
import { useRouter } from "next/navigation"
import { AdminType } from "@prisma/client"

interface AdminHeaderProps {
  admin: {
    id: string
    name: string
    email: string
    type: AdminType
  }
}

const AdminHeader = ({ admin }: AdminHeaderProps) => {
  const router = useRouter()

  const handleSignOut = async () => {
    await adminSignOut()
    router.push("/")
  }

  const getTypeColor = (type: AdminType) => {
    return type === "ADMIN" ? "text-primary" : "text-amber-600"
  }

  const getTypeLabel = (type: AdminType) => {
    return type === "ADMIN" ? "Administrador" : "Suporte"
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="text-primary h-6 w-6" />
            <div>
              <h1 className="text-lg font-semibold">CorteZapp Admin</h1>
              <p className="text-muted-foreground text-xs">
                Painel Administrativo
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium">{admin.name}</p>
            <p className={`text-xs ${getTypeColor(admin.type)}`}>
              {getTypeLabel(admin.type)}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10">
                    {admin.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm leading-none font-medium">{admin.name}</p>
                <p className="text-muted-foreground text-xs leading-none">
                  {admin.email}
                </p>
                <span
                  className={`text-xs font-medium ${getTypeColor(admin.type)}`}
                >
                  {getTypeLabel(admin.type)}
                </span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
