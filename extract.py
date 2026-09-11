import os
import psycopg
import re
from psycopg.rows import dict_row
from dotenv import load_dotenv
from bs4 import BeautifulSoup

TECH_LIST = [
        "python", "javascript", "typescript", "react", "angular",
        "postgresql", "mysql", "mongodb","docker", "kubernetes",
        "django", "kotlin", "swift", "terraform", "java", "go", "sql",
        "cobol", "cics", "jcl", "db2", "vsam"
    ]

def find_occurrence(text):
    occurrences = set()
    text = text.lower()
    for tech in TECH_LIST:
        pattern = rf"\b{tech}\b"
        if re.search(pattern, text):
            occurrences.add(tech)
    return occurrences

def main():
    load_dotenv()
    conn = psycopg.connect(os.getenv("DATABASE_URL"))

    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute("""SELECT id, description, desirable, responsibilities FROM jobs """)
        row = cur.fetchone()
        soup = BeautifulSoup(row["desirable"], "html.parser")
        clean_text = soup.get_text(separator=" ", strip=True)
        print(clean_text)
        print(find_occurrence(clean_text))
    conn.commit()


if __name__ == "__main__":
    main()