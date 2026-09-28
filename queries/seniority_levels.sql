WITH leveled as(
SELECT
  id,
  CASE 
    WHEN seniority_normalized IN ('no experience', 'junior') THEN 'junior'
    WHEN seniority_normalized IN ('expert', 'semi-senior', 'senior') THEN seniority_normalized
    ELSE NULL
  END as level
  FROM jobs
  WHERE id IN (SELECT DISTINCT job_id FROM job_technologies)
)
SELECT 
  level,
  COUNT(*) as count_level
  FROM leveled
  GROUP BY level
  ORDER BY CASE level
    WHEN 'junior' THEN 1
    WHEN 'semi-senior' THEN 2
    WHEN 'senior' THEN 3
    WHEN 'expert' THEN 4
  END