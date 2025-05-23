import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "./MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createOrder, clearErrors } from "../actions/orderAction";
import toast from "react-hot-toast";
import { server } from "../main.jsx";

export default function Payment() {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigateTo = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.totalPrice,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice
  }

  async function submitHandler(e) {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${server}/api/v1/payment/process`,
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          dispatch(createOrder(order));
          navigateTo("/success");
        } else {
          toast.error("There's some issue while processing payment! ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = true;
      toast.error(error.response.data.message);
    }
  }

  const cardNumberStyle = {
    style: {
      base: {
        color: "#ffffff",
        "::placeholder": {
          color: "#888888",
        },
      },
      invalid: {
        color: "#ff0000",
      },
    },
  };

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast])

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement
              className="paymentInput"
              options={cardNumberStyle}
            />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement
              className="paymentInput"
              options={cardNumberStyle}
            />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement
              className="paymentInput"
              options={cardNumberStyle}
            />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
}
