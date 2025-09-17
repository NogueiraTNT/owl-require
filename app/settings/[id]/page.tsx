// app/settings/[id]/page.tsx

import Header from "../../_components/header"
import { db } from "@/app/_lib/prisma"
import { SettingsForm } from "./_components/settings-form"
import { notFound } from "next/navigation"

interface SettingsProps {
  params: Promise<{ id: string }>
}

const Settings = async ({ params }: SettingsProps) => {
  const { id } = await params
  const barbershop = await db.barbershop.findUnique({
    where: { id },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <Header barbershopId={id} />
      <div className="space-y-4 p-6">
        <h1 className="text-xl font-bold">Dados da Loja</h1>

        {/* Renderiza o formulário interativo e passa os dados */}
        <SettingsForm barbershop={barbershop} />
      </div>
    </div>
  )
}

export default Settings
