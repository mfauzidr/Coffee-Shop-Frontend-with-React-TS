import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useStoreSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../redux/store";

type AdminGuardProps = {
  children: React.ReactNode;
};

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { token, isLoggingOut } = useStoreSelector(
    (state: RootState) => state.auth
  );
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoggingOut) return;

    const checkRole = async () => {
      if (token && token !== "") {
        try {
          const decodedToken = jwtDecode<{ role: string }>(token);
          setRole(decodedToken.role);
        } catch (error) {
          console.error("Invalid token:", error);
          setRole("invalid");
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    };

    checkRole();
  }, [token, isLoggingOut]);

  if (isLoggingOut && role && role !== "admin") {
    return <Navigate to="/product" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
