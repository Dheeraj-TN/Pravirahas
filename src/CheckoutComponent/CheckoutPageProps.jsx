/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
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
  updatedCost,
  rating,
  desc,
  hideButton,
}) {
  const [{ user, basket }, dispatch] = useStateValue();
  const [userId, setUserId] = useState("");
  const [basketItems, setBasketItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);
  const increment = async () => {
    setQuantity((prevquantity) => prevquantity + 1);
  };
  const decrement = async () => {
    if (quantity > 1) {
      setQuantity((prevquantity) => prevquantity - 1);
    }
  };
  const removeFromBasket = async () => {
    await deleteDoc(doc(db, "users", userId, "Basket", id));
  };
  useEffect(() => {
    console.log("userId: ", userId, "id: ", id);
    const basketData = async () => {
      const basketQuery = query(doc(db, "users", userId, "Basket", id));
      const data = await getDoc(basketQuery);
      console.log(data.data());
      if (data?.data()?.itemQuantity) {
        setQuantity(data.data().itemQuantity);
        setDataLoaded(true);
      } else {
        setDataLoaded(true);
      }
      // console.log(data.data().itemQuantity);
    };
    try {
      userId && id && basketData();
    } catch (error) {
      console.log(error);
    }
  }, [userId, id]);
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
    console.log("dataLoaded: ", dataLoaded);
    console.log("id: ", id, "price: ", price, "quantity: ", quantity);
    if (!id || !price || !quantity || !userId) {
      return;
    }
    if (dataLoaded) {
      updateQuantity();
    }
  }, [id, price, quantity, userId, dataLoaded]);

  return (
    <div className="checkoutPage__props" key={id}>
      <div className="checkoutPage__props__image__container">
        <img src={img1} alt="" className="checkoutPage__props__img" />
      </div>
      <div className="checkoutPage__props__info">
        <h2 className="checkoutPage__props__productName">{productName}</h2>
        <p className="checkoutPage__props__desc">{desc}</p>
        <div className="checkpout__props__priceRating">
          <p>
            <small>₹</small>
            {/* <strong>{price}</strong> */}
            <strong>{updatedCost}</strong>
          </p>
          {/* <p>{rating} ⭐️</p> */}
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
