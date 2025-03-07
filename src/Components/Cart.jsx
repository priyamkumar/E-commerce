import React from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../actions/cartAction";
import Typography from "@mui/material/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import MetaData from "./MetaData";


export default function Cart() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  function increaseQuantity(id, quantity, stock) {
    const newQuantity = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemsToCart(id, newQuantity));
  }

  function decreaseQuantity(id, quantity, stock) {
    const newQuantity = quantity - 1;
    if (quantity <= 1) {
      dispatch(removeItemsFromCart(id));
      return;
    }
    dispatch(addItemsToCart(id, newQuantity));
  }

  function deleteCartItems(id) {
    dispatch(removeItemsFromCart(id));
  }

  function checkoutHandler() {
    navigateTo("/signin?redirect=shipping");
  }

  return cartItems.length === 0 ? (
    <div className="emptyCart">
      <RemoveShoppingCartIcon />
      <Typography>No products in your cart.</Typography>
      <Link to="/products">View Products</Link>
    </div>
  ) : (
    <>
    <MetaData title="Shopping Cart"/>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cartItems &&
          cartItems.map((item) => (
            <div key={item.product} className="cartContainer">
              <CartItemCard item={item} deleteCartItems={deleteCartItems} />
              <div className="cartInput">
                <button
                  onClick={() =>
                    decreaseQuantity(item.product, item.quantity, item.stock)
                  }
                >
                  -
                </button>
                <input type="number" value={item.quantity} readOnly />
                <button
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)
                  }
                >
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
            </div>
          ))}

        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{`₹${cartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkoutHandler}>Check Out</button>
          </div>
        </div>
      </div>
    </>
  );
}
