import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import OrderPage from "./OrderPage";
import Header from "../components/Header";
import "./Orders.css";
function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
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
  }, [user?.email]);
  useEffect(() => {
    if (userId) {
      const q = query(
        collection(db, "users", userId, "Orders"),
        orderBy("created", "desc")
      );
      onSnapshot(
        q,
        (snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      setOrders([]);
    }
    //eslint-disable-next-line
  }, [userId]);
  return (
    <>
      <Header />
      <div className="orders">
        <h1>Your Orders</h1>
        <div style={{ marginLeft: "20px" }}>
          {orders.map((order) => (
            <OrderPage order={order} key={order.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
