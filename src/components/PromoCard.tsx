import React from 'react'

const PromoCard = ({ imgSrc, title, description, claimLink, bgColor }) => {
  return (
    <div className={`flex-shrink-0 w-80 overflow-hidden`}>
      <div className={`flex items-center ${bgColor} rounded-3xl px-3 pb-0`}>
        <img className="w-24" src={imgSrc} alt="" />
        <div className="w-56 text-sm">
          <div className="mb-3">
            <strong>{title}</strong>
            <p>{description}</p>
          </div>
          {claimLink && <a className="text-white" href={claimLink}>Klaim Kupon</a>}
        </div>
      </div>
    </div>
  )
}

export default PromoCard