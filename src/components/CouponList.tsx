import React from "react";
import { CarouselButton, CarouselIndicator } from "./CarouselPagination";
import PromoCard from "./PromoCard";
import Promo1 from "../assets/img/promo-1.png";
import Promo2 from "../assets/img/promo-2.png";

interface PromoData {
  imgSrc: string;
  title: string;
  description: string;
  claimLink?: string; // Make claimLink optional here
  bgColor: string;
}

const CouponList: React.FC = () => {
  const promo: PromoData[] = [
    {
      imgSrc: Promo1,
      title: "HAPPY MOTHER’S DAY!",
      description: "Get one of our favorite menu for free!",
      claimLink: "#",
      bgColor: "bg-green-400",
    },
    {
      imgSrc: Promo1,
      title: "HAPPY MOTHER’S DAY!",
      description: "Get one of our favorite menu for free!",
      claimLink: "#",
      bgColor: "bg-green-400",
    },
    {
      imgSrc: Promo1,
      title: "HAPPY MOTHER’S DAY!",
      description: "Get one of our favorite menu for free!",
      claimLink: "#",
      bgColor: "bg-green-400",
    },
    {
      imgSrc: Promo2,
      title: "Get a cup of coffee for free on Sunday morning",
      description: "Only at 7 to 9 AM",
      bgColor: "bg-yellow-200",
    },
  ];

  const [activePage, setActivePage] = React.useState<number>(1);

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
    <div>
      <div className="flex justify-between items-center mx-10 md:mx-32 py-4 md:py-12">
        <div className="text-2xl md:text-5xl">
          Today <span className="text-amber-800">Promo</span>
        </div>
        <div className="flex gap-2.5">
          <CarouselButton
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
          />
        </div>
      </div>
      <div className="flex overflow-scroll md:overflow-hidden pl-5 gap-6 md:gap-12 justify-normal md:justify-center">
        {promo.map((promo, index) => (
          <PromoCard key={index} {...promo} />
        ))}
      </div>
      <div className="ml-32 my-5">
        <CarouselIndicator
          activePage={activePage}
          handlePageIndicatorClick={handlePageIndicatorClick}
        />
      </div>
    </div>
  );
};

export default CouponList;
