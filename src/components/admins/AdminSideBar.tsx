import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  const [selectedPage, setSelectedPage] = useState<string>("dashboard");

  const handlePageClick = (buttonName: string) => {
    setSelectedPage(buttonName);
  };
  return (
    <div className="inline-block pl-10 pt-8 pr-3 text-gray-600 bg-white border-r border-gray-200 border-solid w-64">
      <div className="flex-col items-center justify-start font-medium text-slate-500">
        <Link to="/admin/dashboard">
          <button
            onClick={() => handlePageClick("dashboard")}
            className={`flex mb-6 gap-2 w-full pl-2 h-10 items-center rounded-md ${
              selectedPage === "dashboard"
                ? "text-black font-bold text-base bg-amber-500 bg-opacity-80"
                : "text-sm hover:text-amber-600 hover:bg-amber-600 hover:bg-opacity-10"
            }`}
          >
            <FeatherIcon icon="grid" />
            <div>Dashboard</div>
          </button>
        </Link>
        <Link to="/admin/products">
          <button
            onClick={() => handlePageClick("products")}
            className={`flex mb-6 gap-2 w-full pl-2 h-10 items-center rounded-md ${
              selectedPage === "products"
                ? "text-black font-bold text-base bg-amber-500 bg-opacity-80"
                : "text-sm hover:text-amber-600 hover:bg-amber-600 hover:bg-opacity-10"
            }`}
          >
            <FeatherIcon icon="coffee" />
            <div>Product</div>
          </button>
        </Link>
        <Link to="/admin/orders">
          <button
            onClick={() => handlePageClick("orders")}
            className={`flex mb-6 gap-2 w-full pl-2 h-10 items-center rounded-md ${
              selectedPage === "orders"
                ? "text-black font-bold text-base bg-amber-500 bg-opacity-80"
                : "text-sm hover:text-amber-600 hover:bg-amber-600 hover:bg-opacity-10"
            }`}
          >
            <FeatherIcon icon="shopping-bag" />
            <div>Order</div>
          </button>
        </Link>
        <Link to="/admin/users">
          <button
            onClick={() => handlePageClick("users")}
            className={`flex gap-2 w-full pl-2 h-10 items-center rounded-md ${
              selectedPage === "users"
                ? "text-black font-bold text-base bg-amber-500 bg-opacity-80"
                : "text-sm hover:text-amber-600 hover:bg-amber-600 hover:bg-opacity-10"
            }`}
          >
            <FeatherIcon icon="users" />
            <div>User</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
