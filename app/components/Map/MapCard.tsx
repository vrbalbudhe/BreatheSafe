import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapScreen from "./MapScreen";

export default function MapCard() {
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}> */}
        {/* <View style={styles.headerLeft}>
          <Ionicons name="location" size={24} color="#3e5c76" />
          <Text style={styles.headerText}>Current Location</Text>
        </View> */}
        {/* <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={20} color="#666" />
        </TouchableOpacity> */}
      {/* </View> */}

      <View style={styles.mapContainer}>
        <MapScreen />
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.viewMapButton}>
          <Ionicons name="map" size={20} color="white" />
          <Text style={styles.viewMapText}>View Full Map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.directionButton}>
          <Ionicons name="navigate-circle" size={20} color="white" />
          <Text style={styles.directionText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    backgroundColor: "#ffffff",
    // padding: 10,
    // shadowColor: "#ffffff",
    // shadowOffset: {
      // width: 1,
      // height: 1,
    // },
    // shadowOpacity: 0.9,
    // shadowRadius: 8,
    // borderRadius: 20,
    // borderWidth: 2,
    // elevation: 3,
    // borderColor: "#edf2f4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  refreshButton: {
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  mapContainer: {
    height: 600,
    borderRadius: 1,
    overflow: "hidden",
    position: "relative",
  },
  overlayCard: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#eee",
    marginHorizontal: 12,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  viewMapButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  viewMapText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  directionButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  directionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
