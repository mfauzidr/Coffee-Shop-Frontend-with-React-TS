import React from "react"
import { CarouselButton, CarouselIndicator } from "./CarouselPagination"
import PromoCard from "./PromoCard"
import Promo1 from "../assets/img/promo-1.png"
import Promo2 from "../assets/img/promo-2.png"

const CouponList = () =>{
    const promoData = [
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
          title: "Get a cup of coffee for free on sunday morning",
          description: " Only at 7 to 9 AM",
          bgColor: "bg-yellow-200",
        },
    ]

    const [activePage, setActivePage] = React.useState(1)

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
        <div>
          <div className="flex justify-between items-center mx-32 py-12">
            <div className="text-2xl md:text-5xl">Today <span className="text-amber-800">Promo</span></div>
            <div className="flex gap-2.5">
            <CarouselButton handlePrevClick={handlePrevClick} handleNextClick={handleNextClick} />
            </div>
          </div>
          <div className="flex overflow-hidden gap-12 justify-center">
            {promoData.map((promo, index) => (
              <PromoCard key={index} {...promo} />
            ))}
          </div>
          <div className="ml-32 my-5">
          <CarouselIndicator activePage={activePage} handlePageIndicatorClick={handlePageIndicatorClick} />
          </div>
        </div>
      )
    }

export default CouponList