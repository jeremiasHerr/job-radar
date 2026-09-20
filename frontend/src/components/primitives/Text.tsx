import type { ReactNode } from 'react'

export function BandTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="max-w-[820px] text-[32px] leading-[1.1] font-semibold tracking-[-0.01em] md:text-[44px]">
      {children}
    </h2>
  )
}

export function SubTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-xl leading-tight font-semibold md:text-2xl">{children}</h3>
}

interface LeadProps {
  children: ReactNode
  tone?: 'ink' | 'muted'
}

/** Reading paragraph, capped at about 70 characters per line. */
export function Lead({ children, tone = 'muted' }: LeadProps) {
  const color = tone === 'ink' ? 'text-ink' : 'text-muted'
  return <p className={`max-w-[680px] text-[17px] leading-relaxed ${color}`}>{children}</p>
}

export function Mono({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono ${className}`}>{children}</span>
}
