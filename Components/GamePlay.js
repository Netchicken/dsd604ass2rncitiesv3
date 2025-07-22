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

  // Get context for sharing selected city with Api component
  const { selectedCity, setSelectedCity } = useContext(Context);

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
  // State for correct and wrong answers
  const [citiesCorrect, setCitiesCorrect] = useState([]);
  const [citiesWrong, setCitiesWrong] = useState([]);
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

    // Reset selected city
    setSelectedCity(null);
    setModalVisible(false);
  };

  // Handler: Select city from dropdown
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setModalVisible(false);
  };

  // Handler: Check if the selected city is correct or wrong
  const CheckForWinnerLoser = () => {
    if (selectedCity && selectedCity !== "" && gameData.CapitalName !== "Start") {
      if (selectedCity === gameData.CapitalName) {
        ToastAndroid.showWithGravity("You win! The city is " + selectedCity, ToastAndroid.LONG, ToastAndroid.CENTER);
        setCitiesCorrect((prev) => [...prev, selectedCity]);
        // City is already in context, no need to set it again since we're using context directly
      } else {
        ToastAndroid.showWithGravity(
          `You are wrong! The city is ${gameData.CapitalName}, you said ${selectedCity}`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        setCitiesWrong((prev) => [...prev, selectedCity]);
        // Optionally: insertData(selectedCity);
      }
    }
  };
  // Effect: Run winner/loser check when selectedCity changes
  useEffect(() => {
    if (selectedCity) CheckForWinnerLoser();
    // eslint-disable-next-line
  }, [selectedCity]);

  // Section component for displaying game info
  const Section = ({ title }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text>The city is {gameData.CapitalName || ""}</Text>
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
                <Text style={styles.dropdownButtonText}>{selectedCity || "Choose the city"}</Text>
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
              <Button title="Weather" onPress={() => navigation.navigate("Weather")} color="#1976d2" />
              <Button title="Database" onPress={() => navigation.navigate("Database")} color="#1976d2" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
