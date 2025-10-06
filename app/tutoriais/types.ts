// Tipos para o sistema de tutoriais
// Este arquivo está preparado para quando vocês implementarem tutoriais dinâmicos

export type TutorialCategoryId =
  | "primeiros-passos"
  | "agendamentos"
  | "gestao-equipe"
  | "servicos"
  | "financeiro"
  | "notificacoes"
  | "relatorios"
  | "configuracoes"
  | "app-cliente"
  | "seguranca"
  | "integracao"
  | "suporte"

export type TutorialType = "article" | "video" | "pdf" | "interactive"

export type DifficultyLevel = "beginner" | "intermediate" | "advanced"

export interface Tutorial {
  id: string
  slug: string
  category: TutorialCategoryId
  title: string
  description: string
  content?: string // Markdown ou HTML
  type: TutorialType
  duration: string // ex: "5 min", "10 min"
  difficulty?: DifficultyLevel
  views: number
  rating: number
  tags: string[]
  videoUrl?: string
  thumbnailUrl?: string
  pdfUrl?: string
  author: {
    name: string
    avatar?: string
  }
  publishedAt: Date
  updatedAt: Date
  relatedTutorials?: string[] // IDs de tutoriais relacionados
  steps?: TutorialStep[]
}

export interface TutorialStep {
  id: string
  order: number
  title: string
  content: string
  imageUrl?: string
  videoUrl?: string
  code?: CodeBlock
}

export interface CodeBlock {
  language: string
  code: string
}

export interface TutorialCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  count: number
  tutorials: Tutorial[]
}

export interface TutorialStats {
  totalTutorials: number
  totalVideos: number
  totalCategories: number
  averageRating: number
  totalViews: number
  mostViewedTutorials: Tutorial[]
  recentTutorials: Tutorial[]
}

export interface SearchFilters {
  query: string
  categories: TutorialCategoryId[]
  types: TutorialType[]
  difficulty: DifficultyLevel[]
  sortBy: "relevance" | "date" | "views" | "rating"
}

// Exemplo de uso futuro:
/*
import { Tutorial, TutorialCategory } from './types'

const tutorial: Tutorial = {
  id: '1',
  slug: 'como-criar-barbearia',
  category: 'primeiros-passos',
  title: 'Como criar sua primeira barbearia',
  description: 'Passo a passo completo...',
  type: 'video',
  duration: '5 min',
  difficulty: 'beginner',
  views: 1250,
  rating: 4.8,
  tags: ['setup', 'configuração', 'início'],
  author: {
    name: 'Equipe CorteZapp',
  },
  publishedAt: new Date(),
  updatedAt: new Date(),
}
*/
