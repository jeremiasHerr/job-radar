import type { SeniorityLevel } from "./components/types";

export type Data = {
    meta: {total_jobs: number, captured_since: string, last_capture: string },
    jobs: Job[]
    technologies: Record<string, string>
}

export type Job = {
      id: string,
      title: string,
      seniority_normalized: string | null,
      /** Folded level: "no experience" counts as junior. */
      level: SeniorityLevel | null,
      remote_modality_normalized: string | null,
      published_at: string,
      url: string,
      category_name: string,
      technology: string[]
}
