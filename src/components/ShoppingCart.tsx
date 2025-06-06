import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { fetchCarts } from "../redux/slices/cart";
import { useStoreSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NoImg from "../assets/img/no-image.webp";

const ShoppingCart = () => {
  const { carts } = useStoreSelector((state: RootState) => state.cart);
  const { token } = useStoreSelector((state: RootState) => state.auth);
  const [uuid, setUuid] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = !!token;

  const defaultImage = NoImg;

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ uuid: string }>(token);
      setUuid(decodedToken.uuid);
    }
  }, [token]);

  useEffect(() => {
    dispatch(fetchCarts({ uuid }));
  }, [dispatch, uuid]);

  return (
    <div className="fixed top-14 right-20 bg-white z-50 shadow-lg rounded-xl p-4 w-96 overflow-y-auto max-h-96 text-amber-500">
      <div className="w-full">
        {isLoggedIn ? (
          <>
            {carts.length > 0 ? (
              <>
                <ul className="flex-col w-full gap-6">
                  {carts.map((item, index) => (
                    <li
                      key={item.id || `${item.productName}-${index}`}
                      className="flex w-full justify-between items-center gap-2"
                    >
                      <div className="flex w-full items-center gap-3 mb-2">
                        <img
                          src={item.image ? `${item.image}` : defaultImage}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-col w-full">
                          <h4 className="text-sm font-bold">
                            {item.productName}
                          </h4>
                          <div className="flex w-full justify-between gap-2">
                            <div className="flex-col gap-1">
                              <div className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </div>
                              <div className="text-xs text-gray-500">
                                Size: {item.size}
                              </div>
                            </div>
                            <div className="flex-col gap-1 mr-4">
                              <div className="text-xs text-gray-500">
                                Variant: {item.variant}
                              </div>
                            </div>
                            <div className="flex text-xs font-semibold justify-start w-20">
                              Rp. {item.subtotal.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/checkout-product"
                  className="mt-2 text-xs text-amber-500"
                >
                  See All Orders.
                </Link>
              </>
            ) : (
              <>
                <p className="text-gray-500 text-xs">
                  You haven't ordered anything. Let's order first!
                </p>
                <Link to="/product" className="mt-2 text-xs text-amber-500">
                  Order Now!
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            <p className="text-gray-500 text-xs">
              You haven't logged in, please login first!
            </p>
            <Link to="/login" className="mt-2 text-xs text-amber-500">
              Login!
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
