export type Data = {
    meta: {total_jobs: number, captured_since: string, last_capture: string },
    jobs: Job[]
}

export type Job = {
      id: string,
      title: string,
      seniority_normalized: string | null,
      remote_modality_normalized: string | null,
      published_at: string,
      url: string,
      category_name: string,
      technology: string[]
}