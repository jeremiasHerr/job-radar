import './App.css'
import {useEffect, useState} from 'react'
import type {Data} from "./types"
import {Page} from "./components/Page.tsx"
import { rankTechnologies, SMALL_SAMPLE} from './lib/analytics.ts'
import type { Summary } from './components/types.ts'

function App() {

  const [data, setData] = useState<Data | null>(null);
  const [techCategory, setCategory] = useState("all");
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    async function loadData() {
      const [dataRes, summaryRes] = await Promise.all([
        fetch("/data.json"),
        fetch("/summary.json"),
      ]);
      const result: Data = await dataRes.json();
      const summaryResult: Summary = await summaryRes.json();

      setData(result);
      setSummary(summaryResult);
    }
    loadData();
  }, [])

  if(!data || !summary ) return <p>Cargando...</p>
  
  const rankedItems = rankTechnologies(data.jobs, data.technologies).filter(tech => (tech.category === techCategory || techCategory === "all")).slice(0,15);
  
  return (
      <Page
      status="ready"
      onRetry={() => {}}
      hero={summary.hero}
      ranking={{
        items: rankedItems,
        total: data.jobs.length,
        isSmall: data.jobs.length < SMALL_SAMPLE,
        category: techCategory,
        onCategoryChange: setCategory,
      }}
      seniority={summary.seniority}
      juniors={{
        all: { total: 0, counts: { remote: 0, remote_local: 0, hybrid: 0, onsite: 0 } },
        junior: { total: 0, counts: { remote: 0, remote_local: 0, hybrid: 0, onsite: 0 } },
      }}
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
