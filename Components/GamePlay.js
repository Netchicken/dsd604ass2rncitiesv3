import React, { useState, useContext, useEffect, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
  ToastAndroid,
  ImageBackground,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { countryDataSmall, dropdownCitiesData } from "../assets/citiesSmall"; // Import the function to create cities
import { useGamePlayStyles } from "../AllStyles/gamePlayStyles";
import { randomNumberGenerator } from "./gamePlayOperations"; // Import the random number generator function
import { Context } from "../Operations/Context"; // Import the context for database operations
export default function GamePlay({ navigation }) {
  const styles = useGamePlayStyles();

  // Get context for sharing selected city list with Database component
  const contextValue = useContext(Context);
  const selectedCityList = contextValue?.selectedCityList || [];
  const addCityToList = contextValue?.addCityToList || (() => {});
  const clearCityList = contextValue?.clearCityList || (() => {});
  const correctCity = contextValue?.correctCity || null;
  const setCorrectCity = contextValue?.setCorrectCity || (() => {});
  const citiesCorrect = contextValue?.citiesCorrect || [];
  const addCorrectCity = contextValue?.addCorrectCity || (() => {});
  const citiesWrong = contextValue?.citiesWrong || [];
  const addWrongCity = contextValue?.addWrongCity || (() => {});

  // Local state for current game selection (separate from context list)
  const [localSelectedCity, setLocalSelectedCity] = useState(null);

  // State for all country data and dropdown cities
  const [allData] = useState(countryDataSmall);
  const [allCities, setAllCities] = useState(dropdownCitiesData());

  const [gameData, setGameData] = useState({
    CountryName: "Start",
    CapitalName: "Start",
    CapitalLatitude: 0,
    CapitalLongitude: 0,
    ContinentName: "Start",
  }); //holds the selected country details

  const [number, setNumber] = useState(0); //random number
  const [modalVisible, setModalVisible] = useState(false);
  // Note: citiesCorrect and citiesWrong are now managed in Context
  // Ref for dropdown reset
  // const citiesDropdownRef = useRef({});

  // Handler: Load new random country/city for the game
  const onClickChooseCountry = () => {
    setAllCities(dropdownCitiesData());

    // Pick a random country
    const randomNumber = randomNumberGenerator(0, allData.length - 1);
    console.log("Random number selected:", randomNumber);
    const selecteditem = allData[randomNumber];
    console.log("Selected item:", selecteditem);
    // Set game data for the selected country
    setGameData({
      CountryName: selecteditem.CountryName,
      CapitalName: selecteditem.CapitalName,
      CapitalLatitude: selecteditem.CapitalLatitude,
      CapitalLongitude: selecteditem.CapitalLongitude,
      ContinentName: selecteditem.ContinentName,
    });

    // Reset local selected city
    setLocalSelectedCity(null);
    setModalVisible(false);
  };

  // Handler: Select city from dropdown (uses local state)
  const handleCitySelect = (city) => {
    setLocalSelectedCity(city);
    setModalVisible(false);
  };

  // Handler: Check if the selected city is correct or wrong
  const CheckForWinnerLoser = () => {
    if (localSelectedCity && localSelectedCity !== "" && gameData.CapitalName !== "Start") {
      if (localSelectedCity === gameData.CapitalName) {
        ToastAndroid.showWithGravity(
          "You win! The city is " + localSelectedCity,
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        addCorrectCity(localSelectedCity);
        // Set correct city in context for API weather lookup
        setCorrectCity(localSelectedCity);
      } else {
        ToastAndroid.showWithGravity(
          `You are wrong! The city is ${gameData.CapitalName}, you said ${localSelectedCity}`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        addWrongCity(localSelectedCity);
        // Add wrong city to context list for database storage
        addCityToList(localSelectedCity);
      }
    }
  };

  // Effect: Run winner/loser check when local selection changes
  useEffect(() => {
    if (localSelectedCity) CheckForWinnerLoser();
    // eslint-disable-next-line
  }, [localSelectedCity]);

  // Section component for displaying game info
  const Section = ({ title }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {/* <Text>The city is {gameData.CapitalName || ""}</Text> */}
      <Text>The Country is {gameData.CountryName || ""}</Text>
      <Text>The Continent is {gameData.ContinentName || ""}</Text>
    </View>
  );
  return (
    <ImageBackground resizeMode="cover" source={require("../assets/bgImage.png")} style={styles.image}>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <Section title="Test your City knowledge" />

            {/* Button to choose a random country */}
            <Button title="Choose a random Country" onPress={onClickChooseCountry} />

            {/* Debug info */}
            {/* <Text style={styles.debugText}>Cities loaded: {allCities ? allCities.length : 0}</Text>
            {allCities && allCities.length > 0 && (
              <Text style={styles.debugTextSmall}>First few cities: {allCities.slice(0, 3).join(", ")}</Text>
            )} */}

            <View style={styles.dropdownContainer}>
              {/* Custom Dropdown Button */}
              <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.dropdownButtonText}>{localSelectedCity || "Choose the city"}</Text>
              </TouchableOpacity>

              {/* Modal for City Selection */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Select a City</Text>

                    <FlatList
                      data={allCities}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={styles.cityListItem} onPress={() => handleCitySelect(item)}>
                          <Text style={styles.cityListItemText}>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />

                    <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                      <Text style={styles.modalCancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            {/* Results: Correct and Wrong Cities */}
            <View style={[styles.container, styles.resultsContainer]}>
              <View style={[styles.resultcontainer, styles.correctCitiesContainer]}>
                <ScrollView>
                  <Text style={styles.headingoutome}>Correct Cities</Text>
                  {citiesCorrect.map((item, index) => (
                    <View key={index}>
                      <Text style={styles.item}>{item}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>

              <View style={[styles.resultcontainer, styles.wrongCitiesContainer]}>
                <ScrollView>
                  <Text style={[styles.headingoutome, styles.wrongCitiesHeading]}>Wrong Cities</Text>
                  {citiesWrong.map((item, index) => (
                    <View key={index}>
                      <Text style={[styles.item, styles.wrongCitiesItem]}>{item}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Navigation Buttons at the bottom */}
            <View style={[styles.container, styles.navigationContainer]}>
              <Button
                title="Weather"
                onPress={() => navigation.navigate("Weather", { selectedCity: localSelectedCity })}
                color="#1976d2"
              />
              <Button title="Database" onPress={() => navigation.navigate("Database")} color="#1976d2" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
