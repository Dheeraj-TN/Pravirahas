/* eslint-disable react-hooks/exhaustive-deps */
import { collection, query, onSnapshot } from "firebase/firestore";
import Header from "../components/Header";
import ProductComponentProps from "../components/ProductComponentProps";
import "./Necklaces.css";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ProductComponentPropsMobile from "../components/ProductComponentPropsMobile";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import SortByMobileComponent from "../components/SortByMobileComponent";

function Earrings() {
  const [{ selectedFilter, selectedFilterMobile }] = useStateValue();

  const navigate = useNavigate();
  const earringsRef = collection(db, "Earrings");
  const [productData, setProductData] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(6);
  useEffect(() => {
    const q = query(earringsRef);
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductData(data);
    });
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const sortProducts = (products, order) => {
      return [...products].sort((a, b) => {
        if (order === "price_desc") return b.price - a.price;
        if (order === "price_asc") return a.price - b.price;
        return 0; // No sorting
      });
    };
    if (selectedFilter === "price_desc" || selectedFilter === "price_asc") {
      setProductData((prev) => sortProducts(prev, selectedFilter));
    }
  }, [selectedFilter]);
  // mobile sorting
  useEffect(() => {
    const sortProducts = (products, order) => {
      return [...products].sort((a, b) => {
        if (order === "price_desc") return b.price - a.price;
        if (order === "price_asc") return a.price - b.price;
        return 0; // No sorting
      });
    };
    if (
      selectedFilterMobile === "price_desc" ||
      selectedFilterMobile === "price_asc"
    ) {
      setProductData((prev) => sortProducts(prev, selectedFilterMobile));
    }
  }, [selectedFilterMobile]);

  useEffect(() => {
    setVisibleProducts(productData.slice(0, itemsToShow));
  }, [productData, itemsToShow]);
  const loadMore = () => {
    setItemsToShow((prev) => prev + 6);
  };
  return (
    <>
      <Header />
      <div className="necklaces__page">
        <ArrowLeftOutlined
          className="arrow__left__icon"
          onClick={() => navigate("/")}
        />
        <div className="necklaces__container__desktop">
          <h1>Earrings</h1>
          {productData && (
            <div className="necklaces__container">
              {productData.map((item) => (
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
              ))}
            </div>
          )}
        </div>
        {/* mobile */}
        <div className="necklaces__container__mobile__container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <h1>Earrings</h1>
            <SortByMobileComponent />
          </div>
          <div className="necklaces__container__mobile">
            {productData &&
              visibleProducts.map((item) => {
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
          {visibleProducts.length < productData.length && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                alignSelf: "center",
              }}
            >
              <button className="load__more__button" onClick={loadMore}>
                Load More ...
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Earrings;
