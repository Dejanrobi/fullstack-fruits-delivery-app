import React from "react";
import HomeContainer from "./HomeContainer";

import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

import { useEffect, useState } from "react";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import { sliderLeft, sliderRight } from "../utils/otherFunctions";

function MainContainer() {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();

  // useEffect(() => {}, [scrollValue, cartShow]);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className="w-full mb-5 mt-20">
        <div className="w-full flex items-center justify-between">
          <p
            className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20
          before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100"
          >
            Our fresh & healthy fruits
          </p>

          <div className="hidden md:flex items-center gap-3 ">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex  items-center justify-center"
              onClick={sliderLeft}
            >
              <MdChevronLeft className="text-xl text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer transition-all flex duration-100 ease-in-out hover:shadow-lg items-center justify-center"
              onClick={sliderRight}
            >
              <MdChevronRight className="text-xl text-white" />
            </motion.div>
          </div>
        </div>

        {/* Rendering the row container */}
        {/* Initial Flag is supplied as true.  If the value is true, it will act for the fruit section, if it is false, it will act for the main menu section */}
        {/* Filtering only food items to be passed */}
        <RowContainer
          flag={true}
          data={foodItems?.filter((item) => item.category === "fruits")}
        />
      </section>

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  );
}

export default MainContainer;
