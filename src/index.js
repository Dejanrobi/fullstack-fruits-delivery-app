import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//setting our react router
import { BrowserRouter as Router } from "react-router-dom";
//import StateProvider
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    {/**Wrapping our app in the StateProvider in order to re-use the reducer */}
    <React.StrictMode>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
