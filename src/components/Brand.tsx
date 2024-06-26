import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

interface BrandProps {
  textColor: string;
}


function Brand({ textColor }: BrandProps) {
  return (
    <Link to='/'>
      <div className={`flex text-${textColor} font-brand flex-shrink-0`}>
        <i>
          <FeatherIcon icon="coffee" className="h-5 w-5" />
        </i>
        <div className="text-xl ml-3 font-sacramento">
          Coffee Shop
        </div>
      </div>
    </Link>
  )
}

export default Brand;
