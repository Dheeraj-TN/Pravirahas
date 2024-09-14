import { collection, onSnapshot, query } from "firebase/firestore";
import Header from "../components/Header";
import ProductComponentProps from "../components/ProductComponentProps";
import "./Necklaces.css";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ProductComponentPropsMobile from "../components/ProductComponentPropsMobile";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useStateValue } from "../StateProvider";
function NewArrivals() {
  const [{ selectedFilter }] = useStateValue();
  const newArrivalsRef = collection(db, "NewArrivals");
  const [productData, setProductData] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(6);
  useEffect(() => {
    const q = query(newArrivalsRef);
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductData(data);
      // console.log("dataid:", data.id);
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
          onClick={() => window.history.back()}
        />
        <h1>New Arrivals</h1>
        <div className="necklaces__container__desktop">
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
        <div className="necklaces__container__mobile__container">
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

export default NewArrivals;
