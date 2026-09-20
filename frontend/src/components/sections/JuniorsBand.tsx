import { StackedBar } from '../charts/StackedBar'
import { MODALITY_LABELS, MODALITY_ORDER, MODALITY_STYLES } from '../constants'
import { formatInt, formatPercent } from '../format'
import { Band } from '../primitives/Band'
import { Legend } from '../primitives/Legend'
import { BandTitle, Lead } from '../primitives/Text'
import type { JuniorsProps, ModalityCounts } from '../types'

const TITLE_ID = 'juniors-title'

function localShare({ total, counts }: ModalityCounts): number {
  return ((counts.hybrid + counts.onsite) / Math.max(1, total)) * 100
}

function ModalityBar({ label, data }: { label: string; data: ModalityCounts }) {
  const segments = MODALITY_ORDER.map((modality) => ({
    key: modality,
    value: data.counts[modality],
    label: formatPercent((data.counts[modality] / Math.max(1, data.total)) * 100),
    barClass: MODALITY_STYLES[modality].bar,
    inkClass: MODALITY_STYLES[modality].ink,
  }))
  const summary = MODALITY_ORDER.map((modality) => `${MODALITY_LABELS[modality]} ${formatInt(data.counts[modality])}`).join(', ')

  return (
    <div className="flex flex-col gap-2 md:grid md:grid-cols-[180px_minmax(0,1fr)] md:items-center md:gap-4">
      <div>
        <p className="text-[15px]">{label}</p>
        <p className="font-mono text-sm text-muted">n = {formatInt(data.total)}</p>
      </div>
      <StackedBar segments={segments} description={`${label}, por modalidad: ${summary}`} />
    </div>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-5xl leading-none font-medium md:text-7xl">{formatPercent(value)}</p>
      <p className="mt-2 max-w-[240px] text-sm leading-snug text-muted">{label}</p>
    </div>
  )
}

export function JuniorsBand({ data }: { data: JuniorsProps }) {
  const juniorLocal = localShare(data.junior)
  const allLocal = localShare(data.all)
  const mostlyLocal = juniorLocal > 50 && juniorLocal > allLocal
  const { counts } = data.junior

  return (
    <Band tone="surface" labelledBy={TITLE_ID}>
      <div className="flex flex-col gap-4">
        <BandTitle id={TITLE_ID}>{mostlyLocal ? 'El empleo junior es mayormente local' : 'Cómo trabajan los juniors'}</BandTitle>
        <Lead>Modalidad de trabajo de los avisos. Junior incluye sin experiencia (n = {formatInt(data.junior.total)}).</Lead>
      </div>

      <div className="flex flex-col gap-5">
        <ModalityBar label="Todo el mercado" data={data.all} />
        <ModalityBar label="Solo juniors" data={data.junior} />
        <Legend
          items={MODALITY_ORDER.map((modality) => ({ swatchClass: MODALITY_STYLES[modality].bar, label: MODALITY_LABELS[modality] }))}
        />
      </div>

      <div className="flex flex-col gap-7 md:flex-row md:flex-wrap md:items-start md:gap-x-24 md:gap-y-8">
        <div className="md:max-w-[680px] md:flex-[1_1_420px]">
          <Lead tone="ink">
            Solo {formatInt(counts.remote)} de los {formatInt(data.junior.total)} avisos junior son remoto sin restricción geográfica.
            {mostlyLocal
              ? ` La mayoría se reparte entre híbrido (${formatInt(counts.hybrid)}) y presencial (${formatInt(counts.onsite)}): el empleo junior es sobre todo local.`
              : ''}
          </Lead>
        </div>
        <div className="flex flex-wrap gap-x-14 gap-y-7">
          <Stat value={juniorLocal} label="de los juniors son híbridos o presenciales" />
          <Stat value={allLocal} label="de todo el mercado" />
        </div>
      </div>

      <p className="max-w-[680px] text-[15px] leading-relaxed text-muted">
        Los puestos junior se publican menos: muchos se cubren por programas internos o referidos y no llegan a las fuentes que capturo.
      </p>
    </Band>
  )
}
