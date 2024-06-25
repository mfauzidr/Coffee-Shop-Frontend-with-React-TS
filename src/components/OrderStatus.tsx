import React from 'react'

const OrderStatus = ({ status, onStatusChange }) => {
  const statuses = [
    { id: 'onProgress', label: 'On Progress' },
    { id: 'sendingGoods', label: 'Sending Goods' },
    { id: 'finishOrder', label: 'Finish Order' },
  ]
  
  return (
    <ul className="flex bg-gray-200 p-2 items-center">
      {statuses.map((s) => (
        <li key={s.id} className="flex">
          <input type="radio" id={s.id} name="orderStatus" className="hidden peer" checked={status === s.id} onChange={() => onStatusChange(s.id)}/>
          <label htmlFor={s.id} className="px-5 py-2 bg-gray-200 cursor-pointer hover:bg-white peer-checked:bg-white">
            {s.label}
          </label>
        </li>
      ))}
    </ul>
  )
}
  
export default OrderStatus
