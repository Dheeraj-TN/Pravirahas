/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./ProductComponentProps.css";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@badrap/bar-of-progress";
import { useStateValue } from "../StateProvider";
import toast, { Toaster } from "react-hot-toast";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getBasketTotal } from "../reducer";
function ProductComponentProps({
  id,
  img1,
  img2,
  productName,
  price,
  rating,
  desc,
  status,
  onClick,
}) {
  const [{ user, basket, modalOpen }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [basketId, setBasketId] = useState("");
  const [productData, setProductData] = useState(null);
  const basketRef = collection(db, "BasketItems");
  const [userId, setUserId] = useState("");
  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });
  const [isHoverd, setIsHovered] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  // useEffect(() => {
  //   if (openModal) {
  //     dispatch({
  //       type: "OPEN_PRODUCT_MODAL",
  //       modalOpen: true,
  //     });
  //   }
  // }, [dispatch, openModal])
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
      rating: rating,
      desc: desc,
      quantity: 1,
    };
    const basketRef = doc(db, "users", userId, "Basket", id);
    await setDoc(basketRef, basketItems);
    toast.success("Added to cart");
  };
  return (
    <>
      <div className="product__component__props" key={id}>
        <div
          className={`product__image ${
            isHoverd ? "product__image__hovered" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={productClicked}
        >
          {/* <img src={isHoverd ? img2 : img1} alt="" className="deafult__image" /> */}
          {status === "outOfStock" ? (
            <p className="status-sold">Out of Stock</p>
          ) : status === "NewArrival" ? (
            <p className="status-sold">New Arrival</p>
          ) : (
            ""
          )}
          <img src={img1} alt="" className="deafult__image" />
        </div>
        <div className="product__details" key={id}>
          <h3>{productName}</h3>
          <div className="product__price">
            <h4>₹{price}</h4>
            {/* <p>{rating} ⭐️</p> */}
          </div>
          <div className="products__desc__container">
            <p className="products__desc">{desc}</p>
          </div>
        </div>
        <button onClick={addToBasket}>Add to Cart</button>
      </div>
    </>
  );
}

export default ProductComponentProps;
