/* eslint-disable no-unused-vars */
import { useStateValue } from "../StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import "./Subtotal.css";
import { Link } from "react-router-dom";
import ReactWhatsapp from "react-whatsapp";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
function Subtotal() {
  const [{ user, basket }, dispatch] = useStateValue();
  const total = getBasketTotal(basket);
  const phone = " +919739516472";
  const openWhatsapp = () => {
    window.open(`https://wa.me/${phone}`, "_blank");
  };
  //   console.log(total);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" style={{ backgroundColor: "white" }} />{" "}
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={total}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <ReactWhatsapp
        className="whatsapp__button"
        number={phone}
        message={`Hello, I am ${user?.email} and I want to place an order`}
        style={{ backgorundColor: "transparent" }}
      >
        <button style={{ cursor: "pointer" }}>Proceed to Checkout</button>
      </ReactWhatsapp>
    </div>
  );
}

export default Subtotal;
