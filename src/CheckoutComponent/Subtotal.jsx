/* eslint-disable no-unused-vars */
import { useStateValue } from "../StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import "./Subtotal.css";

function Subtotal() {
  const [{ user, basket }, dispatch] = useStateValue();
  const total = getBasketTotal(basket);
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
      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
