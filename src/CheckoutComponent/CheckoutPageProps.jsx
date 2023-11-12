/* eslint-disable react/prop-types */
import { collection, doc, setDoc } from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import "./CheckoutPageProps.css";
import { db } from "../firebase";
import { getBasketTotal } from "../reducer";
import { useParams } from "react-router-dom";
function CheckoutPageProps({
  id,
  img1,
  productName,
  price,
  rating,
  desc,
  hideButton,
}) {
  const [{ user, basket }, dispatch] = useStateValue();
  const { basketId } = useParams();
  const basketRef = collection(db, "BasketItems");
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
    setDoc(doc(basketRef, basketId), {
      //   basket: basket.filter((item) => item.id !== id),
      basketitems: basket.filter((item) => item.id !== id),
      total: getBasketTotal(basket.filter((item) => item.id !== id)),
      user: user?.email,
    });
  };
  return (
    <div className="checkoutPage__props">
      <img src={img1} alt="" className="checkoutPage__props__img" />
      <div className="checkoutPage__props__info">
        <h2 className="checkoutPage__props__productName">{productName}</h2>
        <p className="checkoutPage__props__desc">{desc}</p>
        <div className="checkpout__props__priceRating">
          <p className="checkoutPage__props__price">
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <p>{rating} ⭐️</p>
        </div>

        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutPageProps;
