"use client"

import React, { useState, useEffect } from "react"
import { motion, useMotionValue } from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Direction = "left" | "right"

function getRandomNumberInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

// Replaces next/image — simple motion img
const MotionImg = motion.img

export const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
}: {
  src: string
  alt: string
  className?: string
  direction?: Direction
  width: number
  height: number
}) => {
  const [rotation, setRotation] = useState<number>(0)
  const x = useMotionValue(200)
  const y = useMotionValue(200)

  useEffect(() => {
    const randomRotation =
      getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1)
    setRotation(randomRotation)
  }, [direction])

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  const resetMouse = () => {
    x.set(200)
    y.set(200)
  }

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{ scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-lg">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          src={src}
          alt={alt}
          draggable={false}
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  )
}

export const PhotoGallery = ({
  animationDelay = 0.5,
}: {
  animationDelay?: number
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true)
    }, animationDelay * 1000)

    const animationTimer = setTimeout(
      () => setIsLoaded(true),
      (animationDelay + 0.4) * 1000
    )

    return () => {
      clearTimeout(visibilityTimer)
      clearTimeout(animationTimer)
    }
  }, [animationDelay])

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const photoVariants = {
    hidden: () => ({ x: 0, y: 0, rotate: 0, scale: 1 }),
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  }

  const photos = [
    {
      id: 1, order: 0, x: "-320px", y: "15px", zIndex: 50, direction: "left" as Direction,
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2, order: 1, x: "-160px", y: "32px", zIndex: 40, direction: "left" as Direction,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3, order: 2, x: "0px", y: "8px", zIndex: 30, direction: "right" as Direction,
      src: "https://images.unsplash.com/photo-1543615598-64b54e7d1746?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 4, order: 3, x: "160px", y: "22px", zIndex: 20, direction: "right" as Direction,
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 5, order: 4, x: "320px", y: "44px", zIndex: 10, direction: "left" as Direction,
      src: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=400&auto=format&fit=crop",
    },
  ]

  return (
    <div className="mt-20 relative">
      <p className="my-2 text-center text-xs font-light uppercase tracking-widest text-on-surface-variant/60">
        Una travesía en historias visuales
      </p>
      <h3 className="z-20 mx-auto max-w-2xl justify-center py-3 text-center text-4xl md:text-6xl font-headline text-on-surface uppercase tracking-widest">
        Nuestras <span className="text-primary">Historias</span>
      </h3>
      <div className="relative mb-8 h-[350px] w-full items-center justify-center lg:flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative h-[220px] w-[220px]">
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{ x: photo.x, y: photo.y, order: photo.order }}
                >
                  <Photo
                    width={220}
                    height={220}
                    src={photo.src}
                    alt={`Historia ${photo.id}`}
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="flex w-full justify-center">
        <Button variant="outline">Ver Portafolio Completo</Button>
      </div>
    </div>
  )
}
