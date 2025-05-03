import CustomerDetails from "../components/CustomerDetails";
import Footer from "../components/Footer";
import OrderCard from "../components/OrderCard";
import ProductImg from "../assets/img/prod-2.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStoreSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface ICustomerDetails {
  orderNumber: string;
  fullName: string;
  address: string;
  phone: string;
  payment: string;
  shipping: string;
  status: string;
  subtotal: number;
  date: string;
}

const DetailOrder = () => {
  const { token } = useStoreSelector((state: RootState) => state.auth);
  const { uuid } = useParams<{ uuid: string }>();
  const [details, setDetails] = useState<ICustomerDetails>();

  const date = format(new Date(details!.date), "dd MMMM yyyy, HH:mm", {
    locale: id,
  });

  useEffect(() => {
    const getCustomer = async (uuid: string) => {
      try {
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/orders/${uuid}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { uuid },
        });
        if (res.data && res.data.results && res.data.results.length > 0) {
          setDetails(res.data.results[0]);
        } else {
          console.error("Invalid API response structure:", res.data);
        }
      } catch (error) {
        console.error("Error fetching cust data:", error);
      }
    };

    if (uuid) {
      getCustomer(uuid);
    } else {
      console.error("UUID is undefined");
    }
  }, [token, uuid]);

  const orderData = [
    {
      id: 1,
      image: ProductImg,
      isFlashSale: true,
      productName: "Hazelnut Latte",
      quantity: 2,
      size: "Regular",
      variant: "Ice",
      type: "Dine In",
      subtotal: 40000,
      showRemoveBtn: false,
    },
    {
      id: 2,
      image: ProductImg,
      isFlashSale: true,
      productName: "Hazelnut Latte",
      quantity: 2,
      size: "Regular",
      variant: "Ice",
      type: "Dine In",
      subtotal: 40000,
      showRemoveBtn: false,
    },
  ];

  // const customer = customerData[0];

  return (
    <>
      <div className="flex flex-col mx-16 lg:mx-32 mt-8 lg:mt-16 h-auto gap-5">
        <div className="flex flex-col w-full gap-2.5">
          <h1 className="text-2xl lg:text-5xl font-medium">
            Order :{" "}
            <span className="text-xl md:text-4xl">{details?.orderNumber}</span>
          </h1>
          <div className="text-sm lg:text-base text-gray-600">{date}</div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1 flex-col ">
            <div className="flex justify-between items-center h-fit mb-3.5">
              <div className="text-base lg:text-xl font-medium">
                Order Information
              </div>
            </div>
            <CustomerDetails {...details} />
          </div>
          <div className="flex flex-1 flex-col gap-2.5 mb-10">
            <div className="flex justify-between items-center h-fit mb-3.5">
              <div className="text-xl font-medium">Your Order</div>
            </div>
            {orderData.map((order, index) => (
              <OrderCard key={index} {...order} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailOrder;
