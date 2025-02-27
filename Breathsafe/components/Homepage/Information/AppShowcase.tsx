import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Note {
  date: string;
  time: string;
  content: string;
  image?: string;
}

interface Version {
  number: string;
  date: string;
  changes: string[];
}

const versions: Version[] = [
  {
    number: "2.0.0",
    date: "Jan 30, 2025",
    changes: ["Major UI redesign", "New note categories", "Cloud sync"],
  },
];

const notes: Note[] = [
  {
    date: "May 24",
    time: "5:43 pm",
    content: "Excellent harvest, the grapes have a rich flavor and aroma",
    image: "https://example.com/grapes.jpg",
  },
  {
    date: "May 22",
    time: "3:17 pm",
    content:
      "I'll be back here in a couple of days to check if the grapes are fully ripe or not.",
  },
];

const WeatherAnimation = () => (
  <View style={styles.weatherContainer}>
    <View style={styles.weatherIcons}>
      <Ionicons name="sunny" size={24} color="#FFB800" />
      <Ionicons name="rainy" size={24} color="#4A90E2" />
      <Ionicons name="cloud" size={24} color="#9FA8DA" />
      <Ionicons name="thunderstorm" size={24} color="#90CAF9" />
    </View>
    <Text style={styles.weatherText}>Real-time Weather Updates</Text>
  </View>
);

export default function AppShowcase() {
  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* App Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>BreathSafe</Text>
            <Text style={styles.subHeaderText}>
              Track your location's AQI & BreathSafe
            </Text>
          </View>
          <Ionicons name="sunny" size={32} color="orange" />
        </View>

        {/* Version History */}
        <View style={styles.versionContainer}>
          <Text style={styles.sectionTitle}>Latest Updates</Text>
          {versions.map((version, index) => (
            <View key={index} style={styles.versionItem}>
              <Text style={styles.versionNumber}>Version {version.number}</Text>
              <Text style={styles.versionDate}>{version.date}</Text>
              {version.changes.map((change, changeIndex) => (
                <Text key={changeIndex} style={styles.versionChange}>
                  <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />{" "}
                  {change}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Weather Animation */}
        <WeatherAnimation />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    maxWidth: 400,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    borderRadius: 22,
    borderWidth: 2,
    elevation: 3,
    borderColor: "#edf2f4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#020202",
    marginBottom: 4,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#020202",
  },
  versionContainer: {
    marginBottom: 24,
  },
  versionItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  versionNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#020202",
    marginBottom: 4,
  },
  versionDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  versionChange: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  weatherContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  weatherIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  weatherText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
});
