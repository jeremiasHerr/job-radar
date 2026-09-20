import { useState } from 'react'
import { Page } from '../components/Page'
import { DEFAULT_FILTERS } from '../components/constants'
import type { ExplorerFilters, PageStatus } from '../components/types'
import { explorerJobs, explorerRanking, explorerSample, hero, juniors, rankingItems, seniority, trend } from './fixtures'

// Dev harness for the UI: renders the page from a fixed snapshot of the data.
//   /?preview          page as loaded
//   /?preview=loading  loading skeleton
//   /?preview=error    error state
//   /?preview=small    small-sample notices
//   /?preview=empty    explorer with no results
// Filter changes only update the controls; they do not recompute the data.
export default function Preview() {
  const mode = new URLSearchParams(window.location.search).get('preview')
  const status: PageStatus = mode === 'loading' || mode === 'error' ? mode : 'ready'
  const small = mode === 'small'
  const empty = mode === 'empty'

  const [category, setCategory] = useState('all')
  const [filters, setFilters] = useState<ExplorerFilters>(DEFAULT_FILTERS)
  const [visibleJobs, setVisibleJobs] = useState(explorerJobs.length)

  return (
    <Page
      status={status}
      onRetry={() => window.location.assign('/?preview')}
      hero={hero}
      ranking={{ items: rankingItems, total: hero.totalJobs, isSmall: small, category, onCategoryChange: setCategory }}
      seniority={seniority}
      juniors={juniors}
      trend={trend}
      explorer={{
        filters,
        onFiltersChange: setFilters,
        n: empty ? 0 : small ? 17 : explorerSample.n,
        isSmall: small,
        cutDescription: explorerSample.cutDescription,
        ranking: explorerRanking,
        jobs: explorerJobs.slice(0, visibleJobs),
        canShowMore: visibleJobs < explorerJobs.length,
        onShowMore: () => setVisibleJobs(explorerJobs.length),
      }}
    />
  )
}
