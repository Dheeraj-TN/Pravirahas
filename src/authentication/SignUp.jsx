/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, db } from "../firebase";
import ProgressBar from "@badrap/bar-of-progress";
// import { addDoc, collection } from "firebase/firestore";
import OTPInput from "otp-input-react";
import { addDoc, collection } from "firebase/firestore";

function SignUp() {
  const navigate = useNavigate();
  const progressor = new ProgressBar({
    size: 4,
    color: "rgb(161, 90, 24);",
    delay: 100,
  });
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [continuePhone, setContinuePhone] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const userRef = collection(db, "users");
  const regexMail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneformat = /^\d{10}$/;
  const passwordformat = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // console.log(response);
            onSignUpWithPhone();
          },
          "expired-callback": () => {},
        }
      );
    }
  };
  const onSignUpWithPhone = (e) => {
    e.preventDefault();
    if (
      fullName === "" ||
      emailAddress === "" ||
      phone === "" ||
      postalAddress === "" ||
      password === "" ||
      reEnterPassword === ""
    ) {
      toast.error("Enter all the fields");
      return;
    } else if (!emailAddress.match(regexMail)) {
      toast.error("Invalid email id");
      return;
    } else if (phone.length !== 10) {
      toast.error("Invalid phone number");
      return;
    } else if (!phone.match(phoneformat)) {
      toast.error("Invalid phone number");
      return;
    } else if (!password.match(passwordformat)) {
      toast.error(
        "Password should contain atlest 8 charecters with captital letter, small letters and special charecter."
      );
      return;
    } else if (password !== reEnterPassword) {
      toast.error("Password not matching");
      return;
    }
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    // const formatPhone = "+" + phone;
    const formatPhone = "+91" + phone;
    toast.loading("otp is being sent....");
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
      toast.loading("wait for a sec...");
      window.confirmationResult
        .confirm(otp)
        .then(async (result) => {
          createUserWithEmailAndPassword(auth, emailAddress, password)
            .then(async (userCred) => {
              const user = userCred.user;
              await addDoc(userRef, {
                uid: user.uid,
                phoneNumber: phone,
                username: fullName,
                emailAddress: emailAddress,
                postalAddress: postalAddress,
              });
            })
            .catch((err) => {
              console.log(err.message);
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
  return (
    <div className="login">
      <Toaster toastOptions={{ duration: 3000 }} />
      <div id="recaptcha-container"></div>
      <div className="login__gradient" />

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
            <h1>Sign Up</h1>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone +91"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Postal Address"
              value={postalAddress}
              onChange={(e) => setPostalAddress(e.target.value)}
              rows={5}
              className="postal__address"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Re-enter Paasword"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
            />
            <button onClick={onSignUpWithPhone} className="login__button">
              Sign Up
            </button>
            <h4>
              <span className="new">Already a member ? </span>
              <span className="signUp__text">
                <Link to="/login">Sign In</Link>
              </span>
            </h4>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
