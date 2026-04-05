# CLAUDE.md — Enfócame Landing Page

## Proyecto

Landing page para **Enfócame**, estudio de fotografía especializado en bodas y quinceañeras.

- **Stack:** React 19 + Vite 6 + TypeScript + Tailwind CSS v4 + Framer Motion
- **Puerto local:** `http://localhost:3000` (`npm run dev`)
- **Archivo principal:** `src/App.tsx`

---

## Cómo usar componentes de 21st.dev

[21st.dev](https://21st.dev/components) es una librería de componentes React de copy-paste (similar a shadcn/ui). No es un paquete npm — los componentes se copian directamente al proyecto.

### Método 1 — Magic MCP (recomendado con Claude Code en VS Code)

21st.dev ofrece **Magic MCP**, un servidor MCP que permite generar componentes desde el editor:

1. Instalar Magic MCP siguiendo las instrucciones en `https://21st.dev/magic`
2. Una vez configurado, escribir `/ui` seguido de la descripción del componente
3. El agente genera múltiples variantes del componente en TypeScript/React listo para usar

### Método 2 — Copy-paste manual desde el catálogo

1. Navegar a `https://21st.dev/components`
2. Seleccionar la categoría deseada (Heroes, Pricing, Buttons, Testimonials, etc.)
3. Copiar el código del componente
4. Pegar en un archivo nuevo dentro de `src/components/`
5. Ajustar imports y clases Tailwind al sistema de diseño del proyecto

### Componentes útiles para este proyecto

| Sección | Categoría en 21st.dev |
|---|---|
| Hero animado | Heros |
| Galería / Portafolio | Features |
| Tabla de precios | Pricing Sections |
| Testimonios de clientes | Testimonials |
| Botón de reserva/CTA | Calls to Action / Buttons |
| Texto animado | Text Components |

### Integración con el proyecto

- Los componentes usan Tailwind CSS — compatible directamente con este proyecto
- Si un componente usa `shadcn/ui`, instalar las dependencias necesarias con `npm install`
- Si usa animaciones, `framer-motion` (`motion`) ya está instalado
- Ajustar los colores a las variables CSS del proyecto: `text-primary`, `bg-surface`, etc.

---

## Skills disponibles y cuándo usarlas

### UI / Componentes

| Skill | Cuándo usarla |
|---|---|
| `ui-ux-pro-max` | Rediseñar secciones completas, mejorar experiencia visual general |
| `page-layout-builder` | Construir o restructurar el layout de una sección (Hero, Footer, etc.) |
| `design-to-component-translator` | Convertir un diseño de Figma/imagen a componente React |
| `dark-mode-implementer` | Agregar soporte de tema oscuro/claro |
| `responsive-design-system` | Mejorar la responsividad en mobile/tablet/desktop |
| `animation-micro-interaction-pack` | Agregar animaciones con Framer Motion |
| `framer-motion-animator` | Animaciones específicas con `motion` |
| `modal-drawer-system` | Crear modales, drawers o lightboxes (ej. galería al hacer click) |
| `tailwind-gradient-builder` | Crear gradientes personalizados con Tailwind |
| `form-wizard-builder` | Construir formularios multi-paso (ej. formulario de reserva) |
| `table-builder` | Tablas comparativas de paquetes/precios |

### SEO / Marketing / Conversión

| Skill | Cuándo usarla |
|---|---|
| `seo-audit` | Auditar el SEO de la landing y recibir recomendaciones |
| `schema-markup` | Agregar JSON-LD para fotografía local (LocalBusiness, Service) |
| `ai-seo` | Optimizar textos y metadatos para búsquedas con IA |
| `page-cro` | Mejorar tasa de conversión (clicks en "Reservar", "Consultar") |
| `copywriting` | Reescribir textos de la landing para mayor impacto |
| `copy-editing` | Revisar y pulir textos existentes |
| `popup-cro` | Agregar un popup de captura (ej. descuento por reserva anticipada) |
| `pricing-strategy` | Revisar y optimizar la estrategia de precios de los paquetes |
| `social-content` | Generar contenido para Instagram/Facebook de Enfócame |
| `analytics-tracking` | Configurar Google Analytics / eventos de conversión |
| `lead-magnets` | Crear recursos descargables para capturar emails (ej. "Guía para tu boda") |

### Código / Calidad

| Skill | Cuándo usarla |
|---|---|
| `component-scaffold-generator` | Crear la estructura inicial de un nuevo componente |
| `react-hook-builder` | Crear hooks personalizados (ej. `useScrollAnimation`) |
| `accessibility-auditor` | Auditar y corregir accesibilidad (ARIA, contraste, teclado) |
| `core-web-vitals-tuner` | Optimizar LCP, CLS, FID para mejor rendimiento |
| `performance-budget-setter` | Establecer límites de tamaño de bundle |
| `i18n-frontend-implementer` | Agregar soporte multi-idioma (español/inglés) |
| `simplify` | Revisar código cambiado para mejorar calidad y reducir complejidad |

### Backend / Integraciones

| Skill | Cuándo usarla |
|---|---|
| `api-endpoint-generator` | Crear endpoints Express (ya instalado) para el formulario de contacto |
| `form-cro` | Optimizar el formulario de reserva/contacto |
| `webhook-receiver-hardener` | Recibir webhooks de pagos u otras integraciones |
| `env-secrets-manager` | Gestionar variables de entorno (.env) de forma segura |

---

## Convenciones del proyecto

- Los textos del UI están en **español**
- Paleta de colores: tonos dorados (`text-primary`) sobre fondos oscuros (`bg-surface`)
- Tipografía: `font-headline` para títulos, `font-body` para texto corriente
- Las imágenes usan `referrerPolicy="no-referrer"` y Unsplash como fuente
- Animaciones: Framer Motion (`motion`) para transiciones de entrada
- No agregar dependencias nuevas sin necesidad — el proyecto es intencionalmente ligero
