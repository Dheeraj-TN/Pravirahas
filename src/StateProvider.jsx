/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
// Prepare the data layer
export const StateContext = createContext();
// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {/* children refers to the app */}
    {children}
  </StateContext.Provider>
);
// Accessing state in components
export const useStateValue = () => useContext(StateContext);
