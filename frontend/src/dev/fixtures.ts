// Snapshot of the real data, only used by the dev preview (open /?preview while running `npm run dev`).
// It is generated once from public/data.json and never imported by the app.
import type { ExplorerProps, HeroData, JobRow, JuniorsProps, RankedTech, SeniorityProps, TrendProps } from '../components/types'

export const hero: HeroData = {
  "totalJobs": 687,
  "juniorTotal": 41,
  "juniorRemoteGlobal": 6,
  "seniorShare": 90.8,
  "juniorShare": 6.0,
  "remoteGlobalShare": 20.4,
  "sources": [
    "GetOnBrd"
  ],
  "capturedSince": "2026-09-06",
  "lastCapture": "2026-09-15",
  "publishedSince": "2025-10-01"
}

export const rankingItems: RankedTech[] = [
  {
    "name": "python",
    "count": 223,
    "category": "language"
  },
  {
    "name": "aws",
    "count": 213,
    "category": "cloud"
  },
  {
    "name": "ci/cd",
    "count": 212,
    "category": "devops"
  },
  {
    "name": "sql",
    "count": 200,
    "category": "language"
  },
  {
    "name": "rest",
    "count": 163,
    "category": "backend"
  },
  {
    "name": "azure",
    "count": 156,
    "category": "cloud"
  },
  {
    "name": "git",
    "count": 143,
    "category": "tooling"
  },
  {
    "name": "react",
    "count": 128,
    "category": "frontend"
  },
  {
    "name": "docker",
    "count": 121,
    "category": "devops"
  },
  {
    "name": "typescript",
    "count": 121,
    "category": "language"
  },
  {
    "name": "gcp",
    "count": 103,
    "category": "cloud"
  },
  {
    "name": "devops",
    "count": 100,
    "category": "methodology"
  },
  {
    "name": "javascript",
    "count": 96,
    "category": "language"
  },
  {
    "name": "node",
    "count": 94,
    "category": "backend"
  },
  {
    "name": "microservicios",
    "count": 92,
    "category": "architecture"
  }
]

export const seniority: SeniorityProps = {
  "total": 687,
  "seniorShare": 90.8,
  "levels": [
    {
      "level": "junior",
      "count": 41,
      "isSmall": false
    },
    {
      "level": "semi-senior",
      "count": 260,
      "isSmall": false
    },
    {
      "level": "senior",
      "count": 364,
      "isSmall": false
    },
    {
      "level": "expert",
      "count": 22,
      "isSmall": true
    }
  ],
  "matrix": [
    {
      "name": "python",
      "shares": {
        "junior": 29.3,
        "semi-senior": 33.8,
        "senior": 32.1,
        "expert": 27.3
      }
    },
    {
      "name": "aws",
      "shares": {
        "junior": 14.6,
        "semi-senior": 27.7,
        "senior": 34.1,
        "expert": 50.0
      }
    },
    {
      "name": "ci/cd",
      "shares": {
        "junior": 17.1,
        "semi-senior": 27.7,
        "senior": 34.6,
        "expert": 31.8
      }
    },
    {
      "name": "sql",
      "shares": {
        "junior": 29.3,
        "semi-senior": 31.9,
        "senior": 27.5,
        "expert": 22.7
      }
    },
    {
      "name": "rest",
      "shares": {
        "junior": 17.1,
        "semi-senior": 23.5,
        "senior": 24.5,
        "expert": 27.3
      }
    },
    {
      "name": "azure",
      "shares": {
        "junior": 17.1,
        "semi-senior": 17.7,
        "senior": 26.9,
        "expert": 22.7
      }
    },
    {
      "name": "git",
      "shares": {
        "junior": 17.1,
        "semi-senior": 25.4,
        "senior": 19.0,
        "expert": 4.5
      }
    },
    {
      "name": "react",
      "shares": {
        "junior": 9.8,
        "semi-senior": 16.9,
        "senior": 21.2,
        "expert": 13.6
      }
    },
    {
      "name": "docker",
      "shares": {
        "junior": 19.5,
        "semi-senior": 18.5,
        "senior": 16.8,
        "expert": 18.2
      }
    },
    {
      "name": "typescript",
      "shares": {
        "junior": 12.2,
        "semi-senior": 13.8,
        "senior": 20.9,
        "expert": 18.2
      }
    }
  ],
  "insight": "AWS crece con el nivel: 14,6% en juniors, 34,1% en seniors y 50,0% en expert. Python y SQL, en cambio, se piden parejo en todos los niveles."
}

