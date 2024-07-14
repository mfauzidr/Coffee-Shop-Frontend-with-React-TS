import React, { useState } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OrderStatus from "../components/OrderStatus";
import DatePicker from "../components/DatePicker";
import HistoryOrderCard from "../components/HistoryOrderCard";
import Image1 from '../assets/img/home-p-1.png';
import Image2 from '../assets/img/home-p-2.png';
import Image3 from '../assets/img/home-p-3.png';
import Image4 from '../assets/img/home-p-4.png';
import PagePagination from "../components/PagePagination";
import MessageSection from "../components/MessageSection";

interface HistoryOrderData {
    imageUrl: string;
    orderNumber: string;
    date: string;
    total: string;
    status: string;
}
interface PageInfo {
    currentPage: number;
    totalPage: number;
}

const HistoryOrder: React.FC = () => {
    const [orderStatus, setOrderStatus] = useState<string>('onProgress');
    const pageInfo = { currentPage: 1, totalPage: 1 } as PageInfo
    const [currentPage, setCurrentPage] = useState<number>(1);

    const statusChange = (newStatus: string) => {
        setOrderStatus(newStatus);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const historyData: HistoryOrderData[] = [
        {
            imageUrl: Image1,
            orderNumber: '#12354-09893',
            date: '21 January 2023',
            total: '20000',
            status: 'On Progress',
        },
        {
            imageUrl: Image2,
            orderNumber: '#12354-09894',
            date: '22 January 2023',
            total: '30000',
            status: 'On Progress',
        },
        {
            imageUrl: Image3,
            orderNumber: '#12354-09895',
            date: '23 January 2023',
            total: '40000',
            status: 'On Progress',
        },
        {
            imageUrl: Image4,
            orderNumber: '#12354-09896',
            date: '24 January 2023',
            total: '50000',
            status: 'On Progress',
        },
    ];

    return (
        <>
            <Navbar bgColor={'bg-black'} position="static" />
            <div className="flex flex-col mx-16 lg:mx-32 my-8 md:my-16 h-auto gap-2.5 lg:gap-5">
                <div className="flex w-full items-end gap-5 lg:gap-7 mb-5 lg:mb-9">
                    <h1 className="text-2xl lg:text-5xl font-medium">History Order</h1>
                    <div className="bg-gray-200 px-2 lg:px-4 py-1 lg:py-2.5 text-sm lg:text-base">2</div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="flex flex-col">
                        <DatePicker responsiveDisplay='block md:hidden w-fit mb-4' />
                        <div className="flex">
                            <form className="flex flex-1 justify-between">
                                <OrderStatus status={orderStatus} onStatusChange={statusChange} />
                                <DatePicker responsiveDisplay='hidden md:flex' />
                            </form>
                        </div>
                        <div className="flex flex-col gap-3 mt-9">
                            {historyData.map((history, index) => (
                                <HistoryOrderCard key={index} {...history} total={Number(history.total)} />
                            ))}
                        </div>
                        <PagePagination pages={pageInfo?.totalPage || 0} currentPage={currentPage} onPageChange={handlePageChange} />
                    </div>
                    <MessageSection />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HistoryOrder;
