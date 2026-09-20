import { useMemo } from 'react'
import { formatInt } from '../format'

const COLUMNS = 30
const PITCH = 14

interface DotFieldProps {
  total: number
  juniorTotal: number
  juniorRemoteGlobal: number
}

// Small deterministic PRNG so the field looks the same on every render.
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Placement {
  base: number[]
  junior: number[]
  juniorRemote: number[]
}

function place(total: number, juniorTotal: number, juniorRemoteGlobal: number): Placement {
  const order = Array.from({ length: total }, (_, index) => index)
  const random = mulberry32(11)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return {
    juniorRemote: order.slice(0, juniorRemoteGlobal).sort((a, b) => a - b),
    junior: order.slice(juniorRemoteGlobal, juniorTotal).sort((a, b) => a - b),
    base: order.slice(juniorTotal).sort((a, b) => a - b),
  }
}

function Dots({ indexes, radius }: { indexes: number[]; radius: number }) {
  return (
    <>
      {indexes.map((index) => (
        <circle
          key={index}
          cx={(index % COLUMNS) * PITCH + PITCH / 2}
          cy={Math.floor(index / COLUMNS) * PITCH + PITCH / 2}
          r={radius}
        />
      ))}
    </>
  )
}

/** One dot per job. The amber ones are junior and remote without geographic restriction. */
export function DotField({ total, juniorTotal, juniorRemoteGlobal }: DotFieldProps) {
  const placement = useMemo(() => place(total, juniorTotal, juniorRemoteGlobal), [total, juniorTotal, juniorRemoteGlobal])
  const rows = Math.max(1, Math.ceil(total / COLUMNS))
  const description =
    `Cada punto es un aviso: ${formatInt(total)} en total. ${formatInt(juniorTotal)} son junior o sin experiencia, ` +
    `y ${formatInt(juniorRemoteGlobal)} de ellos son remoto sin restricción geográfica.`

  return (
    <svg viewBox={`0 0 ${COLUMNS * PITCH} ${rows * PITCH}`} role="img" aria-label={description} className="block h-auto w-full">
      <g className="fill-dot">
        <Dots indexes={placement.base} radius={4.5} />
      </g>
      <g className="fill-iris">
        <Dots indexes={placement.junior} radius={4.5} />
      </g>
      <g className="fill-amber">
        <Dots indexes={placement.juniorRemote} radius={5.5} />
      </g>
    </svg>
  )
}
