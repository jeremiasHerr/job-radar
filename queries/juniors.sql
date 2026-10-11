WITH leveled AS (
  SELECT
  id,
  remote_modality_normalized AS modality,
  CASE
    WHEN seniority_normalized IN ('no experience', 'junior') THEN 'junior'
    WHEN seniority_normalized IN ('expert', 'semi-senior', 'senior') THEN seniority_normalized
    ELSE NULL
  END AS level
  FROM jobs
  WHERE id IN (SELECT DISTINCT job_id FROM job_technologies)
)
SELECT
  modality,
  COUNT(*) AS all_count,
  COUNT(*) FILTER (WHERE level = 'junior') AS junior_count
FROM leveled
GROUP BY modality
ORDER BY modality
