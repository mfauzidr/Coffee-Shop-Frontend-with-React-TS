import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHighlightedProducts } from "../redux/slices/products";
import { RootState, AppDispatch } from "../redux/store";
import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";

const ProductHighlight = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { highlightedProducts, isLoading, isRejected, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchHighlightedProducts());
  }, [dispatch]);

  return (
    <section className="flex flex-col h-3/4 lg:h-auto items-center mt-20 px-10 gap-6">
      <SectionHeader
        title={
          <h1>
            Here is People’s <span className="text-amber-800">Favorite</span>
          </h1>
        }
        text="Let’s choose and have a bit taste of people’s favorite. It might be yours too!"
      />
      {isLoading && <p>Loading...</p>}
      {isRejected && (
        <p className="text-red-500">{error || "An error occurred."}</p>
      )}
      {!isLoading && !isRejected && highlightedProducts.length > 0 && (
        <div className="h-auto max-w-full overflow-x-auto lg:overflow-visible lg:px-24">
          <div className="flex flex-1 lg:flex-row mt-5 lg:mt-14 gap-2 lg:gap-5 w-80 lg:w-full">
            {highlightedProducts.map((product) => (
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
        </div>
      )}
      {!isLoading && !isRejected && highlightedProducts.length === 0 && (
        <p>No highlighted products found.</p>
      )}
    </section>
  );
};

export default ProductHighlight;
