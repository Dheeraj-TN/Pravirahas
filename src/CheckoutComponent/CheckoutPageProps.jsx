/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import "./CheckoutPageProps.css";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
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
  const [userId, setUserId] = useState("");
  const [basketItems, setBasketItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const increment = async () => {
    setQuantity((prevquantity) => prevquantity + 1);
    // await updateDoc(doc(db, "users", userId, "Basket", id), {
    //   itemQuantity: quantity + 1,
    //   updatedPrice: quantity * price,
    // });
    // await setDoc(doc(db, "users", userId, "Basket", id), {
    //   id: id,
    //   img1: img1,
    //   productName: productName,
    //   price: price * quantity,
    //   rating: rating,
    //   desc: desc,
    //   quantity: quantity + 1,
    // });
  };
  const decrement = async () => {
    if (quantity > 1) {
      setQuantity((prevquantity) => prevquantity - 1);
      // await updateDoc(doc(db, "users", userId, "Basket", id), {
      //   quantity: quantity - 1,
      //   // price: quantity * price,
      // });
      // await setDoc(doc(db, "users", userId, "Basket", id), {
      //   id: id,
      //   img1: img1,
      //   productName: productName,
      //   price: price * quantity,
      //   rating: rating,
      //   desc: desc,
      //   quantity: quantity - 1,
      // });
    }
  };
  const removeFromBasket = async () => {
    await deleteDoc(doc(db, "users", userId, "Basket", id));
  };
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("emailAddress", "==", user?.email)
    );
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        setUserId(doc.id);
      });
    });

    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const updateQuantity = async () => {
      await updateDoc(doc(db, "users", userId, "Basket", id), {
        itemQuantity: quantity,
        updatedPrice: quantity * price,
      });
    };
    if (!id || !price || !quantity || !userId) {
      return;
    }
    updateQuantity();
  }, [id, price, quantity, userId]);
  return (
    <div className="checkoutPage__props" key={id}>
      <img src={img1} alt="" className="checkoutPage__props__img" />
      <div className="checkoutPage__props__info">
        <h2 className="checkoutPage__props__productName">{productName}</h2>
        <p className="checkoutPage__props__desc">{desc}</p>
        <div className="checkpout__props__priceRating">
          <p>
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <p>{rating} ⭐️</p>
        </div>
        <div className="quantity">
          <button onClick={decrement}>
            <MinusOutlined />
          </button>
          <input type="text" value={quantity} />
          <button onClick={increment}>
            <PlusOutlined />
          </button>
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
}
export default CheckoutPageProps;
