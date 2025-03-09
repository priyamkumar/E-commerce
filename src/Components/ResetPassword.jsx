import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword, clearErrors } from "../actions/userAction";
import MetaData from "./MetaData";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const params = useParams();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const { token } = params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully");
      navigateTo("/signin");
    }
  }, [dispatch, error, toast, navigateTo, success]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title="Change Password" />
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
          <h2 className="resetPasswordHeading">Update Password</h2>

          <form
            className="resetPasswordForm"
            encType="multipart/form-data"
            onSubmit={passwordSubmit}
          >
            <div className="signInPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signInPassword">
              <LockIcon />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Update" className="resetPasswordBtn" />
          </form>
        </div>
      </div>
    </>
  );
}
