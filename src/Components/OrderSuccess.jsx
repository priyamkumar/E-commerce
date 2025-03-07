import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your order has been placed successfully. </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
}
