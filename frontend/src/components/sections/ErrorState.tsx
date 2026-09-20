import { PillButton } from '../primitives/Pill'
import { CitrusMark } from '../primitives/CitrusMark'
import { site } from '../../site'

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="min-h-screen bg-base px-6 pt-6 md:px-12 lg:px-20 lg:pt-8">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-24">
        <p className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.01em]">
          <CitrusMark />
          {site.name}
        </p>
        <div role="alert" className="flex max-w-[560px] flex-col items-start gap-5">
          <h1 className="text-3xl leading-tight font-semibold md:text-4xl">No pude cargar data.json.</h1>
          <p className="text-base leading-relaxed text-muted">
            Revisá tu conexión y probá de nuevo. Si sigue fallando, los datos no están disponibles en este momento.
          </p>
          <PillButton variant="fill" onClick={onRetry}>
            Reintentar
          </PillButton>
        </div>
      </div>
    </main>
  )
}
