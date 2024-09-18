/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useStateValue } from "../StateProvider";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import CheckoutPageProps from "./CheckoutPageProps";
import "./CheckoutPage.css";
import CurrencyFormat from "react-currency-format";
import ReactWhatsapp from "react-whatsapp";
import emailjs from "@emailjs/browser";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Orders from "./Orders";
function CheckoutPage() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [basketItems, setBasketItems] = useState([]);
  const [userDet, setUSerDet] = useState([]);
  const [subTotal, setSubtotal] = useState(0);
  const [editAddress, setEditAddress] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [checked, setChecked] = useState(false);
  const [termsConditoinsAccepted, setTermsConditionsAccepted] = useState(false);
  const form = useRef();
  const shippingThreshold = 1200;
  const shippingCharges = subTotal > shippingThreshold ? 0 : 75;
  const [total, setTotal] = useState(0);
  const phone = "+919739516472";
  const saveNewAddress = () => {
    updateDoc(doc(db, "users", userId), {
      postalAddress: updatedAddress,
    });
    setEditAddress(false);
  };
  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    setTermsConditionsAccepted(newChecked);
  };

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
    return () => {
      unsub();
    };
  }, [user?.email]);

  const formattedBasketItems = basketItems.map(
    (item) =>
      `
    Product name: ${item.productName}\nPrice: ₹${item.price}\nQuantity: ${item.quantity}\n\n\n`
  );

  useEffect(() => {
    if (!userId) return () => {};
    const basketQuery = query(collection(db, "users", userId, "Basket"));
    const unsub = onSnapshot(basketQuery, (basketSnapshot) => {
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

    return unsub;
  }, [userId]);
  useEffect(() => {
    let newTotal = 0;
    if (basketItems.length === 0) {
      newTotal = 0;
    } else {
      newTotal = subTotal + shippingCharges;
    }
    setTotal(newTotal);
  }, [basketItems, subTotal, shippingCharges]);
  const sendEmail = (form) => {
    const service_id = "service_vy7rn2g";
    const template_id = "template_vjs40cr";
    const public_id = "Flhc1ybp5zKpLh4y0";
    // Create a form element
    // const form = document.createElement("form");
    // form.id = "emailForm";

    // Append input fields for each parameter
    // const formattedBasketItems = basketItems.map(
    //   (item) =>
    //     `**Product name**: ${item.productName}\n**Price**: ₹${item.price}\n**Quantity**: ${item.quantity}\n\n\n`
    // );

    // Append input fields for each parameter
    // form.innerHTML = `
    //   <input type="hidden" name="name" value="${userDet?.username}" />
    //   <input type="hidden" name="email" value="${userDet?.emailAddress}" />
    //   <input type="hidden" name="phone" value="${userDet?.phoneNumber}" />
    //   <input type="hidden" name="address" value="${userDet?.postalAddress}" />
    //   <input type="hidden" name="products" value="${formattedBasketItems.join(
    //     ""
    //   )}" />
    //   <input type="hidden" name="subtotal" value="₹${subTotal}" />`;

    // console.log("form: ", form);

    // Append the form to the document body
    // document.body.appendChild(form);
    emailjs.sendForm(service_id, template_id, form, public_id).then(
      (result) => {
        toast.success("Order placed successfully");
        navigate("/");
        console.log("email sent sucessfully", result);
        //remove the form from document body
        setSubtotal(0);
        setBasketItems([]);
      },
      (error) => {
        console.log(error);
      }
    );
  }; // Replace with actual phone number

  // console.log("subtotal: ", subTotal);
  const addToOrders = async () => {
    const ordersRef = collection(db,"Orders");
    await addDoc(ordersRef, {
      products: basketItems,
      totalAmount: total,
      created: new Date(),
      username: user.email,
      status:"In Progress",
    });
  };
  const clearBasket = async () => {
    const basketRef = collection(db, "users", userId, "Basket");
    const basketDocs = await getDocs(basketRef);
    const deletePromises = basketDocs.docs.map((docItem) => {
      return deleteDoc(doc(db, "users", userId, "Basket", docItem.id));
    });
    // Wait for all delete operations to complete
    await Promise.all(deletePromises);
    dispatch({
      type: "CLEAR_BASKET",
    });
  };
  return (
    <>
      <Header />
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="checkout__page">
        <div className="checkout__left">
          <div
            style={{ marginBottom: "30px" }}
            className="change__delivery__address"
          >
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
                    <button onClick={saveNewAddress}>Save Changes</button>
                    <button onClick={() => setEditAddress(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="address">
                  Address: <strong>{userDet.postalAddress}</strong>
                </p>
              </>
            )}
            <button
              onClick={() => setEditAddress(true)}
              className="edit__address__button"
            >
              Change the delivery address
            </button>
          </div>

          <div>
            <h2 className="checkout__title">Your Cart Summary</h2>
            {basketItems.map((item) => (
              <CheckoutPageProps
                key={item.id}
                id={item.id}
                img1={item.img1}
                productName={item.productName}
                price={item.price}
                // rating={item.rating}
                desc={item.desc}
                updatedCost={item.updatedPrice}
              />
            ))}
          </div>
          <div
            className="checkout__tc"
            style={{
              border: "1px solid black",
              borderRadius: "5px",
            }}
          >
            <h2>Terms and Conditions</h2>
            <ol
              className="tandc__container"
              style={{
                textAlign: "left",
              }}
            >
              <li>
                Handmade and ready made fashion jewellery will last according to
                usage.
              </li>
              <li>
                The stones, pearls and beads used in the jewellery are not
                precious or semi precious ones.
              </li>
              <li>
                Precautions: Avoid direct contact with water/sweat for longer
                time.
              </li>
              <li>
                Do not bring jewellery in direct contact with perfumes of any
                kind.
              </li>
              <li>Unboxing video mandatory upon receiving the package.</li>
              <li>
                Return policy: once the product is delivered there in no return
                or exchange, if the product is damaged due to shipment process
                and it has to be shown in the mandatory unboxing video upon
                receiving the product within that day for the exchange.
              </li>
            </ol>
            <div className="terms__checkbox">
              {/* <button
                // className={
                //   !termsConditoinsAccepted
                //     ? "accept__button"
                //     : "accept__button__clicked"
                // }

                onClick={() => setTermsConditionsAccepted(true)}
              >
                <input type="checkbox" /> I accpet the T&C
              </button> */}

              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckboxChange}
                />
                <span className="checkmark"></span>I accept the T&C
              </label>
              {/* <button
                className="reject__button"
                onClick={() => toast.error("Please accept the T&C to proceed")}
              >
                <CloseOutlined />I reject the T&C
              </button> */}
            </div>
          </div>
        </div>

        <form id="emailForm" ref={form}>
          <input type="hidden" name="name" value={userDet?.username} />
          <input type="hidden" name="email" value={userDet?.emailAddress} />
          <input type="hidden" name="phone" value={userDet?.phoneNumber} />
          <input type="hidden" name="address" value={userDet?.postalAddress} />
          <input
            type="hidden"
            name="products"
            value={formattedBasketItems.join().replaceAll(",", "\n")}
          />
          {/* <input
            type="hidden"
            name="shippingCharges"
            value={basketItems.img1}
          /> */}
          <input type="hidden" name="subTotal" value={`₹${subTotal}`} />
        </form>
        <div className="checkout__right">
          <div className="subtotal">
            <CurrencyFormat
              renderText={(subTotal) => (
                <>
                  <h3>
                    Subtotal ({basketItems?.length} items):{" "}
                    <strong>{subTotal}</strong>
                  </h3>
                  <p>(subtotal over ₹1200 will have free shipping )</p>
                  <p>Shipping Charges: ₹{shippingCharges}</p>
                </>
              )}
              decimalScale={2}
              value={subTotal}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
            />
            <CurrencyFormat
              renderText={(total) => (
                <>
                  <h3>
                    Total:
                    <strong>{total}</strong>
                  </h3>
                </>
              )}
              decimalScale={2}
              value={total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
            />
            <button
              style={{ cursor: "pointer" }}
              disabled={!termsConditoinsAccepted}
              onClick={() => {
                {
                  !termsConditoinsAccepted
                    ? toast.error("Please accept the terms and conditions")
                    : null;
                }
                sendEmail(form.current);
                addToOrders();
                clearBasket();
                navigate("/orders");
              }}
              className={
                !termsConditoinsAccepted
                  ? "checkout__button__disabled"
                  : "checkout__button"
              }
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
// service id: service_vy7rn2g
// template id: template_vjs40cr
