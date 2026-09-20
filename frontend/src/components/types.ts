// View-model contract between the analytics layer and the UI.
//
// The components in this folder are presentational: they receive ready-made
// numbers and never aggregate jobs themselves. Whoever wires the page
// (App.tsx) computes these props from `Job[]` with the pure functions in
// lib/analytics.ts. Every share is a number from 0 to 100.

/** Junior includes the "no experience" bucket. */
export type SeniorityLevel = 'junior' | 'semi-senior' | 'senior' | 'expert'

/** Same values as `remote_modality_normalized` in data.json. */
export type Modality = 'remote' | 'remote_local' | 'hybrid' | 'onsite'

/** Rolling window of `published_at` used by the explorer. */
export type DateRange = '3m' | '6m' | 'all'

/** A technology with its count in the current cut. `category` is the raw catalog key (language, cloud, ...). */
export interface RankedTech {
  name: string
  count: number
  category: string
}

export interface HeroData {
  totalJobs: number
  juniorTotal: number
  juniorRemoteGlobal: number
  seniorShare: number
  juniorShare: number
  remoteGlobalShare: number
  sources: string[]
  /** ISO dates. */
  capturedSince: string
  lastCapture: string
  publishedSince: string
}

export interface RankingProps {
  /** Sorted, already trimmed (top 15). */
  items: RankedTech[]
  /** Jobs in the cut, used for the percentage next to each bar. */
  total: number
  isSmall: boolean
  /** 'all' or a catalog category key. */
  category: string
  onCategoryChange: (category: string) => void
}

export interface LevelStat {
  level: SeniorityLevel
  count: number
  isSmall: boolean
}

export interface MatrixRow {
  name: string
  /** Share of the jobs of each level that mention the technology. */
  shares: Record<SeniorityLevel, number>
}

export interface SeniorityProps {
  total: number
  seniorShare: number
  /** One entry per level, in display order. */
  levels: LevelStat[]
  matrix: MatrixRow[]
  /** Optional sentence describing the pattern in the matrix. */
  insight?: string
}

export interface ModalityCounts {
  total: number
  counts: Record<Modality, number>
}

export interface JuniorsProps {
  all: ModalityCounts
  junior: ModalityCounts
}

export interface TrendProps {
  capturedSince: string
  lastCapture: string
}

export interface ExplorerFilters {
  seniority: 'all' | SeniorityLevel
  /** 'all' or a catalog category key. */
  category: string
  modality: 'all' | Modality
  range: DateRange
}

export interface JobRow {
  id: string
  title: string
  url: string
  /** Raw `seniority_normalized`. */
  seniority: string
  modality: Modality
  publishedAt: string
}

export interface ExplorerProps {
  filters: ExplorerFilters
  onFiltersChange: (next: ExplorerFilters) => void
  /** Jobs matching the filters. */
  n: number
  isSmall: boolean
  /** Human description of the applied cut, e.g. "Últimos 3 meses (desde el 15/06/2026)". */
  cutDescription: string
  ranking: RankedTech[]
  /** Visible rows, newest first. */
  jobs: JobRow[]
  canShowMore: boolean
  onShowMore: () => void
}

export type PageStatus = 'loading' | 'error' | 'ready'

export interface PageProps {
  status: PageStatus
  onRetry: () => void
  hero: HeroData
  ranking: RankingProps
  seniority: SeniorityProps
  juniors: JuniorsProps
  trend: TrendProps
  explorer: ExplorerProps
}
