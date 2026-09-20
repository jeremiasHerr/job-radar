import { formatInt, formatPercent, formatTechName } from '../format'
import type { RankedTech } from '../types'

/** Same data as TechBars, as a table. */
export function TechTable({ items, total }: { items: RankedTech[]; total: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full max-w-[680px] border-collapse text-[15px]">
        <caption className="sr-only">Tecnologías más pedidas</caption>
        <thead>
          <tr className="text-left text-muted">
            <th scope="col" className="pr-4 pb-3 font-medium">Tecnología</th>
            <th scope="col" className="pr-4 pb-3 text-right font-medium">Avisos</th>
            <th scope="col" className="pb-3 text-right font-medium">Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name} className="border-t border-rule/35">
              <th scope="row" className="py-2.5 pr-4 text-left font-normal">{formatTechName(item.name)}</th>
              <td className="py-2.5 pr-4 text-right font-mono">{formatInt(item.count)}</td>
              <td className="py-2.5 text-right font-mono text-muted">{formatPercent((item.count / Math.max(1, total)) * 100)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
