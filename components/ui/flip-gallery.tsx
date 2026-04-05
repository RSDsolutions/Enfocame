import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  {
    title: 'Promesas eternas',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'El primer baile',
    url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Quinceañera',
    url: 'https://images.unsplash.com/photo-1543615598-64b54e7d1746?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Momentos únicos',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Amor real',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
  },
]

const FLIP_SPEED = 750

const flipAnimationTop = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' },
]
const flipAnimationBottom = [
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(0)' },
]
const flipAnimationTopReverse = [
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(0)' },
]
const flipAnimationBottomReverse = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' },
]

export default function FlipGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const uniteRef = useRef<NodeListOf<HTMLElement> | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return
    uniteRef.current = containerRef.current.querySelectorAll<HTMLElement>('.flip-unite')
    defineFirstImg()
  }, [])

  const defineFirstImg = () => {
    uniteRef.current?.forEach(setActiveImage)
    setImageTitle()
  }

  const setActiveImage = (el: HTMLElement) => {
    el.style.backgroundImage = `url('${images[currentIndex].url}')`
  }

  const setImageTitle = () => {
    const gallery = containerRef.current
    if (!gallery) return
    gallery.setAttribute('data-title', images[currentIndex].title)
    gallery.style.setProperty('--title-y', '0')
    gallery.style.setProperty('--title-opacity', '1')
  }

  const updateGallery = (nextIndex: number, isReverse = false) => {
    const gallery = containerRef.current
    if (!gallery) return

    const topAnim = isReverse ? flipAnimationTopReverse : flipAnimationTop
    const bottomAnim = isReverse ? flipAnimationBottomReverse : flipAnimationBottom

    gallery.querySelector<HTMLElement>('.flip-overlay-top')?.animate(topAnim, {
      duration: FLIP_SPEED,
      iterations: 1,
    })
    gallery.querySelector<HTMLElement>('.flip-overlay-bottom')?.animate(bottomAnim, {
      duration: FLIP_SPEED,
      iterations: 1,
    })

    gallery.style.setProperty('--title-y', '-1rem')
    gallery.style.setProperty('--title-opacity', '0')
    gallery.setAttribute('data-title', '')

    uniteRef.current?.forEach((el, idx) => {
      const delay =
        (isReverse && idx !== 1 && idx !== 2) || (!isReverse && (idx === 1 || idx === 2))
          ? FLIP_SPEED - 200
          : 0
      setTimeout(() => setActiveImage(el), delay)
    })

    setTimeout(setImageTitle, FLIP_SPEED * 0.5)
  }

  const updateIndex = (increment: number) => {
    const newIndex = (currentIndex + increment + images.length) % images.length
    setCurrentIndex(newIndex)
    updateGallery(newIndex, increment < 0)
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative border border-primary/20 p-2"
        style={{ '--gallery-bg-color': 'rgba(230 195 100 / 0.05)' } as React.CSSProperties}
      >
        {/* Flip gallery */}
        <div
          id="flip-gallery"
          ref={containerRef}
          className="relative w-[240px] h-[400px] md:w-[300px] md:h-[500px] text-center"
          style={{ perspective: '800px' }}
        >
          <div className="flip-top flip-unite bg-cover bg-no-repeat" />
          <div className="flip-bottom flip-unite bg-cover bg-no-repeat" />
          <div className="flip-overlay-top flip-unite bg-cover bg-no-repeat" />
          <div className="flip-overlay-bottom flip-unite bg-cover bg-no-repeat" />
        </div>

        {/* Navigation */}
        <div className="absolute top-full right-0 mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => updateIndex(-1)}
            title="Anterior"
            className="text-primary opacity-75 hover:opacity-100 hover:scale-125 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => updateIndex(1)}
            title="Siguiente"
            className="text-primary opacity-75 hover:opacity-100 hover:scale-125 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        #flip-gallery::after {
          content: '';
          position: absolute;
          background-color: #0e0e0e;
          width: 100%;
          height: 4px;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }

        #flip-gallery::before {
          content: attr(data-title);
          color: rgba(230, 195, 100, 0.75);
          font-size: 0.75rem;
          font-family: "Noto Serif", serif;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          left: -0.5rem;
          position: absolute;
          top: calc(100% + 1rem);
          line-height: 2;
          opacity: var(--title-opacity, 0);
          transform: translateY(var(--title-y, 0));
          transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
        }

        #flip-gallery > * {
          position: absolute;
          width: 100%;
          height: 50%;
          overflow: hidden;
          background-size: 240px 400px;
        }

        @media (min-width: 768px) {
          #flip-gallery > * {
            background-size: 300px 500px;
          }
        }

        .flip-top,
        .flip-overlay-top {
          top: 0;
          transform-origin: bottom;
          background-position: top;
        }

        .flip-bottom,
        .flip-overlay-bottom {
          bottom: 0;
          transform-origin: top;
          background-position: bottom;
        }
      `}</style>
    </div>
  )
}
