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
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "./Header";
import "./InsideProduct.css";
import { Fade } from "react-reveal";
import { useStateValue } from "../StateProvider";
import toast, { Toaster } from "react-hot-toast";
import Login from "../authentication/Login";
/* eslint-disable react/prop-types */
function InsideProduct() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [isHovered, setIsHovered] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };
  const [productData, setProductData] = useState(null);
  const [productVideo, setProductVideo] = useState("");
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
    const basketRef = doc(db, "users", userId, "Basket", id);
    await setDoc(basketRef, basketItems);
    toast.success("Added to cart");
  };
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
  useEffect(() => {
    const fetchProductDetails = async () => {
      const productQuery = doc(db, "Products", id);
      const productSnap = await getDoc(productQuery);
      const productType = productSnap.data().productType;
      const productRef = collection(db, productType);
      const docSnap = await getDoc(doc(productRef, id));
      setProductData(docSnap.data());
      console.log(docSnap.data().video);
      // docSnap.data().video
      //   ? setProductVideo(docSnap.data().video)
      //   : setProductVideo("");
      if (docSnap.data().video === "") {
        setProductVideo("");
        // console.log("No video!!!");
        return;
      } else {
        setProductVideo(docSnap.data().video);
        // console.log("video found");
      }
    };
    fetchProductDetails();
  }, [id]);
  return (
    <>
      {productData ? (
        <>
          <Header />
          {/* <Toaster toastOptions={{ duration: "2000" }} /> */}
          <div className="inside__product">
            <Fade left>
              <div className="inside__product__images">
                {productVideo !== "" ? (
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
                              className="product__images"
                              loading="lazy"
                              src={image}
                              alt=""
                            />
                            {/* <div className="zoom-box"></div> */}
                          </div>
                        </>
                      );
                    })}
                    <div className="inside__product__images__carousel">
                      <video
                        className="inside__product__images"
                        loop
                        autoPlay
                        muted
                      >
                        <source src={productVideo} type="video/mp4" />
                      </video>
                    </div>
                  </Carousel>
                ) : (
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
                              className="product__images"
                              loading="lazy"
                              src={image}
                              alt=""
                            />
                            {/* <div className="zoom-box"></div> */}
                          </div>
                        </>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </Fade>
            <Fade right>
              <div className="inside__product__details">
                <h2>{productData.productName}</h2>
                <div className="inside__product__price">
                  <h3>₹{productData.price}</h3>
                  {/* <p>{productData.rating} ⭐️</p> */}
                </div>
                {/* <p className="inside__product__desc">{productData.desc}</p> */}
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
