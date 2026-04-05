import React, { useEffect, useRef } from 'react'

interface PoemAnimationProps {
  poemHTML: string
  backgroundImageUrl: string
  overlayImageUrl?: string
}

export const PoemAnimation = ({
  poemHTML,
  backgroundImageUrl,
  overlayImageUrl,
}: PoemAnimationProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function adjustContentSize() {
      if (contentRef.current) {
        const viewportWidth = window.innerWidth
        const baseWidth = 1000
        const scaleFactor =
          viewportWidth < baseWidth ? (viewportWidth / baseWidth) * 0.9 : 1
        contentRef.current.style.transform = `scale(${scaleFactor})`
      }
    }

    adjustContentSize()
    window.addEventListener('resize', adjustContentSize)
    return () => window.removeEventListener('resize', adjustContentSize)
  }, [])

  return (
    <div className="poem-section">
      <div
        ref={contentRef}
        className="poem-content"
        style={{ width: '1000px', height: '562px' }}
      >
        <div className="poem-full">
          {/* Hue overlay */}
          <div className="poem-hue" />

          {/* Background image */}
          <img
            className="poem-bg-image"
            src={backgroundImageUrl}
            alt="Fondo"
            referrerPolicy="no-referrer"
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
          />

          {/* Overlay image (couple/silhouette) */}
          {overlayImageUrl && (
            <img
              className="poem-fg-image"
              src={overlayImageUrl}
              alt="Silueta"
              referrerPolicy="no-referrer"
              onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            />
          )}

          {/* 3D Cube — main */}
          <div className="poem-stage">
            <div className="poem-cube">
              <div className="poem-face poem-top" />
              <div className="poem-face poem-bottom" />
              <div
                className="poem-face poem-left poem-text"
                dangerouslySetInnerHTML={{ __html: poemHTML }}
              />
              <div
                className="poem-face poem-right poem-text"
                dangerouslySetInnerHTML={{ __html: poemHTML }}
              />
              <div className="poem-face poem-front" />
              <div
                className="poem-face poem-back poem-text"
                dangerouslySetInnerHTML={{ __html: poemHTML }}
              />
            </div>
          </div>

          {/* 3D Cube — reflection */}
          <div className="poem-stage-reflect">
            <div className="poem-cube-reflect">
              <div className="poem-face poem-top" />
              <div className="poem-face poem-bottom" />
              <div
                className="poem-face poem-left poem-text"
                dangerouslySetInnerHTML={{ __html: poemHTML }}
              />
              <div
                className="poem-face poem-right poem-text"
                dangerouslySetInnerHTML={{ __html: poemHTML }}
              />
              <div className="poem-face poem-front" />
              <div
                className="poem-face poem-back poem-text"
                dangerouslySetInnerHTML={{ __html: poemHTML }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
