// Site-level facts that are not derived from the data.

interface SiteConfig {
  name: string
  tagline: string
  cadence: string
  author: { name: string; location: string; bio: string }
  stack: string
  contact: { email: string; linkedin: string; github: string }
}

export const site: SiteConfig = {
  name: 'pomelo-lab.dev',
  tagline: 'Qué está pidiendo el mercado IT de LATAM, medido en avisos reales.',
  cadence: 'Cada 2 o 3 días',
  author: {
    name: 'Jeremías Herrera',
    location: 'Neuquén, Argentina',
    bio: 'Estudiante de la Tecnicatura Universitaria en Desarrollo Web (UNCo), finaliza en diciembre de 2026.',
  },
  stack: 'Python, PostgreSQL (Neon), React, TypeScript, Vite y Tailwind',
  // Fill these in. Empty values are not rendered.
  contact: {
    email: '',
    linkedin: '',
    github: '',
  },
}
