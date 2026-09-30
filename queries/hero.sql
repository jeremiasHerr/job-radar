WITH leveled AS (
  SELECT
  id,
  remote_modality_normalized AS modality,
  published_at,
  CASE
    WHEN seniority_normalized IN ('no experience', 'junior') THEN 'junior'
    WHEN seniority_normalized IN ('expert', 'semi-senior', 'senior') THEN seniority_normalized
    ELSE NULL
  END AS level
  FROM jobs
  WHERE id IN (SELECT DISTINCT job_id FROM job_technologies)
), counts AS (
  SELECT
  COUNT(*) AS total_jobs,
  COUNT(*) FILTER (WHERE level = 'junior') AS junior_total,
  COUNT(*) FILTER (WHERE level = 'junior' AND modality = 'remote') AS junior_remote_global,
  COUNT(*) FILTER (WHERE level IN ('semi-senior', 'senior')) AS senior_total,
  COUNT(*) FILTER (WHERE modality = 'remote') AS remote_global_total,
  MIN(published_at) AS published_since
  FROM leveled
)
SELECT
  c.total_jobs,
  c.junior_total,
  c.junior_remote_global,
  ROUND(c.senior_total * 100.0 / NULLIF(c.total_jobs, 0), 1) AS senior_share,
  ROUND(c.junior_total * 100.0 / NULLIF(c.total_jobs, 0), 1) AS junior_share,
  ROUND(c.remote_global_total * 100.0 / NULLIF(c.total_jobs, 0), 1) AS remote_global_share,
  c.published_since,
  (SELECT MIN(captured_at) FROM jobs) AS captured_since,
  (SELECT MAX(captured_at) FROM jobs) AS last_capture
FROM counts c
