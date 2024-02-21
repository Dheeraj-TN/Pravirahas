import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";
import ProductComponentProps from "../components/ProductComponentProps";
import ProductComponentPropsMobile from "../components/ProductComponentPropsMobile";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import "../categories/Necklaces.css";
function SubBracelets() {
  const [{ selectedSubCategory }] = useStateValue();
  const [productData, setProductData] = useState([]);
  const subBraceletRef = collection(db, "Bracelet");
  const subCategory = selectedSubCategory.split(" ")[0];
  // console.log("Trimmed: ", subCategory);
  console.log("The state of selectedSubCategory is: ", selectedSubCategory);

  useEffect(() => {
    const q = query(subBraceletRef);
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((item) => item.productName.includes(subCategory));
      setProductData(data);
    });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <div className="necklaces__page">
        <ArrowLeftOutlined
          className="arrow__left__icon"
          onClick={() => window.history.back()}
        />
        <h1>{`${selectedSubCategory}`}</h1>
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
        <div className="necklaces__container__mobile">
          {productData &&
            productData.map((item) => {
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
      </div>
    </>
  );
}

export default SubBracelets;
