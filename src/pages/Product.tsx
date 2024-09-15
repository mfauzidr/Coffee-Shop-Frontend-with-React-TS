import CouponList from "../components/CouponList";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import ProductHeader from "../components/ProductHeader";
import FilterSidebar from "../components/FilterSidebar";
import FilterSvg from "../assets/svg/Filter.svg";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";

const Product = () => {
    const [filters, setFilters] = useState({
        search: '',
        category: [] as string[],
        sortBy: '',
        priceRange: [1000, 50000] as [number, number],
    });

    const handleApplyFilters = (newFilters: {
        search: string;
        category: string[];
        sortBy: string;
        priceRange: [number, number];
    }) => {
        setFilters(newFilters);
        // Trigger re-fetch or state update in ProductGrid if necessary
    };

    return (
        <>
            <Navbar bgColor='bg-black' position="static" />

            <ProductHeader />
            <div className='flex lg:hidden px-6 md:px-16 gap-4 py-2 md:py-4 border-b-2 items-center'>
                <div className="flex-1 relative">
                    <i className="absolute inset-y-0 left-0 flex items-center ml-3">
                        <FeatherIcon icon="search" className="h-5 w-5 text-gray-500" />
                    </i>
                    <input
                        className="border rounded-lg w-full h-11 pl-10 outline-none"
                        id="Search"
                        name="search"
                        type="text"
                        placeholder="Find Products"
                    />
                </div>
                <button className='flex items-center justify-center w-11 h-11 bg-amber-500 rounded-md' type='button'>
                    <img src={FilterSvg} alt="Filter" className="flex w-6 h-6" />
                </button>
            </div>

            <CouponList />

            <div className="mx-10 md:mx-32 mb-10">
                <div className="text-2xl md:text-5xl">Our <span className="text-amber-800">Product</span></div>
                <div className="flex gap-x-6 text-white mt-6">
                    <FilterSidebar onApplyFilters={handleApplyFilters} />
                    <div>
                        <ProductGrid filters={filters} />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Product;
