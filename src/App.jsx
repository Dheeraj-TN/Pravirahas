/* eslint-disable no-unused-vars */
import "./App.css";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import InsideProduct from "./components/InsideProduct";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { auth } from "./firebase";
import { Toaster } from "react-hot-toast";
import CheckoutPage from "./CheckoutComponent/CheckoutPage";
import { onAuthStateChanged } from "firebase/auth";
import ProfilePage from "./components/ProfilePage";
import Necklaces from "./categories/Necklaces";
import SubNecklaces from "./subcategories/SubNecklaces";
import Bracelets from "./categories/Bracelets";
import Earrings from "./categories/Earrings";
import ClipsPins from "./categories/ClipsPins";
import SubBracelets from "./subcategories/SubBracelets";
import AboutUs from "./components/AboutUs";
function App() {
  const [{ basket, user, selectedSubCategory }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
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
      {/* <Toaster toastOptions={{ duration: 3000 }} /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/product/:id" element={<InsideProduct />} />
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
        <Route exact path="/necklaces" element={<Necklaces />} />
        <Route
          exact
          path={`/${selectedSubCategory}`}
          element={<SubNecklaces />}
        />
        <Route exact path="/bracelets" element={<Bracelets />} />
        <Route
          exact
          path={`/${selectedSubCategory}`}
          element={<SubBracelets />}
        />
        <Route exact path="/earrings" element={<Earrings />} />
        <Route exact path="/clipsPins" element={<ClipsPins />} />
      </Routes>
    </Router>
  );
}

export default App;
