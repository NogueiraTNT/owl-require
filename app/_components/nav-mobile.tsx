"use client"
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { MenuIcon } from "lucide-react"
import ButtonSignout from "./button-signout"
import { usePathname } from "next/navigation"
import type { Gestor } from "@prisma/client"
import NavLinks from "./nav-links"

type GestorForNav = Omit<Gestor, "password">

interface NavMobileProps {
  barbershopId?: string
  gestor: GestorForNav
  hasActivePlan: boolean
}

const NavMobile = ({ barbershopId, gestor, hasActivePlan }: NavMobileProps) => {
  const pathname = usePathname()
  return (
    <div className="flex items-center gap-4">
      {/* Menu de Usuário com Avatar (Desktop) */}
      <DropdownMenu>
        <p>{gestor.name}</p>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarImage
              src={gestor.image || "https://github.com/shadcn.png"}
              alt="Avatar"
            />
            <AvatarFallback>{gestor.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Configurações</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <ButtonSignout />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Menu "Hambúrguer" (Mobile) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          {/* Navegação para Mobile */}
          <NavLinks barbershopId={barbershopId} hasActivePlan={hasActivePlan} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default NavMobile
