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

  // Use context - fix the context usage to match your current Context.js
  const { selectedCity } = useContext(Context);

  // Edit dialog state
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editOldValue, setEditOldValue] = useState("");
  const [editNewValue, setEditNewValue] = useState("");
  const [editId, setEditId] = useState(null);

  console.log("Database selectedCity:", selectedCity);

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

  // Add item when selectedCity changes (for storing correct guesses)
  useEffect(() => {
    if (selectedCity && selectedCity !== null) {
      addItem(selectedCity, db);
      getFromDB(db, setListAnswers);
    }
  }, [selectedCity]);

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
            <Section title="Correct Cities Database" />

            <View style={styles.databaseInfoContainer}>
              <Text style={styles.databaseText}>Latest City: {selectedCity || "None"}</Text>
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
                    onPress={() => editItem(item.Id, item.answer)}
                    style={styles.databaseListItem}
                  >
                    <Text style={styles.databaseListText}>{item.answer}</Text>
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
