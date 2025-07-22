import React, { useState, useContext } from "react";
// Create a context for sharing state across components
// This context will be used to share data between GamePlay and Api components
export const Context = React.createContext();

// ContextProvider component to provide shared state to its children
// This component wraps the application and provides the context value
export const ContextProvider = ({ children }) => {
  console.log("ContextProvider opened");
  const [calcResult, setCalcResult] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <Context.Provider value={{ calcResult, setCalcResult, selectedCity, setSelectedCity }}>{children}</Context.Provider>
  );
};

// Custom hook to use the calculator context
// This hook allows components to access the calculator state without needing to use the Context.Consumer directly
// export const useCalcContext = () => {
//   console.log("useCalcContext opened");
//   const context = useContext(Context);
//   if (!context) {
//     throw new Error("useCalcContext must be used within a CalcContextProvider");
//   }
//   return context;
// };
