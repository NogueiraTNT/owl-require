import NavLinks from "./nav-links"

interface NavDesktopProps {
  barbershopId?: string
  hasActivePlan: boolean
}

const NavDesktop = ({ barbershopId, hasActivePlan }: NavDesktopProps) => {
  return (
    <div className="hidden items-center gap-6 md:flex">
      {/* Navegação para Desktop */}
      <NavLinks barbershopId={barbershopId} hasActivePlan={hasActivePlan} />
    </div>
  )
}

export default NavDesktop
