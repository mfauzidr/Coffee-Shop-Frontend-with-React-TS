import { Product } from "../../redux/slices/products";
import Pagination from "./Pagination";
import ProductListCard from "./ProductListCard";

interface ProductListProps {
  products: Product[];
  pageInfo: {
    currentPage: number;
    pages: number;
  } | null;
  handlePageChange: (page: string | number) => void;
}

const ProductList = ({
  products,
  pageInfo,
  handlePageChange,
}: ProductListProps) => {
  return (
    <div className="flex flex-col p-2 w-full border border-slate-300 rounded-lg">
      <div className="flex border-b w-full justify-between py-2 px-6 mt-2 text-xs font-semibold">
        <div className="flex w-20">
          <input type="checkbox" />
        </div>
        <div className="flex justify-center w-24 px-10">Image</div>
        <div className="flex justify-center w-48">Product Name</div>
        <div className="flex justify-center w-48">Price</div>
        <div className="flex justify-center w-48 pr-4">Desc</div>
        <div className="flex justify-center w-52">Size</div>
        <div className="flex justify-center w-48">Method</div>
        <div className="flex justify-center w-24">Stock</div>
        <div className="flex justify-center w-24 pl-5">Action</div>
      </div>
      <div className="flex flex-col border-b w-full justify-between">
        {products.map((product) => (
          <ProductListCard
            key={product.id}
            product={product}
            size="Large, Medium"
            method="Delivery, Dine-In"
            stock={200}
            index={product.id}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <div>
          {products.length > 0
            ? `${products.length} Products Found`
            : "No products found"}
        </div>
        <div>
          {pageInfo && (
            <Pagination
              currentPage={pageInfo.currentPage}
              pages={pageInfo.pages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