export const juniors: JuniorsProps = {
  "all": {
    "total": 687,
    "counts": {
      "remote": 140,
      "remote_local": 177,
      "hybrid": 290,
      "onsite": 80
    }
  },
  "junior": {
    "total": 41,
    "counts": {
      "remote": 6,
      "remote_local": 3,
      "hybrid": 20,
      "onsite": 12
    }
  }
}

export const trend: TrendProps = {
  "capturedSince": "2026-09-06",
  "lastCapture": "2026-09-15"
}

export const explorerRanking: RankedTech[] = [
  {
    "name": "ci/cd",
    "count": 184,
    "category": "devops"
  },
  {
    "name": "aws",
    "count": 175,
    "category": "cloud"
  },
  {
    "name": "python",
    "count": 164,
    "category": "language"
  },
  {
    "name": "sql",
    "count": 154,
    "category": "language"
  },
  {
    "name": "rest",
    "count": 131,
    "category": "backend"
  },
  {
    "name": "azure",
    "count": 124,
    "category": "cloud"
  },
  {
    "name": "git",
    "count": 116,
    "category": "tooling"
  },
  {
    "name": "react",
    "count": 107,
    "category": "frontend"
  }
]

export const explorerJobs: JobRow[] = [
  {
    "id": "senior-backend-developer-spring-boot-3-english-23people-remote",
    "title": "Senior Back-end Developer Spring Boot 3 English",
    "url": "https://www.getonbrd.com/jobs/senior-backend-developer-spring-boot-3-english-23people-remote",
    "seniority": "senior",
    "modality": "remote_local",
    "publishedAt": "2026-09-15"
  },
  {
    "id": "sr-sap-ewm-consultant-crest-it-resources-llc-mexicali",
    "title": "Sr SAP EWM Consultant",
    "url": "https://www.getonbrd.com/jobs/sr-sap-ewm-consultant-crest-it-resources-llc-mexicali",
    "seniority": "senior",
    "modality": "hybrid",
    "publishedAt": "2026-09-15"
  },
  {
    "id": "ml-engineer-forecasting-applied-data-science-niuro-remote",
    "title": "ML Engineer (Forecasting & Applied Data Science)",
    "url": "https://www.getonbrd.com/jobs/ml-engineer-forecasting-applied-data-science-niuro-remote",
    "seniority": "senior",
    "modality": "remote_local",
    "publishedAt": "2026-09-15"
  },
  {
    "id": "senior-ai-engineer-niuro-remote-42c5",
    "title": "Senior AI Engineer",
    "url": "https://www.getonbrd.com/jobs/senior-ai-engineer-niuro-remote-42c5",
    "seniority": "senior",
    "modality": "remote_local",
    "publishedAt": "2026-09-15"
  },
  {
    "id": "c-software-engineer-desktop-app-improving-remote",
    "title": "C++ Software Engineer (Desktop App)",
    "url": "https://www.getonbrd.com/jobs/c-software-engineer-desktop-app-improving-remote",
    "seniority": "senior",
    "modality": "remote_local",
    "publishedAt": "2026-09-15"
  },
  {
    "id": "ai-marketing-analytics-specialist-niuro-remote",
    "title": "AI & Marketing Analytics Specialist",
    "url": "https://www.getonbrd.com/jobs/ai-marketing-analytics-specialist-niuro-remote",
    "seniority": "senior",
    "modality": "remote_local",
    "publishedAt": "2026-09-15"
  }
]

export const explorerSample = {
  "n": 530,
  "cutDescription": "Últimos 3 meses (desde el 15/06/2026), todos los niveles y modalidades."
} satisfies Pick<ExplorerProps, 'n' | 'cutDescription'>
