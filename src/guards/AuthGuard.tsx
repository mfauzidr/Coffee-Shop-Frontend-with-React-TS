import React from "react";
import { Navigate } from "react-router-dom";
import { useStoreSelector } from "../redux/hooks";

// Perbaiki tipe agar menggunakan children
type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  // Mengambil token dari Redux state
  const token = useStoreSelector((state) => state.auth);

  // Jika token tidak ada (user tidak terautentikasi), alihkan ke login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Jika ada token, lanjutkan untuk merender halaman yang dilindungi
  return <>{children}</>;
};

export default AuthGuard;
