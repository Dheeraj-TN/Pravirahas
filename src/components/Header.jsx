import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import ProgressBar from "@badrap/bar-of-progress";
import { useStateValue } from "../StateProvider";
import { auth, db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { getBasketTotal } from "../reducer";

function Header() {
  const navigate = useNavigate();
  const [{ user, basket }, dispacth] = useStateValue();
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const basketRef = collection(db, "BasketItems");

  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });
  const handleMenuItemClick = (item) => {
    setSelectedItem(item.key);
    setBurgerStatus(false);
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
  const viewBasket = async (e) => {
    e.preventDefault();
    progressor.start();
    const docRef = await addDoc(basketRef, {
      user: user?.email,
      basketitems: basket,
      total: getBasketTotal(basket),
    });
    let basketId = docRef.id;
    setTimeout(() => {
      progressor.finish();
      navigate(`/checkout/${basketId}`);
    }, 1000);
    return docRef.id;
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
  };
  const signOut = () => {
    if (user) {
      auth.signOut();
      dispacth({ type: "SET_USER", user: null });
      toast.error("You logged out !!");
    }
  };

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
          <Toaster toastOptions={{ duration: 3000 }} />

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
                  <Menu.Item key="necklases_1">
                    Mangalasutra Necklaces
                  </Menu.Item>
                  <Menu.Item key="necklases_2">Charm Chains</Menu.Item>
                  <Menu.Item key="necklases_3">Cayered Chains</Menu.Item>
                  <Menu.Item key="necklases_4">Pendent Chains</Menu.Item>
                  <Menu.Item key="necklases_5">Layered Chains</Menu.Item>
                  <Menu.Item key="necklases_6">18k Plated Chains</Menu.Item>
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
                  <Menu.Item key="bracelets_1">
                    Mangalasutra Bracelets
                  </Menu.Item>
                  <Menu.Item key="bracelets_2">Stainless Steel Kada </Menu.Item>
                  <Menu.Item key="bracelets_3">
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
                  <Menu.Item key="earings_1">Studs</Menu.Item>
                  <Menu.Item key="earings_2">Hoops</Menu.Item>
                  <Menu.Item key="earings_3">Statement Earrings</Menu.Item>
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
                  <Menu.Item key="clipsAndPins_1">Center Clips</Menu.Item>
                  <Menu.Item key="clipsAndPins_2">Hand made clips</Menu.Item>
                  <Menu.Item key="clipsAndPins_3">Saree Pins</Menu.Item>
                  <Menu.Item key="clipsAndPins_4">Hair Pins</Menu.Item>
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

              <Tooltip placement="bottom" title={"Account"}>
                <UserOutlined className="header__icons" onClick={loginPage} />
              </Tooltip>

              <Tooltip placement="bottom" title={"Wishlist"}>
                <HeartFilled className="header__icons" />
              </Tooltip>
              <Tooltip placement="bottom" title={"Basket"}>
                <ShoppingFilled
                  className="header__icons"
                  onClick={viewBasket}
                />
                <span className="basket__length">({basket?.length})</span>
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
                    <Menu.Item key="necklases_1">
                      Mangalasutra Necklaces
                    </Menu.Item>
                    <Menu.Item key="necklases_2">Charm Chains</Menu.Item>
                    <Menu.Item key="necklases_3">Cayered Chains</Menu.Item>
                    <Menu.Item key="necklases_4">Pendent Chains</Menu.Item>
                    <Menu.Item key="necklases_5">Layered Chains</Menu.Item>
                    <Menu.Item key="necklases_6">18k plated Chains</Menu.Item>
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
                    <Menu.Item key="bracelets_1">
                      Mangalasutra Bracelets
                    </Menu.Item>
                    <Menu.Item key="bracelets_2">
                      Stainless Steel Kada{" "}
                    </Menu.Item>
                    <Menu.Item key="bracelets_3">
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
                    <Menu.Item key="earings_1">Studs</Menu.Item>
                    <Menu.Item key="earings_2">Hoops</Menu.Item>
                    <Menu.Item key="earings_3">Statement Earrings</Menu.Item>
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
                    <Menu.Item key="clipsAndPins_1">Center Clips</Menu.Item>
                    <Menu.Item key="clipsAndPins_2">Hand made clips</Menu.Item>
                    <Menu.Item key="clipsAndPins_3">Saree Pins</Menu.Item>
                    <Menu.Item key="clipsAndPins_4">Hair Pins</Menu.Item>
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
                    <Menu.Item key="filters_1">Price,Low to High</Menu.Item>
                    <Menu.Item key="filters_2">Price,High to Low</Menu.Item>
                    <Menu.Item key="filters_3">Date,Old to New</Menu.Item>
                    <Menu.Item key="filters_4">Date,New to Old</Menu.Item>
                  </Menu.SubMenu>

                  <div className="other__menu__items">
                    <Menu.Item key="other_1">
                      <p className="other__menu__items__a" onClick={loginPage}>
                        Account
                      </p>
                    </Menu.Item>
                    <Menu.Item key="other_2">
                      <p className="other__menu__items__a">Wishlist</p>
                    </Menu.Item>
                    <Menu.Item key="other_3">
                      <p className="other__menu__items__a">
                        Your Basket ({basket?.length} items)
                      </p>
                    </Menu.Item>
                    <Menu.Item key="other_4">
                      <p className="other__menu__items__a" onClick={signOut}>
                        Logout
                      </p>
                    </Menu.Item>
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
