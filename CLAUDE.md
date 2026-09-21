# job-radar

## Qué es

Proyecto personal de análisis del mercado laboral IT en LATAM. Recolecta avisos de
empleo desde la API de GetOnBrd, los normaliza, extrae las tecnologías mencionadas en
el texto, y los expone en una web pública para analizar demanda por stack, seniority y
modalidad de trabajo.

Es un proyecto de aprendizaje (Python + SQL) que además funciona como pieza de
portfolio. Está en desarrollo activo y va a seguir creciendo.

**El lector objetivo de la web es un recruiter o un lead técnico** que llega desde un CV
o LinkedIn y tiene ~90 segundos. Lo que tiene que quedarle claro: quien construyó esto
sabe trabajar con datos de punta a punta.

**Autor:** Jeremías Herrera — Neuquén, Argentina.
Estudiante de la Tecnicatura Universitaria en Desarrollo Web (UNCo), finaliza 12/2026.

---

## Arquitectura

Dos mitades que corren en lugares distintos:

```
GetOnBrd API ──main.py──▶ Postgres (Neon) ──extract.py──▶ job_technologies
                                │
                          export.py
                                ▼
                     web/public/data.json ──▶ React (navegador)
```

| Script | Qué hace | Cadencia |
|---|---|---|
| `main.py` | Ingesta avisos desde la API | Cada 2-3 días |
| `seed_tech.py` | Carga el catálogo de tecnologías en la base | Cuando cambia `catalog.py` |
| `extract.py` | Extrae tecnologías del texto de los avisos | Cuando cambia el catálogo o la lógica |
| `export.py` | Genera `web/public/data.json` | Después de cada ingesta |

El frontend **no tiene backend**: lee un JSON estático y filtra en el navegador.
Decisión deliberada — deploy simple, sin exponer la base, sin costos.

### Modelo de datos

- `jobs` — un aviso por fila, PK = slug de GetOnBrd. Guarda `raw` (JSONB) con el payload
  completo, y `captured_at` con la fecha de primera captura.
- `technologies` — catálogo. `name` único + `category`.
- `job_technologies` — tabla puente. PK compuesta `(technology_id, job_id, field)`.
  `field` indica si la tecnología apareció en `description`, `responsibilities` o `desirable`.

**Principio central: guardar crudo, procesar después.** Lo procesado se puede rehacer;
lo que no se capturó, no vuelve.

**Normalización en el borde:** cada fuente traduce a un vocabulario propio apenas entra
el dato. De ahí para adentro el sistema habla un solo idioma. Se guardan siempre las dos
versiones (`_raw` y `_normalized`) para poder recalcular mapeos.

---

## Stack

**Pipeline:** Python 3.13, psycopg, BeautifulSoup, requests, python-dotenv
**Base:** PostgreSQL (Neon, free tier)
**Web:** React + TypeScript + Vite + Tailwind + Recharts

---

## Estado actual

- ~690 avisos capturados, ~670 con tecnologías detectadas
- 171 tecnologías en 14 categorías
- Cobertura del extractor: **97%**
- Captura iniciada el 06/09/2026 — la serie temporal todavía es corta

### Hallazgos principales (los que la web tiene que comunicar)

| | |
|---|---|
| Senior + semi-senior | **90%** del mercado |
| Junior + sin experiencia | **6,7%** |
| Remoto sin restricción geográfica | **20%** |
| **Junior Y remoto global** | **<1%** |

Top tecnologías: python (223), aws (213), ci/cd (212), sql (200), rest (163),
azure (156), git (143), react (128), docker (121), typescript (121).

De los avisos junior, la mayoría son híbridos o presenciales: **el empleo junior es
mayormente local**.

---

## Lo que la web tiene que mostrar

1. **Vistazo general del mercado** — los números grandes de arriba
2. **Tecnologías más requeridas** — ranking, con corte por categoría
3. **Requisitos por seniority** — cómo cambia el stack pedido según el nivel
4. **Qué parte del mercado hay para juniors** — el hallazgo más fuerte
5. **Tendencias en el tiempo** — ⚠️ la estructura va ahora, pero los datos todavía no
   alcanzan. Hasta tener ~2 meses de acumulación, mostrar el estado actual y una nota
   honesta de que la serie está en construcción.

### Filtros

Seniority · categoría de tecnología · modalidad de trabajo · rango de fechas
(`published_at`, default últimos 3 meses).

**Regla no negociable:** mostrar siempre el tamaño de la muestra junto al resultado, y
advertir cuando es chica. Filtrando junior + una categoría pueden quedar 3 avisos, y un
ranking sobre 3 no significa nada. Esto es honestidad estadística, no un detalle de UX.

---

## Dirección de diseño

**Estética SaaS premium.** Producto pulido, con propósito, atractivo a la vista — pero
los datos son el contenido, no la decoración.

⚠️ **Tensión a manejar con cuidado:** "SaaS premium" está a un paso del kit genérico de
tarjetas idénticas. La diferencia entre SaaS premium y SaaS templado está en la sección
de abajo. Leerla antes de escribir CSS.

### Tokens

```
#0D1117   fondo — carbón con tinte azulado (NO negro puro, NO #111)
#161B22   superficies y bandas de sección
#F5F3EF   texto principal — blanco roto cálido
#5B6470   texto secundario, metadata
#E8A33D   acento principal — ámbar dorado (hallazgos, el dato que importa)
#6B7FD7   acento secundario — azul-violeta (gráficos secundarios, links)
```

