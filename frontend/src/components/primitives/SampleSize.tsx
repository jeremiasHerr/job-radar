import { formatInt } from '../format'

interface SampleSizeProps {
  n: number
  /** What the n refers to, e.g. the applied cut. */
  note?: string
}

/** Sample size, always shown next to a result. */
export function SampleSize({ n, note }: SampleSizeProps) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="font-mono text-lg font-medium md:text-xl">n = {formatInt(n)} avisos</span>
      {note ? <span className="text-sm text-muted">{note}</span> : null}
    </p>
  )
}

export function SmallSampleNotice({ n, message }: { n: number; message?: string }) {
  return (
    <p className="max-w-[680px] text-[15px] leading-relaxed">
      <strong className="font-semibold text-amber">Muestra chica.</strong>{' '}
      {message ?? `Con n = ${formatInt(n)} los porcentajes se mueven mucho: un aviso más cambia el resultado.`}
    </p>
  )
}
