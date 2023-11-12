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
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

function Login() {
  const progressor = new ProgressBar({
    size: 4,
    color: "rgb(161, 90, 24);",
    delay: 100,
  });
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [continuePhone, setContinuePhone] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disablePhoneAuth, setDisablePhoneAuth] = useState(false);
  const regexMail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordformat = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const userRef = collection(db, "users");
  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignUpWithPhone();
          },
          "expired-callback": () => {},
        }
      );
    }
  };
  const onSignUpWithPhone = (e) => {
    e.preventDefault();
    if (!phone || phone === "") {
      toast.error("Please enter a valid phone number");
      return;
    }
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPhone = "+" + phone;
    signInWithPhoneNumber(auth, formatPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setContinuePhone(true);
        toast.success("otp sent successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const verifyOTP = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      window.confirmationResult
        .confirm(otp)
        .then(async (result) => {
          const user = result.user;
          console.log(user);
          // toast.success("login successful");
          await addDoc(userRef, {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
          });
          progressor.start();
          setTimeout(() => {
            progressor.finish();
            toast.success("login successful");
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // console.log(email, password);
  const signIn = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Enter email / password");
      return;
    } else if (!email.match(regexMail)) {
      toast.error("Invalid email id");
      return;
    } else if (!password.match(passwordformat)) {
      toast.error(
        "Password should contain atlest 8 charecters with captital letter, small letters and special charecter."
      );
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log(userCred);
        if (auth) {
          toast.success("Login Successful");
          navigate("/");
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        toast.error("Invalid credentials");
        console.log(err.message);
        navigate("/login");
      });
  };
  return (
    <>
      <div className="login">
        <Toaster toastOptions={{ duration: 3000 }} />
        <div id="recaptcha-container"></div>
        <div className="login__gradient" />
        <div id="sign-in-button" />
        {continuePhone ? (
          <div className="otp__container">
            <h2>Verify your phone number</h2>
            <OTPInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              numInputs={6}
              otpType="number"
              shouldAutoFocus
              inputStyle={{
                marginRight: "15px",
                fontSize: "25px",
                fontWeight: "500",
                padding: "10px",
              }}
              className="otp__input"
            />
            <button
              className="login__button"
              id="sign-in-button"
              onClick={verifyOTP}
            >
              Verify OTP
            </button>
          </div>
        ) : (
          <div className="login__body">
            <form>
              <h1>Sign In</h1>
              <PhoneInput
                country={"in"}
                enableSearch={true}
                value={phone}
                onChange={setPhone}
                inputStyle={{
                  border: "none",
                  height: "50px",
                  width: "100%",
                  outline: "0",
                }}
                inputProps={{
                  required: "true",
                  name: "phone",
                  autoFocus: "true",
                  styles: { outline: "none" },
                }}
                className="phone__input"
                id="phone__input"
              />
              <button
                className="login__button"
                onClick={onSignUpWithPhone}
                style={{ cursor: "pointer" }}
                disabled={setDisablePhoneAuth}
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
              <button className="login__button" onClick={signIn}>
                Sign In
              </button>
              <h4>
                <span className="new">New to our website?</span>
                <p style={{ cursor: "pointer" }} className="signUp__text">
                  <Link to="/register">Sign Up</Link>
                </p>
              </h4>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
