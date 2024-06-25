import React from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import OrderStatus from "../components/OrderStatus"
import DatePicker from "../components/DatePicker"
import HistoryOrderCard from "../components/HistoryOrderCard"
import Image1 from '../assets/img/home-p-1.png'
import Image2 from '../assets/img/home-p-2.png'
import Image3 from '../assets/img/home-p-3.png'
import Image4 from '../assets/img/home-p-4.png'
import PagePagination from "../components/PagePagination"
import MessageSection from "../components/MessageSection"

const HistoryOrder = () =>{
    const [orderStatus, setOrderStatus] = React.useState('onProgress')
    const statusChange = (newStatus) => {
        setOrderStatus(newStatus)
    }

    const historyData = [
        {
          imageUrl: Image1,
          orderNumber: '#12354-09893',
          date: '21 January 2023',
          total: '20,000',
          status: 'On Progress',
        },
        {
          imageUrl: Image2,
          orderNumber: '#12354-09894',
          date: '22 January 2023',
          total: '30,000',
          status: 'On Progress',
        },
        {
          imageUrl: Image3,
          orderNumber: '#12354-09895',
          date: '23 January 2023',
          total: '40,000',
          status: 'On Progress',
        },
        {
          imageUrl: Image4,
          orderNumber: '#12354-09896',
          date: '24 January 2023',
          total: '50,000',
          status: 'On Progress',
        },
      ]

    return(
        <>
        <Navbar bgColor={'bg-black'}/>
        <div className="flex flex-col mx-32 my-32 h-auto gap-5">
            <div className="flex w-full items-end gap-7 mb-9">
                <h1 className="text-5xl font-medium">History Order</h1>
                <div className="bg-gray-200 px-4 py-2.5">2</div>
            </div>
            <div className="flex gap-5">
                <div className="flex flex-col">
                    <div className="flex">
                        <form className="flex flex-1 justify-between">
                            <OrderStatus status={orderStatus} onStatusChange={statusChange} />
                            <DatePicker />
                        </form>
                    </div>
                    <div className="flex flex-col gap-3 mt-9">
                        {historyData.map((history, index) => (
                            <HistoryOrderCard key={index} {...history} />
                        ))}
                    </div>
                    <PagePagination />
                </div>
                <MessageSection />
            </div>
        </div>
        <Footer />
        </>
    )
}

export default HistoryOrder