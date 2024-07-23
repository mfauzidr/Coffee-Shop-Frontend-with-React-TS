// import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-regular-svg-icons';

interface RatingStarProps {
  rating: number
  gap?: string
  size?: string
}

const RatingStar = ({ rating, gap = '', size = '' }: RatingStarProps) => {
  const maxRating = 5
  const starElements = []

  for (let i = 1; i <= maxRating; i++) {
    const starColor = i <= rating ? '#F59E0B' : '#ECEEF0'

    starElements.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
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
