"use client"

import { useNav } from "../_providers/navigation-provider"

export default function NavigationOverlay() {
  const { isNavigating } = useNav()
  if (!isNavigating) return null

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-2xl">
        <div className="relative flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-300 border-t-violet-700" />
          <div className="absolute h-4 w-4 animate-pulse rounded-full bg-violet-700" />
        </div>
        <p className="text-base font-medium text-zinc-700">
          Aguarde, estamos carregando os seus dados…
        </p>
        <div className="h-1 w-56 overflow-hidden rounded bg-zinc-200">
          <div className="h-full w-1/3 animate-[progress_1.4s_ease-in-out_infinite] bg-violet-700" />
        </div>
      </div>
    </div>
  )
}
