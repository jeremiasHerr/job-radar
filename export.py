import psycopg
import os
from dotenv import load_dotenv
from psycopg.rows import dict_row
import json
from decimal import Decimal 
from datetime import datetime,date


LEVELS = ["junior", "semi-senior", "senior", "expert"]
SMALL_SAMPLE = 30
SOURCES = ["GetOnBrd"]

def main():
    load_dotenv()
    conn = psycopg.connect(os.getenv("DATABASE_URL"))
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute("""
            SELECT j.id, j.title,j.seniority_normalized,
                CASE
                    WHEN j.seniority_normalized IN ('no experience', 'junior') THEN 'junior'
                    WHEN j.seniority_normalized IN ('expert', 'semi-senior', 'senior') THEN j.seniority_normalized
                    ELSE NULL
                END as level,
                j.remote_modality_normalized, j.published_at, j.url,j.category_name, array_agg (DISTINCT t.name) as technology
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
        seniority = build_seniority(conn)
        hero = build_hero(conn)
        with open("./frontend/public/summary.json", "w", encoding="utf-8") as f:
            json.dump({"hero": hero, "seniority": seniority}, f , ensure_ascii=False,default=serialize, indent=2)
    conn.close()
    with open("./frontend/public/data.json","w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, default=serialize, indent=2)     

def build_seniority(conn):
    with conn.cursor(row_factory=dict_row) as cur:
        with open("queries/seniority_levels.sql", encoding="utf-8") as f:
            cur.execute(f.read())
        level_rows = cur.fetchall()
        with open("queries/seniority_matrix.sql", encoding="utf-8") as f:
            cur.execute(f.read())
        matrix_rows = cur.fetchall()
        total = sum(row["count_level"] for row in level_rows)
        counts = {row["level"]: row["count_level"] for row in level_rows}
        senior_share = round((((counts.get("semi-senior", 0) + counts.get("senior", 0)) * 100) / total),1)
        level = [
            {
                "level": row["level"],
                "count": row["count_level"],
                "isSmall": row["count_level"] < SMALL_SAMPLE
            }
            for row in level_rows
        ]
        matrix = [
            {
                "name": row["name"],
                "shares": {level: row[level] for level in LEVELS}
            }
            for row in matrix_rows
        ]
        seniority = {
            "total": total,
            "seniorShare": senior_share,
            "levels": level,
            "matrix": matrix
        }
    return seniority

def build_hero(conn):
    with conn.cursor(row_factory=dict_row) as cur:
        with open("queries/hero.sql", encoding="utf-8") as f:
            cur.execute(f.read())
        row = cur.fetchone()
    hero = {
        "totalJobs": row["total_jobs"],
        "juniorTotal": row["junior_total"],
        "juniorRemoteGlobal": row["junior_remote_global"],
        "seniorShare": row["senior_share"],
        "juniorShare": row["junior_share"],
        "remoteGlobalShare": row["remote_global_share"],
        "sources": SOURCES,
        "capturedSince": row["captured_since"],
        "lastCapture": row["last_capture"],
        "publishedSince": row["published_since"]
    }
    return hero


def serialize(obj):
    if isinstance(obj, (datetime,date)):
        return obj.isoformat()
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError(f"Not serializable : {type(obj)}")

if __name__ == "__main__":
    main()