import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface AddAreaCardProps {
  customStyle?: object;
  textStyle?: object;
  onAddPress?: () => void;
}
export default function AddAreaCard({
  customStyle = {},
  textStyle = {},
  onAddPress = () => router.push("/areaSearchPage"),
}: AddAreaCardProps) {
  return (
    <View style={[styles.container, customStyle]}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Ionicons name="map" size={25} color="#44a1a0" />
            <Text style={[styles.title, textStyle]}>Add Location</Text>
          </View>
          <Text style={[styles.subtitle, textStyle]}>
            Track air quality in different cities
          </Text>
        </View>

        <View style={styles.citiesContainer}>
          <View style={styles.cityChip}>
            <Ionicons name="location" size={14} color="#555" />
            <Text style={styles.cityText}>Mumbai</Text>
          </View>
          <View style={styles.cityChip}>
            <Ionicons name="location" size={14} color="#555" />
            <Text style={styles.cityText}>Goa</Text>
          </View>
          <View style={styles.cityChip}>
            <Ionicons name="location" size={14} color="#555" />
            <Text style={styles.cityText}>Delhi</Text>
          </View>
          <View style={styles.cityChip}>
            <Text style={styles.cityText}>+10 more</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddPress}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.buttonText}>Add New City</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.illustrationContainer}>
        <Ionicons name="map-outline" size={60} color="rgba(0,0,0,0.15)" />
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    padding: 18,
    overflow: "hidden",
    position: "relative",
    marginBottom: 5,
    minHeight: 200,
    backgroundColor: "#ffffff",
    width: "100%",
    borderWidth: 2,
    borderColor: "#edf2f4",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  textContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    color: "#353535",
    fontWeight: "800",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.9,
    maxWidth: "90%",
  },
  citiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 8,
  },
  cityChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 4,
  },
  cityText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#555",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#44a1a0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: "flex-start",
    gap: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  illustrationContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
    opacity: 0.7,
  },
});
