interface OrderCardProps {
  image: string;
  productName: string;
  quantity: number;
  size: string;
  variant: string;
}

const OrderDetailsCard = ({
  image,
  productName,
  quantity,
  size,
  variant,
}: OrderCardProps) => {
  return (
    <div className="flex p-2 md:p-2.5 gap-1 md:gap-7 bg-gray-100 shadow-md items-center">
      <div>
        <img
          className="max-w-20 max-h-20 object-cover aspect-square"
          src={image}
          alt={productName}
        />
      </div>
      <div className="flex justify-between w-fit md:w-full">
        <div className="flex flex-col p-1 md:p-2.5 gap-1 md:gap-3.5 w-fit md:w-60">
          <div className="font-bold text-md md:text-xl">{productName}</div>
          <div className="flex divide-x divide-gray-300 text-gray-600 text-xs md:text-base justify-between w-48 md:w-60 self-start">
            <div className="flex items-center justify-start px-1 w-full">
              <div>{quantity} pcs</div>
            </div>

            <div className="flex items-center justify-center px w-full">
              <div>{size}</div>
            </div>

            <div className="flex items-center justify-center px w-full">
              <div>{variant}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsCard;
