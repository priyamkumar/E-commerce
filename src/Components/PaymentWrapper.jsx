import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import Payment from "./Payment";
import Loader from "./Loader";

export default function PaymentWrapper() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/payment/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Failed to fetch Stripe API key:", error);
    }
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return stripeApiKey ? (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment />
    </Elements>
  ) : (
    <Loader/>
  );
}
