import CustomerDetails from "../components/CustomerDetails"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import OrderCard from "../components/OrderCard"
import ProductImg from "../assets/img/prod-2.png"

const DetailOrder = () =>{
    const customerData = [
        {
            fullName: 'Ghaluh Wizard Anggoro',
            address: 'Griya bandung indah',
            phone: '082116304338',
            payment: 'Cash',
            shipping: 'Dine In',
            status: 'Done',
            total: 40000,
        }
    ]

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
          showRemoveBtn: false,
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
          showRemoveBtn: false,
        },
    ]

    const customer = customerData[0]

    return (
        <>
        <Navbar bgColor={'bg-black'} />

        <div className="flex flex-col mx-32 my-32 h-auto gap-5">
            <div className="flex flex-col w-full gap-2.5">
                <h1 className="text-5xl font-medium">Order <span className="font-bold">#12354-09893</span></h1>
                <div className="text-gray-600">21 March 2023 at 10:30 AM</div>
            </div>
            <div className="flex gap-5">
                <div className="flex-1 flex-col ">
                    <div className="flex justify-between items-center h-fit mb-3.5">
                        <div className="text-xl font-medium">Order Information</div>
                    </div>
                    <CustomerDetails {...customer}
                    />
                </div>
                <div className="flex flex-1 flex-col gap-2.5">
                    <div className="flex justify-between items-center h-fit mb-3.5">
                        <div className="text-xl font-medium">Your Order</div>
                        <button className="w-28 h-10 border border-amber-500 rounded-md bg-amber-500 font-semibold text-sm" 
                        onClick={() => (window.location.href = '/product')}>
                            + Add Menu
                        </button>
                    </div>
                    {orderData.map((order, index) => (
                        <OrderCard key={index} {...order} />
                    ))}
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default DetailOrder