import { collection, onSnapshot, query } from "firebase/firestore";
import Header from "../components/Header";
import ProductComponentProps from "../components/ProductComponentProps";
import "./Necklaces.css";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ProductComponentPropsMobile from "../components/ProductComponentPropsMobile";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useStateValue } from "../StateProvider";
function Bracelets() {
  const [{ selectedSubCategory }] = useStateValue();
  console.log("Sort: ", selectedSubCategory);
  const braceletRef = collection(db, "Bracelet");
  const [productData, setProductData] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(4);
  
  useEffect(() => {
    const q = query(braceletRef);
    
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductData(data);
    })
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    setVisibleProducts(productData.slice(0, itemsToShow));
  }, [productData, itemsToShow]);
  const loadMore = () => {
    setItemsToShow((prev) => prev + 4);
  };
  return (
    <>
      <Header />
      <div className="necklaces__page">
        <ArrowLeftOutlined
          className="arrow__left__icon"
          onClick={() => window.history.back()}
        />
        <h1>Bracelets</h1>
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

export default Bracelets;
