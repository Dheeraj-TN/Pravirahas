/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import OrderPage from "./OrderPage";
import Header from "../components/Header";
import "./Orders.css";
import ProgressBar from "@badrap/bar-of-progress";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");
  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 2000); // Change visibility every 2 seconds

    return () => clearInterval(interval);
  }, []);
  const containerVariants = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.5,
      },
    },
  };

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
  // console.log("user in orders: ",user?.email);

useEffect(() => {
    const fetchOrders = async () => {
      if (userId) {
        progressor.start();
        setTimeout(() => {
          progressor.finish();
        }, 500);
        try {
          const q = query(
            // collection(db, "users", userId, "Orders"),
            collection(db, "Orders"),
            // where("username", "==", user.email),
            orderBy("created", "desc")
          );
          onSnapshot(q, (snapshot) => {
            const orderData = snapshot.docs
              .map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
              .filter((item) => item.data.username === user.email);
            setOrders(orderData);
          });
        } catch (err) {
          console.log(err.message);
        }
      } else {
        setOrders([]);
      }
    };
    fetchOrders();
    //eslint-disable-next-line
  }, [userId]);

  return (
    <>
      <Header />

      <div className="orders">
        <div className="orders__top">
          <h1>Your Orders</h1>
          <p onClick={() => navigate("/")}>
            Coninue Shopping <ArrowRightOutlined />
          </p>
        </div>
        {!user ? (
          <div className="orders__empty" style={{ marginLeft: "20px" }}>
            <h2>User not logged in!!</h2>
            <p>
              Your orders will appear here once you login and place an order.
            </p>
          </div>
        ) : (
          orders.length === 0 && (
            <div className="orders__empty" style={{ marginLeft: "20px" }}>
              <h2>No orders yet !!</h2>
              <p>
                Your orders will appear here once you place an order. Click on
                the "Add to Basket" button to place an order.
              </p>
            </div>
          )
        )}
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
