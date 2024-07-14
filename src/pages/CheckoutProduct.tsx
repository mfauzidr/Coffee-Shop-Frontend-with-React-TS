import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductImg from "../assets/img/prod-2.png";
import OrderCard from "../components/OrderCard";
import OrderSummary from "../components/OrderSummary";
import PageHeader from "../components/PageHeader";
import PaymentInfo from "../components/PaymentInfo";

const CheckoutProduct = () => {
  const orderData = [
    {
      imageUrl: ProductImg,
      isFlashSale: true,
      name: 'Hazelnut Latte',
      quantity: 2,
      size: 'Regular',
      variant: 'Ice',
      type: 'Dine In',
      price: 40000,
    },
    {
      imageUrl: ProductImg,
      isFlashSale: true,
      name: 'Hazelnut Latte',
      quantity: 2,
      size: 'Regular',
      variant: 'Ice',
      type: 'Dine In',
      price: 40000,
    },
    {
      imageUrl: ProductImg,
      isFlashSale: true,
      name: 'Hazelnut Latte',
      quantity: 2,
      size: 'Regular',
      variant: 'Ice',
      type: 'Dine In',
      price: 40000,
    },
    {
      imageUrl: ProductImg,
      isFlashSale: true,
      name: 'Hazelnut Latte',
      quantity: 2,
      size: 'Regular',
      variant: 'Ice',
      type: 'Dine In',
      price: 40000,
    },
  ];

  return (
    <>
      <Navbar bgColor="bg-black" position="static" />
      <div className="flex flex-col mx-8 md:mx-16 lg:mx-32 mt-8 md:mt-16 h-auto gap-6">
        <PageHeader pageName="Payment Details" />
        <div className="block lg:flex gap-5">
          <div className="flex flex-col lg:w-2/3 gap-2.5 mb:2.5 lg:mb-0">
            <div className="flex justify-between items-center h-fit mb-3.5">
              <div className="text-lg lg:text-xl font-medium">Your Order</div>
              <button
                className="w-20 md:w-28 h-8 md:h-10 border border-amber-500 rounded-md bg-amber-500 font-semibold text-xs md:text-sm"
                onClick={() => (window.location.href = '/product')}
              >
                + Add Menu
              </button>
            </div>
            <div className="flex flex-col h-80 md:h-[450px] gap-2 md:gap-4 overflow-scroll md:p-3 bg-slate-50">
              {orderData.map((order, index) => (
                <OrderCard key={index} {...order} />
              ))}
            </div>
          </div>
          <OrderSummary orders={orderData} />
        </div>
        <PaymentInfo />
      </div>
      <Footer />
    </>
  );
};

export default CheckoutProduct;
