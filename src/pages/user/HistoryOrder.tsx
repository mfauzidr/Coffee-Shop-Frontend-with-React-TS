import { useEffect, useState } from "react";
import OrderStatus from "../../components/OrderStatus";
import HistoryOrderCard from "../../components/HistoryOrderCard";
import PagePagination from "../../components/PagePagination";
import MessageSection from "../../components/MessageSection";
import { useStoreSelector } from "../../redux/hooks";
import { AppDispatch, RootState } from "../../redux/store";
import { jwtDecode } from "jwt-decode";
import { fetchOrders } from "../../redux/slices/order";
import { useDispatch } from "react-redux";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const HistoryOrder = () => {
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const { token } = useStoreSelector((state: RootState) => state.auth);
  const { orders, pageInfo, dataCount, isLoading, isRejected, error } =
    useStoreSelector((state: RootState) => state.order);

  const dispatch = useDispatch<AppDispatch>();
  const [uuid, setUuid] = useState<string>("");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ uuid: string }>(token);
      setUuid(decodedToken.uuid);
    }
  }, [token, uuid]);

  const currentPage = pageInfo?.currentPage || 1;

  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (uuid) {
      dispatch(
        fetchOrders({
          userId: uuid,
          page: currentPage,
          limit: 6,
          filters,
          currentPage,
        })
      );
    }
  }, [dispatch, filters, uuid, currentPage]);

  const handlePageChange = (page: string | number) => {
    dispatch(fetchOrders({ page, filters, currentPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const posts = orders.map((order) => ({
    uuid: order.uuid,
    image: order.image,
    orderNumber: order.orderNumber,
    date: format(parseISO(order.createdAt), "dd MMM yyyy", { locale: id }),
    total: order.subtotal,
    status: order.status,
  }));

  const statusChange = (newStatus: string) => {
    setOrderStatus(newStatus);
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: newStatus,
    }));
  };

  const handleDateChange = (newValue: DateValueType) => {
    setDate(newValue);

    setFilters((prev) => ({
      ...prev,
      startDate: newValue?.startDate ? newValue.startDate.toISOString() : "",
      endDate: newValue?.endDate ? newValue.endDate.toISOString() : "",
    }));
  };

  return (
    <>
      <div className="flex flex-col mx-8 md:mx-16 lg:mx-32 my-8 md:my-16 h-auto gap-2.5 md:gap-5">
        <div className="flex w-full items-end gap-5 md:gap-7 mb-5 md:mb-9">
          <h1 className="text-2xl md:text-5xl font-medium">History Order</h1>
          <div className="bg-gray-200 px-2 md:px-4 py-1 md:py-2.5 text-sm md:text-base">
            {dataCount}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row md:justify-between gap-5 w-full">
          <div className="flex flex-col w-full">
            <div className="flex md:hidden max-w-56 mb-4">
              <Datepicker
                primaryColor="amber"
                displayFormat="DD MMM YYYY"
                separator="-"
                maxDate={new Date(new Date().setHours(0, 0, 0, 0))}
                useRange={false}
                inputClassName={
                  "w-full md:w-64 bg-gray-100 rounded p-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-300"
                }
                value={date}
                onChange={handleDateChange}
              />
            </div>
            <div className="flex w-full">
              <form className="flex justify-between w-full">
                <OrderStatus
                  status={orderStatus}
                  onStatusChange={statusChange}
                />
                <div className="hidden md:flex bg-gray-100 h-auto items-center md:p-1 lg:p-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-300">
                  <Datepicker
                    primaryColor="amber"
                    displayFormat="DD MMM YYYY"
                    separator="-"
                    maxDate={new Date(new Date().setHours(0, 0, 0, 0))}
                    useRange={false}
                    inputClassName={
                      "w-full md:w-64 bg-gray-100 rounded md:p-1 lg:p-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-300"
                    }
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-col gap-3 mt-9 w-full">
              {isLoading && <div className=" ml-4">Loading...</div>}
              {!isLoading &&
                !isRejected &&
                posts.map((history) => (
                  <HistoryOrderCard
                    key={history.uuid}
                    {...history}
                    total={Number(history.total)}
                  />
                ))}
              {!isLoading && isRejected && (
                <div className="text-red-500 ml-4">
                  {error?.message || "Failed to load orders."}
                </div>
              )}
            </div>
            <PagePagination
              currentPage={pageInfo.currentPage}
              pages={pageInfo.pages}
              onPageChange={handlePageChange}
            />
          </div>
          <MessageSection />
        </div>
      </div>
    </>
  );
};

export default HistoryOrder;
