import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GamePlay from "./Components/GamePlay";
import Api from "./Components/Api";
import Database from "./Components/Database"; // Import the Database component
import { ContextProvider } from "./Operations/Context";

const Stack = createStackNavigator();

const App = () => {
  // const styles = useAppStyles();
  console.log("App component rendered");

  return (
    <>
      <ContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Guess The City"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#1976d2",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen name="Guess The City" component={GamePlay} options={{ title: "Home" }} />
            <Stack.Screen name="Weather" component={Api} options={{ title: "Weather" }} />
            <Stack.Screen name="Database" component={Database} options={{ title: "Database" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </>
  );
};

export default App;
