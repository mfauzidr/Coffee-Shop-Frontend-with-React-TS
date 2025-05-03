import { useState, useEffect, useRef } from "react";
import FeatherIcon from "feather-icons-react";
import Brand from "./Brand";
import { Link } from "react-router-dom";
import { useStoreDispatch, useStoreSelector } from "../redux/hooks";
import { authAction } from "../redux/slices/auth";
import ShoppingCart from "./ShoppingCart";
import { RootState } from "../redux/store";

interface NavbarProps {
  bgColor: string;
  position: string;
}

const Navbar = ({ bgColor, position }: NavbarProps) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useStoreDispatch();
  const { profile } = useStoreSelector((state: RootState) => state.profile);

  const handleLogout = () => {
    dispatch(authAction.removeToken());
    window.location.href = "/";
  };

  const showModal = (): void => {
    const modal = document.getElementById(
      "my_modal_4"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className={`flex flex-col lg:flex-row lg:h-20 w-full ${bgColor} text-amber-800 items-center px-8 gap-4 lg:gap-0 py-6 lg:py-0 ${position} border-b`}
    >
      <div className="flex flex-1 items-center justify-betweenw-auto">
        <div className="flex text-white justify-normal w-auto mb-0 overflow-visible">
          <Brand textColor={"amber-800"} />
        </div>
      </div>

      <div
        className={`flex flex-col lg:flex-row lg:flex-1 items-center justify-center lg:justify-end gap-4 lg:gap-6 transition-all duration-500 ease-in-out`}
      >
        <div className="hidden items-center lg:flex gap-3">
          <Link to="/product">
            <FeatherIcon icon="search" className="text-black" />
          </Link>
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setCartOpen(false)}
          >
            <button>
              <FeatherIcon
                icon="shopping-cart"
                className="text-black w-5 lg:w-6 h-5 lg:h-6 mt-1"
              />
            </button>
            {cartOpen && <ShoppingCart />}
          </div>
        </div>

        <div className="flex gap-6">
          <>
            <div className="relative">
              <button
                id="profileDropdownButton"
                onClick={() => setDropdownOpen(true)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  className="rounded-full w-10 h-10 object-cover border-2"
                  src={profile.image || "/default-avatar.png"}
                  alt="Profile"
                />
                <FeatherIcon
                  icon="chevron-down"
                  className="text-sm text-black"
                />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 hover:text-amber-700"
                  >
                    Home
                  </a>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 hover:text-amber-700"
                  >
                    Profile
                  </a>
                  <a
                    href="/history-order"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 hover:text-amber-700"
                  >
                    Order
                  </a>
                  <button
                    onClick={showModal}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <dialog id="my_modal_4" className="modal">
              <div className="text-black modal-box w-11/12 max-w-lg">
                <h3 className="text-lg font-bold">
                  Are you sure you want to log out?
                </h3>
                <p className="py-4">Click the button below to confirm logout</p>
                <div className="modal-action">
                  <button
                    className="btn bg-white border-amber-500 text-red-600 hover:bg-red-500 hover:text-white"
                    onClick={handleLogout}
                  >
                    Confirm Logout
                  </button>
                  <form method="dialog">
                    <button className="btn">Cancel</button>
                  </form>
                </div>
              </div>
            </dialog>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
