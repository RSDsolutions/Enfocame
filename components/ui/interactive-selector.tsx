import React, { useState, useEffect } from 'react'
import { Camera, Sparkles, Video, BookOpen, Heart } from 'lucide-react'

interface SelectorOption {
  title: string
  description: string
  image: string
  icon: React.ReactNode
}

const options: SelectorOption[] = [
  {
    title: 'Bodas',
    description: 'Cobertura completa del gran día',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    icon: <Heart size={22} className="text-primary" />,
  },
  {
    title: 'Quinceañeras',
    description: 'Sesión especial de 15 años',
    image:
      'https://images.unsplash.com/photo-1543615598-64b54e7d1746?q=80&w=800&auto=format&fit=crop',
    icon: <Sparkles size={22} className="text-primary" />,
  },
  {
    title: 'Fotografía',
    description: 'Fotos editadas de alta calidad',
    image:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
    icon: <Camera size={22} className="text-primary" />,
  },
  {
    title: 'Video',
    description: 'Highlight & filme completo',
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
    icon: <Video size={22} className="text-primary" />,
  },
  {
    title: 'Álbum',
    description: 'Álbum impreso de lujo',
    image:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    icon: <BookOpen size={22} className="text-primary" />,
  },
]

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i])
      }, 180 * i)
      timers.push(timer)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Options container */}
      <div className="options flex w-full max-w-[900px] h-[380px] items-stretch overflow-hidden relative">
        {options.map((option, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
              backgroundPosition: 'center',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index)
                ? 'translateX(0)'
                : 'translateX(-60px)',
              minWidth: '60px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: activeIndex === index ? 'rgba(230,195,100,0.6)' : 'rgba(77,70,55,0.4)',
              backgroundColor: '#131313',
              boxShadow:
                activeIndex === index
                  ? '0 20px 60px rgba(0,0,0,0.5)'
                  : '0 10px 30px rgba(0,0,0,0.3)',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
            }}
            onClick={() => setActiveIndex(index)}
          >
            {/* Shadow */}
            <div
              className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: activeIndex === index ? '0' : '-40px',
                height: '120px',
                boxShadow:
                  activeIndex === index
                    ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000'
                    : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000',
              }}
            />

            {/* Label */}
            <div className="absolute left-0 right-0 bottom-4 flex items-center justify-start z-10 pointer-events-none px-3 gap-2 w-full">
              <div className="min-w-[40px] max-w-[40px] h-[40px] flex items-center justify-center rounded-full bg-surface-container-lowest/80 backdrop-blur-sm border border-outline-variant flex-shrink-0">
                {option.icon}
              </div>
              <div className="text-on-surface whitespace-pre">
                <div
                  className="font-headline text-sm uppercase tracking-widest transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                  }}
                >
                  {option.title}
                </div>
                <div
                  className="text-xs text-on-surface-variant font-body transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InteractiveSelector
