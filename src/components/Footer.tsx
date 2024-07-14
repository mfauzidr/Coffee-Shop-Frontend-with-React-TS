import { Link } from "react-router-dom"
import FeatherIcon from "feather-icons-react"
import Brand from "./Brand"

const Footer = () => {
    return (
        <footer className="flex h-auto md:h-96 items-center md:justify-normal px-12 md:px-32 py-8 md:py-16 bg-slate-100">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 ">
                <div className="flex gap-11">
                    <div className="flex-col md:flex-1 max-w-md">
                        <Brand textColor={'amber-800'} />
                        <div className="mt-5 text-sm md:text-base">Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans</div>
                        <div className="text-gray-400 mt-8">©2020CoffeeStore</div>
                    </div>
                </div>
                <div className="flex gap-20">
                    <div className="flex flex-col gap-5">
                        <div className="text-black font-medium text-base md:text-lg">Product</div>
                        <div className="flex flex-col gap-2.5 text-sm md:text-base text-gray-600">
                            <Link to="#">Our Product</Link>
                            <Link to="#">Pricing</Link>
                            <Link to="#">Locations</Link>
                            <Link to="#">Countries</Link>
                            <Link to="#">Blog</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="text-black font-medium text-base md:text-lg">Engage</div>
                        <div className="flex flex-col gap-2.5 text-sm md:text-base text-gray-600">
                            <Link to="#">Partner</Link>
                            <Link to="#">FAQ</Link>
                            <Link to="#">About Us</Link>
                            <Link to="#">Privacy Policy</Link>
                            <Link to="#">Term of Service</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 self-start">
                    <div className="text-black font-medium text-base md:text-lg">Socia Media</div>
                    <div className="flex gap-5">
                        <button className="flex items-center justify-center text-black w-8 h-8 bg-amber-500 border-amber-500 rounded-full">
                            <FeatherIcon icon="facebook" size="18" />
                        </button>
                        <button className="flex items-center justify-center text-black w-8 h-8 bg-amber-500 border-amber-500 rounded-full">
                            <FeatherIcon icon="twitter" size="18" />
                        </button>
                        <button className="flex items-center justify-center text-black w-8 h-8 bg-amber-500 border-amber-500 rounded-full">
                            <FeatherIcon icon="instagram" size="18" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer