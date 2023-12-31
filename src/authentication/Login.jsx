/* eslint-disable no-unused-vars */
import "./Login.css";
import PhoneInput from "react-phone-input-2";
import OTPInput from "otp-input-react";
import "react-phone-input-2/lib/bootstrap.css";
import { Spinner } from "react-activity";
import ProgressBar from "@badrap/bar-of-progress";
import { auth, db } from "../firebase";
import { useState } from "react";
import {
  RecaptchaVerifier,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { progress } from "framer-motion";
import { useStateValue } from "../StateProvider";

function Login() {
  const [{ basket, user }, dispatch] = useStateValue();
  const progressor = new ProgressBar({
    size: 4,
    color: "rgb(161, 90, 24);",
    delay: 100,
  });
  const navigate = useNavigate();
  const [phone, setPhone] = useState("+91");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordPhone, setPasswordPhone] = useState("");
  const [userEmail, setUser] = useState([]);
  const userRef = collection(db, "users");
  const signInWithPhone = async (e) => {
    e.preventDefault();
    const q = query(userRef, where("phoneNumber", "==", phone));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.map((doc) => {
        setUser(doc.data().emailAddress);
      });
    });
    toast.loading("Hold on while verifying");
    if (!userEmail) {
      toast.error("User not found");
      return;
    }
    signInWithEmailAndPassword(auth, userEmail, passwordPhone).then(() => {
      setTimeout(() => {
        toast.success("Login Successfull");
        progressor.finish();
        navigate("/");
      }, 2000);
    });
  };
  const signInWithEmailPassword = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        progressor.start();
        toast.loading("Almost there...");
        setTimeout(() => {
          toast.success("Login Successfull");
          progressor.finish();
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const resetPassword = async () => {
    if (email === "") {
      toast.error("Please enter a valid email address");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset link sent to your email");
        setEmail("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <div className="login">
        <Toaster toastOptions={{ duration: 3000 }} />
        <div id="recaptcha-container"></div>
        <div className="login__gradient" />
        <div className="login__body">
          <form>
            <h1>Sign In</h1>
            <input
              type="text"
              placeholder="+91"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordPhone}
              onChange={(e) => setPasswordPhone(e.target.value)}
            />
            <button
              className="login__button"
              onClick={signInWithPhone}
              style={{ cursor: "pointer" }}
            >
              Continue with phone
            </button>
            <p className="or__text">OR</p>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login__button" onClick={signInWithEmailPassword}>
              Sign In
            </button>
            <p onClick={resetPassword} className="forgot__password">
              Forgot Password ?
            </p>
            <h4>
              <span className="new">New to our website?</span>
              <p style={{ cursor: "pointer" }} className="signUp__text">
                <Link to="/register">Sign Up</Link>
              </p>
            </h4>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
