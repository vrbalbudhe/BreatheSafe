import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface AQIStatus {
  status: string;
  colors: readonly [string, string];
  icon: keyof typeof Ionicons.glyphMap;
}

interface AQICardProps {
  location?: string;
  aqi?: number;
}

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  locationContainer: ViewStyle;
  location: TextStyle;
  content: ViewStyle;
  aqiContainer: ViewStyle;
  aqiValue: TextStyle;
  aqiUnit: TextStyle;
  statusContainer: ViewStyle;
  statusIcon: TextStyle;
  statusText: TextStyle;
  footer: ViewStyle;
  updateContainer: ViewStyle;
  updateText: TextStyle;
}

const getAQIStatus = (aqi: number): AQIStatus => {
  if (aqi <= 50)
    return {
      status: "Good",
      colors: ["#a8e6cf", "#76c893"] as const,
      icon: "leaf",
    };
  if (aqi <= 100)
    return {
      status: "Moderate",
      colors: ["#ffd3b6", "#ffaaa5"] as const,
      icon: "alert-circle",
    };
  if (aqi <= 150)
    return {
      status: "Unhealthy for Sensitive Groups",
      colors: ["#ffaaa5", "#ff8b94"] as const,
      icon: "warning",
    };
  if (aqi <= 200)
    return {
      status: "Unhealthy",
      colors: ["#ff8b94", "#ff6b6b"] as const,
      icon: "alert",
    };
  return {
    status: "Hazardous",
    colors: ["#800000", "#4a0404"] as const,
    icon: "skull",
  };
};

const AQICard: React.FC<AQICardProps> = ({
  location = "Downtown",
  aqi = 155,
}) => {
  const { status, colors, icon } = getAQIStatus(aqi);

  return (
    <LinearGradient
      colors={colors}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Air Quality Index</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color="white" />
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.aqiContainer}>
          <Text style={styles.aqiValue}>{aqi}</Text>
          <Text style={styles.aqiUnit}>AQI</Text>
        </View>

        <View style={styles.statusContainer}>
          <Ionicons
            name={icon}
            size={24}
            color="white"
            style={styles.statusIcon}
          />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.updateContainer}>
          <Ionicons
            name="time-outline"
            size={14}
            color="rgba(255,255,255,0.8)"
          />
          <Text style={styles.updateText}>Updated 5 min ago</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    maxWidth: 400,
    padding: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#edf2f4",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  aqiContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  aqiValue: {
    fontSize: 58,
    fontWeight: "700",
    color: "white",
    lineHeight: 60,
  },
  aqiUnit: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
    fontWeight: "500",
  },
  statusContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 12,
    borderRadius: 16,
  },
  statusIcon: {
    marginBottom: 4,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  updateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  updateText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
});

export default AQICard;
