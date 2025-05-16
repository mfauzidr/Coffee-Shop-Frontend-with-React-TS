import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../redux/slices/auth";
import { useStoreSelector } from "../../redux/hooks";
import AdminNavBar from "../../components/admins/AdminNavBar";
import AdminSideBar from "../../components/admins/AdminSideBar";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useStoreSelector((state) => state.auth);

  useEffect(() => {
    const expiration = sessionStorage.getItem("tokenExpiration");
    if (!expiration || !token) {
      navigate("/login");
      return;
    }

    const timeout = parseInt(expiration) - Date.now();

    if (timeout > 0) {
      const timer = setTimeout(() => {
        dispatch(authAction.removeToken());
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("tokenExpiration");
        navigate("/login");
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      dispatch(authAction.removeToken());
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenExpiration");
      navigate("/login");
    }
  }, [dispatch, navigate, token]);

  return (
    <div className="h-screen w-full flex flex-col">
      <AdminNavBar bgColor="transparent" position="static" />
      <div className="flex flex-1">
        <AdminSideBar />
        <div className="relative flex-1 overflow-y-auto px-6 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
