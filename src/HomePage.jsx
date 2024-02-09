/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CarouselComponent from "./components/CarouselComponent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductsComponent from "./components/ProductsComponent";
import logo from "./assets/praviras-removebg-preview2.png";
import { RiseLoader } from "react-spinners";
import "./HomePage.css";
import { Fade } from "react-reveal";
function HomePage() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  return (
    <>
      {/* {loading ? (
        <div className="loading__screen">
          <div className="loading__screen__content">
            <Fade>
              <img src={logo} alt="" className="loader__logo" />
            </Fade>
            <RiseLoader
              className="loader__content"
              color="#713803"
              loading={loading}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      ) : (
        <div>
          <Header />
          <CarouselComponent />
          <ProductsComponent />
          <Footer />
        </div>
      )} */}
      <div>
        <Header />
        <CarouselComponent />
        <ProductsComponent />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
