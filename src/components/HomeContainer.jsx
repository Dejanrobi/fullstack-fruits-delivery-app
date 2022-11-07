import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

function HomeContainer() {
  return (
    <section
      className="grid grid-cols-1 md:gap-8 gap-20 md:grid-cols-2"
      id="home"
    >
      <div className="flex flex-col md:gap-1 gap-7 h-auto">
        <div className="w-40 flex gap-2 items-center bg-orange-100 px-2 py-1">
          <p className="text-orange-500 font-semibold text-base">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full  drop-shadow-xl ">
            <img
              src={Delivery}
              className="w-full  h-full object-contain"
              alt="Bike Delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] md:text-[3.8rem]">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>

        <button
          type="button"
          className="bg-gradient-to-br font-semibold px-4 py-3 rounded-lg md:mt-7 mt-6 mb-4 from-orange-300 to-orange-500 w-full p-4
          hover:shadow-lg md:w-80 md:py-4  hover:from-orange-500 hover:to-orange-600 transition-all duration-100 ease-in-out hover:text-white"
        >
          Order Now
        </button>
      </div>

      <div className="">
        <div className="flex-col flex-1 flex items-center relative">
          <img
            src={HeroBg}
            className="md:ml-auto w-375 md:h-[30rem] h-420 lg:w-auto"
            alt="Hero Bg"
          />

          <div className="absolute top-8 md:left-8 left-13  grid grid-cols-2 md:gap-12 gap-8">
            {heroData &&
              heroData.map((n) => (
                <div
                  key={n.id}
                  className="w-[150px] md:w-[180px]  p-4 bg-cardOverlay backdrop-blur-md  rounded-3xl flex flex-col items-center text-center"
                >
                  <img
                    src={n.imageSrc}
                    className="w-20 md:w-40 object-cover md:-mt-20 -mt-12 "
                    alt="I1"
                  />
                  <p className="text-base font-semibold  text-orange-800">
                    IceCream
                  </p>
                  <p className="text-sm text-orange-800">{n.decp}</p>

                  <p className=" pt-4 text-base font-semibold text-headingColor">
                    {n.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeContainer;
