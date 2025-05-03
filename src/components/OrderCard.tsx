import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Option } from "./RadioGroup";
import axios from "axios";

export interface OrderCardProps {
  id: number;
  uuid?: string;
  image: string;
  productName: string;
  quantity: number;
  size: string;
  variant: string;
  subtotal?: number;
  isEdit?: boolean;
  onClick?: () => void;
  onUpdate?: (updatedItem: {
    id: number;
    productSizeId?: number;
    productVariantId?: number;
    quantity: number;
  }) => void;
}

const OrderCard = ({
  id,
  image,
  productName,
  quantity,
  size,
  variant,
  subtotal,
  isEdit = false,
  onClick,
  onUpdate,
}: OrderCardProps) => {
  const [sizes, setSizes] = useState<Option[]>([]);
  const [variants, setVariants] = useState<Option[]>([]);
  const [selectedSize, setSelectedSize] = useState<Option | undefined>(
    undefined
  );
  const [selectedVariant, setSelectedVariant] = useState<Option | undefined>(
    undefined
  );
  const [qty, setQty] = useState<number>(quantity);

  const decreaseBtn = () => {
    setQty((prevQty) => Math.max(prevQty - 1, 1));
    if (onUpdate) {
      onUpdate({
        id,
        quantity: qty - 1,
        productSizeId: selectedSize?.id,
        productVariantId: selectedVariant?.id,
      });
    }
  };

  const increaseBtn = () => {
    setQty((prevQty) => prevQty + 1);
    if (onUpdate) {
      onUpdate({
        id,
        quantity: qty + 1,
        productSizeId: selectedSize?.id,
        productVariantId: selectedVariant?.id,
      });
    }
  };

  useEffect(() => {
    const getSizes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/size`
        );
        const sizeOptions = res.data.results.map(
          (size: { id: number; size: string; additionalPrice: number }) => ({
            id: size.id,
            value: size.size,
            label: size.size,
            additionalPrice: size.additionalPrice,
          })
        );

        setSizes(sizeOptions);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };
    getSizes();
  }, []);

  useEffect(() => {
    const getVariants = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/variant`
        );
        const variantOptions = res.data.results.map(
          (variant: { id: number; name: string; additionalPrice: number }) => ({
            id: variant.id,
            value: variant.name,
            label: variant.name,
            additionalPrice: variant.additionalPrice,
            required: true,
          })
        );

        setVariants(variantOptions);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };
    getVariants();
  }, []);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = sizes.find((s) => s.value === e.target.value);
    setSelectedSize(selected);
    if (onUpdate) {
      onUpdate({
        id,
        productSizeId: selected?.id,
        quantity: qty,
      });
    }
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = variants.find((v) => v.value === e.target.value);
    setSelectedVariant(selected);
    if (onUpdate) {
      onUpdate({
        id,
        productVariantId: selected?.id,
        quantity: qty,
      });
    }
  };

  return (
    <div className="flex p-2 md:p-2.5 gap-1 md:gap-7 bg-gray-100 shadow-md items-center">
      <div>
        <img
          className="max-w-20 md:max-w-36 max-h-20 md:max-h-36"
          src={image}
          alt={productName}
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col p-1 md:p-2.5 gap-1 md:gap-3.5 w-fit md:w-60">
          <div className="font-bold text-md md:text-xl">{productName}</div>
          <div className="flex divide-x divide-gray-300 text-gray-600 text-xs md:text-base justify-between w-60">
            <div className="flex items-center justify-center px-2 w-full">
              {isEdit ? (
                <div className="flex items-center">
                  <button
                    type="button"
                    className="flex items-center justify-center w-5 md:w-8 h-5 md:h-8 text-xs md:text-lg bg-white rounded border border-amber-500 focus:outline-none disabled:bg-gray-300 disabled:border-gray-300"
                    onClick={decreaseBtn}
                    disabled={qty < 2}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="w-6 md:w-8 h-4 md:h-8 text-center border text-xs md:text-md"
                    value={qty}
                    readOnly
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center w-5 md:w-8 h-5 md:h-8 text-xs md:text-lg bg-amber-500 rounded border border-amber-500 focus:outline-none"
                    onClick={increaseBtn}
                  >
                    +
                  </button>
                  pcs
                </div>
              ) : (
                <div>{quantity} pcs</div>
              )}
            </div>

            <div className="flex items-center justify-center px-2 w-full">
              {isEdit ? (
                <select
                  value={selectedSize?.value || ""}
                  onChange={handleSizeChange}
                  className="p-1 bg-inherit focus:ring-0 focus:outline-none"
                >
                  {sizes.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div>{selectedSize?.label || size}</div>
              )}
            </div>

            <div className="flex items-center justify-center px-2 w-full">
              {isEdit ? (
                <select
                  value={selectedVariant?.value || ""}
                  onChange={handleVariantChange}
                  className="p-1 bg-inherit focus:ring-0 focus:outline-none"
                >
                  {variants.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div>{selectedVariant?.label || variant}</div>
              )}
            </div>
          </div>

          {subtotal ? (
            <div className="flex text-sm md:text-2xl text-amber-500">
              RP {subtotal.toLocaleString("id")}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-end">
          {isEdit ? (
            <button className="text-red-500 flex w-6 h-6" onClick={onClick}>
              <FeatherIcon icon="x-circle" />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
