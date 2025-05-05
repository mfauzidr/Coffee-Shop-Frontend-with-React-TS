import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../redux/slices/auth";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const expiration = sessionStorage.getItem("tokenExpiration");
    if (!expiration) return;

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
  }, [dispatch, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
