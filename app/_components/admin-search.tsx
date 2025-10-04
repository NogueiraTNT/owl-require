"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table"
import { Badge } from "@/app/_components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Search, Filter, SortAsc, SortDesc } from "lucide-react"
import { globalSearch } from "@/app/_actions/global-search"

interface SearchResult {
  id: string
  model: string
  modelDisplayName: string
  data: any
  score: number
}

interface AdminSearchProps {
  onResultSelect?: (result: SearchResult) => void
}

export default function AdminSearch({ onResultSelect }: AdminSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModel, setSelectedModel] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const models = [
    { value: "all", label: "Todos os modelos" },
    { value: "User", label: "Usuários" },
    { value: "Gestor", label: "Gestores" },
    { value: "Barbershop", label: "Barbearias" },
    { value: "BarbershopService", label: "Serviços" },
    { value: "Worker", label: "Barbeiros" },
    { value: "Booking", label: "Agendamentos" },
    { value: "Transaction", label: "Transações" },
    { value: "Rating", label: "Avaliações" },
    { value: "Admin", label: "Administradores" },
  ]

  const sortOptions = [
    { value: "relevance", label: "Relevância" },
    { value: "name", label: "Nome" },
    { value: "created", label: "Data de Criação" },
    { value: "updated", label: "Última Atualização" },
  ]

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsLoading(true)
    setHasSearched(true)

    try {
      const searchResults = await globalSearch({
        query: searchTerm,
        model: selectedModel === "all" ? undefined : selectedModel,
        sortBy,
        sortOrder,
      })
      setResults(searchResults)
    } catch (error) {
      console.error("Erro na busca:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const getModelIcon = (model: string) => {
    const icons: Record<string, string> = {
      User: "👤",
      Gestor: "👨‍💼",
      Barbershop: "🏪",
      BarbershopService: "✂️",
      Worker: "👨‍💼",
      Booking: "📅",
      Transaction: "💰",
      Rating: "⭐",
      Admin: "👑",
    }
    return icons[model] || "📄"
  }

  const getModelColor = (model: string) => {
    const colors: Record<string, string> = {
      User: "bg-blue-100 text-blue-800",
      Gestor: "bg-green-100 text-green-800",
      Barbershop: "bg-purple-100 text-purple-800",
      BarbershopService: "bg-orange-100 text-orange-800",
      Worker: "bg-cyan-100 text-cyan-800",
      Booking: "bg-pink-100 text-pink-800",
      Transaction: "bg-emerald-100 text-emerald-800",
      Rating: "bg-yellow-100 text-yellow-800",
      Admin: "bg-red-100 text-red-800",
    }
    return colors[model] || "bg-gray-100 text-gray-800"
  }

  const formatResultData = (result: SearchResult) => {
    const data = result.data
    const fields = []

    if (data.name) fields.push(`Nome: ${data.name}`)
    if (data.email) fields.push(`Email: ${data.email}`)
    if (data.phone) fields.push(`Telefone: ${data.phone}`)
    if (data.address) fields.push(`Endereço: ${data.address}`)
    if (data.description) fields.push(`Descrição: ${data.description}`)
    if (data.price) fields.push(`Preço: R$ ${data.price}`)
    if (data.rate) fields.push(`Avaliação: ${data.rate}/5`)

    return fields.slice(0, 3).join(" • ")
  }

  return (
    <div className="space-y-4">
      {/* Filtros de Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Busca Global
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Buscar em todos os modelos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full"
              />
            </div>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por modelo" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
            <Button onClick={handleSearch} disabled={isLoading || !searchTerm.trim()}>
              <Search className="mr-1 h-4 w-4" />
              {isLoading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultados da Busca */}
      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Resultados da Busca
              {results.length > 0 && (
                <Badge variant="secondary">{results.length} resultado(s)</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Buscando...</span>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum resultado encontrado para "{searchTerm}"
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Modelo</TableHead>
                      <TableHead>Dados</TableHead>
                      <TableHead>Relevância</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => (
                      <TableRow key={`${result.model}-${result.id}`}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {getModelIcon(result.model)}
                            </span>
                            <div>
                              <div className="font-medium">
                                {result.modelDisplayName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {result.model}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground max-w-md truncate">
                            {formatResultData(result)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getModelColor(result.model)}>
                            {Math.round(result.score * 100)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onResultSelect?.(result)}
                          >
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
