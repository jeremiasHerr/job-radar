import { useState } from 'react'
import { TechBars } from '../charts/TechBars'
import { TechTable } from '../charts/TechTable'
import { categoryStyle, PRIMARY_CATEGORIES, SECONDARY_CATEGORIES } from '../constants'
import { formatList, formatPercent, formatTechName } from '../format'
import { Band } from '../primitives/Band'
import { Chip, PillButton } from '../primitives/Pill'
import { SampleSize, SmallSampleNotice } from '../primitives/SampleSize'
import { Select } from '../primitives/Select'
import { BandTitle, Lead } from '../primitives/Text'
import type { RankingProps } from '../types'

const TITLE_ID = 'ranking-title'
const MORE_IDLE = 'none'

const MORE_OPTIONS = [{ value: MORE_IDLE, label: 'Elegir' }, ...SECONDARY_CATEGORIES]

export function RankingSection({ data }: { data: RankingProps }) {
  const [asTable, setAsTable] = useState(false)
  const { items, total, category } = data

  const top = items.slice(0, 3)
  const title = top.length === 3 ? `${formatList(top.map((tech) => formatTechName(tech.name)))} encabezan lo que pide el mercado` : 'Tecnologías más pedidas'
  const shares = top.map((tech, index) => {
    const share = formatPercent((tech.count / Math.max(1, total)) * 100)
    return index === 0 ? `${formatTechName(tech.name)} aparece en el ${share}` : `${formatTechName(tech.name)} en el ${share}`
  })
  const detail =
    (top.length === 3 ? `${formatList(shares)} de los avisos. ` : '') +
    'Cada aviso puede mencionar varias tecnologías, por eso los porcentajes no suman 100.'
  const hasGrey = items.some((tech) => !PRIMARY_CATEGORIES.some((primary) => primary.value === tech.category))
  const moreValue = SECONDARY_CATEGORIES.some((option) => option.value === category) ? category : MORE_IDLE

  return (
    <Band tone="surface" labelledBy={TITLE_ID}>
      <div className="flex flex-col gap-4">
        <BandTitle id={TITLE_ID}>{title}</BandTitle>
        <Lead>{detail}</Lead>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="-mx-6 flex max-w-[100vw] items-center gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:max-w-full md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
          <Chip label="Todas" pressed={category === "all"} onClick={() => data.onCategoryChange("all")} />
          {PRIMARY_CATEGORIES.map((option) => {
            const style = categoryStyle(option.value)
            return (
              <Chip
                key={option.value}
                label={option.label}
                pressed={category === option.value}
                dotClass={style.dot}
                activeClass={style.active}
                onClick={() => data.onCategoryChange(option.value)}
              />
            )
          })}
          <Select
            label="Más"
            idleLabel="Más categorías"
            value={moreValue}
            options={MORE_OPTIONS}
            onChange={(value) => data.onCategoryChange(value === MORE_IDLE ? 'all' : value)}
          />
        </div>
        <PillButton onClick={() => setAsTable((current) => !current)}>{asTable ? 'Ver como gráfico' : 'Ver como tabla'}</PillButton>
      </div>

      <SampleSize n={total} note="Porcentaje de avisos que mencionan la tecnología. Top 15." />
      {data.isSmall ? <SmallSampleNotice n={total} /> : null}

      {asTable ? <TechTable items={items} total={total} /> : <TechBars items={items} total={total} />}
      {!asTable && hasGrey ? <p className="text-sm text-muted">Gris: otras categorías (herramientas, metodología, arquitectura).</p> : null}
    </Band>
  )
}
