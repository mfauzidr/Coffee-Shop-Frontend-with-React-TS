import CouponList from "../components/CouponList"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProductGrid from "../components/ProductGrid"
import ProductHeader from "../components/ProductHeader"
import FilterSidebar from "../components/FilterSidebar"

const Product = () => {


    return (
        <>
            <Navbar bgColor='bg-black' position="static" />

            <ProductHeader />

            <CouponList />

            <div className="mx-10 md:mx-32 mb-10">
                <div className="text-2xl md:text-5xl">Our <span className="text-amber-800">Product</span></div>
                <div className="flex gap-x-6 text-white mt-6">
                    <FilterSidebar />
                    <div>
                        <ProductGrid />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Product