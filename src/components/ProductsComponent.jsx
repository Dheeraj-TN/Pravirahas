import ProductComponentProps from "./ProductComponentProps";
import "./ProductsComponent.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Fade } from "react-reveal";
import { motion } from "framer-motion";
import ProductComponentPropsMobile from "./ProductComponentPropsMobile";

function ProductsComponent() {
  const necklaseRef = collection(db, "Necklases");
  const [productData, setProductData] = useState([]);
  const rightArrowVarinats = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2,
        type: "spring",
      },
    },
  };
  useEffect(() => {
    const q = query(necklaseRef);
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductData(data);
      // console.log("dataid:", data.id);
    });
  });
  return (
    <div className="product__component">
      <div className="product__component__title">
        <h1>New Arrivals</h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={rightArrowVarinats}
        >
          <ArrowRightOutlined className="more__arrow__icon" />
        </motion.p>
      </div>
      <Fade right>
        <div className="products">
          {productData &&
            productData.map((item) => {
              return (
                <ProductComponentProps
                  key={item.id}
                  id={item.id}
                  img1={item.image[0]}
                  img2={item.image[1]}
                  productName={item.productName}
                  price={item.price}
                  rating={item.rating}
                  desc={item.desc}
                />
              );
            })}
        </div>

        <div className="products__mobile">
          {productData &&
            productData.map((item) => {
              return (
                <ProductComponentPropsMobile
                  key={item.id}
                  id={item.id}
                  img1={item.image[0]}
                  img2={item.image[1]}
                  price={item.price}
                />
              );
            })}
        </div>
      </Fade>

      <div className="product__component__title">
        <h1>Necklaces</h1>
        <ArrowRightOutlined className="more__arrow__icon" />
      </div>
      <Fade right>
        <div className="products">
          {productData &&
            productData.map((item) => {
              return (
                <ProductComponentProps
                  key={item.id}
                  id={item.id}
                  img1={item.image[0]}
                  img2={item.image[1]}
                  productName={item.productName}
                  price={item.price}
                  rating={item.rating}
                  desc={item.desc}
                />
              );
            })}
        </div>

        <div className="products__mobile">
          {productData &&
            productData.map((item) => {
              return (
                <ProductComponentPropsMobile
                  key={item.id}
                  id={item.id}
                  img1={item.image[0]}
                  img2={item.image[1]}
                  price={item.price}
                />
              );
            })}
          {productData &&
            productData.map((item) => {
              return (
                <ProductComponentPropsMobile
                  key={item.id}
                  id={item.id}
                  img1={item.image[0]}
                  img2={item.image[1]}
                  price={item.price}
                />
              );
            })}
        </div>
      </Fade>
    </div>
  );
}

export default ProductsComponent;
