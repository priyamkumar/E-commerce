import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userAction";
import Backdrop from "@mui/material/Backdrop";
import toast from "react-hot-toast";

export default function UserOptions({ user }) {
  const [open, setOpen] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  function orders() {
    navigateTo(`/orders`);
  }

  function account() {
    navigateTo(`/account`);
  }

  function cart() {
    navigateTo(`/cart`);
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Signed out successfully.");
    navigateTo(`/#home`);
  }

  function dashboard() {
    navigateTo(`/admin/dashboard`);
  }

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "#0dcaf0" : "unset"}}/>,
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "1" }}
        open={open}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
        direction="down"
        className="speedDial"
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}{" "}
      </SpeedDial>
    </>
  );
}
