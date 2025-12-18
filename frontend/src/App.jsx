import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./store/authSlice";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Allbooks from "./pages/All Books/Allbooks";
import ViewBook from "./components/ViewBookDetail/ViewBookDetail";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import UserDashboard from "./components/User/UserDashboard/UserDashboard";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Profile from "./components/User/Profile/Profile";
import Favourites from "./components/User/Favourites/Favourites";
import Carts from "./components/User/Carts/Carts";
import OrderHistory from "./components/User/OrderHistory/OrderHistory";
import ManageAddress from "./components/User/ManageAddress/ManageAddress";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import AProfile from "./components/Admin/Profile/AProfile";
import AddBooks from "./components/Admin/AddBooks/AddBooks";
import EditBooks from "./components/Admin/EditBooks/EditBooks";
import DeleteBooks from "./components/Admin/DeleteBooks/DeleteBooks";
import BookStock from "./components/Admin/BookStock/BookStock";
import ManageUsers from "./components/Admin/ManageUsers/ManageUsers";
import ManageOrder from "./components/Admin/ManageOrder/ManageOrder";
import Analytics from "./components/Admin/Analytics/Analytics";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

import "react-toastify/dist/ReactToastify.css";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const role = sessionStorage.getItem("role");

    if (token) {
      dispatch(
        loginSuccess({
          token,
          userId,
          role,
        })
      );
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover={false}
        limit={1}
        newestOnTop
      />

      <div className="page-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/all-books" element={<Allbooks />} />
          <Route path="/get-book/:id" element={<ViewBook />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Nested Dashboard Routes */}
          <Route path="/user-dashboard" element={<UserDashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="all-books" element={<Allbooks />} />
            <Route path="get-book/:id" element={<ViewBook />} />
            <Route path="favorites" element={<Favourites />} />
            <Route path="carts" element={<Carts/>}  />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="manage-address" element={<ManageAddress />} />
             <Route path="get-book/:id" element={<ViewBook />} /> 
          </Route>

          {/* Nested Dashboard Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="aprofile" element={<AProfile />} />
            <Route path="all-books" element={<Allbooks />} />
            <Route path="add-books" element={<AddBooks />} />
            <Route path="edit-books" element={<EditBooks />} />
            <Route path="delete-books" element={<DeleteBooks />} />
            <Route path="book-stock" element={<BookStock />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-orders" element={<ManageOrder />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
