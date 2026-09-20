import { CitrusMark } from '../primitives/CitrusMark'
import { site } from '../../site'

function Block({ className, width }: { className: string; width?: number }) {
  return <div aria-hidden="true" className={`rounded-sm bg-rule/30 ${className}`} style={width ? { width: `${width}%` } : undefined} />
}

/** Same layout as the loaded page, with placeholders instead of data and no spinner. */
export function PageSkeleton() {
  return (
    <main>
      <h1 className="sr-only">Cargando datos</h1>
      <p role="status" className="sr-only">Cargando datos…</p>
      <header className="bg-base px-6 pt-6 pb-16 md:px-12 md:pb-24 lg:px-20 lg:pt-8 lg:pb-28">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-9 lg:gap-12">
          <p className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.01em]">
            <CitrusMark />
            {site.name}
          </p>
          <Block className="h-24 w-64 md:h-36 md:w-96" />
          <div className="flex flex-col gap-3">
            <Block className="h-8 w-full max-w-[560px]" />
            <Block className="h-8 w-full max-w-[420px]" />
          </div>
        </div>
      </header>
      <section className="bg-surface px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-28">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-8">
          <Block className="h-10 w-full max-w-[640px]" />
          <p aria-hidden="true" className="font-mono text-xl font-medium">n = —</p>
          <div className="flex flex-col gap-3">
            {[78, 66, 60, 44, 38].map((width) => (
              <Block key={width} className="h-5" width={width} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
