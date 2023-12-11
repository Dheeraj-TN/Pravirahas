/* eslint-disable no-unused-vars */
import { UserOutlined } from "@ant-design/icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import Header from "./Header";
import "./ProfilePage.css";
import toast, { Toaster } from "react-hot-toast";
import ProgressBar from "@badrap/bar-of-progress";
import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const navigate = useNavigate();
  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });
  const [{ basket, user }, dispatch] = useStateValue();
  const userRef = collection(db, "users");
  const [userDet, setUserDet] = useState([]);
  const logout = () => {
    if (user) {
      progressor.start();
      setTimeout(() => {
        auth.signOut();
        dispatch({ type: "SET_USER", user: null });
        toast.error("You logged out !!");
        navigate("/login");
        progressor.finish();
      }, 2000);
    }
  };
  useEffect(() => {
    const userQuery = query(userRef, where("emailAddress", "==", user.email));
    const unsub = onSnapshot(userQuery, (snapshot) => {
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserDet(userData);
    });
    return unsub;
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="profile__page"
      >
        <div className="profile__page__container">
          <UserOutlined className="user__icon" />
          {userDet.map((userDetails) => (
            <div key={userDet.id} className="user__details">
              <p>
                Username : <strong>{userDetails.username}</strong>
              </p>
              <p>
                Email : <strong>{userDetails.emailAddress}</strong>
              </p>
              <p>
                Address : <strong>{userDetails.postalAddress}</strong>
              </p>
              <p>
                Phone : <strong>{userDetails.phoneNumber}</strong>
              </p>
            </div>
          ))}
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default ProfilePage;
