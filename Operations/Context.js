import React, { useState, useContext } from "react";
// Create a context for sharing state across components
// This context will be used to share data between GamePlay and Api components
export const Context = React.createContext();

// ContextProvider component to provide shared state to its children
// This component wraps the application and provides the context value
export const ContextProvider = ({ children }) => {
  console.log("ContextProvider opened");
 
  const [selectedCity, setSelectedCity] = useState(null);

  // Debug wrapper for setSelectedCity
  const setSelectedCityWithLogging = (city) => {
    console.log("Context: Setting selected city to:", city);
    setSelectedCity(city);
  };

  return (
    <Context.Provider value={{ selectedCity, setSelectedCity: setSelectedCityWithLogging }}>{children}</Context.Provider>
  );
};


