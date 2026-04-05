# 21st.dev Magic Prompts — Enfócame

Colección de prompts para usar con el MCP de 21st.dev (`/ui`).
Cada entrada funciona como una "skill": copia el prompt y úsalo directamente.

---

## Cómo usar este archivo

1. Elige el prompt de la sección que necesitas
2. Escribe `/ui` en Claude Code seguido del prompt
3. Selecciona la variante que más te guste
4. Pega el componente en `src/components/`
5. Ajusta colores a `text-primary`, `bg-surface`, etc.

---

## Prompts

---

### 1. Parallax Floating Hero

**Componente:** `components/ui/parallax-floating.tsx`
**Usado en:** Sección Hero (`HeroSection` en `src/App.tsx`)
**Archivos creados:**
- `lib/utils.ts` — utilidad `cn()`
- `hooks/use-mouse-position-ref.ts` — hook de posición del mouse
- `components/ui/parallax-floating.tsx` — componente `<Floating>` + `<FloatingElement>`

**Descripción:** Imágenes flotantes que reaccionan al movimiento del mouse con parallax suave. Cada imagen tiene una profundidad (`depth`) distinta para crear capas de movimiento. Al hover pasan de blanco y negro a color.

**Props clave:**
| Prop | Default | Descripción |
|---|---|---|
| `sensitivity` | `1` | Intensidad del movimiento. Negativo invierte la dirección |
| `easingFactor` | `0.05` | Suavidad de la animación (0.01 = muy suave, 0.2 = rápido) |
| `depth` (FloatingElement) | `1` | Profundidad de capa — más alto = más movimiento |

**Cómo volver a usar:**
```tsx
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'

<Floating sensitivity={-1}>
  <FloatingElement depth={1} className="top-[10%] left-[20%]">
    <img src="..." className="w-28 h-36 object-cover" />
  </FloatingElement>
</Floating>
```

---

### 2. Text Rotate

**Componente:** `components/ui/text-rotate.tsx`
**Usado en:** Sección Hero — título principal `HeroSection` en `src/App.tsx`
**Dependencias:** `motion/react` (ya instalado), `lib/utils.ts`

**Descripción:** Texto animado que rota entre múltiples palabras con spring animation por carácter. Ideal para títulos donde se quiere destacar diferentes conceptos. Usado junto con `LayoutGroup` de `motion/react` para animar el layout al cambiar la longitud del texto.

**Props clave:**
| Prop | Default | Descripción |
|---|---|---|
| `texts` | — | Array de strings a rotar |
| `rotationInterval` | `2000` | Tiempo entre rotaciones (ms) |
| `staggerDuration` | `0` | Delay entre caracteres (ej. `0.03`) |
| `staggerFrom` | `"first"` | Dirección del stagger: `"first"`, `"last"`, `"center"`, `"random"` |
| `splitBy` | `"characters"` | Cómo dividir: `"characters"`, `"words"`, `"lines"` |
| `loop` | `true` | Si reinicia al llegar al final |

**Cómo volver a usar:**
---

### 10. Scroll Area — Fotos horizontal

**Componentes:** `components/ui/scroll-area.tsx`, `components/ui/separator.tsx`
**Dependencias instaladas:** `@radix-ui/react-scroll-area`, `@radix-ui/react-separator`
**Adaptaciones:** `next/image` → `<img>` estándar
**Usado en:** Portafolio — strip horizontal scrolleable

**Descripción:** Área de scroll con scrollbar personalizada via Radix UI. El demo horizontal muestra fotos en fila con scroll lateral y scrollbar visible. Puede ser vertical u horizontal.

**Props ScrollArea:**
| Prop | Descripción |
|---|---|
| `className` | Clases adicionales (ej. altura, ancho) |
| `children` | Contenido scrolleable |

**Props ScrollBar:**
| Prop | Default | Descripción |
|---|---|---|
| `orientation` | `"vertical"` | `"vertical"` o `"horizontal"` |

