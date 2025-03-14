import React from "react";
import { Link } from "react-router-dom";

export default function CartItemCard({ item, deleteCartItems }) {
  return (
    <div className="cartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
}
