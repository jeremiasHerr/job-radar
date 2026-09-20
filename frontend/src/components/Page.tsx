import { ErrorState } from './sections/ErrorState'
import { ExplorerBand } from './sections/ExplorerBand'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { JuniorsBand } from './sections/JuniorsBand'
import { LimitsBand } from './sections/LimitsBand'
import { PageSkeleton } from './sections/PageSkeleton'
import { RankingSection } from './sections/RankingSection'
import { SeniorityBand } from './sections/SeniorityBand'
import { TrendBand } from './sections/TrendBand'
import type { PageProps } from './types'

/** The whole page. It only renders the props it receives. */
export function Page(props: PageProps) {
  if (props.status === 'loading') return <PageSkeleton />
  if (props.status === 'error') return <ErrorState onRetry={props.onRetry} />

  return (
    <>
      <Hero data={props.hero} />
      <main>
        <RankingSection data={props.ranking} />
        <SeniorityBand data={props.seniority} />
        <JuniorsBand data={props.juniors} />
        <TrendBand data={props.trend} />
        <ExplorerBand data={props.explorer} />
        <LimitsBand />
      </main>
      <Footer lastCapture={props.hero.lastCapture} />
    </>
  )
}
