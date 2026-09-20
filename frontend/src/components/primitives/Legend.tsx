interface LegendItem {
  /** Background class of the swatch. */
  swatchClass: string
  label: string
  /** Mono detail after the label, usually a count. */
  detail?: string
}

/** Colour key for charts with more than one series. */
export function Legend({ items }: { items: LegendItem[] }) {
  return (
    <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span aria-hidden="true" className={`size-3 shrink-0 rounded-xs ${item.swatchClass}`} />
          <span>{item.label}</span>
          {item.detail ? <span className="font-mono text-muted">{item.detail}</span> : null}
        </li>
      ))}
    </ul>
  )
}
