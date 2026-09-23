import './App.css'
import {useEffect, useState} from 'react'
import type {Data} from "./types"
import {Page} from "./components/Page.tsx"
import { buildHero, rankTechnologies, SMALL_SAMPLE} from './lib/analytics.ts'
import type { HeroData } from './components/types.ts'

function App() {

  const [data, setData] = useState<Data | null>(null);
  const [hero, setHero] = useState<HeroData | null>(null);
  const [techCategory, setCategory] = useState("all");

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/data.json");
      const result: Data = await res.json();
      setData(result);
      setHero(buildHero(result.jobs, result.meta))
    }

    loadData();
  }, [])

  if(!data || !hero ) return <p>Cargando...</p>
  
  const rankedItems = rankTechnologies(data.jobs, data.technologies).filter(tech => (tech.category === techCategory || techCategory === "all")).slice(0,15);
  
  return (
      <Page
      status="ready"
      onRetry={() => {}}
      hero={hero}
      ranking={{
        items: rankedItems,
        total: data.jobs.length,
        isSmall: data.jobs.length < SMALL_SAMPLE,
        category: techCategory,
        onCategoryChange: setCategory,
      }}
      seniority={{
        total: 0,
        seniorShare: 0,
        levels: [],
        matrix: [],
      }}
      juniors={{
        all: { total: 0, counts: { remote: 0, remote_local: 0, hybrid: 0, onsite: 0 } },
        junior: { total: 0, counts: { remote: 0, remote_local: 0, hybrid: 0, onsite: 0 } },
      }}
      trend={{
        capturedSince: hero.capturedSince,
        lastCapture: hero.lastCapture,
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
