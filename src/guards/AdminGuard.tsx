import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useStoreSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../redux/store";

type AdminGuardProps = {
  children: React.ReactNode;
};

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { token } = useStoreSelector((state: RootState) => state.auth);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

      setLoading(false); // Hanya dipanggil setelah selesai setRole
    };

    checkRole();
  }, [token]);

  if (loading) return <div>Loading...</div>;

  if (!token || role === "invalid") {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminGuard;
