/* eslint-disable react/prop-types */
import CarouselComponent from "./components/CarouselComponent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductsComponent from "./components/ProductsComponent";

import "./HomePage.css";

function HomePage() {
  return (
    <>
      {/* {loading ? (
        
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
