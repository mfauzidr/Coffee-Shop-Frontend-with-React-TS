import FeatherIcon from "feather-icons-react";
import noImg from "../../assets/img/no-image.webp";

interface ProductistProps {
  product: {
    id: number;
    image?: string | string[];
    productName: string;
    price: number;
    description: string;
    uuid: string;
  };
  size: string;
  stock?: number;
  index: number;
  onEditClick: (uuid: string | undefined) => void;
  onDeleteClick: (uuid: string | undefined) => void;
}

const ProductListCard = ({
  product,
  size,
  stock,
  index,
  onEditClick,
  onDeleteClick,
}: ProductistProps) => {
  return (
    <tr className={`${index % 2 !== 0 ? "bg-gray-100" : "bg-white"}`}>
      <td className="py-3 px-6 align-middle text-center">
        <input type="checkbox" />
      </td>
      <td className="py-3 px-6 align-middle text-center">
        <div className="w-24 aspect-square mx-auto overflow-hidden rounded bg-slate-100">
          <img
            src={
              Array.isArray(product.image)
                ? product.image[0]
                : product.image || noImg
            }
            alt={product.productName}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = noImg;
            }}
            className="w-full h-full object-cover"
          />
        </div>
      </td>
      <td className="py-3 px-6 align-middle text-center">{product.productName}</td>
      <td className="py-3 px-6 align-middle text-center">
        Rp {product.price.toLocaleString()}
      </td>
      <td className="py-3 px-6 align-middle text-center max-h-20 overflow-auto no-scrollbar py-2">
        {product.description}
      </td>
      <td className="py-3 px-6 align-middle text-center">{size}</td>
      <td className="py-3 px-6 align-middle text-center">{stock}</td>
      <td className="py-3 px-6 align-middle text-center">
        <div className="flex justify-center gap-1">
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
      </td>
    </tr>
  );
};

export default ProductListCard;
