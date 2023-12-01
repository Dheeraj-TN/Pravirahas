/* eslint-disable react/prop-types */
import CarouselComponent from "./components/CarouselComponent";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import InputProducts from "./components/InputProducts";
import ProductsComponent from "./components/ProductsComponent";

function HomePage() {
  return (
    <div>
      <Header />
      <CarouselComponent />
      {/* <InputProducts /> */}
      <ProductsComponent />
      <Footer />
    </div>
  );
}

export default HomePage;
