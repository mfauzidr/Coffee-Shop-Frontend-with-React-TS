import CouponList from "../../components/CouponList";
import ProductGrid from "../../components/ProductGrid";
import ProductHeader from "../../components/ProductHeader";
import FilterSvg from "../../assets/svg/Filter.svg";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import FilterSidebar from "../../components/FilterSidebar";

const Product = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sortBy: "",
    priceRange: [1000, 50000] as [number, number],
  });
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => setShowFilter(true);

  return (
    <div className="relative">
      <ProductHeader />

      {/* Mobile search & filter button */}
      <div className="flex lg:hidden px-6 md:px-16 gap-4 py-2 md:py-4 border-b-2 items-center">
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
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <button
          className="flex items-center justify-center w-11 h-11 bg-amber-500 rounded-md"
          type="button"
          onClick={handleShowFilter}
        >
          <img src={FilterSvg} alt="Filter" className="w-6 h-6" />
        </button>
      </div>

      <CouponList />

      {/* Product section */}
      <div className="mx-10 md:mx-32 mb-10">
        <div className="text-2xl md:text-5xl">
          Our <span className="text-amber-800">Product</span>
        </div>
        <div className="flex gap-x-6 mt-6">
          <FilterSidebar
            showFilter={showFilter}
            onClose={() => setShowFilter(false)}
            filters={filters}
          />

          <div className="flex-1">
            <ProductGrid filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
