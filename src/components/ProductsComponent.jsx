import ProductComponentProps from "./ProductComponentProps";
import "./ProductsComponent.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { Fade } from "react-reveal";
import { motion } from "framer-motion";
import ProductComponentPropsMobile from "./ProductComponentPropsMobile";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@badrap/bar-of-progress";

function ProductsComponent() {
  const navigate = useNavigate();
  const necklaseRef = collection(db, "Necklases");
  const braceletRef = collection(db, "Bracelet");
  const earringRef = collection(db, "Earrings");
  const clipsPinsRef = collection(db, "ClipsPins");
  const [productDataNeckalces, setProductDataNeckalces] = useState([]);
  const [productDataBracelets, setProductDataBracelets] = useState([]);
  const [productDataEarrings, setProductDataEarrings] = useState([]);
  const [productDataClipsPins, setProductDataClipsPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });
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
    setLoading(true);
    const q = query(necklaseRef, limit(4));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductDataNeckalces(data);
      setLoading(false);
      // console.log("dataid:", data.id);
    });
    const q2 = query(braceletRef, limit(4));
    onSnapshot(q2, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductDataBracelets(data);
      setLoading(false);
      // console.log("dataid:", data.id);
    });
    const q3 = query(earringRef, limit(4));
    onSnapshot(q3, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductDataEarrings(data);
      setLoading(false);
      // console.log("dataid:", data.id);
    });
    const q4 = query(clipsPinsRef, limit(4));
    onSnapshot(q4, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductDataClipsPins(data);
      setLoading(false);
      // console.log("dataid:", data.id);
    });

    //eslint-disable-next-line
  }, []);
  const goToNecklace = () => {
    progressor.start();
    setTimeout(() => {
      progressor.finish();
      navigate("/necklaces");
    }, 1000);
  };
  const goToBracelets = () => {
    progressor.start();
    setTimeout(() => {
      progressor.finish();
      navigate("/bracelets");
    }, 1000);
  }; 
  const goToEarrings = () => {
    progressor.start();
    setTimeout(() => {
      progressor.finish();
      navigate("/earrings");
    }, 1000);
  };
  const goToClipsPins = () => {
    progressor.start();
    setTimeout(() => {
      progressor.finish();
      navigate("/clipsPins");
    }, 1000);
  };
  return (
    <>
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
        {loading ? (
          <div className="skeleton__style">
            <Skeleton
              active
              paragraph={{ rows: 3 }}
              avatar={{ shape: "square", size: 300 }}
              className="content"
            />
          </div>
        ) : (
          <Fade right>
            <div className="products">
              {productDataNeckalces &&
                productDataNeckalces.map((item) => {
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
                      status={item.status}
                    />
                  );
                })}
            </div>
          </Fade>
        )}
        <>
          {loading ? (
            <div className="skeleton__style__mobile">
              <Skeleton
                active
                avatar={{ shape: "square", size: 150 }}
                className="content__mobile"
              />
              <Skeleton
                active
                avatar={{ shape: "square", size: 150 }}
                className="content__mobile"
              />
            </div>
          ) : (
            <Fade right>
              <div className="products__mobile">
                {productDataNeckalces &&
                  productDataNeckalces.map((item) => {
                    return (
                      <ProductComponentPropsMobile
                        key={item.id}
                        id={item.id}
                        img1={item.image[0]}
                        img2={item.image[1]}
                        price={item.price}
                        name={item.productName}
                        status={item.status}
                      />
                    );
                  })}
              </div>
            </Fade>
          )}
        </>
        {/* neckalces */}
        <div className="product__component__title">
          <h1>Necklaces</h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={rightArrowVarinats}
          >
            <ArrowRightOutlined
              onClick={goToNecklace}
              className="more__arrow__icon"
            />
          </motion.p>
        </div>
        <Fade right>
          <div className="products">
            {productDataNeckalces &&
              productDataNeckalces.map((item) => {
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
                    status={item.status}
                  />
                );
              })}
          </div>
        </Fade>
        {loading ? (
          <div className="skeleton__style__mobile">
            <Skeleton
              active
              avatar={{ shape: "square", size: 150 }}
              className="content__mobile"
            />
            <Skeleton
              active
              avatar={{ shape: "square", size: 150 }}
              className="content__mobile"
            />
          </div>
        ) : (
          <Fade right>
            <div className="products__mobile">
              {productDataNeckalces &&
                productDataNeckalces.map((item) => {
                  return (
                    <ProductComponentPropsMobile
                      key={item.id}
                      id={item.id}
                      img1={item.image[0]}
                      img2={item.image[1]}
                      price={item.price}
                      name={item.productName}
                      status={item.status}
                    />
                  );
                })}
            </div>
          </Fade>
        )}
        <div className="product__component__title">
          <h1>Bracelets</h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={rightArrowVarinats}
          >
            <ArrowRightOutlined className="more__arrow__icon" onClick={goToBracelets}/>
          </motion.p>
        </div>
        {loading ? (
          <div className="skeleton__style">
            <Skeleton
              active
              paragraph={{ rows: 3 }}
              avatar={{ shape: "square", size: 300 }}
              className="content"
            />
          </div>
        ) : (
          <Fade right>
            <div className="products">
              {productDataBracelets &&
                productDataBracelets.map((item) => {
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
                      status={item.status}
                    />
                  );
                })}
            </div>
          </Fade>
        )}
        <>
          {loading ? (
            <div className="skeleton__style__mobile">
              <Skeleton
                active
                avatar={{ shape: "square", size: 150 }}
                className="content__mobile"
              />
              <Skeleton
                active
                avatar={{ shape: "square", size: 150 }}
                className="content__mobile"
              />
            </div>
          ) : (
            <Fade right>
              <div className="products__mobile">
                {productDataBracelets &&
                  productDataBracelets.map((item) => {
                    return (
                      <ProductComponentPropsMobile
                        key={item.id}
                        id={item.id}
                        img1={item.image[0]}
                        img2={item.image[1]}
                        price={item.price}
                        name={item.productName}
                        status={item.status}
                      />
                    );
                  })}
              </div>
            </Fade>
          )}
        </>
        {/* earrings */}
        <div className="product__component__title">
          <h1>Earrings</h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={rightArrowVarinats}
          >
            <ArrowRightOutlined className="more__arrow__icon" onClick={goToEarrings}/>
          </motion.p>
        </div>

        {loading ? (
          <div className="skeleton__style">
            <Skeleton
              active
              paragraph={{ rows: 3 }}
              avatar={{ shape: "square", size: 300 }}
              className="content"
            />
          </div>
        ) : (
          <Fade right>
            <div className="products">
              {productDataEarrings &&
                productDataEarrings.map((item) => {
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
                      status={item.status}
                    />
                  );
                })}
            </div>
          </Fade>
        )}
        <>
          {loading ? (
            <div className="skeleton__style__mobile">
              <Skeleton
                active
                avatar={{ shape: "square", size: 150 }}
                className="content__mobile"
              />
              <Skeleton
                active
                avatar={{ shape: "square", size: 150 }}
                className="content__mobile"
              />
            </div>
          ) : (
            <Fade right>
              <div className="products__mobile">
                {productDataEarrings &&
                  productDataEarrings.map((item) => {
                    return (
                      <ProductComponentPropsMobile
                        key={item.id}
                        id={item.id}
                        img1={item.image[0]}
                        img2={item.image[1]}
                        price={item.price}
                        name={item.productName}
                        status={item.status}
                      />
                    );
                  })}
              </div>
            </Fade>
          )}
        </>
        <div className="product__component__title">
          <h1>Clips and Pins</h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={rightArrowVarinats}
          >
            <ArrowRightOutlined className="more__arrow__icon" onClick={goToClipsPins}/>
          </motion.p>
        </div>

        {loading ? (
          <div className="skeleton__style">
            <Skeleton
              active
              paragraph={{ rows: 3 }}
              avatar={{ shape: "square", size: 300 }}
              className="content"
            />
          </div>
        ) : (
          <Fade right>
            <div className="products">
              {productDataClipsPins &&
                productDataClipsPins.map((item) => {
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
                      status={item.status}
                    />
                  );
                })}
            </div>
          </Fade>
        )}
        <>
          {loading ? (
            <div className="skeleton__style__mobile">
              <Skeleton
                active
                avatar={{ shape: "square", size: 150 }}
                className="content__mobile"
              />
              <Skeleton
                active
                avatar={{ shape: "square", size: 150 }}
                className="content__mobile"
              />
            </div>
          ) : (
            <Fade right>
              <div className="products__mobile">
                {productDataClipsPins &&
                  productDataClipsPins.map((item) => {
                    return (
                      <ProductComponentPropsMobile
                        key={item.id}
                        id={item.id}
                        img1={item.image[0]}
                        img2={item.image[1]}
                        price={item.price}
                        name={item.productName}
                        status={item.status}
                      />
                    );
                  })}
              </div>
            </Fade>
          )}
        </>
      </div>
    </>
  );
}

export default ProductsComponent;
