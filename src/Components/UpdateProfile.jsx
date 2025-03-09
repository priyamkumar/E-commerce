import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Person2Icon from "@mui/icons-material/Person2";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, clearErrors, loadUser } from "../actions/userAction";
import MetaData from "./MetaData";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigateTo("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, toast, navigateTo, user, isUpdated]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title="Update Profile" />
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          <h2 className="updateProfileHeading">Update Profile</h2>

          <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <Person2Icon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="updateProfileEmail">
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

            <div id="updateProfileImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <input type="submit" value="Update" className="updateProfileBtn" />
          </form>
        </div>
      </div>
    </>
  );
}
