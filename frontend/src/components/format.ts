const TECH_NAMES: Record<string, string> = {
  python: 'Python',
  aws: 'AWS',
  'ci/cd': 'CI/CD',
  sql: 'SQL',
  rest: 'REST',
  azure: 'Azure',
  git: 'Git',
  react: 'React',
  docker: 'Docker',
  typescript: 'TypeScript',
  gcp: 'GCP',
  devops: 'DevOps',
  javascript: 'JavaScript',
  node: 'Node',
  microservicios: 'Microservicios',
}

/** Display name for a technology as stored in the database (lowercase). */
export function formatTechName(name: string): string {
  return TECH_NAMES[name] ?? name.charAt(0).toUpperCase() + name.slice(1)
}

export function formatInt(value: number): string {
  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(value)
}

export function formatDecimal(value: number, decimals: number): string {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${formatDecimal(value, decimals)}%`
}

const UTC = 'UTC'

/** dd/mm/yyyy */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: UTC,
  }).format(new Date(iso))
}

/** "06 sep" */
export function formatDayMonth(iso: string): string {
  return new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short', timeZone: UTC })
    .format(new Date(iso))
    .replace('.', '')
}

/** "octubre de 2025" */
export function formatMonthYear(iso: string): string {
  return new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric', timeZone: UTC }).format(new Date(iso))
}

export function formatList(items: string[]): string {
  return new Intl.ListFormat('es', { style: 'long', type: 'conjunction' }).format(items)
}

const DAY_MS = 86_400_000

/** Whole days from one ISO date to another. */
export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((new Date(toIso).getTime() - new Date(fromIso).getTime()) / DAY_MS)
}

export function addDays(iso: string, days: number): string {
  return new Date(new Date(iso).getTime() + days * DAY_MS).toISOString()
}
