import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import WebFont from "webfontloader";
import { Outlet } from "react-router-dom";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./Components/UserOptions";
import { Toaster } from "react-hot-toast";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,700", "sans serif: 300,400,700"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
