import os
import psycopg
import re
from psycopg.rows import dict_row
from dotenv import load_dotenv
from bs4 import BeautifulSoup
from catalog import TECH_CATALOG

def find_occurrence(text):
    occurrences = set()
    text = text.lower()
    for tech in sorted(TECH_CATALOG, key=len, reverse=True):
        prefix = r"\b" if tech[0].isalnum() else ""
        suffix = r"\b" if tech[-1].isalnum() else ""
        pattern = prefix + re.escape(tech) + suffix
        if re.search(pattern, text):
            occurrences.add(tech)
            text = re.sub(pattern, " ", text)
    return occurrences

def main():
    load_dotenv()
    conn = psycopg.connect(os.getenv("DATABASE_URL"))
    id_catalog = get_catalog(conn)
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute("""SELECT id, description, desirable, responsibilities FROM jobs;""")
        rows = cur.fetchall()

        for row in rows:

            print(f"{row["id"]}")
            job_id = row["id"]

            for field in ("description", "desirable", "responsibilities"):
                text = row[field]

                if not text:
                    continue

                clean_text = BeautifulSoup(text, "html.parser").get_text(separator=" ", strip=True)
                tech_occurrences = find_occurrence(clean_text)

                if not tech_occurrences:
                    continue

                for tech in tech_occurrences:
                    tech_id = id_catalog[tech]

                    cur.execute("INSERT INTO job_technologies (job_id, field, technology_id) VALUES (%s,%s,%s) ON CONFLICT (job_id, field, technology_id) DO NOTHING", (job_id, field, tech_id))

        
    conn.commit()

def get_catalog(conn):

    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute("SELECT id, name FROM technologies;")
        technologies = cur.fetchall()
    
    return {tech["name"]: tech["id"] for tech in technologies}

if __name__ == "__main__":
    main()