import React from "react";
import { Navigate } from "react-router-dom";
import { useStoreSelector } from "../redux/hooks";

type GuestGuardProps = {
  children: React.ReactNode;
};

const GuestGuard = ({ children }: GuestGuardProps) => {
  const token = useStoreSelector((state) => state.auth.token); // Pastikan hanya mengambil token

  if (token && token.trim() !== "") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default GuestGuard;
