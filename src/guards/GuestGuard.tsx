import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStoreSelector } from "../redux/hooks";

type GuestGuardProps = {
  children: React.ReactNode;
};

const GuestGuard = ({ children }: GuestGuardProps) => {
  const token = useStoreSelector((state) => state.auth.token);
  const location = useLocation();

  // Jika sudah login dan bukan di halaman login, redirect ke /
  if (token && token.trim() !== "" && location.pathname !== "/login") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default GuestGuard;
