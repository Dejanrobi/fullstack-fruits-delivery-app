import React from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
//we are importing from the components folder so that the index.js can handle everything later.
import {
  Header,
  CreateContainer,
  MainContainer,
  OnlineStatus,
} from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "./context/reducer";

function App() {
  //Fetching the Data from the Database whenever a user logs into the system.
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      //dispatching this data to the reducer state
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  //Calling useEffect to run only once when the page loads to call the function
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col">
        <Header />
        <OnlineStatus />
        <main className="md:mt-24  mt-16 md:px-16 px-6 md:p-2 p-10 w-full ">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
