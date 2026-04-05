/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronDown, Check, Star, Mail, Phone, MessageCircle, Instagram, Facebook, Quote } from 'lucide-react';
import { motion, useAnimate, stagger, LayoutGroup, AnimatePresence } from 'motion/react';
import Floating, { FloatingElement } from '@/components/ui/parallax-floating';
import { TextRotate } from '@/components/ui/text-rotate';
import InteractiveSelector from '@/components/ui/interactive-selector';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { PhotoGallery } from '@/components/ui/gallery';
import {
  PricingTable, PricingTableHeader, PricingTableBody,
  PricingTableRow, PricingTableHead, PricingTableCell, PricingTablePlan,
  type FeatureItem,
} from '@/components/ui/pricing-table';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Camera, Sparkles, Video } from 'lucide-react';

/* ─────────────────────────────────────────
   Datos estáticos fuera del componente
───────────────────────────────────────── */
// Wedding hero: mix of ceremony, portrait, detail shots
const heroImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",  // couple kiss
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2067&auto=format&fit=crop",  // couple portrait
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",  // bride veil
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",  // ceremony
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop",  // bouquet detail
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",  // first dance
  "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=2069&auto=format&fit=crop",  // outdoor couple
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",  // reception
]

// Portfolio: bodas — ceremony, portrait, detail, emotion
const bodasImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2067&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
]

// Portfolio: quinceañeras — gown, portrait, celebration, details
const quinceImages = [
  "https://images.unsplash.com/photo-1543615598-64b54e7d1746?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=2080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516934824311-1ce3a40c47ea?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?q=80&w=2070&auto=format&fit=crop",
]

const testimonios = [
  {
    nombre: "María & Carlos",
    evento: "Boda · Marzo 2025",
    texto: "Enfócame capturó cada emoción de nuestro día de una manera que no imaginábamos posible. Cada foto cuenta una historia y nos transporta de vuelta a ese momento. El trabajo fue impecable desde la primera reunión hasta la entrega del álbum.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    estrellas: 5,
  },
  {
    nombre: "Valentina Rodríguez",
    evento: "Quinceañera · Enero 2025",
    texto: "Mi quinceañera quedó inmortalizada de una manera que no esperaba. Las fotos son arte puro. Cada detalle, cada sonrisa, cada lágrima capturada con una sensibilidad increíble. Lo recomiendo sin dudarlo.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    estrellas: 5,
  },
  {
    nombre: "Ana & David",
    evento: "Boda · Noviembre 2024",
    texto: "Profesionales de principio a fin. Entregaron el álbum antes del tiempo acordado y la calidad superó todas nuestras expectativas. El video highlight nos hace llorar de emoción cada vez que lo vemos.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    estrellas: 5,
  },
]

const PAQUETES_FEATURES: FeatureItem[] = [
  { label: 'Horas de cobertura',    values: ['3 horas',   '6 horas',   'Ilimitada']  },
  { label: 'Fotos editadas',        values: ['150 fotos', '300 fotos', '500+ fotos'] },
  { label: 'Galería digital',       values: [true,        true,        true]         },
  { label: 'Video highlight',       values: [false,       '3 minutos', 'Completo']   },
  { label: 'Drone 4K',              values: [false,       false,       true]         },
  { label: 'Sesión pre-boda',       values: [true,        false,       false]        },
  { label: 'Álbum impreso de lujo', values: [false,       false,       true]         },
  { label: 'Entrega en 15 días',    values: [true,        true,        true]         },
  { label: 'Fotógrafos',            values: ['1',         '1-2',       '2']          },
]

