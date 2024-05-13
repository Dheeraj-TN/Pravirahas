/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
// import ProductComponentProps from "../components/ProductComponentProps";
// import ProductComponentPropsMobile from "../components/ProductComponentPropsMobile";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import ProductComponentProps from "./ProductComponentProps";
import ProductComponentPropsMobile from "./ProductComponentPropsMobile";
// import { useLocation } from "react-router-dom";
function SearchResultsPage() {
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [loading, setLoading] = useState(false);
  const searchedName = location.pathname.split("/")[2];
  const [productData, setProductData] = useState([]);
  const [allProds, setAllProds] = useState([]);
  const seachedProductsRef = collection(db, "Products");

  useEffect(() => {
    const docs = async () => {
      setLoading(true); // Set loading to true
      const q = query(seachedProductsRef);
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProds(data);
    };

    docs();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!searchedName || !allProds.length) return; // Make sure searchedName and allProds are defined
    const filteredData = allProds.filter((item) => {
      return item.productName
        .toLowerCase()
        .includes(searchedName.toLowerCase());
    });

    setProductData(filteredData);

    // eslint-disable-next-line
  }, [searchedName, allProds]);

  // if (!allProds.length) {
  //   return <div>Loading...</div>;
  // }
  useEffect(() => {
    // Use the Category and ID to get the products
    const getProducts = async () => {
      const data = productData.map(async (item) => {
        const productRef = collection(db, item.productType);
        const docSnap = await getDoc(doc(productRef, item.id));
        return docSnap.data();
      });

      const products = await Promise.all(data);
      setAllProducts(products);
    };
    getProducts();
  }, [productData]);

  console.log("all products: ", allProducts);

  useEffect(() => {
    setVisibleProducts(allProducts.slice(0, itemsToShow));
  }, [allProducts, itemsToShow]);
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
        <h1>Results of your search: {searchedName}</h1>
        <div className="necklaces__container__desktop">
          {allProducts ? (
            <div className="necklaces__container">
              {allProducts.map((item) => (
                <ProductComponentProps
                  key={item.uniqueId}
                  id={item.uniqueId}
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
          ) : (
            <p>Oops no such prouduct !!</p>
          )}
        </div>
        <div className="necklaces__container__mobile__container">
          <div className="necklaces__container__mobile">
            {allProducts &&
              visibleProducts.map((item) => {
                return (
                  <ProductComponentPropsMobile
                    key={item.uniqueId}
                    id={item.uniqueId}
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
        {/* <div className="necklaces__container__mobile__container">
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
        </div> */}
      </div>
    </>
  );
}

export default SearchResultsPage;
