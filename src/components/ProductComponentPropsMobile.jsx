/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ProgressBar from "@badrap/bar-of-progress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductComponentPropsMobile.css";
import { useStateValue } from "../StateProvider";
function ProductComponentPropsMobile({ id, img1, img2, name, price, status }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [isHoverd, setIsHovered] = useState(false);
  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });
  const productClicked = () => {
    !user
      ? navigate("/login")
      : (progressor.start(),
        setTimeout(() => {
          progressor.finish(), navigate(`/product/${id}`);
        }, 1000));
  };
  const productName = name.length > 15 ? name.slice(0, 20) + "..." : name;

  return (
    <div
      className="product__component__props__mobile"
      key={id}
      onClick={productClicked}
    >
      <div
        className={`product__image__mobile ${
          isHoverd ? "product__image__hovered" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
      <div className="product__details__mobile">
        <p>{productName}</p>
        <p>₹{price}</p>
      </div>
    </div>
  );
}

export default ProductComponentPropsMobile;
