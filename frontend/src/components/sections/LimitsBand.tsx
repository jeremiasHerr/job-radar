import { limitations } from '../../content/limitations'
import { Band } from '../primitives/Band'
import { BandTitle, Lead } from '../primitives/Text'

const TITLE_ID = 'limits-title'

export function LimitsBand() {
  return (
    <Band tone="base" labelledBy={TITLE_ID}>
      <div className="flex flex-col gap-4">
        <BandTitle id={TITLE_ID}>Qué no dice esta muestra</BandTitle>
        <Lead>Lo que conviene saber antes de sacar conclusiones de estos números.</Lead>
      </div>
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {limitations.map((group) => (
          <div key={group.title} className="flex min-w-0 flex-col gap-3">
            <h3 className="text-lg font-semibold">{group.title}</h3>
            {group.items.map((item) => (
              <p key={item} className="text-[15px] leading-relaxed text-muted">{item}</p>
            ))}
          </div>
        ))}
      </div>
    </Band>
  )
}
