import { collection, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "./Header";
import "./InsideProduct.css";
import { Fade } from "react-reveal";
/* eslint-disable react/prop-types */
function InsideProduct() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    const fetchProductDetails = async () => {
      const productRef = collection(db, "Necklases");
      const docSnap = await getDoc(doc(productRef, id));
      setProductData(docSnap.data());
      // console.log(docSnap.data());
    };
    fetchProductDetails();
  }, [id]);
  return (
    <>
      {productData ? (
        <>
          <Header />
          <div className="inside__product">
            <Fade left>
              <div className="inside__product__images">
                {/* <Carousel
                autoPlay
                infinteLoop={true}
                showStatus={false}
                showIndicators={false}
                showThumbs={true}
                interval={3000}
              >
                {productData.image.map((image) => {
                  return (
                    <div
                      key={image}
                      className="inside__product__images__carousel"
                    >
                      <img
                        className="inside__product__images"
                        loading="lazy"
                        src={image}
                        alt=""
                      />
                       <video
                        className="inside__product__images"
                        loop
                        autoPlay
                        muted
                      >
                        <source src={productData.video} type="video/mp4" />
                      </video> 
                    </div>
                  );
                })}

              </Carousel> */}

                <Carousel
                  autoPlay={true}
                  infinteLoop={true}
                  showStatus={false}
                  showIndicators={true}
                  showThumbs={false}
                  interval={2000}
                >
                  <div className="inside__product__images__carousel">
                    <img
                      className="inside__product__images"
                      loading="lazy"
                      src={productData.image[0]}
                    />
                  </div>
                  <div className="inside__product__images__carousel">
                    <img
                      className="inside__product__images"
                      loading="lazy"
                      src={productData.image[1]}
                      alt=""
                    />
                  </div>
                  <div className="inside__product__images__carousel">
                    <img
                      className="inside__product__images"
                      loading="lazy"
                      src={productData.image[2]}
                      alt=""
                    />
                  </div>
                  {/*
                {productData.image[3] && (
                  <div className="inside__product__images__carousel">
                    <img
                      className="inside__product__images"
                      loading="lazy"
                      src={productData.image[3]}
                      alt=""
                    />
                  </div>
                )} */}

                  <div className="inside__product__images__carousel">
                    <video
                      className="inside__product__images"
                      loop
                      autoPlay
                      muted
                      style={{ objectFit: "cover" }}
                    >
                      <source src={productData.video} type="video/mp4" />
                    </video>
                  </div>
                </Carousel>
              </div>
            </Fade>
            <Fade right>
              <div className="inside__product__details">
                <h2>{productData.productName}</h2>
                <div className="inside__product__price">
                  <h3>₹{productData.price}</h3>
                  <p>{productData.rating} ⭐️</p>
                </div>
                <p className="inside__product__desc">{productData.desc}</p>
                <p className="inside__product__complete__desc">
                  {productData.completeDesc}
                </p>
                <button>Add to Cart</button>
              </div>
            </Fade>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default InsideProduct;
