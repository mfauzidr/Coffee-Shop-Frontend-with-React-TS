import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import OrderCard from "../components/OrderCard";
import OrderSummary from "../components/OrderSummary";
import PageHeader from "../components/PageHeader";
import PaymentInfo from "../components/PaymentInfo";
import { useStoreSelector } from "../redux/hooks";
import { AppDispatch, RootState } from "../redux/store";
import { fetchCarts } from "../redux/slices/cart";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const CheckoutProduct = () => {
  const { carts } = useStoreSelector((state: RootState) => state.cart);
  const { token } = useStoreSelector((state: RootState) => state.auth);
  const [uuid, setUuid] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ uuid: string }>(token);
      setUuid(decodedToken.uuid);
    }
  }, [token]);

  useEffect(() => {
    dispatch(fetchCarts({ uuid }));
  }, [dispatch, uuid]);

  return (
    <>
      <div className="flex flex-col mx-8 md:mx-16 lg:mx-32 mt-8 md:mt-16 h-auto gap-6">
        <PageHeader pageName="Payment Details" />
        <div className="block lg:flex gap-5">
          <div className="flex flex-col lg:w-2/3 gap-2.5 mb:2.5 lg:mb-0">
            <div className="flex justify-between items-center h-fit mb-3.5">
              <div className="text-lg lg:text-xl font-medium">Your Order</div>
              <button
                className="w-20 md:w-28 h-8 md:h-10 border border-amber-500 rounded-md bg-amber-500 font-semibold text-xs md:text-sm"
                onClick={() => (window.location.href = "/product")}
              >
                + Add Menu
              </button>
            </div>
            <div className="flex flex-col h-80 md:h-[450px] gap-2 md:gap-4 overflow-scroll md:p-3 bg-slate-50">
              {carts.map((items, index) => (
                <OrderCard
                  key={items.id || `${items.productName}-${index}`}
                  {...items}
                />
              ))}
            </div>
          </div>
          <OrderSummary orders={carts} />
        </div>
        <PaymentInfo />
      </div>
      <Footer />
    </>
  );
};

export default CheckoutProduct;
