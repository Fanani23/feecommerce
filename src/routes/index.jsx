import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Swal from "sweetalert2";
import LoginCustomer from "../pages/Auth/Login/Customer";
import LoginSeller from "../pages/Auth/Login/Seller";
import RegisterCustomer from "../pages/Auth/Register/Customer";
import RegisterSeller from "../pages/Auth/Register/Seller";
import Reset from "../pages/Auth/Reset";
import Verification from "../pages/Auth/Verification";
import Home from "../pages/Home";
import HomeLogin from "../pages/Home/Login";
import Payment from "../pages/Payment";
import ProfileCustomer from "../pages/Profile/Customer";
import CustomerCart from "../pages/Profile/Customer/Cart";
import CustomerHistory from "../pages/Profile/Customer/History";
import CustomerProduct from "../pages/Profile/Customer/Product";
import ProfileSeller from "../pages/Profile/Seller";
import SellerOrder from "../pages/Profile/Seller/Order";
import SellerProduct from "../pages/Profile/Seller/Product";
import SellerArchived from "../pages/Profile/Seller/Product/Archived";
import SellerSoldOut from "../pages/Profile/Seller/Product/SoldOut";

const Router = () => {
  const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return <Outlet />;
    } else {
      Swal.fire("Warning", "Please login first", "error");
      return <Navigate to="/" />;
    }
  };

  const PrivateRoleSeller = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "Seller") {
      return <Outlet />;
    } else {
      Swal.fire(
        "Warning",
        "Just seller can access, please login again",
        "error"
      );
      return <Navigate to="/login/seller" />;
    }
  };

  const PrivateRoleCustomer = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "Customer") {
      return <Outlet />;
    } else {
      Swal.fire(
        "Warning",
        "Just customer can access, please login again",
        "error"
      );
      return <Navigate to="/login/customer" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route index element={<HomeLogin />} />
        </Route>
        <Route path="/login/customer" element={<LoginCustomer />} />
        <Route path="/login/seller" element={<LoginSeller />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/register/seller" element={<RegisterSeller />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile-seller" element={<PrivateRoleSeller />}>
          <Route index element={<ProfileSeller />} />
        </Route>
        <Route path="/profile-seller/product" element={<PrivateRoleSeller />}>
          <Route index element={<SellerProduct />} />
        </Route>
        <Route path="/profile-seller/sold-out" element={<PrivateRoleSeller />}>
          <Route index element={<SellerSoldOut />} />
        </Route>
        <Route path="/profile-seller/sold-out" element={<PrivateRoleSeller />}>
          <Route index element={<SellerSoldOut />} />
        </Route>
        <Route path="/profile-seller/archived" element={<PrivateRoleSeller />}>
          <Route index element={<SellerArchived />} />
        </Route>
        <Route path="/profile-seller/order" element={<PrivateRoleSeller />}>
          <Route index element={<SellerOrder />} />
        </Route>
        <Route path="/profile-customer" element={<PrivateRoleCustomer />}>
          <Route index element={<ProfileCustomer />} />
        </Route>
        <Route
          path="/profile-customer/history"
          element={<PrivateRoleCustomer />}
        >
          <Route index element={<CustomerHistory />} />
        </Route>
        <Route path="/product/:id" element={<PrivateRoute />}>
          <Route index element={<CustomerProduct />} />
        </Route>
        <Route path="/cart" element={<PrivateRoute />}>
          <Route index element={<CustomerCart />} />
        </Route>
        <Route path="/payment/:id" element={<PrivateRoute />}>
          <Route index element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
