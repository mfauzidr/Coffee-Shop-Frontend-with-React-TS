import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faGlassWater,
  faArrowsSpin,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

interface HistoryOrderCardProps {
  uuid: string;
  image?: string;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
}

const HistoryOrderCard = ({
  uuid,
  image,
  orderNumber,
  date,
  total,
  status,
}: HistoryOrderCardProps) => {
  return (
    <div className="flex flex-col gap-3 px-3 py-2.5 bg-gray-100 justify-between">
      <div className="flex gap-6 md:gap-8">
        <div className="hidden md:flex w-28 h-28">
          <img className="aspect-square object-cover" src={image} alt="" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-2 md:flex gap-6 md:gap-8 2xl:gap-10">
            <div className="flex flex-col gap-2.5 w-32">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faGlassWater as IconProp} />
                No. Order
              </div>
              <div className="font-extrabold text-xs">{orderNumber}</div>
            </div>
            <div className="flex flex-col gap-2.5 w-20">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarDays as IconProp} />
                Date
              </div>
              <div className="font-extrabold text-xs">{date}</div>
            </div>
            <div className="flex flex-col gap-2.5 w-[68px]">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faRepeat as IconProp} />
                Total
              </div>
              <div className="font-extrabold text-xs">Rp. {total}</div>
            </div>
            <div className="flex flex-col gap-2.5 w-28">
              {status && (
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faArrowsSpin as IconProp} />
                  Status
                </div>
              )}
              <div className="py-1 px-2.5 bg-orange-200 text-amber-600 rounded-full text-xs font-bold">
                {status}
              </div>
            </div>
          </div>
          <div className="flex items-end text-sm text-amber-500 underline pb-2">
            <Link to={`/detail-order/${uuid}`}>View Order Detail</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryOrderCard;
