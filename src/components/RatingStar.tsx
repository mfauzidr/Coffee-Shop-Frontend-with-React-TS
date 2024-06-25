// import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RatingStar = ({ rating ,gap, size }) => {
  const maxRating = 5
  const starElements = []

  for (let i = 1; i <= maxRating; i++) {
    const starColor = i <= rating ? '#F59E0B' : '#ECEEF0'

    starElements.push(
      <FontAwesomeIcon
        key={i}
        icon="fa-solid fa-star"
        style={{ color: starColor }}
        className="text-lg"
      />
    )
  }

  return (
    <div className={`flex ${gap} ${size} items-center`}>
      {starElements}
      <span>{rating}</span>
    </div>
  )
}

export default RatingStar
