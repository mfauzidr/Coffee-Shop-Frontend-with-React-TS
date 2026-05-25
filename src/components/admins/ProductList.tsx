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
      <div className="overflow-x-auto w-full border border-slate-300 rounded-lg bg-white">
        <table className="min-w-full table-fixed text-xs text-left">
          <thead className="border-b bg-slate-50 text-slate-500">
            <tr>
              <th className="w-20 py-3 px-6 text-center">
                <input type="checkbox" />
              </th>
              <th className="w-24 py-3 px-6 text-center">Image</th>
              <th className="w-48 py-3 px-6 text-center">Product Name</th>
              <th className="w-48 py-3 px-6 text-center">Price</th>
              <th className="w-48 py-3 px-6 text-center">Desc</th>
              <th className="w-52 py-3 px-6 text-center">Size</th>
              <th className="w-24 py-3 px-6 text-center">Stock</th>
              <th className="w-24 py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductListCard
                key={product.id}
                product={product}
                size="Large, Medium"
                stock={200}
                index={index}
                onEditClick={() => onEditClick?.(product.uuid)}
                onDeleteClick={() => {
                  setSelectedUuid(product.uuid);
                  setShowDelete(true);
                }}
              />
            ))}
          </tbody>
        </table>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 text-sm text-gray-500">
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
            <h2 className="text-lg font-semibold mb-4">Delete this product?</h2>
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
