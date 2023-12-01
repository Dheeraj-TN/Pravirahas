/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ProgressBar from "@badrap/bar-of-progress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductComponentPropsMobile.css";
import { useStateValue } from "../StateProvider";
function ProductComponentPropsMobile({ id, img1, img2 }) {
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
  return (
    <div
      //   className="product__component__props__mobile"
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
        <img
          src={isHoverd ? img2 : img1}
          alt="image"
          className="deafult__image__mobile"
        />
      </div>
    </div>
  );
}

export default ProductComponentPropsMobile;
