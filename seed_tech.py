import os
import psycopg
from dotenv import load_dotenv
from catalog import TECH_CATALOG

def main():
    load_dotenv()
    conn = psycopg.connect(os.getenv("DATABASE_URL"))
    with conn.cursor() as cur:
        for tech, category in TECH_CATALOG.items():
            cur.execute("""INSERT INTO technologies (name, category)
                         VALUES (%s, %s) ON CONFLICT (name) DO NOTHING""", (tech, category))
    conn.commit()
if __name__ == "__main__":
    main()