import React from 'react';

interface PromoCardProps {
  imgSrc: string;
  title: string;
  description: string;
  claimLink?: string;
  bgColor: string;
}

const PromoCard: React.FC<PromoCardProps> = ({ imgSrc, title, description, claimLink, bgColor }) => {
  return (
    <div className="flex-shrink-0 md:w-80 overflow-hidden">
      <div className={`flex items-center ${bgColor} rounded-3xl px-3 pb-0`}>
        <img className="w-16 md:w-24 " src={imgSrc} alt="" />
        <div className="w-48 md:w-56 text-sm">
          <div className="mb-3">
            <strong>{title}</strong>
            <p>{description}</p>
          </div>
          {claimLink && <a className="text-white" href={claimLink}>Claim Coupon</a>}
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
