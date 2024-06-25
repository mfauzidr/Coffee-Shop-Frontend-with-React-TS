import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HistoryOrderCard = ({ imageUrl, orderNumber, date, total, status }) => {
  return (
    <div className="flex flex-col gap-3 px-3 py-2.5 bg-gray-200">
      <div className="flex justify-between gap-8">
        <div className="flex w-28">
          <img className="" src={imageUrl} alt="" />
        </div>
        <div className="flex flex-col gap-2.5 text-base">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon="fa-solid fa-glass-water" />
            No. Order
          </div>
          <div className="font-bold">{orderNumber}</div>
          <div className="mt-1 text-sm text-amber-500 underline">
            <Link to="/detail-order">Views Order Detail</Link>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
            Date
          </div>
          <div className="font-bold">{date}</div>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon="w-4 h-4" data-feather="repeat" />
            Total
          </div>
          <div className="font-bold">Idr {total}</div>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon="fa-solid fa-arrows-spin" />
            Status
          </div>
          <div className="py-1 px-2.5 bg-orange-200 text-amber-600 rounded-full text-xs font-bold">
            {status}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryOrderCard
