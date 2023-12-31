/* eslint-disable no-unused-vars */
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "./Header";
import "./InsideProduct.css";
import { Fade } from "react-reveal";
import { useStateValue } from "../StateProvider";
import toast, { Toaster } from "react-hot-toast";
/* eslint-disable react/prop-types */
function InsideProduct() {
  const [{ basket, user }, dispatch] = useStateValue();
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [userId, setUserId] = useState("");
  const basketItems = {
    id: id,
    img1: productData?.image[0],
    productName: productData?.productName,
    price: productData?.price,
    rating: productData?.rating,
    desc: productData?.desc,
    quantity: 1,
  };
  const addToBasket = async () => {
    // const basketRef = collection(db, `users/${userId}/Basket`);
    toast.loading("Adding to cart...", {
      duration: 1000,
    });
    const basketRef = doc(db, "users", userId, "Basket", id);
    await setDoc(basketRef, basketItems);
    toast.success("Added to cart");
  };
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("emailAddress", "==", user?.email)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        setUserId(doc.id);
      });
    });
    const fetchProductDetails = async () => {
      const productQuery = doc(db, "Products", id);
      const productSnap = await getDoc(productQuery);
      const productType = productSnap.data().productType;
      const productRef = collection(db, productType);
      const docSnap = await getDoc(doc(productRef, id));
      setProductData(docSnap.data());
      // console.log(docSnap.data());
    };
    fetchProductDetails();
    return () => unsub();
  }, [id, user?.email]);
  return (
    <>
      {productData ? (
        <>
          <Header />
          {/* <Toaster toastOptions={{ duration: "2000" }} /> */}
          <div className="inside__product">
            <Fade left>
              <div className="inside__product__images">
                <Carousel
                  autoPlay={true}
                  infinteLoop={true}
                  showStatus={false}
                  showIndicators={false}
                  showThumbs={true}
                  interval={3000}
                >
                  {productData.image.map((image, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="inside__product__images__carousel"
                        >
                          <img
                            className="inside__product__images"
                            loading="lazy"
                            src={image}
                            alt=""
                          />
                        </div>
                      </>
                    );
                  })}
                  {productData.video && (
                    <div className="inside__product__images__carousel">
                      <video
                        className="inside__product__images"
                        loop
                        autoPlay
                        muted
                      >
                        <source src={productData.video} type="video/mp4" />
                      </video>
                    </div>
                  )}
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
                <button onClick={addToBasket}>Add to Cart</button>
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
