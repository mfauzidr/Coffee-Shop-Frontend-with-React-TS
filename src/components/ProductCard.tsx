import { Button, CartButton } from "./Buttons";
import RatingStar from "./RatingStar";
import { Link } from "react-router-dom";
import NoImg from "../assets/img/no-image.png";

interface Product {
  uuid: string;
  image: string;
  productName: string;
  description: string;
  price: number;
  isFlashSale: boolean;
  ratingProduct?: number;
  onAddToCart?: () => void;
}

interface ProductCardProps extends Omit<Product, "uuid"> {
  uuid: string;
}

const ProductCard = ({
  uuid,
  image,
  productName,
  description,
  price,
  isFlashSale,
  ratingProduct,
  onAddToCart,
}: ProductCardProps) => {
  const discount = price / 2;
  const defaultImage = NoImg;

  return (
    <div className="flex-1 flex-col relative">
      {isFlashSale && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs lg:text-lg px-2 py-1 rounded-3xl">
          Flash Sale!
        </div>
      )}
      <div className="flex flex-1 h-32 lg:h-64 min-w-40 lg:w-full justify-center overflow-hidden">
        <img
          className="flex-1 object-cover object-center"
          src={image ? `${image}` : defaultImage}
          alt={productName}
        />
      </div>
      <div className="relative flex-1 bg-white shadow-md mx-3 lg:mx-6 p-3 -mt-8 text-black">
        <div className="flex flex-col gap-2">
          <h2 className="text-xs lg:text-2xl font-bold">
            <Link to={`/detail-product/${uuid}`}>{productName}</Link>
          </h2>
          <div className="flex-1 h-14 lg:h-auto text-xs lg:text-sm overflow-scroll-hidden">
            {description}
          </div>
          {ratingProduct && <RatingStar gap={"gap-2"} rating={ratingProduct} />}
          <div className="flex-col lg:flex text-sm lg:text-2xl text-amber-500">
            {isFlashSale ? (
              <div>
                <span className="block lg:flex text-[8px] lg:text-xs font-bold text-red-500 line-through">
                  IDR {price?.toLocaleString("id")}
                </span>
                IDR {discount.toLocaleString("id")}
              </div>
            ) : (
              <span className="text-xs lg:text-md">{`Rp. ${price?.toLocaleString(
                "id"
              )} ,-`}</span>
            )}
          </div>
          <div className="flex flex-1 gap-2">
            <Button
              type="button"
              buttonName="Buy Now"
              size="w-full"
              link={`/detail-product/${uuid}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />

            <CartButton
              size="14px lg:24px"
              padding="px-4 py-px"
              border="border border-amber-500 rounded"
              onClick={onAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
