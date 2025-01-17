import React from "react";
import { Navigate } from "react-router-dom";
import { useStoreSelector } from "../redux/hooks";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = useStoreSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default AuthGuard;
