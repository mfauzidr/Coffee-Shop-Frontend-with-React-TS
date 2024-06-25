import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React from 'react'


const OrderCard = ({ imageUrl, isFlashSale, name, quantity, size, variant, type, price, showRemoveBtn = true }) => {
  const discount = price / 2

  const [isHidden, setIsHidden] = React.useState(false)
  const removeCard = () => {
    setIsHidden(true)
  }
  return (
    <div className={`flex p-2.5 gap-7 bg-gray-100 shadow-md items-center ${isHidden ? 'hidden' : ''}`}>
      <div>
        <img className="max-w-44 max-h-44" src={imageUrl} alt={name} />
      </div>
      <div className="flex flex-col p-2.5 gap-3.5 w-96">
        {isFlashSale && (
          <div className="flex justify-center items-center bg-red-600 text-white text-xs py-1 rounded-3xl w-24 h-6 ">
            Flash Sale!
          </div>
        )}
        <div className="font-bold text-lg">{name}</div>
        <div className="flex divide-x-2 text-gray-600">
          <div>
            <div className="mr-2">{quantity}pcs</div>
          </div>
          <div>
            <div className="mx-2">{size}</div>
          </div>
          <div>
            <div className="mx-2">{variant}</div>
          </div>
          <div>
            <div className="ml-2">{type}</div>
          </div>
        </div>
        <div className="flex text-2xl text-amber-500 items-center gap-3">
          {isFlashSale ? (
            <>
              <span className="text-xs font-bold text-red-500 line-through">IDR {price.toLocaleString('id')}</span>
              IDR {discount.toLocaleString('id')}
            </>
          ) : (
            `IDR ${price.toLocaleString('id')} ,-`
          )}
        </div>
      </div>
      <div>
      {showRemoveBtn && (
        <div>
          <button className="text-red-500" onClick={removeCard}>
            <FeatherIcon icon={'x-circle'} />
          </button>
        </div>
      )}
      </div>
    </div>
  )
}

export default OrderCard
