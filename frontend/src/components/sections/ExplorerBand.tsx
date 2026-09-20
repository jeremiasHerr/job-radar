import { useState } from 'react'
import { TechBars } from '../charts/TechBars'
import {
  CATEGORY_OPTIONS,
  DEFAULT_FILTERS,
  MODALITY_LABELS,
  MODALITY_OPTIONS,
  RANGE_OPTIONS,
  SENIORITY_LABELS,
  SENIORITY_OPTIONS,
} from '../constants'
import { formatDate } from '../format'
import { Band } from '../primitives/Band'
import { PillButton } from '../primitives/Pill'
import { SampleSize, SmallSampleNotice } from '../primitives/SampleSize'
import { Select } from '../primitives/Select'
import { BandTitle, Lead, SubTitle } from '../primitives/Text'
import type { ExplorerProps, JobRow } from '../types'

const TITLE_ID = 'explorer-title'
const FILTERS_ID = 'explorer-filters'

function JobTable({ jobs }: { jobs: JobRow[] }) {
  return (
    <>
      <table className="hidden w-full border-collapse text-[15px] leading-snug md:table">
        <caption className="sr-only">Avisos más recientes</caption>
        <thead>
          <tr className="text-left text-muted">
            <th scope="col" className="pr-4 pb-3 font-medium">Título</th>
            <th scope="col" className="w-36 pr-4 pb-3 font-medium">Seniority</th>
            <th scope="col" className="w-56 pr-4 pb-3 font-medium">Modalidad</th>
            <th scope="col" className="w-32 pr-4 pb-3 font-medium">Publicado</th>
            <th scope="col" className="w-24 pb-3"><span className="sr-only">Enlace</span></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t border-rule/35">
              <td className="py-3.5 pr-4 font-medium">{job.title}</td>
              <td className="py-3.5 pr-4 text-muted">{SENIORITY_LABELS[job.seniority] ?? job.seniority}</td>
              <td className="py-3.5 pr-4 text-muted">{MODALITY_LABELS[job.modality]}</td>
              <td className="py-3.5 pr-4 font-mono text-sm text-muted">{formatDate(job.publishedAt)}</td>
              <td className="py-3.5 text-right">
                <a href={job.url} target="_blank" rel="noreferrer" aria-label={`Ver aviso: ${job.title}`}>
                  Ver aviso
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="md:hidden">
        {jobs.map((job) => (
          <li key={job.id} className="border-t border-rule/35 py-4">
            <a href={job.url} target="_blank" rel="noreferrer" className="text-base leading-snug font-semibold text-ink no-underline">
              {job.title}
            </a>
            <p className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted">
              <span>{SENIORITY_LABELS[job.seniority] ?? job.seniority}</span>
              <span>{MODALITY_LABELS[job.modality]}</span>
              <span className="font-mono">{formatDate(job.publishedAt)}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}

export function ExplorerBand({ data }: { data: ExplorerProps }) {
  const { filters, onFiltersChange } = data
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <Band tone="surface" labelledBy={TITLE_ID} id="explorador">
      <div className="flex flex-col gap-4">
        <BandTitle id={TITLE_ID}>Explorá los datos</BandTitle>
        <Lead>Combiná los filtros. El tamaño de la muestra se actualiza con cada cambio.</Lead>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          aria-expanded={filtersOpen}
          aria-controls={FILTERS_ID}
          onClick={() => setFiltersOpen((open) => !open)}
          className="flex h-12 w-full cursor-pointer items-center justify-between rounded-full border border-ctrl px-4 text-base font-medium text-ink md:hidden"
        >
          Filtros
          <span aria-hidden="true" className="text-muted">{filtersOpen ? 'Ocultar' : 'Mostrar'}</span>
        </button>
        <div id={FILTERS_ID} className={`${filtersOpen ? 'flex' : 'hidden'} flex-col gap-2.5 md:flex md:flex-row md:flex-wrap md:items-center md:gap-3`}>
          <Select label="Seniority" value={filters.seniority} options={SENIORITY_OPTIONS} onChange={(seniority) => onFiltersChange({ ...filters, seniority })} stretchOnMobile />
          <Select label="Categoría" value={filters.category} options={CATEGORY_OPTIONS} onChange={(category) => onFiltersChange({ ...filters, category })} stretchOnMobile />
          <Select label="Modalidad" value={filters.modality} options={MODALITY_OPTIONS} onChange={(modality) => onFiltersChange({ ...filters, modality })} stretchOnMobile />
          <Select label="Fechas" value={filters.range} options={RANGE_OPTIONS} onChange={(range) => onFiltersChange({ ...filters, range })} stretchOnMobile />
        </div>
      </div>

      <SampleSize n={data.n} note={data.cutDescription} />
      {data.isSmall && data.n > 0 ? <SmallSampleNotice n={data.n} /> : null}

      {data.n === 0 ? (
        <div className="flex flex-col items-start gap-5">
          <Lead tone="ink">Ningún aviso cumple con estos filtros. Probá con una categoría o una modalidad menos.</Lead>
          <PillButton onClick={() => onFiltersChange(DEFAULT_FILTERS)}>Quitar filtros</PillButton>
        </div>
      ) : (
        <>
          <TechBars items={data.ranking} total={data.n} thickness={18} />
          <SubTitle>Avisos más recientes</SubTitle>
          <div className="flex flex-col items-start gap-5">
            <div className="w-full">
              <JobTable jobs={data.jobs} />
            </div>
            {data.canShowMore ? <PillButton onClick={data.onShowMore}>Mostrar más avisos</PillButton> : null}
          </div>
        </>
      )}
    </Band>
  )
}
