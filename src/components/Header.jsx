/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
// import logo from "../assets/pravirasLogo.png";
import logo2 from "../assets/praviras-removebg-preview2.png";
import {
  HeartFilled,
  UserOutlined,
  ShoppingFilled,
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
  DownOutlined,
  UpOutlined,
  AlignLeftOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { ConfigProvider, Menu, Tooltip } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "@badrap/bar-of-progress";
import { useStateValue } from "../StateProvider";
import { auth, db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

function Header() {
  const navigate = useNavigate();
  const [{ user, basket, selectedSubCategory }, dispatch] = useStateValue();
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [userId, setUserId] = useState("");
  const [basketItems, setBasketItems] = useState([]);
  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });

  const handleMenuItemClick = (item) => {
    const clicked = item.key;
    dispatch({ type: "SELECTED_SUBCAT_ITEM", selectedSubCategory: clicked });
    setSelectedItem(item.key);
    setBurgerStatus(false);
    console.log("Selected Item: ", clicked);
    // check if the clicked item includes neckalaces or chains
    if (clicked.includes("Necklaces") || clicked.includes("Chains")) {
      navigate(`/${clicked}`);
      return;
    }
    if (clicked.includes("Bracelets") || clicked.includes("Kada")) {
      navigate(`/${clicked}`);
      return;
    }
    if (
      clicked.includes("Hoops") ||
      clicked.includes("Studs") ||
      clicked.includes("Statement")
    ) {
      // navigate(`/earring/${clicked}`);
      console.log("hello");
      return;
    }
    if (
      clicked.includes("Center") ||
      clicked.includes("Handmade") ||
      clicked.includes("Saree") ||
      clicked.includes("Hair")
    ) {
      navigate(`/clips&Pins/${clicked}`);
      return;
    }
    navigate("/");
  };
  const handleMenuMouseEnter = (menuKey) => {
    setHoveredMenuItem(menuKey);
  };

  const handleMenuMouseLeave = () => {
    setHoveredMenuItem(null);
  };
  const redirectToHome = () => {
    progressor.start();
    setTimeout(() => {
      progressor.finish();
      navigate("/");
    }, 1000);
  };
  const loginPage = () => {
    if (!user) {
      progressor.start();
      setTimeout(() => {
        progressor.finish();
        1;
        navigate("/login");
      }, 1000);
      return;
    }
    toast.error("Already logged in");
    navigate("/profile");
  };
  const signOut = () => {
    if (user) {
      auth.signOut();
      dispatch({ type: "SET_USER", user: null });
      toast.error("You logged out !!");
      navigate("/login");
      localStorage.removeItem("basketId");
    }
  };

  // if (params.includes("Necklaces") || params.includes("Chains")) {
  //   dispatch({ type: "SELECTED_SUBCAT_ITEM", selectedSubCategory: params });
  // }
  useEffect(() => {
    if (!user || !user?.email) return;
    const userQuery = query(collection(db, "users"));
    const unsub = onSnapshot(userQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().emailAddress === user?.email) {
          setUserId(doc.id);
        }
      });
    });
    const getBasketItems = async () => {
      const basketQuery = query(collection(db, "users", `${userId}`, "Basket"));
      onSnapshot(basketQuery, (snapshot) => {
        const basketData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBasketItems(basketData);
      });
    };
    getBasketItems();
    return () => {
      unsub();
    };
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const handleBackButtonClick = () => {
      console.log("Back button of browser is clicked");
      window.history.clear();
      navigate("/");
    };
    window.addEventListener("popstate", handleBackButtonClick);
    return () => {
      window.removeEventListener("popstate", handleBackButtonClick);
    };
    //eslint-disable-next-line
  }, []);
  // console.log("user in home: ", user?.email);
  // console.log(userId);
  // console.log("Basket Items: ", basketItems);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(219, 114, 17)",
            colorText: "rgb(113, 56, 3);",
            colorInfoHover: "rgb(219,114,17)",
          },
          button: {
            color: "rgb(219, 114, 17)",
            backgroundColor: "rgb(219, 114, 17)",
            border: "rgb(219, 114, 17)",
            style: {
              width: 80,
              margin: 4,
            },
          },
        }}
      >
        <div className="header">
          <div className="header__left">
            <img
              src={logo2}
              alt="logo"
              onClick={redirectToHome}
              style={{ cursor: "pointer" }}
            />
            <div
              style={{ backgroundColor: "#fff" }}
              className="header__left__menu"
            >
              <Menu
                onClick={handleMenuItemClick}
                mode="horizontal"
                id="desktop__header"
                style={{ borderBottom: "none" }}
              >
                <Menu.SubMenu
                  onMouseEnter={() => handleMenuMouseEnter("menu1")}
                  onMouseLeave={handleMenuMouseLeave}
                  key="menu1"
                  title={
                    <span className="menu__items">
                      <a className="menu__items__a">Necklaces</a>
                      <div className="arrow__icons">
                        {hoveredMenuItem === "menu1" ? (
                          <UpOutlined />
                        ) : (
                          <DownOutlined />
                        )}
                      </div>
                    </span>
                  }
                >
                  <Menu.Item key="Mangalasutra Necklaces">
                    Mangalasutra Necklaces
                  </Menu.Item>
                  <Menu.Item key="Charm Chains">Charm Chains</Menu.Item>
                  <Menu.Item key="Cayered Chains">Cayered Chains</Menu.Item>
                  <Menu.Item key="Pendent Chains">Pendent Chains</Menu.Item>
                  <Menu.Item key="Layered Chains">Layered Chains</Menu.Item>
                  <Menu.Item key="18k Plated Chains">
                    18k Plated Chains
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  onMouseEnter={() => handleMenuMouseEnter("menu2")}
                  onMouseLeave={handleMenuMouseLeave}
                  key="menu2"
                  title={
                    <span className="menu__items">
                      <a className="menu__items__a"> Bracelets </a>
                      <div className="arrow__icons">
                        {hoveredMenuItem === "menu2" ? (
                          <UpOutlined />
                        ) : (
                          <DownOutlined />
                        )}
                      </div>
                    </span>
                  }
                >
                  <Menu.Item key="Mangalasutra Bracelets">
                    Mangalasutra Bracelets
                  </Menu.Item>
                  <Menu.Item key="Stainless Steel Kada ">
                    Stainless Steel Kada
                  </Menu.Item>
                  <Menu.Item key="Stainless Steel Bracelets">
                    Stainless Steel Bracelets
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  onMouseEnter={() => handleMenuMouseEnter("menu3")}
                  onMouseLeave={handleMenuMouseLeave}
                  key="menu3"
                  title={
                    <span className="menu__items">
                      <a className="menu__items__a">Earrings </a>
                      <div className="arrow__icons">
                        {hoveredMenuItem === "menu3" ? (
                          <UpOutlined />
                        ) : (
                          <DownOutlined />
                        )}
                      </div>
                    </span>
                  }
                >
                  <Menu.Item key="Studs">Studs</Menu.Item>
                  <Menu.Item key="Hoops">Hoops</Menu.Item>
                  <Menu.Item key="Statement Earrings">
                    Statement Earrings
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  onMouseEnter={() => handleMenuMouseEnter("menu4")}
                  onMouseLeave={handleMenuMouseLeave}
                  key="menu4"
                  title={
                    <span className="menu__items">
                      <a className="menu__items__a">Clips and Pins </a>
                      <div className="arrow__icons">
                        {hoveredMenuItem === "menu4" ? (
                          <UpOutlined />
                        ) : (
                          <DownOutlined />
                        )}
                      </div>
                    </span>
                  }
                >
                  <Menu.Item key="Center Clips">Center Clips</Menu.Item>
                  <Menu.Item key="Handmade clips">Handmade clips</Menu.Item>
                  <Menu.Item key="Saree Pins">Saree Pins</Menu.Item>
                  <Menu.Item key="Hair Pins">Hair Pins</Menu.Item>
                </Menu.SubMenu>
              </Menu>
              <div>{selectedItem && <p>Selected: {selectedItem}</p>}</div>
            </div>
          </div>
          <div className="header__right">
            <div className="search__bar">
              <input type="text" placeholder="Search by category..." />
              <SearchOutlined className="header__icons" />
            </div>
            <div className="other__header__components">
              <Menu
                onClick={handleMenuItemClick}
                mode="horizontal"
                style={{ borderBottom: "none" }}
              >
                <Menu.SubMenu
                  onMouseEnter={() => handleMenuMouseEnter("filters")}
                  onMouseLeave={handleMenuMouseLeave}
                  key="filters"
                  title={
                    <AlignLeftOutlined
                      className="header__icons"
                      style={{
                        fontSize: "22px",
                        marginTop: "15px",
                      }}
                    />
                  }
                >
                  <Menu.Item key="filters_1">Price,Low to High</Menu.Item>
                  <Menu.Item key="filters_2">Price,High to Low</Menu.Item>
                  <Menu.Item key="filters_3">Date,Old to New</Menu.Item>
                  <Menu.Item key="filters_4">Date,New to Old</Menu.Item>
                </Menu.SubMenu>
              </Menu>

              <Tooltip
                placement="bottom"
                title={!user ? "Account" : user?.email}
              >
                <UserOutlined className="header__icons" onClick={loginPage} />
              </Tooltip>

              <Tooltip placement="bottom" title={"Wishlist"}>
                <HeartFilled className="header__icons" />
              </Tooltip>
              <Tooltip placement="bottom" title={"Basket"}>
                <ShoppingFilled
                  className="header__icons"
                  onClick={() => navigate("/checkout")}
                />
                <span className="basket__length">
                  {user ? basketItems.length : "0"}
                </span>
              </Tooltip>
              <Tooltip placement="bottom" title={"Logout"}>
                {user && (
                  <LogoutOutlined className="header__icons" onClick={signOut} />
                )}
              </Tooltip>
            </div>
          </div>
        </div>
      </ConfigProvider>
      {/* mobile */}
      <div className="header__mobile">
        <div className="header__mobile__left">
          <img
            src={logo2}
            alt="logo"
            onClick={redirectToHome}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="header__mobile__right">
          <div className="search__bar__mobile">
            <input type="text" placeholder="Search by category..." />
            <SearchOutlined style={{ cursor: "pointer" }} />
          </div>
          <Menu
            onClick={handleMenuItemClick}
            mode="horizontal"
            style={{ borderBottom: "none" }}
          ></Menu>
          <div
            className="burger__menu"
            onClick={() => setBurgerStatus(!burgerStatus)}
            style={{ display: "block", background: "transparent" }}
          >
            <div className="">
              {burgerStatus ? (
                <CloseOutlined className="menu__icons" />
              ) : (
                <MenuOutlined className="menu__icons" />
              )}
            </div>
          </div>

          {/* <div>{selectedItem && <p>Selected: {selectedItem}</p>}</div> */}
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "rgb(219, 114, 17)",
                colorText: "rgb(161, 90, 24);",
                colorInfoHover: "rgb(219,114,17)",
              },
            }}
          >
            <div className="hamburger__menu" style={{ display: "block" }}>
              <div
                className={burgerStatus ? "active__header" : "inactive__header"}
              >
                <Menu
                  onClick={handleMenuItemClick}
                  mode="inline"
                  id="mobile__header"
                >
                  <Menu.SubMenu
                    onMouseEnter={() => handleMenuMouseEnter("menu1")}
                    onMouseLeave={handleMenuMouseLeave}
                    onClick={() => {
                      setBurgerStatus(false);
                    }}
                    key="menu1"
                    title={
                      <span className="menu__items">
                        <a
                          className="menu__items__a"
                          style={{ color: "rgb(219,114,17)" }}
                        >
                          Necklaces
                        </a>
                      </span>
                    }
                  >
                    <Menu.Item key="Mangalasutra_Necklaces_Mob">
                      Mangalasutra Necklaces
                    </Menu.Item>
                    <Menu.Item key="Charm_Chains">Charm Chains</Menu.Item>
                    <Menu.Item key="Cayered_Chains">Cayered Chains</Menu.Item>
                    <Menu.Item key="Layered_Chains">Layered Chains</Menu.Item>
                    <Menu.Item key="Pendent_Chains">Pendent Chains</Menu.Item>
                    <Menu.Item key="18k_plated_Chains">
                      18k plated Chains
                    </Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu
                    onMouseEnter={() => handleMenuMouseEnter("menu2")}
                    onMouseLeave={handleMenuMouseLeave}
                    key="menu2"
                    title={
                      <span className="menu__items">
                        <a className="menu__items__a"> Barcelets </a>
                      </span>
                    }
                  >
                    <Menu.Item key="Mangalasutra Bracelets">
                      Mangalasutra Bracelets
                    </Menu.Item>
                    <Menu.Item key="Stainless Steel Kada">
                      Stainless Steel Kada
                    </Menu.Item>
                    <Menu.Item key="Stainless Steel Bracelet">
                      Stainless Steel Bracelets
                    </Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu
                    onMouseEnter={() => handleMenuMouseEnter("menu3")}
                    onMouseLeave={handleMenuMouseLeave}
                    key="menu3"
                    title={
                      <span className="menu__items">
                        <a className="menu__items__a">Earrings </a>
                      </span>
                    }
                  >
                    <Menu.Item key="Studs">Studs</Menu.Item>
                    <Menu.Item key="Hoops">Hoops</Menu.Item>
                    <Menu.Item key="Statement Earrings">
                      Statement Earrings
                    </Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu
                    onMouseEnter={() => handleMenuMouseEnter("menu4")}
                    onMouseLeave={handleMenuMouseLeave}
                    key="menu4"
                    title={
                      <span className="menu__items">
                        <a className="menu__items__a">Clips and Pins </a>
                      </span>
                    }
                  >
                    <Menu.Item key="Center Clips">Center Clips</Menu.Item>
                    <Menu.Item key="Handmade clips">Handmade clips</Menu.Item>
                    <Menu.Item key=">Saree Pins">Saree Pins</Menu.Item>
                    <Menu.Item key="Hair Pins">Hair Pins</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu
                    onMouseEnter={() => handleMenuMouseEnter("filters")}
                    onMouseLeave={handleMenuMouseLeave}
                    key="filters"
                    title={
                      <span className="menu__items">
                        <a className="menu__items__a">Filter by</a>
                      </span>
                    }
                  >
                    <Menu.Item key="Price,Low to High">
                      Price,Low to High
                    </Menu.Item>
                    <Menu.Item key="Price,High to Low">
                      Price,High to Low
                    </Menu.Item>
                    <Menu.Item key="Date,Old to New">Date,Old to New</Menu.Item>
                    <Menu.Item key="Date,New to Old">Date,New to Old</Menu.Item>
                  </Menu.SubMenu>
                  <hr className="horizontal__divider" />
                  <div className="other__menu__items">
                    <Menu.Item key="other_1">
                      <p className="other__menu__items__p" onClick={loginPage}>
                        Account
                      </p>
                    </Menu.Item>
                    <Menu.Item key="other_2">
                      <p className="other__menu__items__p">Wishlist</p>
                    </Menu.Item>
                    <Menu.Item key="other_3">
                      <p
                        className="other__menu__items__p"
                        onClick={() => navigate("/checkout")}
                      >
                        Your Basket ({basketItems?.length} items)
                      </p>
                    </Menu.Item>
                    {user && (
                      <Menu.Item key="other_4">
                        <p className="other__menu__items__p" onClick={signOut}>
                          Logout
                        </p>
                      </Menu.Item>
                    )}
                  </div>
                </Menu>
              </div>
            </div>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

export default Header;
