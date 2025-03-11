import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Person2Icon from "@mui/icons-material/Person2";
import { useSelector, useDispatch } from "react-redux";
import { login, register, clearErrors } from "../actions/userAction";
import toast from "react-hot-toast";

export default function SignInSignUp() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const signInTab = useRef(null);
  const signUpTab = useRef(null);
  const switcherTab = useRef(null);

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigateTo = useNavigate();
  const location = useLocation();
  console.log("URL search:", window.location.search);
console.log("Full URL:", window.location.href);

// Then try this modified approach
const params = new URLSearchParams(window.location.search);
const redirect = params.has('redirect') ? params.get('redirect') : "/account";
console.log("Redirect value:", redirect);

  const getDefaultBase64 = async (defaultImage) => {
    try {
      const response = await fetch(defaultImage);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting default image:", error);
      return null;
    }
  };

  useEffect(() => {
    const setDefaultAvatar = async () => {
      const base64Default = await getDefaultBase64("/Profile.png");
      setAvatar(base64Default);
    };

    setDefaultAvatar();
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      toast.error(error);
    }
    if (isAuthenticated) {
      navigateTo(redirect);
    }
  }, [dispatch, error, toast, isAuthenticated, navigateTo]);

  const switchTabs = (e, tab) => {
    if (tab === "signIn") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      signUpTab.current.classList.remove("shiftToNeutralForm");
      signInTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "signUp") {
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");
      signUpTab.current.classList.add("shiftToNeutralForm");
      signInTab.current.classList.add("shiftToLeft");
    }
  };

  const signInSubmit = (e) => {
    e.preventDefault();
    dispatch(login(signInEmail, signInPassword));
  };

  const signUpSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="signInSignupContainer">
        <div className="signInSignUpBox">
          <div>
            <div className="signIn_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "signIn")}>Sign In</p>
              <p onClick={(e) => switchTabs(e, "signUp")}>Sign Up</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="signInForm" ref={signInTab} onSubmit={signInSubmit}>
            <div className="signInEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
              />
            </div>
            <div className="signInPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forgot Password ?</Link>
            <input type="submit" value="Sign In" className="signInButton" />
          </form>
          <form
            className="signUpForm"
            ref={signUpTab}
            encType="multipart/form-data"
            onSubmit={signUpSubmit}
          >
            <div className="signUpName">
              <Person2Icon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                minLength={4}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div id="signUpImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Sign Up" className="signUpButton" />
          </form>
        </div>
      </div>
    </>
  );
}
