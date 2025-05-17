import FeatherIcon from "feather-icons-react";

interface ProductistProps {
  product: {
    id: number;
    image: string;
    productName: string;
    price: number;
    description: string;
    uuid: string;
  };
  size: string;
  method: string;
  stock?: number;
  index: number;
  onEditClick: (uuid: string | undefined) => void;
  onDeleteClick: (uuid: string | undefined) => void;
}

const ProductListCard = ({
  product,
  size,
  method,
  stock,
  index,
  onEditClick,
  onDeleteClick,
}: ProductistProps) => {
  return (
    <>
      <div
        key={product.id}
        className={`flex w-full justify-between items-center py-2 px-6 pr-8 text-xs font-base ${
          index % 2 !== 0 ? "bg-gray-100" : ""
        }`}
      >
        <div className="flex w-24">
          <input type="checkbox" />
        </div>
        <div className="w-24 aspect-square ml-2 mr-2 overflow-hidden rounded flex items-center justify-center">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-center items-center text-center w-48 pl-2 mr-2">
          {product.productName}
        </div>
        <div className="flex justify-center w-48">
          Rp {product.price.toLocaleString()}
        </div>
        <div className="flex justify-center w-52 max-h-20 overflow-auto no-scrollbar py-2">
          {product.description}
        </div>
        <div className="flex justify-center text-center w-52">{size}</div>
        <div className="flex justify-center w-48">{method}</div>
        {stock ? (
          <div className="flex justify-center w-28 pr-3">{stock}</div>
        ) : (
          ""
        )}
        <div className="flex gap-1 w-12">
          <button
            type="button"
            className="text-amber-500 bg-amber-500 bg-opacity-10 rounded-full p-1.5"
            onClick={() => onEditClick?.(product.uuid)}
          >
            <FeatherIcon icon="edit-3" className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="text-red-500 bg-red-500 bg-opacity-10 rounded-full p-1.5"
            onClick={() => onDeleteClick?.(product.uuid)}
          >
            <FeatherIcon icon="trash-2" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductListCard;
