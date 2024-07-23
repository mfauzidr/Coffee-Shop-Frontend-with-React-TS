import { useState } from 'react';
import FeatherIcon from 'feather-icons-react';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const ArrowButton = ({ direction, onClick }: ArrowButtonProps) => {
  const buttonColor = direction === 'left' ? 'gray-200' : 'amber-500';

  return (
    <button
      className={`hidden md:flex bg-${buttonColor} md:w-12 md:h-12 rounded-full text-black items-center justify-center`}
      onClick={onClick}
    >
      <FeatherIcon icon={`arrow-${direction}`} size="24" />
    </button>
  );
};

interface PageIndicatorProps {
  active: boolean;
  onClick: () => void;
}

const PageIndicator = ({ active, onClick }: PageIndicatorProps) => {
  const indicatorSize = active ? 'w-6' : 'w-2';
  const indicatorColor = active ? 'amber-500' : 'gray-200';

  return (
    <button
      className={` ${indicatorSize} h-2 bg-${indicatorColor} border-${indicatorColor} rounded-full transition-all duration-300`}
      onClick={onClick}
    ></button>
  );
};

interface CarrouselProps {
  handlePrevClick: () => void;
  handleNextClick: () => void;
}

export const CarouselButton = ({ handlePrevClick, handleNextClick }: CarrouselProps) => {
  return (
    <div className='flex gap-2.5 md:mb-2.5'>
      <ArrowButton direction="left" onClick={handlePrevClick} />
      <ArrowButton direction="right" onClick={handleNextClick} />
    </div>
  );
};

interface IndicatorProps {
  activePage: number;
  handlePageIndicatorClick: (page: number) => void;
}

export const CarouselIndicator = ({ activePage, handlePageIndicatorClick }: IndicatorProps) => {
  return (
    <div className="hidden md:flex gap-3 mt-8 md:mt-0">
      {[1, 2, 3, 4].map((page) => (
        <PageIndicator
          key={page}
          active={page === activePage}
          onClick={() => handlePageIndicatorClick(page)}
        />
      ))}
    </div>
  );
};

const CarouselPagination = () => {
  const [activePage, setActivePage] = useState(1);

  const handlePrevClick = () => {
    setActivePage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextClick = () => {
    setActivePage((prevPage) => (prevPage < 4 ? prevPage + 1 : prevPage));
  };

  const handlePageIndicatorClick = (page: number) => {
    setActivePage(page);
  };

  return (
    <div className="flex-col gap-2.5">
      <CarouselButton handlePrevClick={handlePrevClick} handleNextClick={handleNextClick} />
      <CarouselIndicator activePage={activePage} handlePageIndicatorClick={handlePageIndicatorClick} />
    </div>
  );
};

export default CarouselPagination;
