import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, Text, View, ToastAndroid, Button, ImageBackground } from "react-native";
import { Context } from "../Operations/Context"; // Import the context
import { useGamePlayStyles } from "../AllStyles/gamePlayStyles"; // Use same styles

export default function Api({ navigation, route }) {
  const styles = useGamePlayStyles();
  //https://home.openweathermap.org/
  //3f2e5dbaf5cf57927bf90f6b1acf3206   api key
  //https://openweathermap.org/current

  // Fix context usage - use safe property access
  const contextValue = useContext(Context);
  const contextSelectedCity = contextValue?.selectedCity || null;

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

  const Section = ({ title }) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    );
  };

  return (
    <ImageBackground resizeMode="cover" source={require("../assets/bgImage.png")} style={styles.image}>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <Section title={`Weather in ${selectedCity || "No City Selected"}`} />

            {/* Weather Information Display */}
            <View style={styles.weatherContainer}>
              <View style={styles.weatherInfoContainer}>
                <Text style={styles.weatherText}>Temperature: {cityTemp ? `${cityTemp}°C` : "N/A"}</Text>
                <Text style={styles.weatherText}>Humidity: {cityDetails[1] ? `${cityDetails[1]}%` : "N/A"}</Text>
                <Text style={styles.weatherText}>Pressure: {cityDetails[2] || "N/A"}</Text>
                <Text style={styles.weatherText}>
                  Max Temperature: {cityDetails[3] ? `${cityDetails[3]}°C` : "N/A"}
                </Text>
                <Text style={styles.weatherText}>
                  Min Temperature: {cityDetails[4] ? `${cityDetails[4]}°C` : "N/A"}
                </Text>
                <Text style={styles.weatherText}>Description: {cityDetails[5] || "N/A"}</Text>
                <Text style={styles.weatherText}>Country: {cityDetails[8] || "N/A"}</Text>
              </View>
            </View>

            {/* Navigation Buttons at the bottom */}
            <View style={[styles.container, styles.navigationContainer]}>
              <Button title="Home" onPress={() => navigation.navigate("Guess The City")} color="#1976d2" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

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
