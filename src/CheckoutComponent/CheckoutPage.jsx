import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import CheckoutPageProps from "./CheckoutPageProps";
import "./CheckoutPage.css";
import CurrencyFormat from "react-currency-format";
import ReactWhatsapp from "react-whatsapp";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
function CheckoutPage() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [userId, setUserId] = useState("");
  const [basketItems, setBasketItems] = useState([]);
  const [userDet, setUSerDet] = useState([]);
  const [subTotal, setSubtotal] = useState(0);
  const [editAddress, setEditAddress] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [termsConditoinsAccepted, setTermsConditionsAccepted] = useState(false);
  const phone = "+919739516472";

  useEffect(() => {
    const userQuery = query(collection(db, "users"));
    const unsub = onSnapshot(userQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().emailAddress === user?.email) {
          setUserId(doc.id);
          setUSerDet(doc.data());
        }
      });
    });
    const getBasketItems = async () => {
      const basketQuery = query(collection(db, `users/${userId}/Basket`));
      // const basketSnapshot = await getDocs(basketQuery);
      onSnapshot(basketQuery, (basketSnapshot) => {
        const basketData = basketSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const total = basketData.reduce(
          (acc, item) => acc + (parseInt(item.updatedPrice) || 0),
          0
        );
        setSubtotal(total);
        setBasketItems(basketData);
      });
    };
    // const unsub2 = onSnapshot(basketQuery, (snapshot) => {
    //   const basketData = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   const total = basketData.reduce(
    //     (acc, item) => acc + (parseInt(item.price) || 0),
    //     0
    //   );
    //   setSubtotal(total);
    //   setBasketItems(basketData);
    // });
    getBasketItems();
    return () => {
      unsub();
      // unsub2();
    };
  }, [user?.email, userId]);
  return (
    <>
      <Header />
      <div className="checkout__page">
        <div className="checkout__left">
          <div>
            <h3>Hello, {user?.email}</h3>
            <p>
              Phone: <strong>{userDet.phoneNumber}</strong>
            </p>
            <p>
              Username: <strong>{userDet.username}</strong>
            </p>
            {editAddress ? (
              <>
                <div className="edit__address">
                  <p>Address:</p>
                  <textarea
                    value={updatedAddress}
                    onChange={(e) => setUpdatedAddress(e.target.value)}
                  />
                  <div className="save__cancel__buttons">
                    <button onClick={() => setEditAddress(false)}>
                      Save Changes
                    </button>
                    <button onClick={() => setEditAddress(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="address">
                  Address:{" "}
                  <strong>
                    {!updatedAddress ? userDet.postalAddress : updatedAddress}
                  </strong>
                </p>
              </>
            )}
            <button
              onClick={() => setEditAddress(true)}
              className="edit__address__button"
            >
              Change the delivery address
            </button>
            <h2 className="checkout__title">Your Shopping Basket</h2>
            {basketItems.map((item) => (
              <CheckoutPageProps
                key={item.id}
                id={item.id}
                img1={item.img1}
                productName={item.productName}
                price={item.price}
                rating={item.rating}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
        <div className="checkout__right">
          <div className="checkout__tc">
            <h2>Terms and Conditions</h2>
            <ol style={{ textAlign: "left" }}>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Consectetur adipiscing elit.</li>
              <li>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </li>
              <li>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </li>
              <li>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </li>
              <li>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </li>
            </ol>
            <div className="terms__and__conditions__button">
              <button
                className="accept__button"
                onClick={() => setTermsConditionsAccepted(true)}
              >
                <CheckOutlined /> I accpet the T&C
              </button>
              <button className="reject__button">
                <CloseOutlined />I reject the T&C
              </button>
            </div>
            <div className="subtotal">
              <CurrencyFormat
                renderText={(subTotal) => (
                  <>
                    <h3>
                      Subtotal ({basketItems?.length} items):{" "}
                      <strong>{subTotal}</strong>
                    </h3>
                  </>
                )}
                decimalScale={2}
                value={subTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
              />
              <ReactWhatsapp
                className="checkout__button__container"
                number={phone}
                style={{ backgroundColor: "transparent" }}
                message={
                  <>
                    <div>
                      <p>name: {userDet?.username}</p>
                      <p>email: {userDet?.emailAddress}</p>
                      <p>phone: {userDet?.phoneNumber}</p>
                      <p>Address:{userDet?.postalAddress}</p>
                      {basketItems.map((item, index) => (
                        <div key={index}>
                          <p>product name: {item.productName}</p>
                          <p>price: {item.price}</p>
                        </div>
                      ))}
                    </div>
                  </>
                }
              >
                <button
                  style={{ cursor: "pointer" }}
                  disabled={!termsConditoinsAccepted}
                  className="checkout__button"
                >
                  Proceed to Checkout
                </button>
              </ReactWhatsapp>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
