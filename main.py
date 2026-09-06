import requests
import os
from dotenv import load_dotenv
import psycopg
from psycopg.types.json import Jsonb
from datetime import datetime, timezone
import time

 
SENIORITY_MAP = {
    1: "no experience",
    2: "junior",
    3:"semi-senior",
    4:"senior",
    5:"expert"
}

MODALITY_MAP = {
    "no_remote": "onsite",
    "hybrid": "hybrid",
    "fully_remote": "remote",
    "remote_local": "remote_local",
 }

SOURCE = "getonbrd"

SALARY_CURRENCY = "USD"

MAX_PAGES = 5

CATEGORIES = [
    "programming",
    "data-science-analytics",
    "machine-learning-ai",
    "sysadmin-devops-qa",
    "mobile-developer",
    "cybersecurity",
    "technical-support",
    "design-ux"
]

INSERT_JOB_SQL = """
    INSERT INTO jobs (
        id,
        title,
        countries,
        is_remote,
        company_id,
        description,
        desirable,
        url,
        responsibilities,
        remote_modality_raw,
        remote_modality_normalized,
        seniority_raw,
        seniority_normalized,
        published_at,
        salary_min,
        salary_max,
        raw, 
        source,
        tags,
        applications_count,
        category_name,
        salary_currency
    ) VALUES (
        %(id)s,%(title)s,%(countries)s,%(is_remote)s,
        %(company_id)s,%(description)s,%(desirable)s,%(url)s,
        %(responsibilities)s,%(remote_modality_raw)s,%(remote_modality_normalized)s,%(seniority_raw)s,
        %(seniority_normalized)s,%(published_at)s,%(salary_min)s,%(salary_max)s,
        %(raw)s,%(source)s,%(tags)s,%(applications_count)s,
        %(category_name)s,%(salary_currency)s)
    ON CONFLICT (id) DO NOTHING"""

def parse_jobs(job):
    job_attributes = job.get("attributes", {})

    remote_modality_raw = job_attributes.get("remote_modality", None)
    seniority_raw = job_attributes.get("seniority", {}).get("data",{}).get("id")
    timestamp = job_attributes.get("published_at", None)
    tags_data = job_attributes.get("tags", {}).get("data", [])

    jobs = {
        "title": job_attributes.get("title"),
        "countries" : job_attributes.get("countries", []),
        "is_remote" : job_attributes.get("remote", False),
        "company_id" : job_attributes.get("company",{}).get("data", {}).get("id", None),
        "id" : job.get("id", None),
        "description" : job_attributes.get("description", None),
        "desirable" : job_attributes.get("desirable", None),
        "url" : job.get("links", {}).get("public_url", None),
        "responsibilities" : job_attributes.get("functions", None),
        "remote_modality_raw" : remote_modality_raw,
        "remote_modality_normalized" : MODALITY_MAP.get(remote_modality_raw, "unknown"),
        "seniority_raw" : seniority_raw,
        "seniority_normalized" : SENIORITY_MAP.get(seniority_raw, "unknown"),
        "published_at" : datetime.fromtimestamp(timestamp, tz=timezone.utc) if timestamp else None,
        "salary_min" : job_attributes.get("min_salary", None),
        "salary_max" : job_attributes.get("max_salary", None),
        "raw" : Jsonb(job),
        "tags" : [t["id"] for t in tags_data],
        "applications_count" : job_attributes.get("applications_count", None),
        "category_name" : job_attributes.get("category_name", None),
        "source": SOURCE,
        "salary_currency": SALARY_CURRENCY
    }
    return jobs

def main():
    load_dotenv()
    conn = psycopg.connect(os.getenv("DATABASE_URL"))
    with conn.cursor() as cur:
        for category in CATEGORIES:
            for page in range(1, MAX_PAGES+1):
                try:
                    url = f"https://getonbrd.com/api/v0/categories/{category}/jobs"
                    res = requests.get(url, params={"page": page, "per_page": 50})

                    if res.status_code == 404: #API responds 200 with empty data when the page doesnt exist, so this wouldnt be necessary
                        break

                    res.raise_for_status()
                   
                    data = res.json()
                    jobs = data.get("data", [])

                    if not jobs:
                        break             #No more pages in this category

                except (requests.RequestException, ValueError) as e:
                    print(f"Request failed: {e}")
                    continue
                
                for job in jobs:    
                    job_values = parse_jobs(job)
                   
                    cur.execute(INSERT_JOB_SQL, job_values)
                print(f"{category} p{page}: {len(jobs)} jobs")
                time.sleep(0.5)
                conn.commit()
            

if __name__ == "__main__":
    main()
