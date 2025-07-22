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
  //const [allCities, setAllCities] = useState(createCities()); //dropdown data
  // const citiesDropdownRef = useRef({});
  const [cityTemp, setCityTemp] = useState(null); //selected city
  const [weather, setWeather] = useState({}); //selected city
  const [cityDetails, setCityDetails] = useState([]);

  useEffect(() => {
    //  console.log("countryDataSmallAPI", countryDataSmall);
    //   console.log("createCities() API", createCities());
    getWeatherFromApi();
    ToastAndroid.showWithGravity(selectedCity, ToastAndroid.LONG, ToastAndroid.CENTER);
  }, [selectedCity]);

  // Update selectedCity when context changes
  useEffect(() => {
    if (contextSelectedCity) {
      setSelectedCity(contextSelectedCity);
      console.log("Selected city updated from context:", contextSelectedCity);
    }
  }, [contextSelectedCity]);

  const getWeatherFromApi = async () => {
    let response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        selectedCity +
        "&appid=3f2e5dbaf5cf57927bf90f6b1acf3206&units=metric"
    );

    console.log("response", response);
    let json = await response.json();

    setWeather(json);
    console.log("weather", weather);
    setCityTemp(json.main.temp);
    setCityDetails([
      json.main.temp,
      json.main.humidity,
      json.main.pressure,
      json.main.temp_max,
      json.main.temp_min,
      json.weather[0].description,
      json.weather[0].icon,
      json.name,
      json.sys.country,
      json.sys.sunrise,
      json.sys.sunset,
    ]);
    console.log("weather json", json);
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
      <Section style={styles.sectionTitle} title=" Choose a city to see the weather"></Section>

      {/* <SelectDropdown
        ref={citiesDropdownRef}
        data={allCities}
        onSelect={(selectedItem, index) => {
          setSelectedCity(selectedItem);
        }}
        defaultButtonText={"Select city"}
        buttonTextAfterSelection={(selectedItem, index) => {
          //https://www.npmjs.com/package/react-native-select-dropdown
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          // console.log('rowTextForSelection', item);
          return item;
        }}
      /> */}
      <View>
        <Text style={styles.text}>
          The Temperature in {selectedCity === null ? "no city selected" : selectedCity} is {cityTemp}C
        </Text>

        <View>
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
