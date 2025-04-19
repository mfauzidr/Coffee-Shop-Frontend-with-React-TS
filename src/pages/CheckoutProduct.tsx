import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import OrderCard from "../components/OrderCard";
import OrderSummary from "../components/OrderSummary";
import PageHeader from "../components/PageHeader";
import PaymentInfo from "../components/PaymentInfo";
import { useStoreSelector } from "../redux/hooks";
import { AppDispatch, RootState } from "../redux/store";
import { deleteCarts, fetchCarts } from "../redux/slices/cart";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const CheckoutProduct = () => {
  const { carts } = useStoreSelector((state: RootState) => state.cart);
  const { token } = useStoreSelector((state: RootState) => state.auth);
  const [uuid, setUuid] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDeletedSuccessModal, setShowDeletedSuccessModal] = useState(false);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ uuid: string }>(token);
      setUuid(decodedToken.uuid);
    }
  }, [token]);

  useEffect(() => {
    dispatch(fetchCarts({ uuid }));
  }, [dispatch, uuid]);

  const handleConfirmDelete = async () => {
    if (selectedId !== null) {
      await dispatch(deleteCarts({ id: selectedId }));
      setShowDeleteConfirmModal(false);
      setShowDeletedSuccessModal(true);
    }
  };

  const handlerConfirmed = async () => {
    setShowDeletedSuccessModal(false);
    await dispatch(fetchCarts({ uuid }));
  };
  return (
    <>
      <div className="flex flex-col mx-8 md:mx-16 lg:mx-32 mt-8 md:mt-16 h-auto gap-6">
        <PageHeader pageName="Payment Details" />
        <div className="block lg:flex gap-5">
          <div className="flex flex-col lg:w-2/3 gap-2.5 mb:2.5 lg:mb-0">
            <div className="flex justify-between items-center h-fit mb-3.5">
              <div className="text-lg lg:text-xl font-medium">Your Order</div>
              <Link
                to="/product"
                className="flex items-center justify-center w-20 md:w-28 h-8 md:h-10 border border-amber-500 rounded-md bg-amber-500 font-semibold text-xs md:text-sm"
              >
                + Add Menu
              </Link>
            </div>
            <div className="flex flex-col h-80 md:h-[450px] gap-2 md:gap-4 overflow-scroll md:p-3 bg-slate-50">
              {carts.length > 0
                ? carts.map((items, index) => (
                    <OrderCard
                      key={items.id || `${items.productName}-${index}`}
                      {...items}
                      onClick={() => {
                        setSelectedId(items.id!);
                        setShowDeleteConfirmModal(true);
                      }}
                    />
                  ))
                : ""}
            </div>
          </div>
          <OrderSummary orders={carts} />
        </div>
        <PaymentInfo />
      </div>
      <Footer />
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              Delete this item from cart?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletedSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-green-600">
              Item deleted sucessfully!
            </h2>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-amber-500 text-white rounded-md"
                onClick={handlerConfirmed}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutProduct;