/* ─────────────────────────────────────────
   Hero Section
───────────────────────────────────────── */
function HeroSection() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate('img', { opacity: [0, 1] }, { duration: 0.6, delay: stagger(0.12) })
  }, [])

  return (
    <header ref={scope} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-surface-container-lowest">
        <div className="absolute inset-0 cinematic-gradient z-10" />
      </div>

      <Floating sensitivity={-1} className="overflow-hidden z-0">
        <FloatingElement depth={0.5} className="top-[6%] left-[8%]">
          <motion.img initial={{ opacity: 0 }} src={heroImages[0]}
            className="w-20 h-20 md:w-28 md:h-28 object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[8%] left-[30%]">
          <motion.img initial={{ opacity: 0 }} src={heroImages[1]}
            className="w-24 h-32 md:w-32 md:h-44 object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[2%] left-[55%]">
          <motion.img initial={{ opacity: 0 }} src={heroImages[2]}
            className="w-28 h-40 md:w-40 md:h-56 object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[5%] left-[80%]">
          <motion.img initial={{ opacity: 0 }} src={heroImages[3]}
            className="w-20 h-20 md:w-28 md:h-28 object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
        </FloatingElement>
        <FloatingElement depth={1.5} className="top-[42%] left-[1%]">
          <motion.img initial={{ opacity: 0 }} src={heroImages[4]}
            className="w-24 h-32 md:w-32 md:h-44 object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[45%] left-[82%]">
          <motion.img initial={{ opacity: 0 }} src={heroImages[5]}
            className="w-24 h-24 md:w-32 md:h-32 object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
        </FloatingElement>
        <FloatingElement depth={3} className="top-[70%] left-[12%]">
          <motion.img initial={{ opacity: 0 }} src={heroImages[6]}
            className="w-32 h-24 md:w-44 md:h-32 object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[75%] left-[60%]">
          <motion.img initial={{ opacity: 0 }} src={heroImages[7]}
            className="w-20 h-20 md:w-28 md:h-28 object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
        </FloatingElement>
      </Floating>

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mt-20"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.2 }}
      >
        <h1 className="font-headline tracking-[0.1em] text-on-surface uppercase flex flex-col items-center gap-2">
          <span className="text-4xl md:text-7xl lg:text-8xl">Inmortalizamos</span>
          <LayoutGroup>
            <motion.span layout className="flex items-center justify-center overflow-hidden">
              <TextRotate
                texts={["Bodas ♥", "Quinceañeras", "Momentos", "Emociones", "Historias"]}
                mainClassName="text-4xl md:text-7xl lg:text-8xl text-primary overflow-hidden py-1"
                staggerDuration={0.03}
                staggerFrom="first"
                rotationInterval={2800}
                transition={{ type: "spring", damping: 28, stiffness: 350 }}
              />
            </motion.span>
          </LayoutGroup>
        </h1>
        <p className="mt-6 text-base md:text-xl lg:text-2xl font-body font-light tracking-[0.3em] text-on-surface-variant uppercase">
          Pequeñas historias, grandes recuerdos
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <a
            href="#portafolio"
            className="border border-primary px-6 py-3 font-headline uppercase tracking-[0.2em] text-xs text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 gold-glow"
          >
            Ver Portafolio
          </a>
          <a
            href="#paquetes"
            className="bg-primary px-6 py-3 font-headline uppercase tracking-[0.2em] text-xs text-on-primary hover:bg-primary-container transition-all duration-300"
          >
            Ver Paquetes
          </a>
        </div>
        <div className="mt-12 flex justify-center">
          <ChevronDown className="text-primary w-8 h-8 animate-bounce" />
        </div>
      </motion.div>
    </header>
  )
}

