/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
// import logo from "../assets/pravirasLogo.png";
import logo2 from "/praviras-logo2.png";
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
  HomeOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { ConfigProvider, Menu, Tooltip } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProgressBar from "@badrap/bar-of-progress";
import { useStateValue } from "../StateProvider";
import { auth, db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { collection, onSnapshot, query } from "firebase/firestore";
import { motion } from "framer-motion";

function Header() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [userId, setUserId] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const [basketItems, setBasketItems] = useState([]);
  const placeholders = ["Bracelets", "Necklaces", "Earrings", "Clips"];
  const [index, setIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 50;
  const deletingSpeed = 50;
  const delay = 1000;
  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });
  const location = useLocation();
  // console.log("Loaction: ", location);
  const handleSearch = () => {
    if (searchedName) {
      progressor.start();
      setTimeout(() => {
        progressor.finish();
        navigate(`/search/${searchedName}`);
      }, 1000);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    // console.log("Location: ", location);
    const params = location.pathname;
    if (params === "/") {
      dispatch({ type: "SELECTED_SUBCAT_ITEM", selectedSubCategory: null });
      setSelectedItem(null);
      return;
    }
    // the below condition should occur only when there is /category/anything
    if (params.split("/").length < 3) return;
    const title = params.split("/")[2].replace(/%20/g, " ");
    // console.log("Title: ", title);

    if (
      title.includes("Necklaces") ||
      title.includes("Chains") ||
      title.includes("Bracelets") ||
      title.includes("Kada") ||
      title.includes("Hoops") ||
      title.includes("Studs") ||
      title.includes("Statement") ||
      title.includes("Center") ||
      title.includes("Handmade") ||
      title.includes("Saree") ||
      title.includes("Hair")
    ) {
      dispatch({ type: "SELECTED_SUBCAT_ITEM", selectedSubCategory: title });
      setSelectedItem(title);
    }
  }, [location, dispatch]);

  const handleMenuItemClick = (item) => {
    const clicked = item.key;
    dispatch({ type: "SELECTED_SUBCAT_ITEM", selectedSubCategory: clicked });
    setSelectedItem(item.key);
    setBurgerStatus(false);
    console.log("Selected Item: ", clicked);
    // check if the clicked item includes neckalaces or chains
    if (clicked.includes("Necklaces") || clicked.includes("Chains")) {
      navigate(`/necklace/${clicked}`);
      return;
    }
    if (
      clicked.includes("Bracelets") ||
      clicked.includes("Kada") ||
      clicked.includes("Stainless Steel Bracelet")
    ) {
      navigate(`/bracelet/${clicked}`);
      return;
    }
    if (
      clicked.includes("Hoops") ||
      clicked.includes("Studs") ||
      clicked.includes("Statement") ||
      clicked.includes("Traditional")
    ) {
      navigate(`/earring/${clicked}`);
      // console.log("hello");
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
    if (clicked.includes("price_asc")) {
      return;
    }
    if (clicked.includes("login")) {
      loginPage();
      return;
    }
    navigate("/");
  };
  const handleFiltersClicked = (item) => {
    const filter = item.key;
    console.log(filter);
    dispatch({ type: "SELECTED_FILTER", selectedFilter: filter });
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
    toast.loading("Hold on...", { duration: "2000" });
    navigate("/profile");
  };
  const signOut = () => {
    if (user) {
      auth.signOut();
      dispatch({ type: "SET_USER", user: null });
      toast.error("You logged out !!");
      navigate("/");
      localStorage.removeItem("basketId");
    }
  };
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

    return () => {
      unsub();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!userId) return () => {};
    const basketQuery = collection(db, "users", userId, "Basket");
    const unsub = onSnapshot(basketQuery, (snapshot) => {
      const basketData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log("Basket Data: ", basketData);
      setBasketItems(basketData);
    });

    return unsub;
  }, [userId]);
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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prevIndex) =>
        prevIndex === placeholders.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, []);
  //search animation
  useEffect(() => {
    const handleTyping = () => {
      const currentText = placeholders[index];
      const updatedText = isDeleting
        ? currentText.substring(0, displayText.length - 1)
        : currentText.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === currentText) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

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
                    Mangalasutra
                  </Menu.Item>
                  <Menu.Item key="Charm Chains">Chains</Menu.Item>
                  {/* <Menu.Item key="Cayered Chains">Cayered Chains</Menu.Item> */}
                  {/* <Menu.Item key="Pendent Chains">Pendent Chains</Menu.Item> */}
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
                  <Menu.Item key="Traditional">Traditional</Menu.Item>
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
            </div>
          </div>
          <div className="header__right">
            <div className="search__bar">
              <motion.input
                type="text"
                placeholder={`Search for ${displayText}`}
                value={searchedName}
                onChange={(e) => setSearchedName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {/* <motion.div
                className="typewriter-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, type: "spring" }}
                transition={{ duration: 0.5 }}
              >
                {`Search for ${displayText}`}
                <span className="cursor"></span>
              </motion.div> */}
              <SearchOutlined
                className="header__icons"
                onClick={handleSearch}
              />
            </div>
            <div className="other__header__components">
              <Menu
                // onClick={handleMenuItemClick}
                onClick={handleFiltersClicked}
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
                        // color: "gray",
                      }}
                    />
                  }
                >
                  <Menu.Item key="price_asc">Price: Low - High</Menu.Item>
                  <Menu.Item key="price_desc">Price: High - Low</Menu.Item>
                  <Menu.Item key="old">Date: Old - New</Menu.Item>
                  <Menu.Item key="new">Date: New - Old</Menu.Item>
                </Menu.SubMenu>
              </Menu>
              <Tooltip placement="bottom" title="Home">
                <HomeOutlined
                  className="header__icons"
                  onClick={() => navigate("/")}
                />
              </Tooltip>
              <Tooltip
                placement="bottom"
                title={!user ? "Profile" : user?.email}
              >
                <UserOutlined className="header__icons" onClick={loginPage} />
              </Tooltip>

              <Tooltip placement="bottom" title={"Your Orders"}>
                <OrderedListOutlined
                  className="header__icons"
                  onClick={() => navigate("/orders")}
                />
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
            <input
              type="text"
              placeholder={`Search for ${displayText}`}
              value={searchedName}
              onChange={(e) => setSearchedName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {/* <motion.div
              className="typewriter-text-mobile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, type: "spring" }}
              transition={{ duration: 0.5 }}
            >
              {`Search for ${displayText}`}
              <span className="cursor-mobile"></span>
            </motion.div> */}
            <SearchOutlined
              style={{ cursor: "pointer" }}
              onClick={handleSearch}
            />
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
                        <a className="menu__items__a">Necklaces</a>
                      </span>
                    }
                  >
                    <Menu.Item key="Mangalasutra Necklaces">
                      Mangalasutra
                    </Menu.Item>
                    <Menu.Item key="Charm_Chains">Chains</Menu.Item>
                    {/* <Menu.Item key="Cayered_Chains">Cayered Chains</Menu.Item> */}
                    <Menu.Item key="Layered_Chains">Layered Chains</Menu.Item>
                    {/* <Menu.Item key="Pendent_Chains">Pendent Chains</Menu.Item> */}
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
                    <Menu.Item key="Traditional">Traditional</Menu.Item>
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
                    <Menu.Item key="Saree Pins">Saree Pins</Menu.Item>
                    <Menu.Item key="Hair Pins">Hair Pins</Menu.Item>
                  </Menu.SubMenu>
                  {/* <Menu.SubMenu
                    onMouseEnter={() => handleMenuMouseEnter("filters")}
                    onMouseLeave={handleMenuMouseLeave}
                    onClick={handleFiltersClicked}
                    key="filters"
                    title={
                      <span className="menu__items">
                        <a className="menu__items__a">Filter by</a>
                      </span>
                    }
                  >
                    <Menu.Item key="price_asc">Price,Low to High</Menu.Item>
                    <Menu.Item key="price_desc">Price,High to Low</Menu.Item>
                    <Menu.Item key="old">Date,Old to New</Menu.Item>
                    <Menu.Item key="new">Date,New to Old</Menu.Item>
                  </Menu.SubMenu> */}
                  <hr className="horizontal__divider" />
                  <div className="other__menu__items">
                    <Menu.Item>
                      <p
                        className="other__menu__items__p"
                        onClick={() => navigate("/")}
                      >
                        <HomeOutlined style={{ fontSize: "20px" }} />
                        Home
                      </p>
                    </Menu.Item>
                    <p
                      className="other__menu__items__p"
                      style={{
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                      onClick={loginPage}
                    >
                      <UserOutlined style={{ fontSize: "20px" }} />
                      Profile
                    </p>

                    <Menu.Item key="other_2">
                      <p
                        className="other__menu__items__p"
                        onClick={() => navigate("/orders")}
                      >
                        {" "}
                        <OrderedListOutlined style={{ fontSize: "20px" }} />
                        Your Orders
                      </p>
                    </Menu.Item>
                    <Menu.Item key="other_3">
                      <p
                        className="other__menu__items__p"
                        onClick={() => navigate("/checkout")}
                      >
                        {/* Your Basket ({basketItems?.length} items) */}
                        <ShoppingOutlined style={{ fontSize: "20px" }} /> Your
                        Cart ({basketItems?.length})
                      </p>
                    </Menu.Item>
                    {user && (
                      <Menu.Item key="other_4">
                        <p className="other__menu__items__p" onClick={signOut}>
                          <LogoutOutlined style={{ fontSize: "20px" }} />
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
