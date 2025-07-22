import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, Text, View, ImageBackground, Pressable, Alert, Button } from "react-native";
import { useGamePlayStyles } from "../AllStyles/gamePlayStyles"; // Use consistent styles
import { Context } from "../Operations/Context"; // Import the context for state management
import EditDialogue from "./EditDialogue";
import Toast from "react-native-toast-message";
import { createTable, loadDB, clearDatabase, addItem, getFromDB } from "../Operations/DbOperations"; // Fixed import path

// Load the database
const db = loadDB();

const DisplayDB = ({ navigation, route }) => {
  console.log("Database DisplayDB:");

  // Use consistent styles with other components
  const styles = useGamePlayStyles();

  // State management
  const [listAnswers, setListAnswers] = useState([]);

  // Use context - get the city list and helper functions
  const contextValue = useContext(Context);
  const selectedCityList = contextValue?.selectedCityList || [];
  const clearCityList = contextValue?.clearCityList || (() => {});

  // Edit dialog state
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editOldValue, setEditOldValue] = useState("");
  const [editNewValue, setEditNewValue] = useState("");
  const [editId, setEditId] = useState(null);

  console.log("Database selectedCityList:", selectedCityList);

  // Function to show toast message
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "The Database has been wiped clean. 👋",
      text1Style: { fontSize: 16 },
      text2Style: { fontSize: 16 },
    });
  };

  // Create table on component mount
  useEffect(() => {
    createTable(db);
    if (!db) {
      console.log("Database not opened!");
      return;
    }
    // Load existing data
    getFromDB(db, setListAnswers);
  }, []);

  // Process city list when it changes (for storing wrong guesses)
  useEffect(() => {
    if (selectedCityList && selectedCityList.length > 0) {
      console.log("Processing city list:", selectedCityList);

      // Process each city in the list
      selectedCityList.forEach((city) => {
        // Check if city already exists in database before adding
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT COUNT(*) as count FROM Countries WHERE country = ?",
            [city],
            (tx, results) => {
              const count = results.rows.item(0).count;
              if (count === 0) {
                // City doesn't exist, safe to add
                addItem(city, db);
                console.log("✅ Adding new wrong city to database:", city);
              } else {
                console.log("ℹ️ Wrong city already exists in database:", city);
              }
            },
            (tx, error) => {
              console.log("❌ Error checking for existing city:", error);
            }
          );
        });
      });

      // Refresh the list after processing all cities
      setTimeout(() => {
        getFromDB(db, setListAnswers);
        // Clear the city list after processing
        clearCityList();
        console.log("✅ City list processed and cleared");
      }, 500); // Small delay to ensure all database operations complete
    }
  }, [selectedCityList]);

  // Edit item function
  const editItem = (Id, oldValue) => {
    console.log("Editing item with Id:", Id, "and old value:", oldValue);
    setEditId(Id);
    setEditOldValue(oldValue);
    setEditNewValue(oldValue);
    setEditDialogVisible(true);
  };

  // Handle edit cancel
  const handleEditCancel = () => {
    setEditDialogVisible(false);
  };

  // Clear database function
  const clearDatabaseAndList = () => {
    Alert.alert("Clear Database", "Are you sure you want to clear all data?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {
          clearDatabase(db);
          getFromDB(db, setListAnswers);
          showToast();
        },
      },
    ]);
  };

  // Handle edit submit
  const handleEditSubmit = () => {
    if (editNewValue && editNewValue !== editOldValue && editId !== null) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "UPDATE Countries SET country = ? WHERE Id = ?",
            [editNewValue, editId],
            () => {
              getFromDB(db, setListAnswers);
              setEditDialogVisible(false);
            },
            (tx, error) => {
              console.log("Error updating item:", error);
              setEditDialogVisible(false);
            }
          );
        },
        (error) => {
          console.log("Transaction error:", error);
          setEditDialogVisible(false);
        }
      );
    } else {
      setEditDialogVisible(false);
    }
  };

  // Section component for consistency
  const Section = ({ title }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <ImageBackground resizeMode="cover" source={require("../assets/bgImage.png")} style={styles.image}>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <Section title="Wrong Cities Database" />

            <View style={styles.databaseInfoContainer}>
              <Text style={styles.databaseText}>Cities in queue: {selectedCityList.length}</Text>
              <Text style={styles.databaseText}>
                {selectedCityList.length > 0 ? `Processing: ${selectedCityList.join(", ")}` : "No cities to process"}
              </Text>
              <Text style={styles.databaseText}>Click any city to edit</Text>
            </View>

            <Button title="Clear Database" onPress={clearDatabaseAndList} />
            <EditDialogue
              visible={editDialogVisible}
              value={editNewValue}
              onChange={setEditNewValue}
              onCancel={handleEditCancel}
              onSubmit={handleEditSubmit}
            />

            <View style={styles.databaseListContainer}>
              {listAnswers && listAnswers.length > 0 ? (
                listAnswers.map((item, index) => (
                  <Pressable
                    key={item.Id}
                    onPress={() => editItem(item.Id, item.country)}
                    style={styles.databaseListItem}
                  >
                    <Text style={styles.databaseListText}>{item.country}</Text>
                  </Pressable>
                ))
              ) : (
                <Text style={styles.databaseEmptyText}>No cities stored yet. Play the game to add some!</Text>
              )}
            </View>

            {/* Navigation button */}
            <View style={[styles.container, styles.navigationContainer]}>
              <Button title="Back to Game" onPress={() => navigation.navigate("Guess The City")} color="#1976d2" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <Toast />
    </ImageBackground>
  );
};

export default DisplayDB;
