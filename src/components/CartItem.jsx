import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

function CartItem({ item, index }) {
  // const [qty, setQty] = useState(item.qty);
  const [{ cartItems }, dispatch] = useStateValue();

  function dispatchingItems(cartIt) {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: cartIt,
    });

    //updating the localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartIt));
  }

  const updateQty = (action, ind) => {
    if (action === "add") {
      const newItems = cartItems.map((itm, id) => {
        if (id === ind) {
          itm.qty = item.qty + 1;
          // console.log(itm.qty);
        }
        return itm;
      });
      dispatchingItems(newItems);
    } else if (action === "remove") {
      if (item.qty === 1) {
        const newItems = cartItems.filter((ite, idx) => {
          return idx !== ind;
        });
        dispatchingItems(newItems);
      } else {
        const newItems = cartItems.map((itm, id) => {
          if (id === ind) {
            itm.qty = item.qty - 1;
            // console.log(itm.qty);
          }
          return itm;
        });

        dispatchingItems(newItems);
      }
    }
  };

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item.imgURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* Name Section */}
      <div className="flex flex-col gap-2 ">
        <p className="text-base text-gray-50">{item.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {parseFloat(item.price) * item.qty}
        </p>
      </div>

      {/* Button Section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer ">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", index)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {item.qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", index)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
}

export default CartItem;
