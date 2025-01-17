import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/products";
import { RootState, AppDispatch } from "../redux/store";
import ProductCard from "./ProductCard";
import PagePagination from "./PagePagination";

interface ProductFilters {
  search?: string;
  category?: string;
  sortBy?: string;
  priceRange?: [number, number];
}

interface ProductGridProps {
  filters: ProductFilters;
}

const ProductGrid = ({ filters }: ProductGridProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, pageInfo, isLoading, isRejected, error } = useSelector(
    (state: RootState) => state.products
  );

  const currentPage = pageInfo?.currentPage || 1;

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, filters }));
  }, [dispatch, filters, currentPage]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchProducts({ page: newPage, filters }));
    window.scrollTo({ top: 650, behavior: "smooth" });
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isRejected && (
        <p className="text-red-500">{error || "An error occurred."}</p>
      )}
      {!isLoading && !isRejected && products.length > 0 && (
        <>
          <div className="relative grid grid-flow-row grid-cols-2 gap-2 md:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.uuid}
                uuid={product.uuid}
                image={product.image}
                productName={product.productName}
                description={product.description}
                price={product.price}
                isFlashSale={product.isFlashSale}
                ratingProduct={product.ratingProduct}
              />
            ))}
          </div>
          {pageInfo && (
            <PagePagination
              currentPage={pageInfo.currentPage}
              pages={pageInfo.pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
      {!isLoading && !isRejected && products.length === 0 && (
        <p>No products found for the selected filters.</p>
      )}
    </div>
  );
};

export default ProductGrid;
