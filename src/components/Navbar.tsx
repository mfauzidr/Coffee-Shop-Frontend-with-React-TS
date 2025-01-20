import { useState, useEffect, useRef } from "react";
import FeatherIcon from "feather-icons-react";
import Brand from "./Brand";
import { SignButton, ProfileButton, LogoutButton } from "./Buttons";
import { Link } from "react-router-dom";
import { useStoreSelector, useStoreDispatch } from "../redux/hooks";
import { authAction } from "../redux/slices/auth";
import ShoppingCart from "./ShoppingCart";

interface NavbarProps {
  bgColor: string;
  position: string;
}

const Navbar = ({ bgColor, position }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useStoreDispatch();
  const { token } = useStoreSelector((state) => state.auth);
  const isLoggedIn = !!token;
  const isMobile = window.innerWidth < 768;

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

  const toggleDropdown = () => {
    setCartOpen((prev) => !prev);
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
      className={`flex flex-col lg:flex-row lg:h-20 w-full ${bgColor} text-white items-center px-8 md:px-16 lg:px-32 gap-4 lg:gap-0 py-6 lg:py-0 ${position} overflow-visible ${
        menuOpen ? "h-auto" : "h-20"
      } transition-all duration-500 ease-in-out`}
    >
      <div className="flex flex-col lg:flex-row flex-1 items-center justify-between w-full lg:w-auto">
        <div className="flex text-white justify-between lg:justify-normal w-full lg:w-auto mb-6 lg:mb-0 overflow-visible">
          <Brand textColor={"white"} />
          <div className="flex gap-6 lg:hidden ">
            <button
              onClick={() => {
                if (isMobile) {
                  window.location.href = "/checkout-product";
                } else {
                  toggleDropdown();
                }
              }}
            >
              <FeatherIcon
                icon="shopping-cart"
                className="text-amber-500 w-5 lg:w-6 h-5 lg:h-6"
              />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FeatherIcon icon={menuOpen ? "x" : "menu"} />
            </button>
          </div>
        </div>
        <ul
          className={`flex flex-col lg:flex-row lg:flex-1 mx-3 items-center justify-center gap-4 lg:gap-0 transition-all duration-500 ease-in-out ${
            menuOpen ? "max-h-20" : "max-h-0"
          } lg:max-h-full overflow-hidden`}
        >
          <li className="mx-8">
            <Link
              className="pb-2 -mt-2 transition duration-500 hover:border-b hover:border-amber-500 hover:text-amber-500"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="mx-8">
            <Link
              className="pb-2 -mt-2 transition duration-500 hover:border-b hover:border-amber-500 hover:text-amber-500"
              to="/product"
            >
              Product
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={`flex flex-col lg:flex-row lg:flex-1 items-center justify-center lg:justify-end gap-4 lg:gap-6 transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-20" : "max-h-0"
        } lg:max-h-full overflow-hidden`}
      >
        <div className="hidden items-center lg:flex gap-6">
          <button onClick={() => (window.location.href = "/product")}>
            <FeatherIcon icon="search" className="text-amber-500" />
          </button>
          <div ref={dropdownRef} className="relative">
            <button onClick={toggleDropdown}>
              <FeatherIcon
                icon="shopping-cart"
                className="text-amber-500 w-5 lg:w-6 h-5 lg:h-6 mt-1"
              />
            </button>
            {cartOpen && <ShoppingCart />}
          </div>
        </div>

        <div className="flex gap-6">
          {isLoggedIn ? (
            <>
              <ProfileButton href="/profile" />
              <LogoutButton onClick={showModal} />
              <dialog id="my_modal_4" className="modal">
                <div className="text-black modal-box w-11/12 max-w-lg">
                  <h3 className="text-lg font-bold">
                    Are you sure you want to log out?
                  </h3>
                  <p className="py-4">
                    Click the button below to confirm logout
                  </p>
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
          ) : (
            <>
              <SignButton
                value={"Sign In"}
                href={"/login"}
                styling={
                  "border h-12 w-24 rounded-md hover:bg-white hover:text-black"
                }
              />
              <SignButton
                value={"Sign Up"}
                href={"/register"}
                styling={
                  "text-black border border-amber-500 h-12 w-24 rounded-md bg-amber-500 hover:bg-amber-200 hover:border-amber-200"
                }
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
