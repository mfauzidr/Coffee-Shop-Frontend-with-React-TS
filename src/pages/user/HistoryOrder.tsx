import { useEffect, useState } from "react";
import OrderStatus from "../../components/OrderStatus";
import DatePicker from "../../components/DatePicker";
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

const HistoryOrder = () => {
  const [orderStatus, setOrderStatus] = useState<string>("onProgress");

  const { token } = useStoreSelector((state: RootState) => state.auth);
  const { orders, pageInfo, dataCount } = useStoreSelector(
    (state: RootState) => state.order
  );

  const dispatch = useDispatch<AppDispatch>();
  const [uuid, setUuid] = useState<string>("");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ uuid: string }>(token);
      setUuid(decodedToken.uuid);
      setFilters((prev) => ({ ...prev, userId: uuid }));
    }
  }, [token, uuid]);

  const currentPage = pageInfo?.currentPage || 1;

  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (token && uuid) {
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
  }, [dispatch, token, filters, uuid, currentPage]);

  const handlePageChange = (page: string | number) => {
    dispatch(fetchOrders({ page, filters, currentPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const posts = orders.map((order) => ({
    uuid: order.uuid,
    image: order.image,
    orderNumber: order.orderNumber,
    date: format(parseISO(order.createdAt), "dd MMMM yyyy", { locale: id }),
    total: order.subtotal,
    status: order.status,
  }));

  const statusChange = (newStatus: string) => {
    setOrderStatus(newStatus);
  };

  return (
    <>
      <div className="flex flex-col mx-16 md:mx-32 my-8 md:my-16 h-auto gap-2.5 md:gap-5">
        <div className="flex w-full items-end gap-5 md:gap-7 mb-5 md:mb-9">
          <h1 className="text-2xl md:text-5xl font-medium">History Order</h1>
          <div className="bg-gray-200 px-2 md:px-4 py-1 md:py-2.5 text-sm md:text-base">
            {dataCount}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between gap-5">
          <div className="flex flex-col">
            <DatePicker responsiveDisplay="block md:hidden w-fit mb-4" />
            <div className="flex">
              <form className="flex flex-1 justify-between">
                <OrderStatus
                  status={orderStatus}
                  onStatusChange={statusChange}
                />
                <DatePicker responsiveDisplay="hidden md:flex" />
              </form>
            </div>
            <div className="flex flex-col gap-3 mt-9">
              {posts.map((history) => (
                <HistoryOrderCard
                  key={history.uuid}
                  {...history}
                  total={Number(history.total)}
                />
              ))}
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
