import './App.css'
import {useEffect, useState} from 'react'
import type {Data, TechCount} from "./types"
import { rankTechnologies } from './lib/analytics'

function App() {
  const [data, setData] = useState<Data | null>(null);
  const [rankedTechnologies, setRankedTechnologies] = useState<TechCount[]>([]);
  useEffect(() => {
    async function loadData() {
      const res = await fetch("/data.json");
      const result: Data = await res.json();
      setData(result);
      setRankedTechnologies(rankTechnologies(result.jobs))
    }

    loadData();
  }, [])


  console.log(rankedTechnologies)
  return (
    <>
      <div>
        <ul>
          {rankedTechnologies.map((t) => (
            <li>{t.name}:{t.count}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
