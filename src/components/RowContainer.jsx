import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRef } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
// import { useState } from "react";

//Destructuring the flag
//the flag is imported as a prop: its accessed all over the application
function RowContainer({ flag, data, scrollValue }) {
  // If it is a flag value, then return overflow

  // const [items, setItems] = useState();

  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = (item, index) => {
    const newItems = [...cartItems, item];

    // console.log(newItems);
    //we send the items as an array
    //when an item is clicked,we get the items present, destructure them, then add the item clicked
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: newItems,
    });

    //saving the information to the localStorage once the cartItems is set.
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  };

  // const rowContainer = useRef();

  //Adding to the local Storage
  // useEffect(() => {
  //   addToCart();
  // }, [items]);

  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }, [cartItems]);

  //watching when items changes and runs add to cart

  // useEffect(() => {
  //   rowContainer.current.scrollLeft += scrollValue;
  // }, [scrollValue]);

  return (
    <div
      id="slider"
      className={`w-full py-8  my-12 flex items-center justify-center  px-4 md:px-3   bg-gray-100 scroll-smooth   ${
        flag
          ? "overflow-x-scroll scrollbar-none gap-4 md:gap-5  "
          : "overflow-x-hidden flex-wrap gap-5 md:gap-10"
      }`}
    >
      {data &&
        data.map((item, index) => (
          <div
            key={index}
            className="w-200 min-w-[180px] h-40 min-h-[180px] md:h-40 md:min-h-[220px] my-3 md:w-300 md:min-w-[300px] hover:drop-shadow-xl flex flex-col items-center justify-between cursor-pointer bg-white  p-2 px-4 rounded-lg  backdrop-blur-lg"
          >
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item.imgURL}
                alt=""
                className=" h-25 w-20 md:h-40  md:w-32 object-contain  -mt-8 drop-shadow-2xl"
              />

              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 cursor-pointer hover:shadow-md rounded-full flex items-center justify-center bg-red-600"
                // Sending the item details to addToCart
                onClick={() => {
                  addToCart(item, index);
                }}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item.calories} Calories
              </p>
              <div className="flex items-center gap-8 ">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item.price}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default RowContainer;
