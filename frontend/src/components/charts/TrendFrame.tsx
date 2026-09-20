import { addDays, daysBetween, formatDayMonth } from '../format'

const WINDOW_DAYS = 84
const TICK_EVERY_DAYS = 14

interface TrendFrameProps {
  capturedSince: string
  lastCapture: string
}

/**
 * Time axis for the series that is still being collected. It shows the window captured so far
 * and nothing else: no invented data.
 */
export function TrendFrame({ capturedSince, lastCapture }: TrendFrameProps) {
  const capturedDays = Math.max(0, daysBetween(capturedSince, lastCapture))
  const capturedPercent = Math.min(100, (capturedDays / WINDOW_DAYS) * 100)
  const ticks = Array.from({ length: WINDOW_DAYS / TICK_EVERY_DAYS + 1 }, (_, index) => index * TICK_EVERY_DAYS)

  return (
    <div className="flex flex-col gap-1">
      <div className="relative h-[200px] border-b border-rule md:h-[240px]">
        <div aria-hidden="true" className="absolute inset-y-0 left-0 bg-amber/15" style={{ width: `${capturedPercent}%` }} />
        <p className="absolute inset-y-0 right-0 left-[22%] flex items-center justify-center px-3 text-center text-[15px] text-muted">
          Sin datos todavía. Acá van a aparecer los avisos nuevos por semana.
        </p>
      </div>
      <div aria-hidden="true" className="relative mt-2 h-6 font-mono text-sm text-muted">
        {ticks.map((day, index) => {
          const position = (day / WINDOW_DAYS) * 100
          const transform = day === 0 ? '' : day === WINDOW_DAYS ? '-translate-x-full' : '-translate-x-1/2'
          // Every other tick is dropped on narrow screens.
          const visibility = index % 2 === 1 ? 'hidden md:block' : ''
          return (
            <span key={day} className={`absolute top-0 whitespace-nowrap ${transform} ${visibility}`} style={{ left: `${position}%` }}>
              {formatDayMonth(addDays(capturedSince, day))}
            </span>
          )
        })}
      </div>
    </div>
  )
}
