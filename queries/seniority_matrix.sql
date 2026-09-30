WITH leveled as (
  SELECT
  id,
  CASE 
    WHEN seniority_normalized IN ('no experience', 'junior') THEN 'junior'
    WHEN seniority_normalized IN ('expert', 'semi-senior', 'senior') THEN seniority_normalized
    ELSE NULL
  END as level
  FROM jobs
  WHERE id IN (SELECT DISTINCT job_id FROM job_technologies)
), level_totals as (
  SELECT 
  level,
  COUNT(*) as count_level
  FROM leveled
  GROUP BY level
), tech_level as (
  SELECT 
  t.name,
  l.level,
  COUNT(DISTINCT l.id) as jobs
  FROM leveled l
  JOIN job_technologies jt ON jt.job_id = l.id
  JOIN technologies t on t.id = jt.technology_id
  GROUP BY l.level, t.name
), shares as (
  SELECT
  tl.name,
  tl.level,
  tl.jobs,
  ROUND(tl.jobs * 100.0 / lt.count_level, 1) AS share
  FROM tech_level tl
  JOIN level_totals lt ON lt.level = tl.level
) 
SELECT 
s.name,
COALESCE(MAX(share) FILTER (WHERE s.level = 'junior'), 0) AS junior,
COALESCE(MAX(share) FILTER (WHERE s.level = 'semi-senior'), 0) AS "semi-senior",
COALESCE(MAX(share) FILTER (WHERE s.level = 'senior'), 0) AS senior,
COALESCE(MAX(share) FILTER (WHERE s.level = 'expert'), 0) AS expert,
SUM(s.jobs) AS total
FROM shares s
GROUP BY s.name
ORDER BY total DESC, s.name
LIMIT 10;