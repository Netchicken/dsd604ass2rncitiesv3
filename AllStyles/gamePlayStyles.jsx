import { StyleSheet, Dimensions } from "react-native";
import { useMemo } from "react";

export const useGamePlayStyles = () => {
  const { width, height } = Dimensions.get("window");

  // Responsive font and spacing helpers
  const scale = width / 375; // 375 is a common base width (iPhone 11)
  const verticalScale = height / 812; // 812 is a common base height

  // Helper function for scaling
  const rs = (size) => Math.round(size * scale);
  const vs = (size) => Math.round(size * verticalScale);

  return useMemo(
    () =>
      StyleSheet.create({
        resultcontainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        headingoutome: {
          flex: 1,
          flexDirection: "row",
          fontSize: rs(18),
          fontWeight: "bold",
          justifyContent: "center",
          alignItems: "center",
        },
        item: {
          paddingLeft: rs(20),
          fontSize: rs(18),
        },
        sectionContainer: {
          marginTop: vs(10),
          paddingHorizontal: rs(24),
        },
        sectionTitle: {
          color: "#1976d2",
          fontSize: rs(28),
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: vs(18),
          letterSpacing: 1.5 * scale,
          textTransform: "uppercase",
          backgroundColor: "#e3f2fd",
          paddingVertical: vs(10),
          paddingHorizontal: rs(20),
          borderRadius: rs(16),
          overflow: "hidden",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 4,
        },
        sectionDescription: {
          marginTop: vs(8),
          fontSize: rs(18),
          fontWeight: "400",
        },
        highlight: {
          fontWeight: "700",
        },
        container: {
          flex: 1,
          marginTop: vs(32),
          paddingHorizontal: rs(12),
        },
        scrollView: {
          marginHorizontal: rs(20),
        },
        text: {
          fontSize: rs(40),
          fontWeight: "bold",
          margin: rs(10),
        },
        textSmall: {
          fontSize: rs(10),
          margin: rs(5),
        },

        image: {
          flex: 1,
          justifyContent: "center",
          width: "100%",
          height: "100%",
        },
        icon: {
          width: 48,
          height: 48,
          marginLeft: 12, // add spacing between text and image
          alignSelf: "center",
          resizeMode: "contain", // Optional: keeps aspect ratio
          marginVertical: 16, // Optional: spacing
        },
        container: {
          flex: 1,
          marginTop: vs(32),
          paddingHorizontal: rs(12),
        },
        calcBox: {
          minHeight: vs(50), // Minimum height for one line
          maxHeight: vs(100), // Maximum height for two lines
          justifyContent: "center", // Center children vertically
          alignItems: "center", // Center children horizontally
          borderRadius: rs(32),
          paddingHorizontal: rs(18), // Horizontal padding (left & right)
          paddingVertical: vs(12), // Vertical padding (top & bottom)
          backgroundColor: "oldlace",
          marginBottom: vs(28),
          borderWidth: 1,
        },
        outputText: {
          fontWeight: "bold",
          textAlign: "center", // Center text horizontally
          textAlignVertical: "center", // Center text vertically (Android only)
          fontSize: rs(30),
          color: "#333",
          lineHeight: vs(36), // Should match container height for vertical centering
        },

        sectionTitle: {
          color: "#1976d2",
          fontSize: rs(28),
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: vs(18),
          letterSpacing: 1.5 * scale,
          textTransform: "uppercase",
          backgroundColor: "#e3f2fd",
          paddingVertical: vs(10),
          paddingHorizontal: rs(20),
          borderRadius: rs(16),
          overflow: "hidden",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 4,
        },

        // Example list styles (if needed)
        liContainer: {
          backgroundColor: "#f5f5f5",
          flex: 1,
          paddingLeft: rs(8),
          paddingVertical: vs(4),
          borderRadius: rs(8),
          marginBottom: vs(6),
        },
        liText: {
          color: "#333",
          fontSize: rs(17),
          fontWeight: "400",
        },

        // New styles extracted from inline styles
        debugText: {
          color: "black",
          fontSize: rs(16),
          margin: rs(10),
        },
        debugTextSmall: {
          color: "black",
          fontSize: rs(14),
          margin: rs(10),
        },
        dropdownContainer: {
          width: "100%",
          marginVertical: vs(16),
        },
        dropdownButton: {
          width: "80%",
          height: vs(50),
          backgroundColor: "#FFF",
          borderRadius: rs(8),
          borderWidth: 1,
          borderColor: "#444",
          alignSelf: "center",
          justifyContent: "center",
          paddingHorizontal: rs(15),
        },
        dropdownButtonText: {
          color: "#444",
          fontSize: rs(16),
        },
        modalOverlay: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        modalContainer: {
          backgroundColor: "white",
          borderRadius: rs(10),
          padding: rs(20),
          width: "80%",
          maxHeight: "70%",
        },
        modalTitle: {
          fontSize: rs(18),
          fontWeight: "bold",
          marginBottom: vs(15),
          textAlign: "center",
        },
        cityListItem: {
          padding: rs(15),
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
        },
        cityListItemText: {
          fontSize: rs(16),
        },
        modalCancelButton: {
          marginTop: vs(15),
          padding: rs(10),
          backgroundColor: "#1976d2",
          borderRadius: rs(5),
          alignItems: "center",
        },
        modalCancelButtonText: {
          color: "white",
          fontSize: rs(16),
        },
        resultsContainer: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: vs(20),
        },
        correctCitiesContainer: {
          flex: 1,
          marginRight: rs(10),
        },
        wrongCitiesContainer: {
          flex: 1,
          marginLeft: rs(10),
        },
        wrongCitiesHeading: {
          textAlign: "right",
        },
        wrongCitiesItem: {
          textAlign: "right",
          paddingRight: rs(20),
        },
        navigationContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: vs(20),
        },

        // Weather-specific styles for Api.js
        weatherContainer: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: rs(10),
          margin: rs(10),
          padding: rs(15),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        weatherInfoContainer: {
          alignItems: "flex-start",
        },
        weatherText: {
          fontSize: rs(16),
          fontWeight: "600",
          color: "#1976d2",
          marginVertical: vs(5),
          textAlign: "left",
        },

        // Database-specific styles
        databaseInfoContainer: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: rs(10),
          margin: rs(10),
          padding: rs(15),
          alignItems: "center",
        },
        databaseText: {
          fontSize: rs(16),
          fontWeight: "600",
          color: "#1976d2",
          marginVertical: vs(2),
        },
        databaseListContainer: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: rs(10),
          margin: rs(10),
          padding: rs(10),
          minHeight: vs(200),
        },
        databaseListItem: {
          backgroundColor: "#f0f0f0",
          borderRadius: rs(8),
          padding: rs(12),
          marginVertical: vs(5),
          borderLeftWidth: rs(4),
          borderLeftColor: "#1976d2",
        },
        databaseListText: {
          fontSize: rs(16),
          fontWeight: "500",
          color: "#333",
        },
        databaseEmptyText: {
          fontSize: rs(16),
          color: "#666",
          textAlign: "center",
          fontStyle: "italic",
          marginTop: vs(20),
        },
      }),
    []
  );
};
