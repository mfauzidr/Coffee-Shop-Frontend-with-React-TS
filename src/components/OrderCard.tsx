import FeatherIcon from "feather-icons-react";
import React from "react";

export interface OrderCardProps {
  id?: number;
  uuid?: string;
  image: string;
  productName: string;
  quantity: number;
  size: string;
  variant: string;
  subtotal: number;
}

const OrderCard = ({
  image,
  productName,
  quantity,
  size,
  variant,
  subtotal,
}: OrderCardProps) => {
  const [isHidden, setIsHidden] = React.useState(false);
  const removeCard = () => {
    setIsHidden(true);
  };

  return (
    <div
      className={`flex p-2 md:p-2.5 gap-1 md:gap-7 bg-gray-100 shadow-md items-center ${
        isHidden ? "hidden" : ""
      }`}
    >
      <div>
        <img
          className="max-w-20 md:max-w-44 max-h-20 md:max-h-44"
          src={image}
          alt={productName}
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col p-1 md:p-2.5 gap-1 md:gap-3.5 w-fit md:w-60">
          {/* {isFlashSale && (
            <div className="flex justify-center items-center bg-red-600 text-white text-xs md:text-base px-2 py-1 rounded-3xl w-20 md:w-24 md:h-6 ">
              Flash Sale!
            </div>
          )} */}
          <div className="font-bold text-md md:text-xl">{productName}</div>
          <div className="flex divide-x-1 md:divide-x-2 text-gray-600 text-xs md:text-base justify-between w-60">
            <div>
              <div className="mr-1 md:mr-2">{quantity} pcs</div>
            </div>
            <div>
              <div className="mx-1 md:mx-2">{size}</div>
            </div>
            <div>
              <div className="mx-1 md:mx-2">{variant}</div>
            </div>
          </div>
          <div className="flex text-sm md:text-2xl text-amber-500">
            {/* {isFlashSale ? (
              <>
                <span className="mr-2 text-[8px] md:text-xs font-bold text-red-500 line-through">
                  RP {subtotal.toLocaleString("id")}
                </span>
                RP {discount.toLocaleString("id")}
              </>
            ) : (
              `RP ${subtotal.toLocaleString("id")} ,-`
            )} */}
            RP {subtotal.toLocaleString("id")}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="text-red-500 flex" onClick={removeCard}>
            <FeatherIcon icon="x-circle" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
