import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/slices/auth";
import { useStoreSelector } from "../redux/hooks";
import AdminNavBar from "../components/AdminNavBar";

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
    <div>
      <AdminNavBar bgColor="transparent" position="static" />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
