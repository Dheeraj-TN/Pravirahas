import "./App.css";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import InsideProduct from "./components/InsideProduct";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { auth } from "./firebase";
import toast, { Toaster } from "react-hot-toast";
import CheckoutPage from "./CheckoutComponent/CheckoutPage";
function App() {
  const [{ basket, user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    //eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Toaster toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/product/:id" element={<InsideProduct />} />
        <Route exact path="/checkout/:basketId" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
