import type { ReactNode } from 'react'
import { PILL } from './pillStyles'

interface ChipProps {
  label: string
  pressed: boolean
  onClick: () => void
  /** Swatch shown while the chip is not pressed. */
  dotClass?: string
  /** Classes applied while pressed. */
  activeClass?: string
}

/** Toggle chip. Every control on the page shares this height, radius and type. */
export function Chip({ label, pressed, onClick, dotClass, activeClass = 'border-ink bg-ink text-base' }: ChipProps) {
  const state = pressed ? activeClass : 'border-ctrl bg-transparent text-ink'
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className={`${PILL} ${state}`}>
      {dotClass && !pressed ? <span aria-hidden="true" className={`size-2 rounded-full ${dotClass}`} /> : null}
      {label}
    </button>
  )
}

interface PillButtonProps {
  children: ReactNode
  onClick: () => void
  variant?: 'outline' | 'fill'
}

export function PillButton({ children, onClick, variant = 'outline' }: PillButtonProps) {
  const style =
    variant === 'fill'
      ? 'border-iris bg-iris font-semibold text-base'
      : 'border-ctrl bg-transparent text-ink'
  return (
    <button type="button" onClick={onClick} className={`${PILL} ${style}`}>
      {children}
    </button>
  )
}