/* ─────────────────────────────────────────
   App principal
───────────────────────────────────────── */
export default function App() {
  const [activeTab, setActiveTab] = useState('bodas')
  const [showTable, setShowTable] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const currentImages = activeTab === 'bodas' ? bodasImages : quinceImages

  const openLightbox = (src: string) => setLightboxSrc(src.replace(/w=\d+/, 'w=1920'))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxSrc(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="antialiased selection:bg-primary selection:text-on-primary">

      {/* ── Navegación ── */}
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/70 backdrop-blur-md flex justify-between items-center px-6 md:px-12 py-5">
        <div className="text-xl md:text-2xl font-headline tracking-[0.3em] text-primary">ENFÓCAME</div>
        <div className="hidden md:flex gap-8">
          {[
            ['INICIO',      '#'],
            ['FILOSOFÍA',   '#filosofia'],
            ['PORTAFOLIO',  '#portafolio'],
            ['PAQUETES',    '#paquetes'],
            ['CONTACTO',    '#contacto'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-headline uppercase tracking-[0.2em] text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="#contacto"
          className="border border-primary px-4 md:px-6 py-2 font-headline uppercase tracking-[0.2em] text-xs text-primary hover:bg-primary hover:text-on-primary transition-all duration-500 gold-glow"
        >
          RESERVAR
        </a>
      </nav>

      {/* ── 1. Hero ── */}
      <HeroSection />

      {/* ── 2. Quote ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-surface-container-lowest text-center">
        <blockquote className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-4xl lg:text-5xl font-headline italic text-on-surface leading-relaxed">
            "Nuestro trabajo consiste en plasmar emociones"
          </p>
          <footer className="mt-6 text-xs tracking-widest uppercase text-primary font-headline">
            — Enfócame Studio
          </footer>
        </blockquote>
      </section>

      {/* ── 3. Filosofía ── */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center bg-surface" id="filosofia">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            alt="Fotografía de boda"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1974&auto=format&fit=crop"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-10 md:space-y-12">
          <h2 className="text-3xl md:text-4xl font-headline tracking-widest uppercase border-b border-outline-variant pb-6 inline-block text-on-surface">
            Nuestra Filosofía
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-primary font-headline tracking-widest uppercase mb-2">Calidad</h3>
              <p className="text-on-surface-variant font-body font-light leading-loose">
                Priorizamos la excelencia técnica y artística en cada fotograma, asegurando que cada detalle sea capturado con la mayor fidelidad posible.
              </p>
            </div>
            <div>
              <h3 className="text-primary font-headline tracking-widest uppercase mb-2">Recuerdos Tangibles</h3>
              <p className="text-on-surface-variant font-body font-light leading-loose">
                No solo entregamos archivos digitales; creamos artefactos de memoria que perdurarán por generaciones en su forma más pura.
              </p>
            </div>
            <div>
              <h3 className="text-primary font-headline tracking-widest uppercase mb-2">Nuestra Promesa</h3>
              <p className="text-on-surface-variant font-body font-light leading-loose">
                Estar presentes sin interferir, capturando la esencia genuina de cada risa, cada lágrima y cada promesa de amor eterno.
              </p>
            </div>
          </div>
          <a href="#portafolio" className="inline-block border border-primary px-6 py-3 font-headline uppercase tracking-[0.2em] text-xs text-primary hover:bg-primary hover:text-on-primary transition-all duration-300">
            Ver Nuestro Trabajo
          </a>
        </div>
      </section>

      {/* ── 4. Nuestros Servicios ── */}
      <section className="py-16 md:py-20 bg-surface-container-low overflow-hidden" id="servicios">
        <div className="text-center mb-10 px-6">
          <p className="text-xs font-headline tracking-[0.3em] uppercase text-primary mb-3">Lo que hacemos</p>
          <h2 className="text-2xl md:text-3xl font-headline tracking-widest uppercase text-on-surface">
            Nuestros Servicios
          </h2>
        </div>
        <InteractiveSelector />
      </section>

      {/* ── Separador visual (slider automático) ── */}
      <div className="py-8 bg-surface-container-lowest overflow-hidden">
        <ImageAutoSlider speed={30} />
      </div>

      {/* ── 5. Portafolio ── */}
      <section className="py-20 md:py-24 bg-surface-container-low" id="portafolio">
        <div className="px-6 md:px-12 mb-10 text-center">
          <p className="text-xs font-headline tracking-[0.3em] uppercase text-primary mb-3">Nuestro trabajo</p>
          <h2 className="text-2xl md:text-3xl font-headline tracking-widest uppercase text-on-surface mb-8">
            Portafolio
          </h2>
          <div className="flex justify-center gap-8">
            {(['bodas', 'quince'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-headline tracking-[0.2em] uppercase pb-2 text-sm transition-colors ${
                  activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab === 'bodas' ? 'Fotografía de Bodas' : 'Quinceañeras'}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll horizontal — preview rápida */}
        <ScrollArea className="w-full mb-10 px-6">
          <div className="flex gap-3 pb-3 w-max">
            {currentImages.map((url, i) => {
              const thumb = url.replace('w=2070', 'w=300').replace('w=2069', 'w=300').replace('w=2080', 'w=300').replace('w=2072', 'w=300').replace('w=2067', 'w=300')
              return (
                <button
                  key={i}
                  className="shrink-0 overflow-hidden group cursor-zoom-in"
                  onClick={() => openLightbox(url)}
                  aria-label={`Ver foto ${i + 1}`}
                >
                  <img
                    src={thumb}
                    alt={`Foto ${i + 1}`}
                    className="aspect-[3/4] w-[130px] md:w-[160px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </button>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Grid masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-4">
          {[
            [currentImages[0], 'h-[400px]'], [currentImages[1], 'h-[300px]'],
            [currentImages[2], 'h-[300px]'], [currentImages[3], 'h-[400px]'],
            [currentImages[4], 'h-[400px]'], [currentImages[5], 'h-[300px]'],
            [currentImages[6], 'h-[300px]'], [currentImages[7], 'h-[400px]'],
          ].reduce<[string, string][][]>((cols, item, i) => {
            const col = i % 4
            if (!cols[col]) cols[col] = []
            cols[col].push(item as [string, string])
            return cols
          }, []).map((col, ci) => (
            <div key={ci} className="space-y-3">
              {col.map(([src, h], ii) => (
                <button
                  key={ii}
                  className={`block w-full overflow-hidden group cursor-zoom-in ${h}`}
                  onClick={() => openLightbox(src)}
                  aria-label={`Ver foto ${ci * 2 + ii + 1}`}
                >
                  <img
                    alt={`Portafolio ${ci}-${ii}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    src={src}
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Nuestras Historias (PhotoGallery interactiva) ── */}
      <section className="py-10 bg-surface-container-lowest overflow-hidden">
        <PhotoGallery animationDelay={0.2} />
      </section>

      {/* ── 7. Paquetes ── */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-surface" id="paquetes">
        <div className="text-center mb-16">
          <p className="text-xs font-headline tracking-[0.3em] uppercase text-primary mb-3">Inversión</p>
          <h2 className="text-3xl md:text-4xl font-headline tracking-widest uppercase text-on-surface">
            Nuestros Paquetes
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto items-center">

          {/* Pack Especial */}
          <div className="bg-surface-container p-8 md:p-10 border-t-2 border-outline-variant hover:border-primary transition-all duration-500">
            <p className="font-headline tracking-widest text-on-surface-variant text-xs mb-4">FOCALIZADO</p>
            <h3 className="text-2xl md:text-3xl font-headline mb-2 text-on-surface">Pack Especial</h3>
            <p className="text-primary text-3xl md:text-4xl font-headline mb-6">$700</p>
            <ul className="space-y-3 text-sm font-body text-on-surface-variant border-t border-outline-variant/20 pt-6 mb-10">
              <li className="flex items-center gap-3"><Check className="text-primary w-4 h-4 shrink-0" /> Sesión Pre-Boda</li>
              <li className="flex items-center gap-3"><Check className="text-primary w-4 h-4 shrink-0" /> 3 Horas de Evento</li>
              <li className="flex items-center gap-3"><Check className="text-primary w-4 h-4 shrink-0" /> 150 Fotos Editadas</li>
              <li className="flex items-center gap-3"><Check className="text-primary w-4 h-4 shrink-0" /> Galería Digital Privada</li>
              <li className="flex items-center gap-3"><Check className="text-primary w-4 h-4 shrink-0" /> Entrega en 15 días</li>
            </ul>
            <a href="#contacto" className="block w-full text-center border border-primary py-4 text-xs tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all text-primary">
              Consultar Disponibilidad
            </a>
          </div>

          {/* Pack Bronce */}
          <div className="bg-surface-container p-8 md:p-10 border-t-2 border-outline-variant hover:border-primary transition-all duration-500">
            <p className="font-headline tracking-widest text-on-surface-variant text-xs mb-4">ESENCIAL</p>
            <h3 className="text-2xl md:text-3xl font-headline mb-2 text-on-surface">Pack Bronce</h3>
            <p className="text-primary text-3xl md:text-4xl font-headline mb-6">$1200</p>
            <ul className="space-y-3 text-sm font-body text-on-surface-variant border-t border-outline-variant/20 pt-6 mb-10">
              <li className="flex items-center gap-3"><Check className="text-primary w-4 h-4 shrink-0" /> 6 Horas de Cobertura</li>
              <li className="flex items-center gap-3"><Check className="text-primary w-4 h-4 shrink-0" /> Galería Digital Privada</li>
              <li className="flex items-center gap-3"><Check className="text-primary w-4 h-4 shrink-0" /> 300 Fotos Editadas</li>
              <li className="flex items-center gap-3"><Check className="text-primary w-4 h-4 shrink-0" /> Highlight Video (3 min)</li>
              <li className="flex items-center gap-3"><Check className="text-primary w-4 h-4 shrink-0" /> 1–2 Fotógrafos</li>
            </ul>
            <a href="#contacto" className="block w-full text-center border border-primary py-4 text-xs tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all text-primary">
              Consultar Disponibilidad
            </a>
          </div>

          {/* Pack Platinum */}
          <div className="bg-surface-container-high p-8 md:p-10 border-2 border-primary lg:scale-105 shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-6 py-1 text-[10px] tracking-widest font-bold whitespace-nowrap">
              RECOMENDADO
            </div>
            <p className="font-headline tracking-widest text-primary text-xs mb-4">EXPERIENCIA COMPLETA</p>
            <h3 className="text-2xl md:text-3xl font-headline mb-2 text-on-surface">Pack Platinum</h3>
            <p className="text-primary text-3xl md:text-4xl font-headline mb-6">$1500</p>
            <ul className="space-y-3 text-sm font-body text-on-surface border-t border-primary/20 pt-6 mb-10">
              <li className="flex items-center gap-3"><Star className="text-primary w-4 h-4 fill-primary shrink-0" /> Cobertura Ilimitada</li>
              <li className="flex items-center gap-3"><Star className="text-primary w-4 h-4 fill-primary shrink-0" /> Tomas con Drone 4K</li>
              <li className="flex items-center gap-3"><Star className="text-primary w-4 h-4 fill-primary shrink-0" /> Video de Boda Completo</li>
              <li className="flex items-center gap-3"><Star className="text-primary w-4 h-4 fill-primary shrink-0" /> 500+ Fotos Editadas</li>
              <li className="flex items-center gap-3"><Star className="text-primary w-4 h-4 fill-primary shrink-0" /> Álbum Impreso de Lujo</li>
              <li className="flex items-center gap-3"><Star className="text-primary w-4 h-4 fill-primary shrink-0" /> 2 Fotógrafos</li>
            </ul>
            <a href="#contacto" className="block w-full text-center bg-primary text-on-primary py-4 text-xs tracking-widest uppercase hover:bg-primary-container transition-all font-bold">
              Reservar Ahora
            </a>
          </div>
        </div>

        {/* Comparativo detallado (toggle) */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowTable(!showTable)}
            className="font-headline uppercase tracking-widest text-xs text-on-surface-variant hover:text-primary transition-colors border-b border-outline-variant/40 pb-1"
          >
            {showTable ? 'Ocultar comparativo' : 'Ver comparativo detallado →'}
          </button>
        </div>

        {showTable && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 overflow-x-auto"
          >
            <PricingTable className="mx-auto max-w-4xl">
              <PricingTableHeader>
                <PricingTableRow>
                  <th />
                  <th className="p-1">
                    <PricingTablePlan name="Especial" badge="Pre-Boda" price="$700" icon={Sparkles}>
                      <Button variant="outline" className="w-full text-[10px]">Consultar</Button>
                    </PricingTablePlan>
                  </th>
                  <th className="p-1">
                    <PricingTablePlan name="Bronce" badge="Esencial" price="$1200" icon={Camera}>
                      <Button className="w-full text-[10px]">Reservar</Button>
                    </PricingTablePlan>
                  </th>
                  <th className="p-1">
                    <PricingTablePlan name="Platinum" badge="Completo" price="$1500" icon={Video}>
                      <Button variant="outline" className="w-full text-[10px]">Consultar</Button>
                    </PricingTablePlan>
                  </th>
                </PricingTableRow>
              </PricingTableHeader>
              <PricingTableBody>
                {PAQUETES_FEATURES.map((feature, index) => (
                  <PricingTableRow key={index}>
                    <PricingTableHead>{feature.label}</PricingTableHead>
                    {feature.values.map((value, i) => (
                      <PricingTableCell key={i}>{value as boolean | string}</PricingTableCell>
                    ))}
                  </PricingTableRow>
                ))}
              </PricingTableBody>
            </PricingTable>
          </motion.div>
        )}
      </section>

      {/* ── 8. Servicios Adicionales ── */}
      <section className="py-20 md:py-24 bg-surface-container-lowest px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="text-xs font-headline tracking-[0.3em] uppercase text-primary mb-3">Extras</p>
          <h2 className="text-2xl md:text-3xl font-headline tracking-widest uppercase text-on-surface">
            Servicios Adicionales
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { titulo: 'Cuadro en Bastidor', precio: '$80', desc: 'Tu foto favorita en bastidor de madera, lista para colgar.', src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop' },
            { titulo: 'Cuadros de Sublimación', precio: '$20', desc: 'Impresión de alta calidad sobre material sublimable.', src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1974&auto=format&fit=crop' },
            { titulo: 'Tomas con Drone', precio: '$250', desc: 'Tomas aéreas 4K de tu evento para un video épico.', src: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2000&auto=format&fit=crop' },
          ].map(({ titulo, precio, desc, src }) => (
            <div key={titulo} className="group relative overflow-hidden bg-surface-container border border-outline-variant/30 hover:border-primary/50 transition-colors">
              <div className="aspect-video overflow-hidden">
                <img
                  alt={titulo}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  src={src}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <h4 className="font-headline text-sm uppercase tracking-widest mb-1 text-on-surface">{titulo}</h4>
                <p className="text-primary font-headline text-xl mb-2">{precio}</p>
                <p className="text-on-surface-variant font-body text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Testimonios ── */}
      <section className="py-20 md:py-24 bg-surface px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="text-xs font-headline tracking-[0.3em] uppercase text-primary mb-3">Lo que dicen</p>
          <h2 className="text-2xl md:text-3xl font-headline tracking-widest uppercase text-on-surface">
            Nuestros Clientes
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonios.map(({ nombre, evento, texto, avatar, estrellas }) => (
            <div key={nombre} className="bg-surface-container p-8 border-t-2 border-outline-variant/30 flex flex-col gap-5">
              <Quote className="text-primary w-6 h-6 opacity-60" />
              <p className="text-on-surface-variant font-body font-light leading-loose text-sm flex-1">
                "{texto}"
              </p>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: estrellas }).map((_, i) => (
                  <Star key={i} className="text-primary w-4 h-4 fill-primary" />
                ))}
              </div>
              <div className="flex items-center gap-4 border-t border-outline-variant/20 pt-4">
                <img
                  src={avatar}
                  alt={nombre}
                  className="w-10 h-10 rounded-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-headline text-xs uppercase tracking-widest text-on-surface">{nombre}</p>
                  <p className="text-on-surface-variant/60 text-[10px] tracking-widest font-body">{evento}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. Contacto ── */}
      <section className="py-20 md:py-28 bg-surface-container-lowest px-6 md:px-12" id="contacto">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-headline tracking-[0.3em] uppercase text-primary mb-3">Hablemos</p>
          <h2 className="text-3xl md:text-5xl font-headline tracking-widest uppercase text-on-surface mb-6">
            Reserva Tu Fecha
          </h2>
          <p className="text-on-surface-variant font-body font-light leading-loose max-w-xl mx-auto mb-12">
            Las fechas se agotan rápido. Contáctanos hoy y asegura el fotógrafo perfecto para tu evento especial.
          </p>

          {/* CTA principal — WhatsApp */}
          <a
            href="https://wa.me/TUNUMERO?text=Hola!%20Me%20interesa%20cotizar%20mi%20evento%20con%20Enf%C3%B3came."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 font-headline uppercase tracking-[0.2em] text-sm hover:bg-primary-container transition-all duration-300 mb-12"
          >
            <MessageCircle className="w-5 h-5" />
            Escribir por WhatsApp
          </a>

          {/* Datos de contacto */}
          <div className="grid sm:grid-cols-3 gap-8 border-t border-outline-variant/20 pt-12">
            <div className="flex flex-col items-center gap-3">
              <Mail className="text-primary w-6 h-6" />
              <p className="font-headline text-xs uppercase tracking-widest text-on-surface">Email</p>
              <a href="mailto:contacto@enfocame.com" className="text-on-surface-variant font-body text-sm hover:text-primary transition-colors">
                contacto@enfocame.com
              </a>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Phone className="text-primary w-6 h-6" />
              <p className="font-headline text-xs uppercase tracking-widest text-on-surface">Teléfono</p>
              <a href="tel:+TUNUMERO" className="text-on-surface-variant font-body text-sm hover:text-primary transition-colors">
                +XX XXXX XXXX
              </a>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Instagram className="text-primary w-6 h-6" />
              <p className="font-headline text-xs uppercase tracking-widest text-on-surface">Redes</p>
              <div className="flex gap-4">
                <a href="https://instagram.com/enfocame" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant font-body text-sm hover:text-primary transition-colors">Instagram</a>
                <a href="https://facebook.com/enfocame" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant font-body text-sm hover:text-primary transition-colors">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxSrc(null)}
            onKeyDown={(e) => e.key === 'Escape' && setLightboxSrc(null)}
            tabIndex={-1}
          >
            <motion.img
              src={lightboxSrc}
              alt="Foto en tamaño completo"
              className="max-h-[92vh] max-w-[92vw] object-contain shadow-2xl"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition-colors"
              onClick={() => setLightboxSrc(null)}
              aria-label="Cerrar"
            >
              ✕
            </button>
            <p className="absolute bottom-5 text-white/30 text-xs tracking-widest font-headline uppercase">
              Click fuera para cerrar · ESC
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-10 gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-xl font-headline tracking-[0.2em] text-primary">ENFÓCAME</div>
          <p className="font-body font-light tracking-widest text-[10px] uppercase text-on-surface-variant/50">
            © 2026 Enfócame. Todos los derechos reservados.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          {[['Inicio','#'], ['Filosofía','#filosofia'], ['Portafolio','#portafolio'], ['Paquetes','#paquetes'], ['Contacto','#contacto']].map(([l, h]) => (
            <a key={l} href={h} className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors">{l}</a>
          ))}
        </nav>
        <div className="flex gap-3">
          <a href="https://instagram.com/enfocame" target="_blank" rel="noopener noreferrer" className="bg-surface-container-high p-2.5 rounded-full hover:bg-primary/20 transition-colors group">
            <Instagram className="text-primary w-4 h-4" />
          </a>
          <a href="https://facebook.com/enfocame" target="_blank" rel="noopener noreferrer" className="bg-surface-container-high p-2.5 rounded-full hover:bg-primary/20 transition-colors group">
            <Facebook className="text-primary w-4 h-4" />
          </a>
          <a href="mailto:contacto@enfocame.com" className="bg-surface-container-high p-2.5 rounded-full hover:bg-primary/20 transition-colors group">
            <Mail className="text-primary w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  )
}
