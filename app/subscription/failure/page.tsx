import Header from "../../_components/header"
import { getCurrentGestor } from "../../_lib/session"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"
import { XCircle } from "lucide-react"
import { Button } from "@/app/_components/ui/button"
import Link from "next/link"

const SubscriptionFailure = async () => {
  const gestor = await getCurrentGestor()
  if (!gestor) {
    redirect("/")
  }

  return (
    <div>
      <Header />

      <main className="px-4 py-6 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-red-800">
                Pagamento Não Aprovado
              </h1>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                Infelizmente, não foi possível processar seu pagamento.
                Verifique os dados do seu cartão ou método de pagamento e tente
                novamente.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild>
                  <Link href="/subscription">Tentar Novamente</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Voltar ao Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default SubscriptionFailure
