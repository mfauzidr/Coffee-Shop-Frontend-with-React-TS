import Image1 from '../assets/img/payment-1.png';
import Image2 from '../assets/img/payment-2.png';
import Image3 from '../assets/img/payment-3.png';
import Image4 from '../assets/img/payment-4.png';
import Image5 from '../assets/img/payment-5.png';
import Image6 from '../assets/img/payment-6.png';
import { Button } from './Buttons';
import { OrderCardProps } from './OrderCard'; // Import the type correctly

interface OrderSummaryProps {
  orders: OrderCardProps[];
}

const OrderSummary = ({ orders }: OrderSummaryProps) => {
  const orderTotal = orders.reduce((total, order) => total + order.price, 0);

  const delivery = 0;

  const tax = 0.1 * orderTotal;

  const subtotal = orderTotal + delivery + tax;

  return (
    <div className="flex flex-col w-full lg:w-1/3 mt-4 lg:mt-0">
      <div className="flex justify-between items-center h-10 mb-3 md:mb-6">
        <div className="text-md md:text-xl font-medium">Total</div>
      </div>
      <div className="flex flex-col p-2.5 gap-3 md:gap-5 bg-gray-100 text-sm md:text-lg font-bold">
        <div className="flex justify-between">
          <div className="text-gray-700">Order</div>
          <div>IDR {orderTotal.toLocaleString('id')}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-700">Delivery</div>
          <div>IDR {delivery.toLocaleString('id')}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-700">Tax</div>
          <div>IDR {tax.toLocaleString('id')}</div>
        </div>
        <hr />
        <div className="flex justify-between">
          <div className="text-gray-700">Subtotal</div>
          <div>IDR {subtotal.toLocaleString('id')}</div>
        </div>
        <Button buttonName="Checkout" type="button" link="/history-order" />
        <div className="flex flex-col gap-3 md:gap-5 text-gray-600 text-sm font-medium">
          <div>We accept</div>
          <div className="flex justify-between items-center h-8 w-full">
            <div>
              <img src={Image1} alt="BRI" />
            </div>
            <div>
              <img src={Image2} alt="DANA" />
            </div>
            <div>
              <img src={Image3} alt="BCA" />
            </div>
            <div>
              <img src={Image4} alt="GOPAY" />
            </div>
            <div>
              <img src={Image5} alt="OVO" />
            </div>
            <div>
              <img src={Image6} alt="PAYPAL" />
            </div>
          </div>
          <div>*Get Discount if you pay with Bank Central Asia</div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
