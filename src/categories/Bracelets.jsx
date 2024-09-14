import { collection, onSnapshot, query } from "firebase/firestore";
import Header from "../components/Header";
import ProductComponentProps from "../components/ProductComponentProps";
import "./Necklaces.css";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ProductComponentPropsMobile from "../components/ProductComponentPropsMobile";
import { ArrowLeftOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useStateValue } from "../StateProvider";
import { Button, ConfigProvider, Dropdown, Menu } from "antd";
function Bracelets() {
  const [{ selectedFilter }] = useStateValue();
  //console.log(selectedFilter);
  const [filter, setFilter] = useState("");
  const [clickedFilter, setClickedFilter] = useState(false);
  const braceletRef = collection(db, "Bracelet");
  const [productData, setProductData] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(6);
  const handleFilter = (e) => {
    setFilter(e.key);
  };

  useEffect(() => {
    const q = query(braceletRef);
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

  useEffect(() => {
    const sortProducts = (products, order) => {
      return [...products].sort((a, b) => {
        if (order === "price_desc") return b.price - a.price;
        if (order === "price_asc") return a.price - b.price;
        return 0; // No sorting
      });
    };
    if (filter === "price_desc" || filter === "price_asc") {
      setProductData((prev) => sortProducts(prev, filter));
    }
  }, [filter]);

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
        <div className="necklaces__container__desktop">
          <h1>Bracelets</h1>
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
            <h1>Bracelets</h1>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "rgb(219, 114, 17)",
                  colorText: "rgb(161, 90, 24);",
                  colorInfoHover: "rgb(219,114,17)",
                },
              }}
            >
              <Dropdown
                overlay={
                  <Menu onClick={handleFilter}>
                    <Menu.Item
                      key="price_asc"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Price, Low to High
                    </Menu.Item>
                    <Menu.Item
                      key="price_desc"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Price, High to Low
                    </Menu.Item>
                    <Menu.Item
                      key="old"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Date, Old to New
                    </Menu.Item>
                    <Menu.Item
                      key="new"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Date, New to Old
                    </Menu.Item>
                  </Menu>
                }
                arrow
                placement="bottomLeft"
              >
                <Button
                  style={{
                    fontSize: "16px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #ba704f",
                    borderRadius: "5px",
                    color: "#ba704f",
                    fontWeight: "500",
                  }}
                  onClick={() => setClickedFilter(!clickedFilter)}
                >
                  Filter By{" "}
                  {clickedFilter ? (
                    <UpOutlined style={{ fontSize: "12px" }} />
                  ) : (
                    <DownOutlined />
                  )}
                </Button>
              </Dropdown>
            </ConfigProvider>
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

export default Bracelets;
