//this is our main context
import React, { createContext, useContext, useReducer } from "react";

//exporting the state that we are creating
export const StateContext = createContext();

//this function takes the reducer as a parameter, initialState, children(our own component)
//the reducer and the initialState come from the files(initialState.js and reducer.js)
//the children is our component
export const StateProvider = ({ reducer, initialState, children }) => (
  //wrapping the children with the stateContext Provider
  //the provider information contains a value prop that uses a useReducer to pass the information(reducer with the initialState)
  //useReducer returns the current state
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//exporting a customHook to update our state Value
export const useStateValue = () => useContext(StateContext);
