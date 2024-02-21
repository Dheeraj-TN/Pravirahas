/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  limit,
} from "firebase/firestore";
import Header from "../components/Header";
import ProductComponentProps from "../components/ProductComponentProps";
import "./Necklaces.css";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ProductComponentPropsMobile from "../components/ProductComponentPropsMobile";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ConfigProvider, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

function Earrings() {
  const earringsRef = collection(db, "Earrings");
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showBottomFixed, setShowBottomFixed] = useState(false);
  const productsPerPage = 10;
  const navigate = useNavigate();
  const onPageChange = async (page) => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const q = query(earringsRef, limit(endIndex));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProductData(data.slice(startIndex, endIndex));
    setCurrentPage(page);
  };
  const calculateProductsOnPage = () => {
    return totalProducts - (currentPage - 1) * productsPerPage;
  };
  useEffect(() => {
    const productsOnSecondPage = calculateProductsOnPage();
    if (productsOnSecondPage < productsPerPage) {
      setShowBottomFixed(true);
    }
    console.log("Products on current page:", productsOnSecondPage);
  }, [totalProducts, currentPage, productsPerPage, calculateProductsOnPage]);

  useEffect(() => {
    const q = query(earringsRef);
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTotalProducts(data.length);
      setProductData(data.slice(0, productsPerPage));
    });
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <div className="necklaces__page">
        <ArrowLeftOutlined
          className="arrow__left__icon"
          onClick={() => navigate("/")}
        />
        <h1>Earrings</h1>
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
            productData.map((item) => (
              <ProductComponentPropsMobile
                key={item.id}
                id={item.id}
                img1={item.image[0]}
                img2={item.image[1]}
                price={item.price}
                name={item.productName}
                status={item.status}
              />
            ))}
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "rgb(219, 114, 17)",
              colorText: "rgb(113, 56, 3);",
              colorInfoHover: "rgb(219,114,17)",
            },
          }}
        >
          {totalProducts > productsPerPage && (
            <div
              className={`${
                showBottomFixed
                  ? "pagination__container2"
                  : "pagination__container"
              }`}
            >
              <Pagination
                current={currentPage}
                total={totalProducts}
                pageSize={productsPerPage}
                onChange={onPageChange}
              />
            </div>
          )}
        </ConfigProvider>
      </div>
    </>
  );
}

export default Earrings;
