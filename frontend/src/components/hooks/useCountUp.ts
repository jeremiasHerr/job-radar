import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 1200

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

/**
 * Counts from 0 up to `target` the first time the element is on screen.
 * With reduced motion the final value is shown straight away.
 */
export function useCountUp<T extends HTMLElement>(target: number): [React.RefObject<T | null>, number] {
  const ref = useRef<T | null>(null)
  const [current, setCurrent] = useState<number>(() => (prefersReducedMotion() ? target : 0))

  useEffect(() => {
    let frame = 0

    const run = () => {
      if (prefersReducedMotion()) {
        frame = requestAnimationFrame(() => setCurrent(target))
        return
      }
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS)
        setCurrent(target * easeOutCubic(t))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      run()
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          run()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target])

  return [ref, current]
}
