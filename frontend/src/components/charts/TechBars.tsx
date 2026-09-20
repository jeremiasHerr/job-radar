import { categoryStyle } from '../constants'
import { formatInt, formatPercent, formatTechName } from '../format'
import type { RankedTech } from '../types'

interface TechBarsProps {
  items: RankedTech[]
  /** Jobs in the cut; the share next to each bar is count / total. */
  total: number
  /** Bar thickness in px. Marks stay under 24 px. */
  thickness?: number
}

/** Horizontal bars coloured by technology category, with the value at the tip of each bar. */
export function TechBars({ items, total, thickness = 20 }: TechBarsProps) {
  const max = Math.max(1, ...items.map((item) => item.count))

  return (
    <ul className="flex flex-col gap-4 md:gap-2.5">
      {items.map((item) => (
        <li key={item.name} className="grid gap-1.5 md:grid-cols-[150px_minmax(0,1fr)] md:items-center md:gap-4">
          <span className="text-[15px]">{formatTechName(item.name)}</span>
          <span className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className={`shrink-0 rounded-r-[4px] transition-[width] duration-200 motion-reduce:transition-none ${categoryStyle(item.category).bar}`}
              style={{ width: `${(item.count / max) * 62}%`, height: thickness }}
            />
            <span className="font-mono text-[15px]">{formatInt(item.count)}</span>
            <span className="font-mono text-sm text-muted">{formatPercent((item.count / Math.max(1, total)) * 100)}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
