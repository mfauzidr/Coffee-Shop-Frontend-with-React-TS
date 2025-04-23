import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/products";
import { RootState, AppDispatch } from "../redux/store";
import ProductCard from "./ProductCard";
import PagePagination from "./PagePagination";
import { addToCart } from "../redux/slices/cart";
import { useStoreSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface ProductFilters {
  search?: string;
  category: string;
  sortBy?: string;
  priceRange?: [number, number];
}

interface ProductGridProps {
  filters: ProductFilters;
}

const ProductGrid = ({ filters }: ProductGridProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, pageInfo, isLoading, isRejected, error } = useStoreSelector(
    (state: RootState) => state.products
  );
  const { token } = useStoreSelector((state: RootState) => state.auth);
  const [uuid, setUuid] = useState<string>("");
  const navigate = useNavigate();
  const isLoggedIn = !!token;

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ uuid: string }>(token);
      setUuid(decodedToken.uuid);
    }
  }, [token]);

  const currentPage = pageInfo?.currentPage || 1;

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, filters, currentPage }));
  }, [dispatch, filters, currentPage]);

  const handlePageChange = (page: string | number) => {
    dispatch(fetchProducts({ page, filters, currentPage }));
    window.scrollTo({ top: 650, behavior: "smooth" });
  };

  const handleAddToCart = async (productId: string) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      const userId = uuid;
      const sizeId = [1];
      const variantId = [1];
      const qty = [1];

      await dispatch(
        addToCart({ userId, productId, sizeId, variantId, qty })
      ).unwrap();

      Swal.fire({
        title: "Success!",
        text: "Product has been added to cart!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup:
            "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      Swal.fire({
        title: "Failed!",
        text: "Failed to add product to cart.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup:
            "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
    }
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
                onAddToCart={() => handleAddToCart(product.uuid)}
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
