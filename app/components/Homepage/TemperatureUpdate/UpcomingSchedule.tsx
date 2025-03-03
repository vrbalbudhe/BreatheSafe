import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface DayForecast {
  day: string;
  date: string;
  aqi: number;
  status: string;
}

const forecast: DayForecast[] = [
  { day: "Today", date: "22 Feb", aqi: 45, status: "Good" },
  { day: "Tomorrow", date: "23 Feb", aqi: 75, status: "Moderate" },
  { day: "Friday", date: "24 Feb", aqi: 95, status: "Moderate" },
  { day: "Saturday", date: "25 Feb", aqi: 125, status: "Unhealthy" },
  { day: "Sunday", date: "26 Feb", aqi: 85, status: "Moderate" },
  { day: "Monday", date: "27 Feb", aqi: 55, status: "Good" },
  { day: "Tuesday", date: "28 Feb", aqi: 65, status: "Moderate" },
];

const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return "#3eb489";
  if (aqi <= 100) return "#ff9800";
  if (aqi <= 150) return "#f44336";
  if (aqi <= 200) return "#9c27b0";
  return "#800000";
};

export default function UpcomingSchedule() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.contentWrapper}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="leaf" size={30} color="#44a1a0" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>AQI Forecast</Text>
          <Text style={styles.subtitle}>Next 7 days prediction</Text>
        </View>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="#44a1a0"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.forecastContainer}>
          {forecast.map((day, index) => (
            <View
              key={index}
              style={[
                styles.dayContainer,
                index !== forecast.length - 1 && styles.dayBorder,
              ]}
            >
              <View style={styles.dayInfo}>
                <Text style={styles.dayText}>{day.day}</Text>
                <Text style={styles.dateText}>{day.date}</Text>
              </View>
              <View style={styles.aqiInfo}>
                <View
                  style={[
                    styles.aqiBadge,
                    { backgroundColor: getAQIColor(day.aqi) },
                  ]}
                >
                  <Text style={styles.aqiText}>{day.aqi}</Text>
                </View>
                <Text
                  style={[styles.statusText, { color: getAQIColor(day.aqi) }]}
                >
                  {day.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    // backgroundColor: "#0b2027",
    backgroundColor: "white",
    width: "100%",
    borderRadius: 30,
    // borderWidth: 2,
    elevation: 3,
    borderColor: "#44a1a0",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 10,
    height: 70,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edf2f4",
    padding: 8,
    borderRadius: 30,
  },
  locationIcon: {
    marginLeft: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#44a1a0",
    fontSize: 18,
    fontWeight: "800",
  },
  subtitle: {
    color: "black",
    fontSize: 15,
    marginTop: 2,
  },
  forecastContainer: {
    borderTopWidth: 1,
    borderTopColor: "#edf2f4",
    paddingHorizontal: 16,
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  dayBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#edf2f4",
  },
  dayInfo: {
    flex: 1,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  dateText: {
    fontSize: 14,
    color: "black",
    marginTop: 2,
  },
  aqiInfo: {
    alignItems: "center",
    gap: 4,
  },
  aqiBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aqiText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
