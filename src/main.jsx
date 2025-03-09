import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Error from "./Components/Error.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import ProductDetails from "./Components/ProductDetails.jsx";
import Products from "./Components/Products.jsx";
import SignInSignUp from "./Components/SignInSignUp.jsx";
import UserProfile from "./Components/UserProfile.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import UpdateProfile from "./Components/UpdateProfile.jsx";
import UpdatePassword from "./Components/UpdatePassword.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import ResetPassword from "./Components/ResetPassword.jsx";
import Cart from "./Components/Cart.jsx";
import Shipping from "./Components/Shipping.jsx";
import ConfirmOrder from "./Components/ConfirmOrder.jsx";
import PaymentWrapper from "./Components/PaymentWrapper.jsx";
import OrderSuccess from "./Components/OrderSuccess.jsx";
import MyOrders from "./Components/MyOrders.jsx";
import OrderDetails from "./Components/OrderDetails.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import ProductList from "./Components/ProductList.jsx";
import NewProduct from "./Components/NewProduct.jsx";
import UpdateProduct from "./Components/UpdateProduct.jsx";
import OrderList from "./Components/OrderList.jsx";
import ProcessOrder from "./Components/ProcessOrder.jsx";
import UsersList from "./Components/UsersList.jsx";
import UpdateUser from "./Components/UpdateUser.jsx";
import ProductReviews from "./Components/ProductReviews.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";

export const server = "https://e-commerce-backend-production-4354.up.railway.app"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/about",
        element: (
          <About/>
        ),
      },
      {
        path: "/contact",
        element: (
          <Contact/>
        ),
      },
      {
        path: "/products/:keyword",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/signin",
        element: <SignInSignUp />,
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/me/update",
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/password/update",
        element: (
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/password/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/password/reset/:token",
        element: <ResetPassword />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/shipping",
        element: (
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/confirm",
        element: (
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/process/payment",
        element: (
          <ProtectedRoute>
            <PaymentWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "/success",
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute isAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <ProtectedRoute isAdmin={true}>
            <ProductList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/product",
        element: (
          <ProtectedRoute isAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/product/:id",
        element: (
          <ProtectedRoute isAdmin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <ProtectedRoute isAdmin={true}>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/order/:id",
        element: (
          <ProtectedRoute isAdmin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <ProtectedRoute isAdmin={true}>
            <UsersList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/user/:id",
        element: (
          <ProtectedRoute isAdmin={true}>
            <UpdateUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/reviews",
        element: (
          <ProtectedRoute isAdmin={true}>
            <ProductReviews />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
