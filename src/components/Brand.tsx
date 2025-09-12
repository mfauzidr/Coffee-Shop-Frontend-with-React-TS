import { Link } from "react-router-dom";
import icon from "../assets/svg/Coffee.svg";

interface BrandProps {
  textColor: string;
  iconSize: string;
}

function Brand({ textColor, iconSize }: BrandProps) {
  return (
    <Link to="/" className="w-fit">
      <div
        style={{ color: textColor }}
        className={`flex font-brand flex-shrink-0 w-fit items-center`}
      >
        <img src={icon} alt="Coffee Shop" className={iconSize} />
        <div className="text-xl font-semibold ml-2 font-sacramento">
          Coffee House
        </div>
      </div>
    </Link>
  );
}

export default Brand;
