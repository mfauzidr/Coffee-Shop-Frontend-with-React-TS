import React from "react";
import { Navigate } from "react-router-dom";
import { useStoreSelector } from "../redux/hooks";

// Perbaiki tipe agar menggunakan children
type GuestGuardProps = {
  children: React.ReactNode;
};

const GuestGuard = ({ children }: GuestGuardProps) => {
  // Mengambil token dari Redux state
  const token = useStoreSelector((state) => state.auth);

  // Jika token ada (user sudah terautentikasi), alihkan ke halaman utama
  if (token) {
    return <Navigate to="/" />;
  }

  // Jika tidak ada token, lanjutkan untuk merender halaman yang dilindungi
  return <>{children}</>;
};

export default GuestGuard;
