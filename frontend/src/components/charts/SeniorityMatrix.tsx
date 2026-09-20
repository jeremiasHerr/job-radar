import { LEVEL_LABELS, LEVEL_ORDER } from '../constants'
import { rampColor, readableInk } from '../colors'
import { formatInt, formatPercent, formatTechName } from '../format'
import type { LevelStat, MatrixRow, SeniorityLevel } from '../types'

// The colour scale is fixed so a cell means the same thing when the data changes.
const SCALE_MAX = 50

interface SeniorityMatrixProps {
  levels: LevelStat[]
  rows: MatrixRow[]
}

export function SeniorityMatrix({ levels, rows }: SeniorityMatrixProps) {
  const counts = new Map<SeniorityLevel, number>(levels.map((stat) => [stat.level, stat.count]))

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Matriz de tecnologías por nivel, desplazable">
        <table className="w-full min-w-[480px] table-fixed border-separate border-spacing-0.5 md:min-w-0">
          <colgroup>
            <col className="w-24 md:w-36" />
          </colgroup>
          <caption className="sr-only">Porcentaje de avisos de cada nivel que mencionan cada tecnología</caption>
          <thead>
            <tr>
              <td className="sticky left-0 z-10 bg-base" />
              {LEVEL_ORDER.map((level) => (
                <th key={level} scope="col" className="px-1 pb-2 text-left align-bottom text-sm leading-snug font-normal">
                  {LEVEL_LABELS[level]}
                  <span className="block font-mono text-muted">n = {formatInt(counts.get(level) ?? 0)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <th scope="row" className="sticky left-0 z-10 bg-base pr-2 text-left text-[15px] font-normal">
                  {formatTechName(row.name)}
                </th>
                {LEVEL_ORDER.map((level) => {
                  const value = row.shares[level]
                  const fill = rampColor(value / SCALE_MAX)
                  return (
                    <td
                      key={level}
                      className="h-10 text-center font-mono text-sm font-medium"
                      style={{ backgroundColor: fill, color: readableInk(fill) }}
                    >
                      {formatPercent(value)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2.5 text-sm text-muted" aria-hidden="true">
        <span className="font-mono">0%</span>
        <span className="flex gap-0.5">
          {[0, 1, 2, 3, 4, 5].map((step) => (
            <span key={step} className="h-3 w-7" style={{ backgroundColor: rampColor(step / 5) }} />
          ))}
        </span>
        <span className="font-mono">{SCALE_MAX}%</span>
      </div>
    </div>
  )
}
