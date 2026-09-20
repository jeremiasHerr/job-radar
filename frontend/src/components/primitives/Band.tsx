import type { ReactNode } from 'react'

interface BandProps {
  tone: 'base' | 'surface'
  /** id of the heading that names the band. */
  labelledBy: string
  id?: string
  children: ReactNode
}

/** Full-width band. The change of background is the divider, so there are no borders. */
export function Band({ tone, labelledBy, id, children }: BandProps) {
  const background = tone === 'base' ? 'bg-base' : 'bg-surface'
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${background} px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-28`}>
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 md:gap-12">{children}</div>
    </section>
  )
}
