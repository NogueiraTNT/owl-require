import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer className="mt-10">
      <Card className="p-0">
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            © 2025 Copyright <span className="font-bold">Corte</span>
            <span className="font-bold text-red-500">Zapp</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
