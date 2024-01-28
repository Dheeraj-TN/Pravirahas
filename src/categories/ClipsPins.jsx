import { collection, onSnapshot, query } from "firebase/firestore";
import Header from "../components/Header";
import ProductComponentProps from "../components/ProductComponentProps";
import "./Neckaces.css";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ProductComponentPropsMobile from "../components/ProductComponentPropsMobile";
function ClipsPins() {
  const clipsPinsRef = collection(db, "ClipsPins");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const q = query(clipsPinsRef);
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
  return (
    <>
      <Header />
      <div className="ClipsPins__page">
        <h1>Clips and Pins</h1>
        <div className="ClipsPins__container__desktop">
          {productData && (
            <div className="ClipsPins__container">
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
                />
              ))}
            </div>
          )}
        </div>
        <div className="ClipsPins__container__mobile">
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
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ClipsPins;
