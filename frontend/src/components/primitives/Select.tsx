import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { PILL } from './pillStyles'

interface SelectOption<T extends string> {
  value: T
  label: string
}

interface SelectProps<T extends string> {
  /** Name of the filter, shown in muted text before the value. */
  label: string
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  /** Fills the row on mobile, with the label and value at the edges. */
  stretchOnMobile?: boolean
  /** Text shown alone while the first option is selected, e.g. "Más categorías". */
  idleLabel?: string
}

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d="M4 6l4 4 4-4" />
    </svg>
  )
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  )
}

/** Listbox dropdown in the same pill family as the chips. */
export function Select<T extends string>({ label, value, options, onChange, stretchOnMobile = false, idleLabel }: SelectProps<T>) {
  const uid = useId()
  const listId = `${uid}-list`
  const optionId = (index: number) => `${uid}-opt-${index}`

  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [open, setOpen] = useState(false)
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value))
  const [activeIndex, setActiveIndex] = useState(selectedIndex)

  useEffect(() => {
    if (!open) return
    listRef.current?.focus()

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const openMenu = () => {
    setActiveIndex(selectedIndex)
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
    buttonRef.current?.focus()
  }

  const choose = (index: number) => {
    onChange(options[index].value)
    close()
  }

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      openMenu()
    }
  }

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const last = options.length - 1
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((index) => Math.min(last, index + 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((index) => Math.max(0, index - 1))
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(last)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        choose(activeIndex)
        break
      case 'Escape':
        event.preventDefault()
        close()
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  const layout = stretchOnMobile ? 'w-full justify-between md:w-auto md:justify-start' : ''
  const border = open ? 'border-iris' : 'border-ctrl'

  return (
    <div ref={rootRef} className={`relative ${stretchOnMobile ? 'w-full md:w-auto' : ''}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onButtonKeyDown}
        className={`${PILL} ${layout} ${border} bg-transparent text-ink`}
      >
        {idleLabel && selectedIndex === 0 ? (
          <span>{idleLabel}</span>
        ) : (
          <>
            <span className="font-normal text-muted">{label}</span>
            <span>{options[selectedIndex].label}</span>
          </>
        )}
        <Chevron />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={optionId(activeIndex)}
          onKeyDown={onListKeyDown}
          className="absolute top-12 left-0 z-20 max-h-72 w-64 max-w-[calc(100vw-3rem)] overflow-y-auto rounded-[14px] border border-ctrl bg-base p-1.5 outline-none"
        >
          {options.map((option, index) => {
            const selected = option.value === value
            const active = index === activeIndex
            return (
              <li
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={selected}
                onClick={() => choose(index)}
                onPointerEnter={() => setActiveIndex(index)}
                className={`flex h-10 cursor-pointer items-center justify-between rounded-lg px-3 text-[15px] ${active ? 'bg-iris/20' : ''}`}
              >
                <span>{option.label}</span>
                {selected ? (
                  <span className="text-iris">
                    <Check />
                  </span>
                ) : null}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
