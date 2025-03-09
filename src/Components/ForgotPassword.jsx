import React from "react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, forgotPassword } from "../actions/userAction";
import MetaData from "./MetaData";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, toast, message]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title="Forgot Password" />
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="forgotPasswordEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" value="Send" className="forgotPasswordBtn" />
          </form>
        </div>
      </div>
    </>
  );
}
