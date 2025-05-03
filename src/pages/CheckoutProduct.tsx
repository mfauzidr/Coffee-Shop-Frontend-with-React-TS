import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import OrderCard from "../components/OrderCard";
import OrderSummary from "../components/OrderSummary";
import PageHeader from "../components/PageHeader";
import PaymentInfo from "../components/PaymentInfo";
import { useStoreSelector } from "../redux/hooks";
import { AppDispatch, RootState } from "../redux/store";
import {
  deleteAllCarts,
  deleteCarts,
  editCart,
  fetchCarts,
} from "../redux/slices/cart";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile } from "../redux/slices/profile";
import { createOrder } from "../redux/slices/order";
import Swal from "sweetalert2";

const CheckoutProduct = () => {
  const { carts } = useStoreSelector((state: RootState) => state.cart);
  const { token } = useStoreSelector((state: RootState) => state.auth);
  const { profile } = useStoreSelector((state: RootState) => state.profile);
  const [uuid, setUuid] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDeletedSuccessModal, setShowDeletedSuccessModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [deliveryMethod, setDeliveryMethod] = useState<string>("");
  const navigate = useNavigate();
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [editedCarts, setEditedCarts] = useState(carts);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ uuid: string }>(token);
      setUuid(decodedToken.uuid);
    }
  }, [token]);

  useEffect(() => {
    if (uuid) dispatch(fetchCarts({ uuid }));
  }, [dispatch, uuid]);

  useEffect(() => {
    if (token && uuid) dispatch(fetchProfile({ uuid }));
  }, [dispatch, token, uuid]);

  const handleEditItems = () => {
    setEditToggle(true);
  };

  const handleSaveItems = async () => {
    const updatedCarts = editedCarts.map((item) => ({
      id: item.id,
      productSizeId: item.sizeId,
      productVariantId: item.variantId,
      quantity: item.quantity,
    }));

    await dispatch(editCart({ updates: updatedCarts }));

    await dispatch(fetchCarts({ uuid }));
    setEditToggle(false);
    Swal.fire({
      title: "Success!",
      text: "Cart has been updated.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      position: "top-end",
      customClass: {
        popup:
          "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
      },
      toast: true,
    });
  };

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

  const handleCheckout = async () => {
    if (!deliveryMethod) {
      Swal.fire({
        title: "Failed!",
        text: "Please select a delivery method to proceed with checkout.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "Okay",
        customClass: {
          popup:
            "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
      });
      return;
    }
    try {
      const orderData = {
        userId: uuid,
        fullName: profile.fullName || "",
        email: profile.email || "",
        deliveryAddress,
        deliveryMethod,
        productId: carts.map((item) => String(item.productId)),
        sizeId: carts.map((item) => Number(item.sizeId)),
        variantId: carts.map((item) => Number(item.variantId)),
        qty: carts.map((item) => Number(item.quantity)),
      };

      await dispatch(createOrder(orderData)).unwrap();

      Swal.fire({
        title: "Success!",
        text: "Order has been created!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup:
            "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
      });

      await dispatch(deleteAllCarts({ userId: uuid })).unwrap();
      setTimeout(() => {
        navigate("/history-order");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      Swal.fire({
        title: "Failed!",
        text: "Failed to add product to cart.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "Okay",
        timer: 2000,
        customClass: {
          popup:
            "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
      });
    }
  };

  return (
    <>
      <div className="flex flex-col mx-8 md:mx-16 lg:mx-32 mt-8 md:mt-16 h-auto gap-6">
        <PageHeader pageName="Payment Details" />
        <div className="block lg:flex gap-5">
          <div className="flex flex-col lg:w-2/3 gap-2.5 mb:2.5 lg:mb-0">
            <div className="flex justify-between items-center h-fit mb-3.5">
              <div className="text-lg lg:text-xl font-medium">Your Order</div>
              <div className="flex gap-4">
                <Link
                  to="/product"
                  className="flex items-center justify-center w-20 md:w-28 h-8 md:h-10 border border-amber-500 rounded-md bg-amber-500 font-semibold text-xs md:text-sm"
                >
                  + Add Menu
                </Link>
                <button
                  type="button"
                  className="flex items-center justify-center w-20 md:w-28 h-8 md:h-10 border border-amber-500 rounded-md bg-amber-500 font-semibold text-xs md:text-sm"
                  onClick={editToggle ? handleSaveItems : handleEditItems}
                >
                  {editToggle ? "Save" : "Edit"}
                </button>
              </div>
            </div>
            <div className="flex flex-col max-h-80 md:max-h-[450px] gap-2 md:gap-4 overflow-scroll md:p-3 bg-slate-50">
              {carts.length > 0 ? (
                carts.map((items, index) => (
                  <OrderCard
                    isEdit={editToggle}
                    key={items.id || `${items.productName}-${index}`}
                    {...items}
                    onClick={() => {
                      setSelectedId(items.id!);
                      setShowDeleteConfirmModal(true);
                    }}
                    onUpdate={(updatedItem) => {
                      setEditedCarts((prevCarts) =>
                        prevCarts.map((item) =>
                          item.id === updatedItem.id
                            ? { ...item, ...updatedItem }
                            : item
                        )
                      );
                    }}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-700">
                  Your cart is empty. Add items to continue!
                </p>
              )}
            </div>
          </div>
          <OrderSummary orders={carts} onClick={handleCheckout} />
        </div>
        <PaymentInfo
          email={profile.email}
          fullname={profile.fullName}
          address={profile.address}
          deliveryMethod={deliveryMethod}
          onChange={({ address, deliveryMethod }) => {
            setDeliveryAddress(address);
            setDeliveryMethod(deliveryMethod);
          }}
        />
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
              Item deleted successfully!
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
