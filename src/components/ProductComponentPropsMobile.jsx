/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ProgressBar from "@badrap/bar-of-progress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductComponentPropsMobile.css";
import { useStateValue } from "../StateProvider";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
function ProductComponentPropsMobile({ id, img1, img2, name, price, status }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [isHoverd, setIsHovered] = useState(false);
  const [userId, setUserId] = useState("");
  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });
  useEffect(() => {
    if (!user || !user.email) {
      return;
    }
    const q = query(
      collection(db, "users"),
      where("emailAddress", "==", user?.email)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        setUserId(doc.id);
      });
    });

    return () => unsub();
  }, [id, user]);
  const productClicked = () => {
    if (status === "outOfStock") {
      toast.error("Oops! Out of Stock", { duration: 2000 });
      return;
    }
    progressor.start(),
      setTimeout(() => {
        progressor.finish(), navigate(`/product/${id}`);
      }, 1000);
  };
  const productName = name.length > 15 ? name.slice(0, 20) + "..." : name;
  const addToBasket = async () => {
    !user
      ? setTimeout(() => {
          toast.error("Login to continue", {
            duration: 2000,
          });
          navigate("/login?id=" + id);
        }, 1000)
      : toast.loading("Adding to cart...", {
          duration: 500,
        });
    const basketItems = {
      id: id,
      img1: img1,
      productName: productName,
      price: price,
      quantity: 1,
    };
    const basketRef = doc(db, "users", userId, "Basket", id);
    await setDoc(basketRef, basketItems);
    toast.success("Added to cart");
  };
  return (
    <div className="product__component__props__mobile">
      <div
        className={`product__image__mobile ${
          isHoverd ? "product__image__hovered" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        key={id}
        onClick={productClicked}
      >
        {status === "outOfStock" ? (
          <p className="status-sold-mobile">Out of Stock</p>
        ) : status === "NewArrival" ? (
          <p className="status-sold-mobile">New Arrival</p>
        ) : (
          ""
        )}
        <img src={img1} alt="" className="deafult__image__mobile" />
      </div>
      <div
        className="product__details__mobile"
        key={id}
        onClick={productClicked}
      >
        <p>{productName}</p>
        <p>₹{price}</p>
      </div>
      <div className="addToCart__button">
        <button onClick={addToBasket}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductComponentPropsMobile;
