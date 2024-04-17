/* eslint-disable no-unused-vars */
import "./Login.css";
import "react-phone-input-2/lib/bootstrap.css";
import ProgressBar from "@badrap/bar-of-progress";
import { auth, db } from "../firebase";
import { useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
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
  const [userEmail, setUserEmail] = useState([]);
  const userRef = collection(db, "users");
  const signInWithPhone = async (e) => {
    e.preventDefault();
    const q = query(userRef, where("phoneNumber", "==", phone));
    console.log("Phone: ", phone);
    // onSnapshot(q, (snapshot) => {
    //   snapshot.docs.map((doc) => {
    //     setUser(doc.data().emailAddress);
    //   });
    // });
    const data = getDocs(q);
    data.then((snapshot) => {
      snapshot.docs.map((doc) => {
        setUserEmail(doc.data().emailAddress);
        console.log("useremail:", doc.data().emailAddress);
        signInWithEmailAndPassword(
          auth,
          doc.data().emailAddress,
          passwordPhone
        ).then(() => {
          setTimeout(() => {
            toast.success("Login Successfull");
            progressor.finish();
            navigate("/");
          }, 2000);
        });
      });
    });
    console.log(userEmail);
    toast.loading("Hold on while verifying");
    if (!userEmail) {
      toast.error("User not found");
      return;
    }
    
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
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    signInWithPhone();
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    signInWithEmailPassword();
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
          <form onSubmit={handlePhoneSubmit}>
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
          </form>
          <p className="or__text">OR</p>
          <form onSubmit={handleEmailSubmit}>
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
            <button
              className="login__button"
              type="submit"
              onClick={signInWithEmailPassword}
            >
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
