import { SeniorityMatrix } from '../charts/SeniorityMatrix'
import { StackedBar } from '../charts/StackedBar'
import { LEVEL_LABELS, LEVEL_STYLES } from '../constants'
import { formatInt, formatList, formatPercent } from '../format'
import { Band } from '../primitives/Band'
import { Legend } from '../primitives/Legend'
import { SampleSize, SmallSampleNotice } from '../primitives/SampleSize'
import { BandTitle, Lead, SubTitle } from '../primitives/Text'
import type { SeniorityProps } from '../types'

const TITLE_ID = 'seniority-title'

export function SeniorityBand({ data }: { data: SeniorityProps }) {
  const { total, levels } = data
  const senior = levels
    .filter((stat) => stat.level === 'senior' || stat.level === 'semi-senior')
    .reduce((sum, stat) => sum + stat.count, 0)
  const smallLevels = levels.filter((stat) => stat.isSmall)
  const share = (count: number) => (count / Math.max(1, total)) * 100

  const segments = levels.map((stat) => ({
    key: stat.level,
    value: stat.count,
    label: formatPercent(share(stat.count)),
    barClass: LEVEL_STYLES[stat.level].bar,
    inkClass: LEVEL_STYLES[stat.level].ink,
  }))
  const summary = levels.map((stat) => `${LEVEL_LABELS[stat.level]} ${formatPercent(share(stat.count))}`).join(', ')

  return (
    <Band tone="base" labelledBy={TITLE_ID}>
      <div className="flex flex-col gap-4">
        <BandTitle id={TITLE_ID}>{Math.round(data.seniorShare / 10)} de cada 10 avisos piden senior o semi-senior</BandTitle>
        <Lead>
        Senior y semi-senior suman {formatInt(senior)} de {formatInt(total)} avisos ({formatPercent(data.seniorShare)}). Junior incluye
        sin experiencia.
      </Lead>
      </div>

      <div className="flex flex-col gap-3.5">
        <SampleSize n={total} note="Distribución por nivel." />
        <StackedBar segments={segments} description={`Distribución por nivel: ${summary}`} />
        <Legend
          items={levels.map((stat) => ({
            swatchClass: LEVEL_STYLES[stat.level].bar,
            label: LEVEL_LABELS[stat.level],
            detail: `${formatInt(stat.count)} (${formatPercent(share(stat.count))})`,
          }))}
        />
      </div>

      <div className="flex flex-col gap-4">
        <SubTitle>Qué pide cada nivel</SubTitle>
        <Lead>Porcentaje de los avisos de cada nivel que mencionan la tecnología. Las tecnologías más pedidas.</Lead>
      </div>
      <SeniorityMatrix levels={levels} rows={data.matrix} />
      {data.insight ? <Lead tone="ink">{data.insight}</Lead> : null}
      {smallLevels.length > 0 ? (
        <SmallSampleNotice
          n={smallLevels[0].count}
          message={`${formatList(smallLevels.map((stat) => `${LEVEL_LABELS[stat.level]} tiene n = ${formatInt(stat.count)}`))}: un aviso más o menos mueve mucho su columna.`}
        />
      ) : null}
    </Band>
  )
}
