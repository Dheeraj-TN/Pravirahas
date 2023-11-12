import { useStateValue } from "../StateProvider";
import Header from "../components/Header";
import Subtotal from "./Subtotal";
import CheckoutPageProps from "./CheckoutPageProps";
import "./CheckoutPage.css";

function CheckoutPage() {
  const [{ user, basket }, dispacth] = useStateValue();
  return (
    <>
      <Header />
      <div className="checkout__page">
        <div className="checkout__left">
          <img
            className="checkout__ad"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/GWPhase1/5_DesktopHero_Unrec_150x600._CB417602101_.jpg"
            alt=""
          />
          <div>
            <h3>Hello, {user?.email}</h3>
            <h2 className="checkout__title">Your Shopping Basket</h2>
            {basket.map((item) => (
              <CheckoutPageProps
                key={item.id}
                id={item.id}
                img1={item.img1}
                productName={item.productName}
                price={item.price}
                rating={item.rating}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
        <div className="checkout__right">
          <Subtotal />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
