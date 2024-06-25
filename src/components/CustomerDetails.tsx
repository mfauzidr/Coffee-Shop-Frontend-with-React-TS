import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React from 'react'
import { Link } from 'react-router-dom'

const CustomerDetails = ({fullName, address, phone, payment, shipping, status, total}) => {
  return (
    <div className="flex flex-col divide-y">
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-base font-semibold gap-2">
          <FeatherIcon icon="user" />
          Full Name
        </div>
        <div className="font-bold">
          <Link to="/profile">{fullName}</Link>
        </div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-base font-semibold gap-2">
          <FeatherIcon icon="map-pin" />
          Address
        </div>
        <div className="font-bold">{address}</div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-base font-semibold gap-2">
          <FeatherIcon icon="phone" />
          Phone
        </div>
        <div className="font-bold">{phone}</div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-base font-semibold gap-2">
          <FeatherIcon icon="credit-card" />
          Payment Method
        </div>
        <div className="font-bold">{payment}</div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-base font-semibold gap-2">
          <FeatherIcon icon="truck" />
          Shipping
        </div>
        <div className="font-bold">{shipping}</div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-base font-semibold gap-2 items-center">
          <FontAwesomeIcon icon="fa-solid fa-arrows-spin fa-lg" />
          Status
        </div>
        <div className="px-2.5 py-1 font-bold bg-green-200 rounded-full text-sm text-green-800">{status}</div>
      </div>
      <div className="flex justify-between px-2.5 py-5">
        <div className="flex text-gray-600 text-base font-semibold gap-2">
          Total Transaksi
        </div>
        <div className="font-bold text-amber-500">Idr {total.toLocaleString('id')}</div>
      </div>
    </div>
  )
}

export default CustomerDetails
