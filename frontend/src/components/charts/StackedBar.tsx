import { useElementWidth } from '../hooks/useElementWidth'

export interface StackedSegment {
  key: string
  value: number
  /** Text drawn inside the segment when it fits. */
  label: string
  barClass: string
  inkClass: string
}

interface StackedBarProps {
  segments: StackedSegment[]
  /** Accessible summary of the whole bar. */
  description: string
}

const GAP_PX = 2
const CHAR_PX = 8.6
const PADDING_PX = 16

/**
 * 100% stacked bar. A 2 px gap of surface colour separates the segments, and a label is
 * only drawn inside a segment when it fits with room to spare, never clipped.
 */
export function StackedBar({ segments, description }: StackedBarProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>()
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  const usable = Math.max(0, width - GAP_PX * (segments.length - 1))

  return (
    <div ref={ref} role="img" aria-label={description} className="flex h-6 gap-0.5">
      {segments.map((segment, index) => {
        const px = total > 0 ? (segment.value / total) * usable : 0
        const fits = px >= segment.label.length * CHAR_PX + PADDING_PX
        const radius = index === 0 ? 'rounded-l-[4px]' : index === segments.length - 1 ? 'rounded-r-[4px]' : ''
        return (
          <div
            key={segment.key}
            className={`flex min-w-0 items-center justify-center ${radius} ${segment.barClass}`}
            style={{ flex: `${segment.value} 1 0` }}
          >
            {fits ? <span className={`font-mono text-sm font-medium ${segment.inkClass}`}>{segment.label}</span> : null}
          </div>
        )
      })}
    </div>
  )
}
