import React, { useState } from "react";
import { useEffect } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

function MenuContainer() {
  //Creating a state(whenever you click on it, we need to change the state)
  const [filter, setFilter] = useState("chicken");

  const [{ foodItems }, dispatch] = useStateValue();

  //monitoring the filter: whenever there is a change in the filter,

  useEffect(() => {}, []);
  return (
    <section className="w-full" id="menu ">
      <div className="w-full flex flex-col items-start justify-start ">
        <p
          className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20
          before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100"
        >
          Our Hot Dishes
        </p>
        <div className="w-full flex items-center px-3 py-6 mt-12  justify-start lg:justify-center gap-8 overflow-x-scroll scrollbar-none">
          {/* Division for each card */}
          {/* Rendering a component for each category */}
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.6 }}
                key={category.id}
                // Checking the clicked state and making the background  another one on Hover
                className={`group ${
                  filter === category.urlParamName
                    ? "bg-cartNumBg"
                    : "bg-gray-100"
                }  min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col items-center justify-center
           transition-all ease-in-out hover:bg-red-600`}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`text-white ${
                      filter === category.urlParamName
                        ? "text-cartNumBg"
                        : "text-white"
                    } group-hover:text-red-500 text-lg`}
                  />
                </div>

                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full ">
          {/* Displaying the categories in the rows */}
          {/* The data passed is equal to the filter value selected e.g. chicked */}
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
}

export default MenuContainer;
