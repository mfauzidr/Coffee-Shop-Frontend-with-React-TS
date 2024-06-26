import React from 'react';
import { Button, CartButton } from './Buttons';
import RatingStar from './RatingStar';
import { Link } from 'react-router-dom';
import NoImg from '../assets/img/no-image.png';

// Define the Product type here as well
interface Product {
  uuid: string;
  image: string;
  productName: string;
  description: string;
  price: number;
  isFlashSale: boolean;
  ratingProduct?: number;
}

interface ProductCardProps extends Omit<Product, 'uuid'> {
  uuid: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ uuid, image, productName, description, price, isFlashSale, ratingProduct }) => {
  const discount = price / 2;
  const defaultImage = NoImg;

  return (
    <div className="flex-1 flex-col relative">
      {isFlashSale && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs md:text-lg px-2.5 py-1 rounded-3xl">
          Flash Sale!
        </div>
      )}
      <div className="flex flex-1 h-32 md:h-56 min-w-32 md:w-full justify-center overflow-hidden mx-6 md:mx-0">
        <img className='flex-1 object-cover object-center' src={image ? `${image}` : defaultImage} alt={productName} />
      </div>
      <div className="relative flex-1 bg-white shadow-md mx-8 md:mx-8 p-3 -mt-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xs md:text-2xl font-bold">
            <Link to={`/detail-product/${uuid}`}>{productName}</Link>
          </h2>
          <div className="flex-1 h-12 md:h-auto text-xs md:text-sm overflow-scroll">{description}</div>
          {ratingProduct && (
            <RatingStar gap={'gap-2'} rating={ratingProduct} />
          )}
          <div className="flex-col md:flex items-center text-sm md:text-2xl text-amber-500">
            {isFlashSale ? (
              <div>
                <span className="block md:flex text-[8px] md:text-xs font-bold text-red-500 line-through">IDR {price?.toLocaleString('id')}</span>
                IDR {discount.toLocaleString('id')}
              </div>
            ) : (
              `Rp. ${price?.toLocaleString('id')} ,-`
            )}
          </div>
          <div className="flex flex-1 gap-2">
            <Button buttonName='Buy' type='button' size='w-full' link={`/detail-product/${uuid}`} />
            <CartButton size='14px md:24px' padding='px-4 py-px' border='border border-amber-500 rounded' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
