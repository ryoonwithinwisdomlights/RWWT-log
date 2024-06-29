import { useState } from 'react'

const OmniSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slides = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`)
  const slideWidth = 108 // 100px + 2px (left margin) + 2px (right margin)
  const maxIndex = slides.length - 7

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex))
  }
  return (
    <div className="relative w-full overflow-hidden px-[40px] py-4 rounded-lg bg-neutral-300">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={`ml-2  absolute left-0 top-1/2 rounded-lg transform -translate-y-1/2 bg-neutral-500  bg-opacity-80   text-white  p-2 z-10 
           hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {'<'}
      </button>
      <div
        className="flex transition-transform duration-300 ease-in-out gap-4"
        style={{ transform: `translateX(${-currentIndex * slideWidth}px)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-[28px]
             bg-neutral-50  flex
             items-center justify-center
             rounded-lg overflow-visible w-auto whitespace-nowrap  select-none px-5
             hover:bg-neutral-100
             hover:scale-110 duration-150
             "
          >
            {slide}
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={currentIndex === maxIndex}
        className={`mr-2 absolute right-0 top-1/2  rounded-lg  transform -translate-y-1/2 bg-neutral-500 bg-opacity-80 text-white border-none p-2 z-10 
             hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {'>'}
      </button>
    </div>
  )
}
export default OmniSlider
