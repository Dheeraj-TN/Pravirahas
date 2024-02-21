import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";
import ProductComponentProps from "../components/ProductComponentProps";
import ProductComponentPropsMobile from "../components/ProductComponentPropsMobile";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import "../categories/Necklaces.css";
function SubClipsPins() {
  const [{ selectedSubCategory }] = useStateValue();
  const [productData, setProductData] = useState([]);
  const subClipsPinsRef = collection(db, "ClipsPins");
  const subCategory = selectedSubCategory.split(" ")[0];
  console.log("Trimmed: ", subCategory);
  useEffect(() => {
    const q = query(subClipsPinsRef);
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

export default SubClipsPins;
