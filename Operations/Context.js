import React, { useState, useContext } from "react";
// Create a context for sharing state across components
// This context will be used to share data between GamePlay and Api components
export const Context = React.createContext();

// ContextProvider component to provide shared state to its children
// This component wraps the application and provides the context value
export const ContextProvider = ({ children }) => {
  console.log("ContextProvider opened");

  const [selectedCityList, setSelectedCityList] = useState([]); // Changed to array for list of cities
  const [correctCity, setCorrectCity] = useState(null); // Add this for database
  const [citiesCorrect, setCitiesCorrect] = useState([]); // Correct cities state
  const [citiesWrong, setCitiesWrong] = useState([]); // Wrong cities state

  // Debug wrapper for setSelectedCityList
  const setSelectedCityListWithLogging = (cityList) => {
    console.log("Context: Setting selected city list to:", cityList);
    setSelectedCityList(cityList);
  };

  // Helper function to add city to list (avoiding duplicates)
  const addCityToList = (city) => {
    setSelectedCityList((prevList) => {
      if (!prevList.includes(city)) {
        const newList = [...prevList, city];
        console.log("Context: Adding city to list:", city, "New list:", newList);
        return newList;
      }
      console.log("Context: City already in list:", city);
      return prevList;
    });
  };

  // Helper function to clear the city list
  const clearCityList = () => {
    console.log("Context: Clearing city list");
    setSelectedCityList([]);
  };

  // Debug wrapper for setCorrectCity
  const setCorrectCityWithLogging = (city) => {
    console.log("Context: Setting correct city to:", city);
    setCorrectCity(city);
  };

  // Helper function to add correct city
  const addCorrectCity = (city) => {
    setCitiesCorrect((prev) => {
      if (!prev.includes(city)) {
        const newList = [...prev, city];
        console.log("Context: Adding correct city:", city, "New list:", newList);
        return newList;
      }
      console.log("Context: Correct city already in list:", city);
      return prev;
    });
  };

  // Helper function to add wrong city
  const addWrongCity = (city) => {
    setCitiesWrong((prev) => {
      if (!prev.includes(city)) {
        const newList = [...prev, city];
        console.log("Context: Adding wrong city:", city, "New list:", newList);
        return newList;
      }
      console.log("Context: Wrong city already in list:", city);
      return prev;
    });
  };

  return (
    <Context.Provider
      value={{
        selectedCityList,
        setSelectedCityList: setSelectedCityListWithLogging,
        addCityToList,
        clearCityList,
        correctCity,
        setCorrectCity: setCorrectCityWithLogging,
        citiesCorrect,
        setCitiesCorrect,
        addCorrectCity,
        citiesWrong,
        setCitiesWrong,
        addWrongCity,
      }}
    >
      {children}
    </Context.Provider>
  );
};
