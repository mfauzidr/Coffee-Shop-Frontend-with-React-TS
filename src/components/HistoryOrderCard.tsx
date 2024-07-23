import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faGlassWater, faArrowsSpin, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'

interface HistoryOrderCardProps {
  imageUrl?: string;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
}

const HistoryOrderCard = ({ imageUrl, orderNumber, date, total, status }: HistoryOrderCardProps) => {
  return (
    <div className="flex flex-col gap-3 px-3 py-2.5 bg-gray-100">
      <div className="flex justify-between gap-6 md:gap-8">
        <div className="hidden md:flex w-28 h-28">
          <img src={imageUrl} alt="" />
        </div>
        <div className='block'>
          <div className='grid grid-cols-2 md:flex gap-6 md:gap-8'>

            <div className="flex flex-col gap-2.5 text-base">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faGlassWater as IconProp} />
                No. Order
              </div>
              <div className="font-bold">{orderNumber}</div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarDays as IconProp} />
                Date
              </div>
              <div className="font-bold">{date}</div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faRepeat as IconProp} />
                Total
              </div>
              <div className="font-bold">Idr {total}</div>
            </div>
            <div className="flex flex-col gap-2.5">
              {status && (
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faArrowsSpin as IconProp} />
                  Status
                </div>)}
              <div className="py-1 px-2.5 bg-orange-200 text-amber-600 rounded-full text-xs font-bold">
                {status}
              </div>
            </div>
          </div>
          <div className="block text-sm text-amber-500 underline">
            <Link to="/detail-order">View Order Detail</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryOrderCard
