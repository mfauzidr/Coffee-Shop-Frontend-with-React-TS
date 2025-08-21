import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faGlassWater,
  faArrowsSpin,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

import noImg from "../assets/img/no-image.webp";

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
  const statusClasses: Record<string, string> = {
    "On-Process": "bg-orange-200 text-amber-600",
    "Sending-Goods": "bg-blue-200 text-blue-600",
    Success: "bg-green-200 text-green-600",
    Cancelled: "bg-red-300 text-red-600",
  };

  return (
    <div className="flex flex-col gap-3 px-3 2xl:px-6 py-2.5 bg-gray-100 justify-between lg:max-w-lg xl:max-w-full">
      <div className="flex gap-6 md:gap-8">
        <div className="flex w-14 h-14 md:w-28 md:h-28">
          <img
            className="aspect-square object-cover"
            src={image ? image : noImg}
            alt=""
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-2 md:flex md:justify-between gap-3 md:gap-8 2xl:gap-10">
            <div className="flex flex-col gap-1 md:gap-2.5 w-20 md:w-32 text-xs md:text-sm lg:text-base">
              <div className="flex items-center gap-2 ">
                <FontAwesomeIcon icon={faGlassWater as IconProp} />
                No. Order
              </div>
              <div className="font-extrabold text-xs lg:text-sm">
                {orderNumber}
              </div>
            </div>
            <div className="flex flex-col gap-1 md:gap-2.5 w-20 xl:w-32 text-xs md:text-sm lg:text-base xl:text-lg">
              <div className="flex items-center gap-2 ">
                <FontAwesomeIcon icon={faCalendarDays as IconProp} />
                Date
              </div>
              <div className="font-extrabold text-xs lg:text-sm">{date}</div>
            </div>
            <div className="flex flex-col gap-1 md:gap-2.5 w-[68px] lg:w-auto text-xs md:text-sm lg:text-base xl:text-lg">
              <div className="flex items-center gap-2 ">
                <FontAwesomeIcon icon={faRepeat as IconProp} />
                Total
              </div>
              <div className="font-extrabold text-xs lg:text-sm">
                Rp. {total}
              </div>
            </div>
            <div className="flex flex-col gap-1 md:gap-2.5 w-28 text-xs md:text-sm lg:text-base xl:text-lg">
              {status && (
                <div className="flex items-center gap-2 ">
                  <FontAwesomeIcon icon={faArrowsSpin as IconProp} />
                  Status
                </div>
              )}
              <div
                className={`flex py-1 px-2.5 rounded-full text-xs lg:text-sm font-bold justify-center ${
                  statusClasses[status] || "bg-gray-200 text-gray-600"
                } `}
              >
                {status}
              </div>
            </div>
          </div>
          <div className="flex items-end text-xs md:text-sm text-amber-500 underline pb-2">
            <Link to={`/detail-order/${uuid}`}>View Order Detail</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryOrderCard;
