import React, { useState, useEffect, useRef, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, ToastAndroid, Button } from "react-native";

//import { createCities, countryDataSmall } from "../assets/citiesSmall"; // Import the function to create cities
//import SelectDropdown from "react-native-select-dropdown";
import { Context } from "../Operations/Context"; // Import the context

export default function Api({ navigation, route }) {
  //https://home.openweathermap.org/
  //3f2e5dbaf5cf57927bf90f6b1acf3206   api key
  //https://openweathermap.org/current

  // Get selected city from context
  const { selectedCity: contextSelectedCity } = useContext(Context);

  const [selectedCity, setSelectedCity] = useState(contextSelectedCity || route.params); //selected city - prioritize context over route params

  const [cityTemp, setCityTemp] = useState(null); //selected city
  const [weather, setWeather] = useState({}); //selected city
  const [cityDetails, setCityDetails] = useState([]);

  useEffect(() => {
    console.log("city in weather ", selectedCity);
    //   console.log("createCities() API", createCities());
    getWeatherFromApi();
    if (selectedCity) {
      ToastAndroid.showWithGravity(selectedCity, ToastAndroid.LONG, ToastAndroid.CENTER);
    }
  }, [selectedCity]);

  // Update selectedCity when context changes
  useEffect(() => {
    if (contextSelectedCity) {
      setSelectedCity(contextSelectedCity);
      console.log("Selected city updated from context:", contextSelectedCity);
    }
  }, [contextSelectedCity]);

  const getWeatherFromApi = async () => {
    // Don't make API call if no city is selected
    if (!selectedCity || selectedCity === null) {
      console.log("No city selected, skipping API call");
      return;
    }

    try {
      let response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          selectedCity +
          "&appid=3f2e5dbaf5cf57927bf90f6b1acf3206&units=metric"
      );

      console.log("response", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let json = await response.json();

      setWeather(json);
      console.log("weather", weather);

      // Check if json.main exists before accessing properties
      if (json.main) {
        setCityTemp(json.main.temp);
        setCityDetails([
          json.main.temp,
          json.main.humidity,
          json.main.pressure,
          json.main.temp_max,
          json.main.temp_min,
          json.weather?.[0]?.description || "N/A",
          json.weather?.[0]?.icon || "N/A",
          json.name,
          json.sys?.country || "N/A",
          json.sys?.sunrise || "N/A",
          json.sys?.sunset || "N/A",
        ]);
      }
      console.log("weather json", json);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      ToastAndroid.showWithGravity("Error fetching weather data", ToastAndroid.LONG, ToastAndroid.CENTER);
    }
  };

  const Section = ({ children, title }) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Section style={styles.sectionTitle} title={` The Weather in ${selectedCity}  `}></Section>

      <View>
        <View>
          <Text style={styles.text}>The Temperature is {cityTemp}C </Text>
          <Text style={styles.text}>The Humidity is {cityDetails[1]}%</Text>
          <Text style={styles.text}>The Preasure is {cityDetails[2]}</Text>
          <Text style={styles.text}>The Max Temperature is {cityDetails[3]}C</Text>
          <Text style={styles.text}>The Min Temperature is {cityDetails[4]}C</Text>
          <Text style={styles.text}>The Description is {cityDetails[5]}</Text>
        </View>
      </View>

      {/* Navigation Buttons at the bottom */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 20, width: "100%" }}>
        <Button title="Home" onPress={() => navigation.navigate("Guess The City")} color="#1976d2" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    color: "black",
    // paddingTop: StatusBar.currentHeight,
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
});

// {
//   "coord": {
//     "lon": -122.08,
//     "lat": 37.39
//   },
//   "weather": [
//     {
//       "id": 800,
//       "main": "Clear",
//       "description": "clear sky",
//       "icon": "01d"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 282.55,
//     "feels_like": 281.86,
//     "temp_min": 280.37,
//     "temp_max": 284.26,
//     "pressure": 1023,
//     "humidity": 100
//   },
//   "visibility": 10000,
//   "wind": {
//     "speed": 1.5,
//     "deg": 350
//   },
//   "clouds": {
//     "all": 1
//   },
//   "dt": 1560350645,
//   "sys": {
//     "type": 1,
//     "id": 5122,
//     "message": 0.0139,
//     "country": "US",
//     "sunrise": 1560343627,
//     "sunset": 1560396563
//   },
//   "timezone": -25200,
//   "id": 420006353,
//   "name": "Mountain View",
//   "cod": 200
//   }
