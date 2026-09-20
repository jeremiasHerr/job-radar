import type { DateRange, ExplorerFilters, Modality, SeniorityLevel } from './types'

export interface CategoryStyle {
  /** Small swatch beside the label. */
  dot: string
  /** Pressed chip. */
  active: string
  /** Bar fill. */
  bar: string
}

// Five categories carry their own hue; every other catalog category is grey.
const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  language: { dot: 'bg-iris', active: 'border-iris bg-iris text-base', bar: 'bg-iris' },
  cloud: { dot: 'bg-teal', active: 'border-teal bg-teal text-base', bar: 'bg-teal' },
  devops: { dot: 'bg-violet', active: 'border-violet bg-violet text-base', bar: 'bg-violet' },
  backend: { dot: 'bg-rose', active: 'border-rose bg-rose text-base', bar: 'bg-rose' },
  frontend: { dot: 'bg-sky', active: 'border-sky bg-sky text-base', bar: 'bg-sky' },
}

const OTHER_CATEGORY_STYLE: CategoryStyle = {
  dot: 'bg-ctrl',
  active: 'border-ctrl bg-ctrl text-base',
  bar: 'bg-ctrl',
}

export function categoryStyle(category: string): CategoryStyle {
  return CATEGORY_STYLES[category] ?? OTHER_CATEGORY_STYLE
}

export interface Option<T extends string> {
  value: T
  label: string
}

/** Categories that get their own chip in the ranking. */
export const PRIMARY_CATEGORIES: Option<string>[] = [
  { value: 'language', label: 'Lenguajes' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'devops', label: 'DevOps' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
]

/** Every other category in catalog.py, reached through the "Más" menu. */
export const SECONDARY_CATEGORIES: Option<string>[] = [
  { value: 'database', label: 'Bases de datos' },
  { value: 'data', label: 'Datos' },
  { value: 'framework', label: 'Frameworks' },
  { value: 'tooling', label: 'Herramientas' },
  { value: 'ai-tooling', label: 'IA (herramientas)' },
  { value: 'ml', label: 'Machine learning' },
  { value: 'methodology', label: 'Metodologías' },
  { value: 'architecture', label: 'Arquitectura' },
  { value: 'testing', label: 'Testing' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'business-tool', label: 'Herramientas de negocio' },
  { value: 'certification', label: 'Certificaciones' },
  { value: 'automation', label: 'Automatización' },
  { value: 'mainframe', label: 'Mainframe' },
]

export const SENIORITY_OPTIONS: Option<'all' | SeniorityLevel>[] = [
  { value: 'all', label: 'Todos' },
  { value: 'junior', label: 'Junior o sin experiencia' },
  { value: 'semi-senior', label: 'Semi-senior' },
  { value: 'senior', label: 'Senior' },
  { value: 'expert', label: 'Expert' },
]

export const CATEGORY_OPTIONS: Option<string>[] = [
  { value: 'all', label: 'Todas' },
  ...PRIMARY_CATEGORIES,
  ...SECONDARY_CATEGORIES,
]

export const MODALITY_OPTIONS: Option<'all' | Modality>[] = [
  { value: 'all', label: 'Todas' },
  { value: 'remote', label: 'Remoto global' },
  { value: 'remote_local', label: 'Remoto con restricción' },
  { value: 'hybrid', label: 'Híbrido' },
  { value: 'onsite', label: 'Presencial' },
]

export const RANGE_OPTIONS: Option<DateRange>[] = [
  { value: '3m', label: 'Últimos 3 meses' },
  { value: '6m', label: 'Últimos 6 meses' },
  { value: 'all', label: 'Todo el período' },
]

/** Default explorer state: everything, last 3 months. */
export const DEFAULT_FILTERS: ExplorerFilters = {
  seniority: 'all',
  category: 'all',
  modality: 'all',
  range: '3m',
}

export const LEVEL_LABELS: Record<SeniorityLevel, string> = {
  junior: 'Junior o sin experiencia',
  'semi-senior': 'Semi-senior',
  senior: 'Senior',
  expert: 'Expert',
}

export const LEVEL_ORDER: SeniorityLevel[] = ['junior', 'semi-senior', 'senior', 'expert']

/** Bar fill and the readable ink for a label placed inside it. */
export const LEVEL_STYLES: Record<SeniorityLevel, { bar: string; ink: string }> = {
  junior: { bar: 'bg-iris', ink: 'text-base' },
  'semi-senior': { bar: 'bg-amber', ink: 'text-base' },
  senior: { bar: 'bg-amber', ink: 'text-base' },
  expert: { bar: 'bg-ctrl', ink: 'text-base' },
}

/** Raw `seniority_normalized` values, as they appear in a job row. */
export const SENIORITY_LABELS: Record<string, string> = {
  junior: 'Junior',
  'no experience': 'Sin experiencia',
  'semi-senior': 'Semi-senior',
  senior: 'Senior',
  expert: 'Expert',
}

export const MODALITY_LABELS: Record<Modality, string> = {
  remote: 'Remoto global',
  remote_local: 'Remoto con restricción',
  hybrid: 'Híbrido',
  onsite: 'Presencial',
}

// From most open to most local. Amber is reserved for global remote, the finding.
export const MODALITY_ORDER: Modality[] = ['remote', 'remote_local', 'hybrid', 'onsite']

export const MODALITY_STYLES: Record<Modality, { bar: string; ink: string }> = {
  remote: { bar: 'bg-amber', ink: 'text-base' },
  remote_local: { bar: 'bg-[#4b5a9e]', ink: 'text-ink' },
  hybrid: { bar: 'bg-iris', ink: 'text-base' },
  onsite: { bar: 'bg-[#a3b0ec]', ink: 'text-base' },
}
