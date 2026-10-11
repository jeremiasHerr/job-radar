import './App.css'
import {useCallback, useEffect, useState} from 'react'
import type {Data} from "./types"
import {Page} from "./components/Page.tsx"
import { rankTechnologies, SMALL_SAMPLE} from './lib/analytics.ts'
import type { PageStatus, Summary } from './components/types.ts'
import { PageSkeleton } from './components/sections/PageSkeleton.tsx'
import { ErrorState } from './components/sections/ErrorState.tsx'

type LoadedData = { data: Data; summary: Summary }

/** Fetches both JSON files. Returns null on any network or HTTP failure. */
async function loadData(): Promise<LoadedData | null> {
  try {
    const [dataRes, summaryRes] = await Promise.all([
      fetch("/data.json"),
      fetch("/summary.json"),
    ]);
    if (!dataRes.ok) throw new Error(`data.json: HTTP ${dataRes.status}`);
    if (!summaryRes.ok) throw new Error(`summary.json: HTTP ${summaryRes.status}`);

    const data: Data = await dataRes.json();
    const summary: Summary = await summaryRes.json();
    return { data, summary };
  } catch (error) {
    console.error(error);
    return null;
  }
}

function App() {

  const [data, setData] = useState<Data | null>(null);
  const [techCategory, setCategory] = useState("all");
  const [summary, setSummary] = useState<Summary | null>(null);

  const [status, setStatus] = useState<PageStatus>("loading");

  const applyLoaded = useCallback((loaded: LoadedData | null) => {
    if (!loaded) {
      setStatus("error");
      return;
    }
    setData(loaded.data);
    setSummary(loaded.summary);
    setStatus("ready");
  }, []);

  useEffect(() => {
    loadData().then(applyLoaded);
  }, [applyLoaded])

  function handleRetry() {
    setStatus("loading");
    loadData().then(applyLoaded);
  }

  if (status === "loading") return <PageSkeleton />
  if (status === "error" || !data || !summary) return <ErrorState onRetry={handleRetry} />

  const rankedItems = rankTechnologies(data.jobs, data.technologies).filter(tech => (tech.category === techCategory || techCategory === "all")).slice(0,15);
  
  return (
      <Page
      status={status}
      onRetry={handleRetry}
      hero={summary.hero}
      ranking={{
        items: rankedItems,
        total: data.jobs.length,
        isSmall: data.jobs.length < SMALL_SAMPLE,
        category: techCategory,
        onCategoryChange: setCategory,
      }}
      seniority={summary.seniority}
      juniors={summary.juniors}
      trend={{
        capturedSince: summary.hero.capturedSince,
        lastCapture: summary.hero.lastCapture,
      }}
      explorer={{
        filters: { seniority: "all", category: "all", modality: "all", range: "3m" },
        onFiltersChange: () => {},
        n: 0,
        isSmall: false,
        cutDescription: "",
        ranking: [],
        jobs: [],
        canShowMore: false,
        onShowMore: () => {},
      }}
    
      />
  )
}

export default App
