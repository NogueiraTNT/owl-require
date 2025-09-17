import { db } from "../_lib/prisma"
import { redirect } from "next/navigation"
import NavMobile from "./nav-mobile"
import NavDesktop from "./nav-desktop"
import { getCurrentGestor } from "../_lib/session"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import MyStores from "./minhas-lojas"
import { getSubscriptionInfo } from "../_lib/subscription"

interface HeaderProps {
  barbershopId?: string
}

const Header = async ({ barbershopId }: HeaderProps = {}) => {
  const gestor = await getCurrentGestor()

  if (!gestor) {
    redirect("/")
  }

  const subscriptionInfo = await getSubscriptionInfo(gestor.id)

  // Se um barbershopId for fornecido, verificar se o gestor tem acesso a esta barbershop
  let currentBarbershopId = barbershopId

  if (currentBarbershopId) {
    const barbershopExists = await db.barbershop.findFirst({
      where: {
        id: currentBarbershopId,
        gestorid: gestor.id,
      },
    })

    if (!barbershopExists) {
      // Se a barbershop não existe ou não pertence ao gestor, buscar a primeira disponível
      const firstBarbershop = await db.barbershop.findFirst({
        where: {
          gestorid: gestor.id,
        },
      })
      currentBarbershopId = firstBarbershop?.id
    }
  } else {
    // Se não foi fornecido ID, buscar a primeira barbershop do gestor
    const firstBarbershop = await db.barbershop.findFirst({
      where: {
        gestorid: gestor.id,
      },
    })
    currentBarbershopId = firstBarbershop?.id
  }

  return (
    <header className="bg-background flex h-16 w-full items-center justify-between border-b px-4 md:justify-between md:px-6">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <button aria-label="Selecionar loja">
              <Image
                src="/logo.png"
                alt="Logo Owl Barber"
                width={120}
                height={30}
                className="cursor-pointer"
              />
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[80svh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Minhas Lojas</DialogTitle>
              <DialogDescription>
                Selecione a loja que você deseja gerenciar.
              </DialogDescription>
            </DialogHeader>
            <MyStores />
          </DialogContent>
        </Dialog>
      </div>

      {/* Lado Esquerdo: Logo e Navegação Principal (Desktop) */}
      <NavDesktop
        barbershopId={currentBarbershopId}
        hasActivePlan={subscriptionInfo.isActive}
      />

      {/* Lado Direito: Menu Mobile e Menu de Usuário */}
      <NavMobile
        barbershopId={currentBarbershopId}
        gestor={gestor}
        hasActivePlan={subscriptionInfo.isActive}
      />
    </header>
  )
}

export default Header
