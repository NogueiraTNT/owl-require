import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Star, TrendingUp } from "lucide-react"

interface Rating {
  id: string
  rate: number
  userId: string | null
  user: { name: string | null } | null
  booking: {
    service: { name: string }
  }
}

interface RatingsCardProps {
  averageRating: number
  totalRatings: number
  lastRatings: Rating[]
}

export default function RatingsCard({
  averageRating,
  totalRatings,
  lastRatings,
}: RatingsCardProps) {
  // Componente para renderizar estrelas
  const StarRating = ({
    rating,
    size = "sm",
  }: {
    rating: number
    size?: "sm" | "lg"
  }) => {
    const starSize = size === "lg" ? "h-6 w-6" : "h-4 w-4"

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  const getQualityText = (rating: number) => {
    if (rating >= 4.5) return "Excelente"
    if (rating >= 4.0) return "Muito Bom"
    if (rating >= 3.5) return "Bom"
    if (rating >= 2.5) return "Regular"
    return "Precisa Melhorar"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-5 w-5" />
          Avaliações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Avaliação Média */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {averageRating.toFixed(1)}
              </span>
              <StarRating rating={Math.round(averageRating)} size="lg" />
            </div>
            <p className="text-muted-foreground text-sm">
              {getQualityText(averageRating)} • {totalRatings} avaliações
            </p>
          </div>
        </div>

        {/* Últimas Avaliações */}
        {lastRatings.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Últimas Avaliações</h4>
            <div className="max-h-48 space-y-2 overflow-y-auto">
              {lastRatings.map((rating) => (
                <div
                  key={rating.id}
                  className="flex items-start justify-between rounded-lg border p-3 text-sm"
                >
                  <div className="flex-1">
                    <p className="font-medium">{rating.booking.service.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {rating.user?.name || "Cliente"}
                    </p>
                  </div>
                  <StarRating rating={rating.rate} />
                </div>
              ))}
            </div>
          </div>
        )}

        {totalRatings === 0 && (
          <div className="py-4 text-center">
            <p className="text-muted-foreground text-sm">
              Nenhuma avaliação ainda
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
