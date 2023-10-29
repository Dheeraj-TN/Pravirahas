import logo from "../assets/pravirasLogo.png";
import {
  HeartFilled,
  UserOutlined,
  ShoppingFilled,
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { useState } from "react";
function Header() {
  const [burgerStatus, setBurgerStatus] = useState(false);
  return (
    <>
      <div className="header">
        <div className="header__left">
          <img src={logo} alt="logo" />
          <p>Earrings</p>
          <p>Bracelets and Bangles</p>
          <p>Solitaries</p>
          <p>Other Jewellery</p>
          <p>Gifting</p>
        </div>
        <div className="header__right">
          <div className="search__bar">
            <input type="text" placeholder="Search by category..." />
            <SearchOutlined className="header__icons" />
          </div>
          <div className="other__header__components">
            <UserOutlined className="header__icons" />
            <HeartFilled className="header__icons" />
            <ShoppingFilled className="header__icons" />
          </div>
        </div>
      </div>
      <div className="header__mobile">
        <div className="header__mobile__left">
          <img src={logo} alt="logo" />
        </div>
        <div className="header__mobile__right">
          <div className="search__bar__mobile">
            <input type="text" placeholder="Search by category..." />
            <SearchOutlined style={{ cursor: "pointer" }} />
          </div>
          <div
            className="burger__menu"
            onClick={() => setBurgerStatus(!burgerStatus)}
          >
            <div className="">
              {burgerStatus ? (
                <CloseOutlined className="menu__icons" />
              ) : (
                <MenuOutlined className="menu__icons" />
              )}
            </div>
          </div>
          <div className="hamburger__menu">
            <div className={burgerStatus ? "active__header" : "menu__items"}>
              <p>Earrings</p>
              <p>Bracelets and Bangles</p>
              <p>Solitaries</p>
              <p>Other Jewellery</p>
              <p>Gifting</p>
              <p>Account</p>
              <p>WishList</p>
              <p>View your Basket</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
