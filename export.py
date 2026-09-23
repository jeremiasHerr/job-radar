import psycopg
import os
from dotenv import load_dotenv
from psycopg.rows import dict_row
import json
from datetime import datetime,date

def main():
    load_dotenv()
    conn = psycopg.connect(os.getenv("DATABASE_URL"))
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute("""
            SELECT j.id, j.title,j.seniority_normalized,j.remote_modality_normalized, j.published_at, j.url,j.category_name, array_agg (DISTINCT t.name) as technology
            FROM jobs j
            JOIN job_technologies jt ON jt.job_id = j.id
            JOIN technologies t ON t.id = jt.technology_id
            GROUP BY j.id
        """)
        jobs = cur.fetchall()
        cur.execute("SELECT MIN(captured_at) as since, MAX(captured_at) as last_capture, COUNT(*) as total_jobs FROM jobs")
        meta_data = cur.fetchone()
        cur.execute("SELECT name, category FROM technologies")
        technologies = {row["name"]: row["category"] for row in cur.fetchall()}
        data = {
            "meta": {"total_jobs":meta_data["total_jobs"], "captured_since": meta_data["since"], "last_capture": meta_data["last_capture"]},
            "jobs": jobs,
            "technologies": technologies
        }
    conn.close()
    with open("./frontend/public/data.json","w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, default=serialize, indent=2)     

def serialize(obj):
    if isinstance(obj, (datetime,date)):
        return obj.isoformat()
    raise TypeError(f"Not serializable : {type(obj)}")

if __name__ == "__main__":
    main()