**Cómo volver a usar:**
```tsx
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

// Horizontal
<ScrollArea className="w-full">
  <div className="flex gap-4 pb-4 w-max">
    {fotos.map(foto => <img key={foto} src={foto} className="w-48 h-64 object-cover" />)}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>

// Vertical
<ScrollArea className="h-72 w-48">
  <div className="p-4">{/* contenido largo */}</div>
</ScrollArea>
```

---

### 2. Text Rotate

```tsx
import { LayoutGroup, motion } from 'motion/react'
import { TextRotate } from '@/components/ui/text-rotate'

<LayoutGroup>
  <motion.span layout className="flex overflow-hidden">
    <TextRotate
      texts={["Bodas ♥", "Quinceañeras", "Momentos", "Emociones"]}
      mainClassName="text-primary overflow-hidden py-1"
      staggerDuration={0.03}
      staggerFrom="first"
      rotationInterval={2800}
      transition={{ type: "spring", damping: 28, stiffness: 350 }}
    />
  </motion.span>
</LayoutGroup>
```

---

### 3. 3D Poem Animation

**Componente:** `components/ui/3d-animation.tsx`
**Usado en:** Sección decorativa antes de Quote (`src/App.tsx`)
**CSS:** Agregado en `src/index.css` (keyframes + clases `.poem-*`)

**Descripción:** Cubo 3D CSS que rota continuamente con texto de poema desplazándose en las caras laterales. Imagen de fondo con zoom lento. Sin dependencias externas — animación pura CSS.

**Props:**
| Prop | Descripción |
|---|---|
| `backgroundImageUrl` | Imagen de fondo (Unsplash) |
| `poemHTML` | HTML con el texto del poema. Usar `<span>` para destacar palabras |
| `overlayImageUrl` | Imagen superpuesta opcional (ej. silueta) |

**Cómo volver a usar:**
```tsx
import { PoemAnimation } from '@/components/ui/3d-animation'

<PoemAnimation
  backgroundImageUrl="https://images.unsplash.com/..."
  poemHTML={`<p>Texto del <span>poema</span> aquí...</p>`}
/>
```

---

### 4. Image Trail

**Componente:** `components/ui/image-trail.tsx`
**Dependencia:** `hooks/use-mouse-vector.ts`, `motion/react` (ya instalado)
**Usado en:** Sección galería interactiva (`src/App.tsx`)

**Descripción:** Las imágenes siguen el cursor del mouse dejando un rastro animado. Cada imagen aparece rotada aleatoriamente y desaparece con animación.

**Props clave:**
| Prop | Default | Descripción |
|---|---|---|
| `rotationRange` | `15` | Grados máximos de rotación aleatoria |
| `interval` | `100` | Ms entre apariciones de imágenes |
| `newOnTop` | `true` | Si las nuevas imágenes aparecen encima |

**Cómo volver a usar:**
```tsx
import { ImageTrail } from '@/components/ui/image-trail'

<div className="relative w-full h-96 overflow-hidden">
  <ImageTrail rotationRange={12} interval={80}>
    <div className="w-20 h-20"><img src="..." /></div>
    <div className="w-20 h-20"><img src="..." /></div>
  </ImageTrail>
</div>
```

---

### 5. Flip Gallery

**Componente:** `components/ui/flip-gallery.tsx`
**Dependencia:** `lucide-react` (ya instalado)
**Usado en:** Sección galería (`src/App.tsx`)

**Descripción:** Galería con efecto flip de tarjeta fotográfica. Las mitades superior e inferior se voltean independientemente al cambiar de imagen. Muestra el título de la foto con animación.

**Cómo volver a usar:**
```tsx
import FlipGallery from '@/components/ui/flip-gallery'

// Editar el array `images` dentro del componente con las fotos deseadas
<FlipGallery />
```

---

### 6. Interactive Selector

**Componente:** `components/ui/interactive-selector.tsx`
**Dependencia:** `lucide-react` (ya instalado). **Nota:** El original usa `react-icons` — reemplazado con `lucide-react`.
**Usado en:** Sección "Nuestros Servicios" (`src/App.tsx`)

**Descripción:** Selector expansible horizontal. Al hacer click en una opción se expande mostrando imagen, título y descripción con animación slide. Perfecto para mostrar categorías de servicios.

