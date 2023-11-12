import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import ProgressBar from "@badrap/bar-of-progress";
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
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const usreRef = collection(db, "users");
  const regexMail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordformat = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const phoneformat = /^\d{10}$/;
  const signUp = (e) => {
    e.preventDefault();
    if (
      fullName === "" ||
      emailAddress === "" ||
      password === "" ||
      reEnterPassword === ""
    ) {
      toast.error("Enter all the fields");
      return;
    } else if (!emailAddress.match(regexMail)) {
      toast.error("Invalid email id");
      return;
    } else if (!password.match(passwordformat)) {
      toast.error(
        "Password should contain atlest 8 charecters with captital letter, small letters and special charecter."
      );
      return;
    } else if (phone.length !== 10) {
      toast.error("Invalid phone number");
      return;
    } else if (password !== reEnterPassword) {
      toast.error("Password not matching");
      return;
    } else if (!phone.match(phoneformat)) {
      toast.error("Invalid phone number");
      return;
    }
    createUserWithEmailAndPassword(auth, emailAddress, password)
      .then(async (userCred) => {
        console.log(userCred);
        if (auth) {
          await addDoc(usreRef, {
            fullName: fullName,
            phone: phone,
            email: emailAddress,
          });
          progressor.start();
          setTimeout(() => {
            progressor.finish();
            navigate("/");
            toast.success("Login Successfull");
            setFullName("");
            setPhone("");
            setEmailAddress("");
            setPassword("");
            setReEnterPassword("");
          }, 2000);
        }
      })
      .catch((err) => {
        toast.error("SignUp unsuccessfull :(");
        console.log(err.message);
        navigate("/register");
      });
  };
  return (
    <>
      <div className="login">
        <Toaster toastOptions={{ duration: 3000 }} />
        <div className="login__gradient" />
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
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
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
            <button onClick={signUp} className="login__button">
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
      </div>
    </>
  );
}

export default SignUp;
