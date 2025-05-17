import { useState } from "react";
import { Product } from "../../redux/slices/products";
import Pagination from "./Pagination";
import ProductListCard from "./ProductListCard";

interface ProductListProps {
  products: Product[];
  dataCount: number;
  pageInfo: {
    currentPage: number;
    pages: number;
  } | null;
  handlePageChange: (page: string | number) => void;
  onEditClick: (uuid: string) => void;
  onDeleteClick: (uuid: string) => void;
}

const ProductList = ({
  products,
  dataCount,
  pageInfo,
  handlePageChange,
  onEditClick,
  onDeleteClick,
}: ProductListProps) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  return (
    <>
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
          {products.map((product, index) => (
            <ProductListCard
              key={product.id}
              product={product}
              size="Large, Medium"
              method="Delivery, Dine-In"
              stock={200}
              index={index}
              onEditClick={() => onEditClick?.(product.uuid)}
              onDeleteClick={() => {
                setSelectedUuid(product.uuid);
                setShowDelete(true);
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <div>
            {products.length > 0
              ? `${dataCount} Products Found`
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
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              Delete this item from cart?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => {
                  if (selectedUuid) {
                    onDeleteClick(selectedUuid);
                    setShowDelete(false);
                    setSelectedUuid(null);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
