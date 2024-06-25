import React, { useState } from 'react'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'

const ArrowButton = ({ direction, onClick }) => {
  return (
    <button
      className={`flex bg-${direction === 'left' ? 'gray-200' : 'amber-500'} w-12 h-12 rounded-full text-black items-center justify-center`}
      onClick={onClick}
    >
      <FeatherIcon icon={`arrow-${direction}`} size="24" />
    </button>
  )
}

const PageIndicator = ({ active, onClick }) => {
  return (
    <button
      className={` ${active ? 'w-6' : 'w-2' } h-2 bg-${active ? 'amber-500' : 'gray-200'} border-${active ? 'amber-500' : 'gray-200'} rounded-full transition-all duration-300`}
      onClick={onClick}
    ></button>
  )
}

export const CarouselButton = ({ handlePrevClick, handleNextClick }) => {
  return (
    <div className='flex gap-2.5 md:mb-2.5'>
      <ArrowButton direction="left" onClick={handlePrevClick} />
      <ArrowButton direction="right" onClick={handleNextClick} />
    </div>
  )
}

export const CarouselIndicator = ({ activePage, handlePageIndicatorClick }) => {
  return (
    <div className="flex gap-3 mt-8 md:mt-0">
      {[1, 2, 3, 4].map((page) => (
        <PageIndicator
          key={page}
          active={page === activePage}
          onClick={() => handlePageIndicatorClick(page)}
        />
      ))}
    </div>
  )
}

const CarouselPagination = () => {
  const [activePage, setActivePage] = useState(1)

  const handlePrevClick = () => {
    setActivePage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
  }

  const handleNextClick = () => {
    setActivePage((prevPage) => (prevPage < 4 ? prevPage + 1 : prevPage))
  }

  const handlePageIndicatorClick = (page) => {
    setActivePage(page)
  }

  return (
    <div className="flex-col gap-2.5">
      <CarouselButton handlePrevClick={handlePrevClick} handleNextClick={handleNextClick} />
      <CarouselIndicator activePage={activePage} handlePageIndicatorClick={handlePageIndicatorClick} />
    </div>
  )
}

export default CarouselPagination
