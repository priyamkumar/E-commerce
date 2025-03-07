import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword, clearErrors } from "../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "./MetaData";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigateTo = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");

      navigateTo("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigateTo, isUpdated]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title="Change Password" />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Password</h2>

          <form
            className="updatePasswordForm"
            encType="multipart/form-data"
            onSubmit={updatePasswordSubmit}
          >
            <div className="signInPassword">
              <VpnKeyIcon />
              <input
                type="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="signInPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <input type="submit" value="Update" className="updatePasswordBtn" />
          </form>
        </div>
      </div>
    </>
  );
}
