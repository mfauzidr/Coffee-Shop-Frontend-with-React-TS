import { useEffect, useState } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OrderStatus from "../components/OrderStatus";
import DatePicker from "../components/DatePicker";
import HistoryOrderCard from "../components/HistoryOrderCard";
import PagePagination from "../components/PagePagination";
import MessageSection from "../components/MessageSection";
import { useStoreSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { parseISO, format } from 'date-fns';
import { id } from 'date-fns/locale';


interface HistoryOrderData {
    imageUrl?: string;
    orderNumber: string;
    date: string;
    total: string;
    status: string;
}

interface HistoryPostData {
    imageUrl?: string;
    orderNumber: string;
    createdAt: string;
    subtotal: string;
    status: string;
}

interface PageInfo {
    currentPage: number;
    totalPage: number;
}

const HistoryOrder = () => {
    const [posts, setPosts] = useState<HistoryOrderData[]>([]);
    const [orderStatus, setOrderStatus] = useState<string>('onProgress');
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { token } = useStoreSelector((state: RootState) => state.auth);
    const [userId, setUserId] = useState<string>();

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode<{ id: string }>(token);
            setUserId(decodedToken.id);
        }
    }, [token]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const url = `https://coffee-shop-backend-with-typescript.vercel.app/orders`;
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: {
                        userId: userId
                    }
                });
                if (res.data && res.data.results) {
                    setPosts(res.data.results.map((order: HistoryPostData) => ({
                        imageUrl: order.imageUrl || '',
                        orderNumber: order.orderNumber || '',
                        date: format(parseISO(order.createdAt), 'dd MMMM yyyy', { locale: id }) || '',
                        total: order.subtotal || '',
                        status: order.status || ''
                    })));
                    setPageInfo({
                        currentPage: res.data.currentPage,
                        totalPage: res.data.totalPages
                    });
                } else {
                    console.error("Invalid API response structure:", res.data);
                }
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        }
        if (userId) {
            getOrders();
        } else {
            console.error("User ID is undefined");
        }
    }, [token, userId, currentPage]);

    const statusChange = (newStatus: string) => {
        setOrderStatus(newStatus);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            <Navbar bgColor={'bg-black'} position="static" />
            <div className="flex flex-col mx-16 lg:mx-32 my-8 md:my-16 h-auto gap-2.5 lg:gap-5">
                <div className="flex w-full items-end gap-5 lg:gap-7 mb-5 lg:mb-9">
                    <h1 className="text-2xl lg:text-5xl font-medium">History Order</h1>
                    <div className="bg-gray-200 px-2 lg:px-4 py-1 lg:py-2.5 text-sm lg:text-base">{posts.length}</div>
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
                            {posts.map((history, index) => (
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
