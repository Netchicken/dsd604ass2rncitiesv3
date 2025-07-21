import React, { useState, useEffect, useRef } from "react";
import { ToastAndroid } from "react-native";
//import SQLite from "react-native-sqlite-storage";
import { DBSelect } from "../Operations/DbOperations";
//import { createCities } from "../Assets/citiesSmall"; // Import the function to create cities
//import {DBSelect} from './DBOperations';
//SQLite.DEBUG(true);
//SQLite.enablePromise(false);
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
//import GamePlay from './GamePlay';

//https://github.com/Shahid313/react-native-sqlite-storage/blob/main/screens/HomeScreen.js

//https://github.com/mahdi-sharifimehr/RN-Tutorial-Main/blob/RN-Tutorial-18/src/ScreenB.js

//https://www.youtube.com/watch?v=ANdSdIlgsEw  database creation
//github.com/mahdi-sharifimehr/RN-Tutorial-Main/tree/RN-Tutorial-25 database creation

//https://dev-yakuza.posstree.com/en/react-native/react-native-sqlite-storage/
//execute the command below to bind react-native-sqlite-storage to RN(React Native) project.

//react-native link react-native-sqlite-storage
//https://github.com/react-native-community/cli/blob/master/docs/autolinking.md

const db = SQLite.openDatabase(
  {
    name: "Store.db",
    createFromLocation: 1, //'~android/app/src/main/assets/www',
  },
  () => {
    console.log("Operations DB open exists", "success");
  },
  (error) => {
    console.log("Operations DB open error", error);
  }
);

export default function Operations({ navigation, route }) {
  const [cities, setCities] = useState([]);
  const [updateCity, setUpdateCity] = useState("");

  useEffect(() => {
    // console.log('Operations Useffect', 'success');
    // createTable();
    // selectDataHandler();
  }, []);

  // const createTable = () => {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'CREATE TABLE IF NOT EXISTS ' +
  //         'Users ' +
  //         '(ID INTEGER PRIMARY KEY AUTOINCREMENT, City TEXT);',
  //     );
  //   });
  //   //From DBBrowser creation
  //   // CREATE TABLE "Users"(
  //   // 	"ID"	INTEGER,
  //   // 	"City"	TEXT,
  //   // 	PRIMARY KEY("ID" AUTOINCREMENT)
  //   // );
  //   const fakeCity = 'Fake Hamilton'; //sqlite INSERT INTO Users (City) VALUES ("fakeCity")
  //   db.transaction(async tx => {
  //     await tx.executeSql('INSERT INTO users (City) VALUES (' + fakeCity + ')');
  //   });
  // };

  //SHOW CITIES HANDLER
  // const selectDataHandler = () => {
  // var results = DBSelect();

  // ToastAndroid.showWithGravity(
  //   'selectDataHandler count of results = ' + results + '',
  //   ToastAndroid.LONG,
  //   ToastAndroid.CENTER,
  // );
  // var len = results.count;

  // setCities([]); //empty state
  // for (let i = 0; i < len; i++) {
  //   var city = results.rows.item(i).City;
  //   //spread the hook, add in the new city
  //   setCities(cities => {
  //     return [...cities.reverse(), city];
  //   });
  // }
  // ToastAndroid.showWithGravity("Show cities triggered", ToastAndroid.LONG, ToastAndroid.CENTER);
  // const db = SQLite.openDatabase(
  //   {
  //     name: "Store.db",
  //     createFromLocation: 1, // '~android/app/src/main/assets/',
  //   },
  //   () => {
  //     ToastAndroid.showWithGravity("Operations DB open exists", ToastAndroid.SHORT, ToastAndroid.CENTER);
  //   },
  //   (error) => {
  //     ToastAndroid.showWithGravity("Operations DB open error", ToastAndroid.LONG, ToastAndroid.CENTER);
  //   }
  //  );

  // // console.log('Operations selectDataHandler', 'click');
  //   db.transaction((tx) => {
  //     tx.executeSql("SELECT City FROM Users", [], (tx, results) => {
  //       var len = results.rows.length;
  //       console.log("Operations selectDataHandler len", len);

  //       ToastAndroid.showWithGravity("SELECT City FROM Users - " + len, ToastAndroid.SHORT, ToastAndroid.BOTTOM);

  //       setCities([]); //empty state
  //       for (let i = 0; i < len; i++) {
  //         var city = results.rows.item(i).City;
  //         //spread the hook, add in the new city
  //         setCities((cities) => {
  //           return [...cities, city];
  //         });
  //       }
  //     });
  //   });
  // };

  // const updateData = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "UPDATE Users SET City = ?",
  //       [updateCity],
  //       () => {
  //         Alert.alert("Success!", "The update was succesful");
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   });
  // };
  //DELETE ALL CITIES HANDLER
  // const removeDataHandler = () => {
  //   ToastAndroid.showWithGravity("Delete all cities triggered", ToastAndroid.LONG, ToastAndroid.CENTER);
  //   const db = SQLite.openDatabase(
  //     {
  //       name: "Store.db",
  //       createFromLocation: 1, // '~android/app/src/main/assets/',
  //     },
  //     () => {
  //       console.log("removeDataHandler DB open exists", "success");
  //     },
  //     (error) => {
  //       console.log("removeDataHandler DB open error", error);
  //     }
  //   );

  //   console.log("Operations removeData", "trigger");
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "DELETE FROM Users",
  //       [],
  //       () => {
  //         setCities([]); //empty state

  //         ToastAndroid.showWithGravity("Success! All Cities have been deleted", ToastAndroid.LONG, ToastAndroid.CENTER);
  //         console.log("Success!", "All Cities have been deleted");
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   });
  // };

  // const onPressHandler = () => {
  //   //  navigation.navigate('Guess_Cities');
  //   navigation.goBack();
  //   // navigation.setParams({ ItemId: 14 });
  // };

  // const Section = ({ children, title }) => {
  //   return (
  //     <View style={styles.sectionContainer}>
  //       <Text style={styles.sectionTitle}>{title}</Text>
  //     </View>
  //   );
  //  };

  return (
    <SafeAreaView style={styles.container}>
      <Section style={styles.sectionTitle} title="View and Delete cities in the Database"></Section>

      <TouchableOpacity onPress={() => selectDataHandler()} style={styles.UpdateButton}>
        <Text style={styles.UpdateButtonText}>Show Cities</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeDataHandler()} style={styles.DeleteButton}>
        <Text style={styles.DeleteButtonText}>Delete All Cities</Text>
      </TouchableOpacity>

      <ScrollView>
        {cities.map((item, index) => {
          return (
            <View>
              <Text key={index} style={styles.text}>
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: 'column',
  },

  UpdateButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  UpdateButtonText: {
    color: "#fff",
  },
  DeleteButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  DeleteButtonText: {
    color: "#fff",
  },

  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    justifyContent: "center",
    textAlign: "center",
  },
});
