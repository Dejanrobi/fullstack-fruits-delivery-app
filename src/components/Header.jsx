import React from "react";
import Logo from "../img/logo.png";
// import { FiMenu } from "react-icons/fi";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

//Authentication
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useState } from "react";

const Header = () => {
  //Initializing firebase Auth
  const firebaseAuth = getAuth(app);
  //this will give use the configuration details
  //searching for the provider
  const provider = new GoogleAuthProvider();

  //the usestateValue takes the user object and a dispatch option
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  //Creating a state To monitor if the icon is clicked
  const [isMenu, setisMenu] = useState(false);

  const login = async () => {
    //login to occur only if there is no user
    if (!user) {
      //getting the response by supplying the firebase authentication information and the provider info
      //destructuring the response
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      // console.log(response);

      //Dispatching the providerData to our context(Data Layer)
      //we use the custom hook created to do that
      dispatch({
        //we set the type to SET_USER from actionType
        type: actionType.SET_USER,
        user: providerData[0],
        //user data is the value we have in provider Data in 0 index
      });

      //Pushing the login user information to the local storage
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setisMenu(!isMenu);
    }
  };

  //Creating the Logout Function
  const logout = () => {
    //Hide the menu bar
    setisMenu(false);

    //clear the localSorage
    localStorage.clear();

    //update the state provider (setting the user as null)
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <header className="fixed z-50 w-screen md:p-3 md:px-16 p-4 px-6 bg-orange-100">
      {/* We need to have two menu options: mobile and desktop */}
      {/* Desktop and tablet */}
      {/* For the media device:  full but for small devices it should be hidden */}
      <div className="flex items-center justify-between ">
        <Link to={"/"} className="flex gap-2 items-center justify-center ">
          <img src={Logo} className="w-8 object-cover" alt="Logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex gap-8">
          <ul className=" gap-8 items-center justify-center md:flex hidden ">
            <Link to={"/"}>
              <li className="menu-titles">Home</li>
            </Link>

            <li className="menu-titles">Menu</li>
            <li className="menu-titles">About</li>
            <li className="menu-titles">Service</li>
          </ul>

          {/* Show Cart Onclicking this Div */}
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-headingColor text-2xl cursor-pointer" />

            {/* Render the division only if there is a cart Item */}
            {cartItems && cartItems.length > 0 ? (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                <p className="text-xs text-white font-semibold ">
                  {cartItems.length}
                </p>
              </div>
            ) : (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                <p className="text-xs text-white font-semibold ">0</p>
              </div>
            )}
          </div>

          {/* we wrap the user image in a div and make it position relative to display a popup below it */}
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 m-w-[40px] h-10 min-h-[40px] cursor-pointer drop-shadow-xl rounded-full "
              alt="userprofile"
              //adding onclick login(to display the login popup)
              onClick={login}
            />

            {/* If isMenu is true, render the dropdown */}
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-48 bg-gray-50 top-12 right-0 shadow-xl rounded-lg absolute flex flex-col"
              >
                {user && user.email === "dejanrobi79@gmail.com" && (
                  //Navigating the user to create Item Page
                  <Link to={"/createItem"}>
                    <p
                      className="logged-icons"
                      onClick={() => {
                        setisMenu(false);
                      }}
                    >
                      Add New Item <MdAdd className="font-extrabold" />
                    </p>
                  </Link>
                )}
                <div className="md:hidden flex-col">
                  <Link to={"/"}>
                    <li
                      className="logged-icons"
                      onClick={() => {
                        setisMenu(false);
                      }}
                    >
                      Home
                    </li>
                  </Link>

                  <li
                    className="logged-icons"
                    onClick={() => {
                      setisMenu(false);
                    }}
                  >
                    Menu
                  </li>
                  <li
                    className="logged-icons"
                    onClick={() => {
                      setisMenu(false);
                    }}
                  >
                    About
                  </li>
                  <li
                    className="logged-icons"
                    onClick={() => {
                      setisMenu(false);
                    }}
                  >
                    Service
                  </li>
                </div>

                <p
                  className="logged-icons m-2 p-2 bg-gray-200 hover:bg-gray-300"
                  onClick={logout}
                >
                  Logout <MdLogout className="text-xl font-extrabold" />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      {/* Media device should be hidden at first */}
      <div className="visible md:hidden w-full h-full"></div>
    </header>
  );
};

export default Header;
