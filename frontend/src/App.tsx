import './App.css'
import {useEffect, useState} from 'react'
import type {Data} from "./types"

function App() {
  const [data, setData] = useState<Data | null>(null)
  
  useEffect(() => {
    async function loadData() {
      const res = await fetch("../data.json");
      const result: Data = await res.json();
      setData(result);
    }

    loadData();
  }, [])

  console.log(data)
  return (
    <>
      <div>
        {data ? JSON.stringify(data,null, 2) : "Cargando"}
      </div>
    </>
  )
}

export default App