**Cómo volver a usar:**
```tsx
import InteractiveSelector from '@/components/ui/interactive-selector'

// Editar el array `options` dentro del componente con los servicios deseados
<InteractiveSelector />
```

---

### 7. Image Auto Slider

**Componente:** `components/ui/image-auto-slider.tsx`
**Dependencia:** Ninguna. CSS animation pura.
**Usado en:** Banda de imágenes entre Quote y Portafolio (`src/App.tsx`)

**Descripción:** Banda de imágenes que se desplaza infinitamente de derecha a izquierda. Bordes con fade via mask CSS. Al hover cada imagen hace scale.

**Props:**
| Prop | Default | Descripción |
|---|---|---|
| `speed` | `28` | Segundos para un ciclo completo (menos = más rápido) |

**Cómo volver a usar:**
```tsx
import { ImageAutoSlider } from '@/components/ui/image-auto-slider'

<ImageAutoSlider speed={26} />
// Editar el array `images` dentro del componente
```

---

### 8. Photo Gallery — "Welcome to My Stories"

**Componente:** `components/ui/gallery.tsx`
**Dependencias:** `components/ui/button.tsx`, `motion/react` (ya instalado)
**Adaptaciones:** `next/image` → `<img>` estándar; `framer-motion` → `motion/react`
**Usado en:** Sección "Nuestras Historias" en `src/App.tsx`

**Descripción:** 5 fotos en abanico que se despliegan con spring animation. Cada foto es draggable, hace scale al hover y rota levemente. Las fotos de la izquierda se inclinan en dirección opuesta a las de la derecha.

**Props:**
| Prop | Default | Descripción |
|---|---|---|
| `animationDelay` | `0.5` | Segundos antes de iniciar la animación de apertura |

**Cómo volver a usar:**
```tsx
import { PhotoGallery } from '@/components/ui/gallery'

<PhotoGallery animationDelay={0.3} />
// Editar el array `photos` dentro del componente con las imágenes deseadas
```

---

### 9. Pricing Table — Comparativo de paquetes

**Componente:** `components/ui/pricing-table.tsx`
**Dependencias:** `components/ui/badge.tsx`, `components/ui/button.tsx`, `lucide-react`
**Adaptaciones:** Sin `@radix-ui/react-slot` ni `class-variance-authority` — Button y Badge creados nativos
**Usado en:** Sección "Comparativo de Paquetes" en `src/App.tsx`

**Descripción:** Tabla HTML con cabeceras de plan (card con precio, ícono y badge) y filas de features. Las celdas renderizan `true` → ✓ dorado, `false` → — gris, `string` → texto.

**Componentes exportados:**
- `PricingTable` — wrapper de `<table>`
- `PricingTableHeader/Body/Row/Head/Cell` — partes de la tabla
- `PricingTablePlan` — card de plan (va en `<th>`)

**Cómo volver a usar:**
```tsx
import {
  PricingTable, PricingTableHeader, PricingTableBody,
  PricingTableRow, PricingTableHead, PricingTableCell, PricingTablePlan,
  type FeatureItem,
} from '@/components/ui/pricing-table'
import { Camera } from 'lucide-react'

const FEATURES: FeatureItem[] = [
  { label: 'Horas de cobertura', values: ['3h', '6h', 'Ilimitada'] },
  { label: 'Galería digital',    values: [true, true, true] },
  { label: 'Drone 4K',          values: [false, false, true] },
]

<PricingTable>
  <PricingTableHeader>
    <PricingTableRow>
      <th />
      <th><PricingTablePlan name="Básico" badge="Starter" price="$700" icon={Camera}>
        <Button variant="outline" className="w-full">Consultar</Button>
      </PricingTablePlan></th>
    </PricingTableRow>
  </PricingTableHeader>
  <PricingTableBody>
    {FEATURES.map((f, i) => (
      <PricingTableRow key={i}>
        <PricingTableHead>{f.label}</PricingTableHead>
        {f.values.map((v, j) => <PricingTableCell key={j}>{v as boolean | string}</PricingTableCell>)}
      </PricingTableRow>
    ))}
  </PricingTableBody>
</PricingTable>
```

