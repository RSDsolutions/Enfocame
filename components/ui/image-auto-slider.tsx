const images = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',  // couple kiss
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',  // couple portrait
  'https://images.unsplash.com/photo-1543615598-64b54e7d1746?q=80&w=800&auto=format&fit=crop',  // quince gown
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',  // first dance
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',  // quince portrait
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=800&auto=format&fit=crop',  // outdoor couple
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format&fit=crop',  // elegant portrait
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop',  // ceremony
  'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=800&auto=format&fit=crop',  // white gown
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop',  // reception
]

const duplicatedImages = [...images, ...images]

interface ImageAutoSliderProps {
  speed?: number // seconds for one full cycle
}

export const ImageAutoSlider = ({ speed = 28 }: ImageAutoSliderProps) => {
  return (
    <div className="w-full overflow-hidden relative">
      {/* Mask edges */}
      <div
        className="relative"
        style={{
          mask: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMask:
            'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div
          className="flex gap-4 w-max"
          style={{ animation: `slider-scroll ${speed}s linear infinite` }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-44 h-44 md:w-56 md:h-56 overflow-hidden"
              style={{ transition: 'transform 0.3s ease, filter 0.3s ease' }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1.04)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'
              }}
            >
              <img
                src={image}
                alt={`Foto ${(index % images.length) + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slider-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
