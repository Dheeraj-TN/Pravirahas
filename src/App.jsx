/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import InsideProduct from "./components/InsideProduct";
import { useStateValue } from "./StateProvider";
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
import { PropagateLoader } from "react-spinners";
import { Fade } from "react-reveal";
import logo from "./assets/praviras-removebg-preview2.png";
import { motion } from "framer-motion";
import SubEarrings from "./subcategories/SubEarrings";
import SubClipsPins from "./subcategories/SubClipsPins";
import SearchResultsPage from "./components/SearchResultsPage";
function App() {
  const [{ basket, user, selectedSubCategory }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
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
  // const { params } = useParams();
  // console.log("Params: ", { params });
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const fadeInOutVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5, // 1 second for fade in
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1.5, // 1 second for fade out
      },
    },
  };
  return (
    <Router>
      {/* <Toaster toastOptions={{ duration: 3000 }} /> */}
      {loading ? (
        <div className="loading__screen">
          <div className="overlay" />
          <div className="loading__screen__content">
            <motion.div
              initial="hidden"
              animate={loading ? "visible" : "exit"}
              variants={fadeInOutVariants}
              className="loading__screen__image"
            >
              <img src={logo} alt="" className="loader__logo" />
            </motion.div>
            <PropagateLoader
              className="loader__content"
              color="#e39851"
              loading={loading}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      ) : (
        // <Routes>
        //   <Route exact path="/" element={<HomePage />} />
        //   <Route exact path="/login" element={<Login />} />
        //   <Route exact path="/register" element={<SignUp />} />
        //   <Route exact path="/profile" element={<ProfilePage />} />
        //   <Route exact path="/product/:id" element={<InsideProduct />} />
        //   <Route exact path="/checkout" element={<CheckoutPage />} />
        //   <Route exact path="/aboutus" element={<AboutUs />} />
        //   <Route exact path="/necklaces" element={<Necklaces />} />
        //   <Route
        //     exact
        //     path={`/${selectedSubCategory}`}
        //     element={<SubNecklaces />}
        //   />
        //   <Route exact path="/bracelets" element={<Bracelets />} />
        //   <Route
        //     exact
        //     path={`/${selectedSubCategory}`}
        //     element={<SubBracelets />}
        //   />
        //   <Route exact path="/earrings" element={<Earrings />} />
        //   <Route
        //     exact
        //     path={`/earring/${selectedSubCategory}`}
        //     element={<SubEarrings />}
        //   />
        //   <Route exact path="/clipsPins" element={<ClipsPins />} />
        //   <Route
        //     exact
        //     path={`/clips&Pins/${selectedSubCategory}`}
        //     element={<SubClipsPins />}
        //   />
        // </Routes>

        // Create a route with default route for the home page
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/product/:id" element={<InsideProduct />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/necklaces" element={<Necklaces />} />
          <Route exact path="/bracelets" element={<Bracelets />} />
          <Route exact path="/earrings" element={<Earrings />} />
          <Route exact path="/clipsPins" element={<ClipsPins />} />
          <Route
            exact
            path="/search/:searchedName"
            element={<SearchResultsPage />}
          />
          <Route
            path="/necklace/:selectedSubCategory"
            element={<SubNecklaces />}
          />
          <Route
            path="/earring/:selectedSubCategory"
            element={<SubEarrings />}
          />
          <Route
            path="/clips&Pins/:selectedSubCategory"
            element={<SubClipsPins />}
          />
          <Route
            path="/bracelet/:selectedSubCategory"
            element={<SubBracelets />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
