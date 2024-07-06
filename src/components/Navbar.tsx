import { useState } from 'react'
import FeatherIcon from "feather-icons-react"
import Brand from "./Brand"
import { CartButton, SignButton } from "./Buttons"
import { Link } from 'react-router-dom'

const Navbar: React.FC<{ bgColor: string; position: string }> = ({ bgColor, position }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <nav id="navbar" className={`flex flex-col md:flex-row md:h-20 w-full ${bgColor} text-white items-center px-16 md:px-32 gap-4 md:gap-0 py-6 md:py-0 ${position} overflow-hidden ${menuOpen ? 'h-auto' : 'h-20'} transition-all duration-500 ease-in-out`}>
            <div className="flex flex-col md:flex-row flex-1 items-center justify-between w-full md:w-auto">
                <div className="flex text-white justify-between md:justify-normal w-full md:w-auto mb-6 md:mb-0">
                    <Brand textColor={'white'} />
                    <div className="flex gap-6 md:hidden">
                        <CartButton />
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <FeatherIcon icon={menuOpen ? "x" : "menu"} />
                        </button>
                    </div>
                </div>
                <ul className={`flex flex-col md:flex-row md:flex-1 mx-3 items-center justify-center gap-4 md:gap-0 transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-20' : 'max-h-0'} md:max-h-full overflow-hidden`}>
                    <li className="mx-8">
                        <Link className="pb-2 -mt-2 transition duration-500 hover:border-b hover:border-amber-500 hover:text-amber-500" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="mx-8">
                        <Link className="pb-2 -mt-2 transition duration-500 hover:border-b hover:border-amber-500 hover:text-amber-500" to="/product">
                            Product
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={`flex flex-col md:flex-row md:flex-1 items-center justify-center md:justify-end gap-4 md:gap-6 transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-20' : 'max-h-0'} md:max-h-full overflow-hidden`}>
                <div className="hidden md:flex gap-6">
                    <button onClick={() => (window.location.href = "/product")} >
                        <FeatherIcon icon="search" className="text-amber-500" />
                    </button>
                    <CartButton />
                </div>
                <div className="flex gap-6">
                    <SignButton value={"Sign In"} href={'/login'} styling={"border h-12 w-24 rounded-md hover:bg-white hover:text-black"} />
                    <SignButton value={"Sign Up"} href={'/register'} styling={"text-black border border-amber-500 h-12 w-24 rounded-md bg-amber-500 hover:bg-amber-200 hover:border-amber-200"} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
