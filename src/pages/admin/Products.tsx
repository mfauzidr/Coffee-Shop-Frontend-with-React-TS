import FeatherIcon from "feather-icons-react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useStoreSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../redux/slices/products";
import Filter from "../../components/admins/FilterModal";
import ProductList from "../../components/admins/ProductList";

interface ProductFilters {
  search: string;
  category: string;
  sortBy: string;
}

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, pageInfo, isLoading, isRejected, error } = useStoreSelector(
    (state: RootState) => state.products
  );
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "",
    sortBy: "",
  });

  const currentPage = pageInfo?.currentPage || 1;

  const [showFilter, setShowFilter] = useState<boolean>(false);

  useEffect(() => {
    dispatch(
      fetchProducts({ page: currentPage, limit: 5, filters, currentPage })
    );
  }, [dispatch, filters, currentPage]);

  const handlePageChange = (page: string | number) => {
    dispatch(fetchProducts({ page, limit: 5, filters, currentPage }));
    window.scrollTo({ top: 650, behavior: "smooth" });
  };

  const handleApplyFilters = (newFilters: {
    category: string;
    sortBy: string;
    priceRange: [number, number];
  }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setShowFilter(false);
  };

  return (
    <div>
      <div className="relative">
        <div className="flex flex-col gap-6 p-8 w-full">
          <div className="flex justify-between items-start w-full h-full">
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl font-semibold">Product List</h1>
              <button className="flex items-center gap-1 justify-center w-32 h-10 border border-amber-500 rounded-md bg-amber-500 font-semibold text-sm">
                <FeatherIcon icon="plus" className="h-4 w-4" />
                Add Product
              </button>
            </div>

            <div className="flex flex-col gap-1 mt-9">
              <label className="text-sm text-slate-500" htmlFor="search">
                Search Product
              </label>
              <div className="flex items-center gap-2">
                <div className="relative w-80">
                  <input
                    className="h-10 w-full rounded border pr-10 pl-4 text-sm text-black focus:outline-none focus:ring-0"
                    id="search"
                    type="text"
                    placeholder="Enter Product Name"
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center text-slate-500">
                    <FeatherIcon icon="search" className="w-4 h-4" />
                  </div>
                </div>

                <button
                  onClick={() => setShowFilter(true)}
                  className="flex items-center gap-1 h-10 px-4 rounded bg-amber-500 text-black font-medium text-sm"
                >
                  <FeatherIcon icon="filter" className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>
          {isLoading && <p>Loading...</p>}
          {isRejected && (
            <p className="text-red-500">{error || "An error occurred."}</p>
          )}
          {!isLoading && !isRejected && products.length > 0 && (
            <ProductList
              products={products}
              pageInfo={pageInfo}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      {showFilter && (
        <div
          className="absolute inset-0 z-30 flex justify-end bg-black bg-opacity-30"
          onClick={() => setShowFilter(false)}
        >
          <div
            className="bg-white w-[320px] h-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Filter onApplyFilters={handleApplyFilters} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
