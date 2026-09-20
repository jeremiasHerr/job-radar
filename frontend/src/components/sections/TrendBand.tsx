import { TrendFrame } from '../charts/TrendFrame'
import { daysBetween, formatDate } from '../format'
import { Band } from '../primitives/Band'
import { BandTitle, Lead } from '../primitives/Text'
import type { TrendProps } from '../types'

const TITLE_ID = 'trend-title'

export function TrendBand({ data }: { data: TrendProps }) {
  const days = Math.max(0, daysBetween(data.capturedSince, data.lastCapture))

  return (
    <Band tone="base" labelledBy={TITLE_ID}>
      <div className="flex flex-col gap-4">
        <BandTitle id={TITLE_ID}>La serie temporal todavía está en construcción</BandTitle>
        <Lead>
        La captura empezó el {formatDate(data.capturedSince)}. Con unos 2 meses de acumulación, esta banda va a mostrar cómo cambia la
        demanda semana a semana.
      </Lead>
      </div>
      <TrendFrame capturedSince={data.capturedSince} lastCapture={data.lastCapture} />
      <p className="flex items-center gap-2 text-sm text-muted">
        <span aria-hidden="true" className="size-3 border border-amber bg-amber/15" />
        <span>
          Período capturado: {formatDate(data.capturedSince)} a {formatDate(data.lastCapture)} <span className="whitespace-nowrap">(<span className="font-mono">{days} días</span>)</span>
        </span>
      </p>
    </Band>
  )
}
