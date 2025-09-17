// app/store/new/page.tsx

import Header from "@/app/_components/header"
import { NewStoreForm } from "./_components/NewStoreForm"
import { redirect } from "next/navigation"
import { getCurrentGestor } from "@/app/_lib/session"

const NewStorePage = async () => {
  // LÓGICA DE AUTENTICAÇÃO: Obter o gestor logado
  // Estou usando NextAuth como exemplo, adapte para sua solução.
  const gestor = await getCurrentGestor()
  if (!gestor) {
    redirect("/")
  }

  // Assumindo que o ID do usuário da sessão é o 'gestorid'
  const gestorId = gestor.id

  return (
    <div>
      <Header />
      <div className="space-y-4 p-4 sm:p-6">
        <div className="space-y-2">
          <h1 className="text-xl font-bold sm:text-2xl">
            Crie sua Primeira Loja
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Preencha os dados abaixo para cadastrar sua barbearia na plataforma.
          </p>
        </div>

        <div className="mt-6">
          <NewStoreForm gestorid={gestorId} />
        </div>
      </div>
    </div>
  )
}

export default NewStorePage
