import { useDispatch } from "react-redux";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authAction } from "../redux/slices/auth";

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const expiration = sessionStorage.getItem("tokenExpiration");
    if (!expiration) return;

    const timeout = parseInt(expiration) - Date.now();

    if (timeout > 0) {
      const timer = setTimeout(() => {
        setSessionExpired(true);
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      setSessionExpired(true);
    }
  }, []);

  const handleSessionEnd = () => {
    dispatch(authAction.removeToken());
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenExpiration");
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative">
      <Navbar bgColor={"bg-black"} position="static" />
      <div>
        <Outlet />
      </div>
      <Footer />

      {sessionExpired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
            <p className="mb-6">
              Your session has expired. Please log in again to continue.
            </p>
            <button
              onClick={handleSessionEnd}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition"
            >
              Login Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
