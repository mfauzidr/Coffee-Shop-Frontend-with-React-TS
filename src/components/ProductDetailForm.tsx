import React from 'react';
import RatingStar from './RatingStar';
import { Button, CartButton } from './Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RadioGroup from './RadioGroup'

const ProductDetailForm = ( {isFlashSale, name, price, ratingProduct, isRecommended, desc} ) => {
    const sizeOptions = [
        { label: 'Regular', value: 'regular', required: true },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
    ]
    const variantOptions = [
        { label: 'Ice', value: 'ice', required: true },
        { label: 'Hot', value: 'hot' },
    ]

    const [quantity, setQuantity] = React.useState(1)
    const decreaseBtn = () => {
        setQuantity(quantity - 1)
    }

    const increaseBtn = () => {
      setQuantity(quantity + 1)
      }

    const discount = price / 2

    return (
    <form className="flex flex-col flex-1 w-full h-auto">
      <div className="flex flex-col gap-4">
        {isFlashSale && (
        <div className="flex justify-center bg-red-600 text-white text-lg px-2.5 py-1 rounded-3xl w-32">
          Flash Sale!
        </div>
        )}
        <h2 className="text-5xl font-medium">{name}</h2>
        <div className="flex items-center text-lg md:text-2xl text-amber-500">
          {isFlashSale ? (
              <div><span className="text-xs font-bold text-red-500 line-through">IDR {price?.toLocaleString('id')}</span>
              IDR {discount.toLocaleString('id')}</div>
              ) : (`Rp. ${price?.toLocaleString('id')} ,-`)
              }
          </div>
        <RatingStar rating={ratingProduct}/>
        <div className="flex gap-6 text-lg">
          <div>20+ Review</div>
          {isRecommended && 
          <div className="flex items-left border-l border-black">
            <div className="flex items-center ml-6 gap-2">
              Recommendation
              <FontAwesomeIcon icon="fa-regular fa-thumbs-up" style={{color: "#f59e0b",}} />
            </div>
          </div>
          }
        </div>
        <div>
         {desc}
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <button
              className="flex items-center justify-center w-8 h-8 bg-white rounded border border-amber-500 focus:outline-none disabled:bg-gray-300 disabled:border-gray-300"
              onClick={decreaseBtn}
              disabled={quantity < 2}
            >
              -
            </button>
            <input type="text" className="w-12 h-8 text-center border" value={quantity} readOnly />
            <button
              className="flex items-center justify-center w-8 h-8 bg-amber-500 rounded border border-amber-500 focus:outline-none"
              onClick={increaseBtn}>
              +
            </button>
          </div>
        </div>
            <RadioGroup groupName="size" label="Choose Size" options={sizeOptions} />
            <RadioGroup groupName="variant" label="Hot/Ice?" options={variantOptions} />
      </div>
      <div className="flex gap-x-7">
        <div className="flex flex-1 justify-center items-center h-11 text-sm font-medium border border-amber-500 rounded-md mt-14 bg-amber-500">
          <Button buttonName={'Buy'} type={'button'} link='/checkout-product'/>
        </div>
        <label className="flex flex-1 justify-center items-center h-11 text-sm font-medium text-amber-500 border border-amber-500 rounded-md mt-14 bg-white gap-2.5 cursor-pointer">
          <CartButton />
        </label>
      </div>
    </form>
  )
}

export default ProductDetailForm
