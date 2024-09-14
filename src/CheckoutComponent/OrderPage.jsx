/* eslint-disable react/prop-types */
import CurrencyFormat from "react-currency-format";
import OrdersPageProps from "./OrdersPageProps";
import moment from "moment";


function OrderPage({ order }) {
  return (
    <div
      className="order"
      style={{
        overflowX: "hidden",
        marginTop: "40px",
        borderBottom: "1px solid lightgray",
      }}
    >
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.totalAmount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <div style={{ marginTop: "20px", marginBottom: "40px" }}>
        <p className="order__id">
          <small>Order ID: {order.id}</small>
        </p>
        <p>
          Order Placed at:
          {moment(order.data.created.toDate()).format(
            "ddd, DD MMM YYYY h:mm A"
          )}
        </p>
      </div>
      {order.data.products?.map((item) => (
        <OrdersPageProps
          key={item.id}
          id={item.id}
          img1={item.img1}
          productName={item.productName}
          price={item.price}
          desc={item.desc}
          updatedCost={item.updatedPrice}
        />
      ))}
    </div>
  );
}

export default OrderPage;
