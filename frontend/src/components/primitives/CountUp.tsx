import { formatDecimal } from '../format'
import { useCountUp } from '../hooks/useCountUp'

interface CountUpProps {
  value: number
  decimals?: number
  suffix?: string
  className?: string
}

/** A number that counts up once when it enters the viewport. The page's only orchestrated motion. */
export function CountUp({ value, decimals = 0, suffix = '', className }: CountUpProps) {
  const [ref, current] = useCountUp<HTMLSpanElement>(value)
  return (
    <span ref={ref} className={className}>
      {formatDecimal(current, decimals)}
      {suffix}
    </span>
  )
}
