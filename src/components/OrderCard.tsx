import FeatherIcon from 'feather-icons-react';
import React from 'react';

export interface OrderCardProps {
  imageUrl: string;
  isFlashSale: boolean;
  name: string;
  quantity: number;
  size: string;
  variant: string;
  type: string;
  price: number;
}

const OrderCard: React.FC<OrderCardProps> = ({
  imageUrl,
  isFlashSale,
  name,
  quantity,
  size,
  variant,
  type,
  price,
}) => {
  const discount = price / 2;

  const [isHidden, setIsHidden] = React.useState(false);
  const removeCard = () => {
    setIsHidden(true);
  };

  return (
    <div className={`flex px-2 md:p-2.5 gap-1 md:gap-7 bg-gray-100 shadow-md items-center ${isHidden ? 'hidden' : ''}`}>
      <div>
        <img className="max-w-20 md:max-w-44 max-h-20 md:max-h-44" src={imageUrl} alt={name} />
      </div>
      <div className="flex flex-col p-1 md:p-2.5 gap-1 md:gap-3.5 w-fit md:w-96">
        {isFlashSale && (
          <div className="flex justify-center items-center bg-red-600 text-white text-xs md:text-base px-2 py-1 rounded-3xl w-20 md:w-24 md:h-6 ">
            Flash Sale!
          </div>
        )}
        <div className="font-bold text-md md:text-xl">{name}</div>
        <div className="flex divide-x-1 md:divide-x-2 text-gray-600 text-xs md:text-base justify-between">
          <div>
            <div className="mr-1 md:mr-2">{quantity} pcs</div>
          </div>
          <div>
            <div className="mx-1 md:mx-2">{size}</div>
          </div>
          <div>
            <div className="mx-1 md:mx-2">{variant}</div>
          </div>
          <div>
            <div className="ml-1 md:ml-2">{type}</div>
          </div>
        </div>
        <div className="flex text-sm md:text-2xl text-amber-500">
          {isFlashSale ? (
            <>
              <span className="mr-2 text-[8px] md:text-xs font-bold text-red-500 line-through">
                IDR {price.toLocaleString('id')}
              </span>
              IDR {discount.toLocaleString('id')}
            </>
          ) : (
            `IDR ${price.toLocaleString('id')} ,-`
          )}
        </div>
      </div>
      <div>
        <button className="text-red-500 hidden md:block" onClick={removeCard}>
          <FeatherIcon icon="x-circle" />
        </button>
      </div>
      <button className="relative bottom-11 md:bottom-0 text-red-500 md:hidden w-1 h-1" onClick={removeCard}>
        <FeatherIcon icon="x-circle" size={'18px'} />
      </button>
    </div>
  );
};

export default OrderCard;
