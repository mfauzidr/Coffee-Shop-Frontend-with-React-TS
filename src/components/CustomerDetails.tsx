import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons'
import FeatherIcon from 'feather-icons-react'

interface CustomerDetailsProps {
  fullName: string;
  address: string;
  phone: string;
  payment: string;
  shipping: string;
  status: string;
  total: number;
}

const CustomerDetails = ({ fullName, address, phone, payment, shipping, status, total }: CustomerDetailsProps) => {
  return (
    <div className="flex flex-col divide-y">
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-sm md:text-base font-semibold gap-1 md:gap-2">
          <FeatherIcon size={18} icon="user" />
          Full Name
        </div>
        <div className="text-sm md:text-base font-bold">
          <Link to="/profile">{fullName}</Link>
        </div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-sm md:text-base font-semibold gap-1 md:gap-2">
          <FeatherIcon size={18} icon="map-pin" />
          Address
        </div>
        <div className="text-sm md:text-base font-bold">{address}</div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-sm md:text-base font-semibold gap-1 md:gap-2">
          <FeatherIcon size={18} icon="phone" />
          Phone
        </div>
        <div className="text-sm md:text-base font-bold">{phone}</div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-sm md:text-base font-semibold gap-1 md:gap-2">
          <FeatherIcon size={18} icon="credit-card" />
          Payment Method
        </div>
        <div className="text-sm md:text-base font-bold">{payment}</div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-sm md:text-base font-semibold gap-1 md:gap-2">
          <FeatherIcon size={18} icon="truck" />
          Shipping
        </div>
        <div className="text-sm md:text-base font-bold">{shipping}</div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-sm md:text-base font-semibold gap-1 md:gap-2 items-center">
          <FontAwesomeIcon icon={faArrowsSpin} size="lg" />
          Status
        </div>
        <div className="px-2.5 py-1 font-bold bg-green-200 rounded-full text-sm text-green-800">{status}</div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-sm md:text-base font-semibold gap-1 md:gap-2">
          Total Transaksi
        </div>
        <div className="font-bold text-amber-500">Idr {total.toLocaleString('id')}</div>
      </div>
    </div>
  )
}

export default CustomerDetails
