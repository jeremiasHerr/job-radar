import os
import psycopg
import re
from psycopg.rows import dict_row
from dotenv import load_dotenv
from bs4 import BeautifulSoup

TECH_LIST = [
    # Lenguajes
    "python", "javascript", "typescript", "java", "kotlin", "swift", "go", "rust",
    "php", "ruby", "scala", "r", "perl", "cobol", "dart", "elixir", "groovy",
    # .NET
    "c#", ".net", "asp.net", "vb.net", "blazor", "entity framework",
    # C family
    "c++", "objective-c",
    # Frontend
    "react", "angular", "vue", "svelte", "next.js", "nuxt", "jquery",
    "html", "css", "sass", "tailwind", "bootstrap", "material ui",
    "redux", "zustand", "storybook", "webpack", "vite",
    # Mobile
    "react native", "flutter", "expo", "android", "ios", "xamarine", "ionic",
    # Backend
    "node", "express", "nestjs", "django", "flask", "fastapi", "spring",
    "spring boot", "laravel", "symfony", "rails", "graphql", "grpc", "rest",
    # Bases de datos
    "postgresql", "mysql", "sql server", "oracle", "sqlite", "mariadb",
    "mongodb", "redis", "cassandra", "dynamodb", "elasticsearch", "neo4j",
    "db2", "firebase", "supabase",
    # Datos
    "pandas", "numpy", "spark", "pyspark", "airflow", "dbt", "kafka",
    "snowflake", "databricks", "bigquery", "redshift", "hadoop", "hive",
    "power bi", "tableau", "looker", "qlik", "dax", "power query", "etl",
    # ML / IA
    "tensorflow", "pytorch", "scikit-learn", "keras", "opencv", "langchain",
    "hugging face", "mlflow", "openai", "llm", "rag", "nlp",
    # Cloud
    "aws", "azure", "gcp", "oci", "lambda", "s3", "ec2", "kubernetes",
    "docker", "terraform", "ansible", "openshift", "cloudformation",
    # DevOps
    "jenkins", "gitlab", "github actions", "circleci", "argocd", "sonarqube",
    "prometheus", "grafana", "datadog", "new relic", "nginx", "apache",
    # Testing
    "junit", "mockito", "pytest", "jest", "cypress", "playwright",
    "selenium", "testing library", "postman", "soapui",
    # Herramientas
    "git", "github", "bitbucket", "jira", "confluence", "figma",
    "linux", "bash", "powershell", "excel", "sap",
    # Mainframe
    "cics", "jcl", "vsam", "as400", "rpg",
    # Metodologías
    "scrum", "kanban", "agile", "devops", "ci/cd", "microservicios", "tdd",
]

def find_occurrence(text):
    occurrences = set()
    text = text.lower()
    for tech in sorted(TECH_LIST, key=len, reverse=True):
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

    with conn.cursor(row_factory=dict_row) as cur:
        #cur.execute("""SELECT id, description, desirable, responsibilities FROM jobs WHERE description ILIKE '%node%' LIMIT 1;""")
        #row = cur.fetchone()
        #soup = BeautifulSoup(row["description"], "html.parser")
        #clean_text = soup.get_text(separator=" ", strip=True)
        clean_text="""Buscamos Full Stack Developer con experiencia en C#, y ASP.NET.
Frontend en React, TypeScript y Next.js. Se valora Node.js y Express.
Bases de datos: PostgreSQL, MongoDB y Redis. Experiencia en C++ es un plus.
Conocimientos de Docker, Kubernetes y CI/CD con GitLab.
Deseable Python (Pandas, FastAPI), Apache Airflow y Power BI.
Cloud: AWS o Azure. Testing con Jest y Cypress.
No se requiere experiencia en ni en JavaScript legacy.
Trabajamos con metodologías ágiles, gobierno de datos y microservicios.
El equipo usa Go para algunos servicios y R para análisis estadístico."""
        print(clean_text)
        print(find_occurrence(clean_text))
    conn.commit()


if __name__ == "__main__":
    main()