// Known limitations, shown in the "Qué no dice esta muestra" band.
// Update the source and sample groups when more portals are added.

export interface LimitationGroup {
  title: string
  items: string[]
}

export const limitations: LimitationGroup[] = [
  {
    title: 'De la fuente (GetOnBrd)',
    items: [
      'El campo countries a veces trae “Remote”: mezcla modalidad con geografía.',
      'El idioma no es confiable: hay avisos en español marcados como “en”.',
      'No hay campo de moneda; el USD se infiere de los rangos.',
    ],
  },
  {
    title: 'Del extractor',
    items: [
      'No detecta negación: “no se requiere Java” cuenta como si lo pidiera.',
      'Palabras pegadas por HTML sin separadores en el origen.',
      'R queda afuera del catálogo: un solo carácter no se desambigua de forma confiable.',
      'Se excluyen los avisos sin tecnologías detectadas (alrededor del 3%), sobre todo gestión, soporte y diseño.',
    ],
  },
  {
    title: 'De la muestra',
    items: [
      'Hoy es un solo portal, mayormente chileno y orientado a producto tech.',
      'No captura petroleras, consultoras grandes, empleo público ni bolsas universitarias.',
      'Los puestos junior se publican menos: muchos se cubren por programas internos o referidos.',
    ],
  },
]
