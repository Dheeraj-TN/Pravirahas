/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./ProductComponentProps.css";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@badrap/bar-of-progress";
import { useStateValue } from "../StateProvider";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
function ProductComponentProps({
  id,
  img1,
  img2,
  productName,
  price,
  rating,
  desc,
}) {
  const [{ user, basket }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });
  const [isHoverd, setIsHovered] = useState(false);
  const productClicked = () => {
    progressor.start();
    setTimeout(() => {
      progressor.finish();
      navigate(`/product/${id}`);
    }, 1000);
  };
  const addToBasket = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        img1: img1,
        img2: img2,
        productName: productName,
        price: price,
        rating: rating,
        desc: desc,
      },
    });
  };
  return (
    <div className="product__component__props">
      <Toaster toastOptions={{ duration: 2000 }} />
      <div
        className={`product__image ${
          isHoverd ? "product__image__hovered" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={isHoverd ? img2 : img1} alt="" className="deafult__image" />
      </div>
      <div className="product__details" key={id} onClick={productClicked}>
        <h3>{productName}</h3>
        <div className="product__price">
          <h4>₹{price}</h4>
          <p>{rating} ⭐️</p>
        </div>
        <p className="products__desc">{desc}</p>
      </div>
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default ProductComponentProps;