### Tipografía

- **Títulos:** sans geométrica con carácter — Space Grotesk o General Sans
- **Números y datos:** JetBrains Mono — los datos deben verse como datos, alineados en
  columnas. Esta decisión viene del dominio, no del gusto.
- **Cuerpo:** la misma sans de títulos, peso regular
- Línea de lectura < 80 caracteres
- Los números grandes se tratan tipográficamente **como titulares**, no como etiquetas

### Layout

Bandas de sección a todo el ancho, alternando `#0D1117` y `#161B22`. Cada banda es un
hallazgo. Eso da ritmo visual y es estructura informativa real, no decoración.

Alineación a la izquierda. Columna de lectura ~680px para texto; los gráficos rompen ese
ancho cuando lo necesitan.

```
┌──────────────────────────────────┐
│ jere.dev   job-radar      sep 2026│
├──────────────────────────────────┤
│  <1%                              │  banda oscura
│  de los avisos son junior         │
│  y remoto sin restricción         │
├──────────────────────────────────┤
│  ranking de tecnologías           │  banda base
│  [gráfico ancho completo]         │
├──────────────────────────────────┤
│  requisitos por seniority         │  banda oscura
├──────────────────────────────────┤
│  explorador con filtros           │  banda base
├──────────────────────────────────┤
│  footer — autor, stack, contacto  │
└──────────────────────────────────┘
```

### Movimiento

**Un solo momento orquestado:** los números grandes cuentan hacia arriba al entrar en
pantalla. Nada más se anima.

Sí está permitido el movimiento que responde a una acción del usuario (abrir, expandir,
confirmar) porque muestra qué cambió.

---

## Anti-patrones — NO hacer

Estos son los tells de una página generada. Evitarlos activamente:

**Color**
- Fondo crema cálido (~#F4F1EA) con serif de alto contraste y acento terracota (~#D97757)
- Negro casi puro con un único acento verde ácido o vermellón
- Degradés como decoración
- Negro tintado (#0B0B0B, #111) en lugar de un color elegido

**Estructura**
- Contenido picado en tarjetas idénticas, todas con el mismo border-radius sin importar
  la jerarquía, y la misma sombra gris suave `rgba(0,0,0,.1)` debajo de cada una
- Marcadores numerados (01 / 02 / 03) donde el contenido no es una secuencia
- Bordes y divisores que decoran en vez de codificar información

**Tipografía**
- Eyebrow labels en MAYÚSCULAS con letter-spacing arriba de cada título
- Acentuar una sola palabra del titular en itálica, negrita u otro color
- Etiquetas tipográficas innecesarias arriba del contenido
- Meta strings unidos con puntos medios ('A · B · C')
- Etiquetas tipo 'PALABRA — fragmento' con em dash espaciado
- Monoespaciada para etiquetas pequeñas **decorativas** (sí para datos reales)

**Interacción**
- `→` al final del texto de links y botones
- Fade-and-slide-up en cada sección al hacer scroll
- Transiciones de hover en cada tarjeta

**Regla de restraint:** gastar la audacia en un solo lugar. Que un elemento sea lo
memorable y todo lo demás quede callado y disciplinado. Antes de terminar, sacar un
accesorio.

---

## Convenciones de código

- **Todo en inglés:** código, nombres de variables, commits, README
- **TypeScript con tipos explícitos.** Sin `any`
- **snake_case en Python, camelCase en TypeScript**
- **Nunca f-strings en SQL.** Parámetros con `%s` o `%(nombre)s`, siempre
- La lógica de análisis vive en `web/src/lib/analytics.ts`, separada de los componentes.
  Son funciones puras: mismo input, mismo output, sin efectos. Son las candidatas a tests.
- Commits en formato Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`

### Calidad mínima, sin anunciarla

Responsive hasta mobile · foco de teclado visible · `prefers-reduced-motion` respetado ·
contraste accesible · paleta armónica.

---

## Limitaciones conocidas (van al README público)

**De la fuente (GetOnBrd):**
- `countries` a veces trae `"Remote"` — mezcla modalidad con geografía
- `expand` devuelve HTTP 500
- `lang` no es confiable: avisos en español marcados como `"en"`
- No hay campo de moneda; USD es inferido de los rangos
- Los tags vienen con IDs numéricos pero `/tags` devuelve IDs tipo slug — no resuelven

**Del extractor:**
- Negación no detectada: "no se requiere Java" cuenta como si lo pidiera
- Palabras pegadas por HTML sin separadores en origen
- `r` excluido del catálogo: un solo carácter no se desambigua de forma confiable
- Se excluyen del análisis los avisos sin tecnologías detectadas (~3%) — mayormente
  gestión, soporte y diseño, donde el stack no es el eje del rol

**De la muestra:**
- Un solo portal, mayormente chileno y orientado a producto tech
- No captura petroleras, consultoras grandes, empleo público ni bolsas universitarias
- Los puestos junior se publican menos: muchos se cubren por programas internos o referidos

---

## Flujo de trabajo esperado

1. **Especificar antes de generar.** Qué datos entran, qué se muestra, qué pasa en los
   casos borde.
2. **La lógica de análisis se escribe a mano.** Es la parte con criterio y la que hay que
   poder defender en una entrevista.
3. **UI, layout y estilos se pueden generar.** Ahí no hay aprendizaje que proteger.
4. **Verificar siempre.** Capturas de pantalla para revisar el resultado visual, y tests
   para las funciones de `analytics.ts`.