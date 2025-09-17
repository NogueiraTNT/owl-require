"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"

type Ctx = {
  isNavigating: boolean
  startNavigation: () => void
  stopNavigation: () => void // opcional
}

const NavCtx = createContext<Ctx | null>(null)

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()

  // quando a rota muda de fato, desligamos o overlay
  useEffect(() => {
    if (isNavigating) setIsNavigating(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const value = useMemo<Ctx>(
    () => ({
      isNavigating,
      startNavigation: () => setIsNavigating(true),
      stopNavigation: () => setIsNavigating(false),
    }),
    [isNavigating],
  )

  return <NavCtx.Provider value={value}>{children}</NavCtx.Provider>
}

export function useNav() {
  const ctx = useContext(NavCtx)
  if (!ctx)
    throw new Error("useNav deve ser usado dentro de <NavigationProvider>")
  return ctx
}
