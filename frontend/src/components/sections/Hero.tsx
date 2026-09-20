import { DotField } from '../charts/DotField'
import { formatDate, formatInt, formatList, formatMonthYear, formatPercent } from '../format'
import { CitrusMark } from '../primitives/CitrusMark'
import { CountUp } from '../primitives/CountUp'
import { Legend } from '../primitives/Legend'
import { site } from '../../site'
import type { HeroData } from '../types'

interface FigureProps {
  children: React.ReactNode
  label: string
}

function Figure({ children, label }: FigureProps) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[32px] leading-none font-medium md:text-[44px]">{children}</p>
      <p className="mt-2 max-w-[200px] text-sm leading-snug text-muted">{label}</p>
    </div>
  )
}

export function Hero({ data }: { data: HeroData }) {
  const share = (data.juniorRemoteGlobal / Math.max(1, data.totalJobs)) * 100
  const numeral = share < 1 ? '<1%' : formatPercent(share, 1)

  return (
    <header className="bg-base px-6 pt-6 pb-16 md:px-12 md:pb-24 lg:px-20 lg:pt-8 lg:pb-28">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-9 lg:gap-8">
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.01em]">
            <CitrusMark />
            {site.name}
          </p>
          <p className="font-mono text-sm text-muted">Datos al {formatDate(data.lastCapture)}</p>
        </div>

        <div className="h-2 lg:h-12" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-8 lg:gap-14">
            <div className="flex max-w-[560px] flex-col gap-3.5">
              <p className="text-xl leading-snug font-medium md:text-2xl">{site.tagline}</p>
              <p className="text-base leading-relaxed text-muted">
                {site.cadence} capturo avisos de empleo, extraigo las tecnologías que mencionan y las cruzo con seniority
                y modalidad de trabajo. Todo el recorrido, de la API a cada gráfico de esta página, es propio: ingesta,
                base de datos, extracción y visualización.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <h1>
                <span className="block font-mono text-[112px] leading-[0.9] font-medium tracking-[-0.04em] text-amber md:text-[160px] lg:text-[200px]">
                  {numeral}
                </span>
                <span className="mt-5 block max-w-[620px] text-[26px] leading-[1.18] font-semibold tracking-[-0.01em] md:mt-7 md:text-[40px]">
                  de los avisos son junior y remoto sin restricción geográfica
                </span>
              </h1>
              <p className="max-w-[680px] text-[17px] leading-relaxed md:text-[19px]">
                <CountUp value={data.juniorRemoteGlobal} /> de <CountUp value={data.totalJobs} /> avisos analizados cumplen las
                dos condiciones. Junior incluye sin experiencia.
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <DotField total={data.totalJobs} juniorTotal={data.juniorTotal} juniorRemoteGlobal={data.juniorRemoteGlobal} />
            <Legend
              items={[
                { swatchClass: 'bg-dot', label: 'Otros avisos', detail: formatInt(data.totalJobs - data.juniorTotal) },
                { swatchClass: 'bg-iris', label: 'Junior, otra modalidad', detail: formatInt(data.juniorTotal - data.juniorRemoteGlobal) },
                { swatchClass: 'bg-amber', label: 'Junior y remoto global', detail: formatInt(data.juniorRemoteGlobal) },
              ]}
            />
            <p className="text-sm text-muted">Cada punto es un aviso.</p>
          </div>
        </div>

        <div className="h-2 lg:h-4" />

        <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:flex md:flex-wrap md:gap-x-16 md:gap-y-8">
          <Figure label="avisos con tecnologías detectadas">
            <CountUp value={data.totalJobs} />
          </Figure>
          <Figure label="piden senior o semi-senior">
            <CountUp value={data.seniorShare} decimals={1} suffix="%" />
          </Figure>
          <Figure label="son junior o sin experiencia">
            <CountUp value={data.juniorShare} decimals={1} suffix="%" />
          </Figure>
          <Figure label="son remotos sin restricción geográfica">
            <CountUp value={data.remoteGlobalShare} decimals={1} suffix="%" />
          </Figure>
        </div>

        <p className="max-w-[680px] text-sm leading-relaxed text-muted">
          {data.sources.length > 1 ? 'Fuentes' : 'Fuente'}: {formatList(data.sources)}. Avisos capturados desde el{' '}
          {formatDate(data.capturedSince)} y publicados desde {formatMonthYear(data.publishedSince)}.
        </p>
      </div>
    </header>
  )
}
