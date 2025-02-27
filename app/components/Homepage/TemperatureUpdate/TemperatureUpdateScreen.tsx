// types.ts
export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  rain: number;
  wind: number;
  location: string;
  date: string;
}

export interface HourlyForecast {
  time: string;
  temperature: string;
  icon: "cloud-rain" | "cloud" | "sun";
}

// TemperatureUpdateScreen.tsx
import React, { useEffect, FC } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
// import { WeatherData, HourlyForecast } from "./types";

const { width } = Dimensions.get("window");

interface RainDropProps {
  delay: number;
  animationValue: Animated.Value;
}

interface StylesProps {
  container: ViewStyle;
  weatherCard: ViewStyle;
  header: ViewStyle;
  date: TextStyle;
  location: TextStyle;
  mainWeather: ViewStyle;
  cloudContainer: ViewStyle;
  temperature: TextStyle;
  feelsLike: TextStyle;
  weatherDetails: ViewStyle;
  detailItem: ViewStyle;
  detailLabel: TextStyle;
  detailValue: TextStyle;
  warningBanner: ViewStyle;
  warningText: TextStyle;
  hourlyForecast: ViewStyle;
  hourlyItem: ViewStyle;
  hourlyTime: TextStyle;
  hourlyTemp: TextStyle;
  rainDrop: ViewStyle;
}

const RainDrop: FC<RainDropProps> = ({ delay, animationValue }) => {
  return (
    <Animated.View
      style={[
        styles.rainDrop,
        {
          transform: [
            {
              translateY: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 20],
              }),
            },
          ],
          opacity: animationValue.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 1, 0],
          }),
        },
      ]}
    />
  );
};

const TemperatureUpdateScreen: FC = () => {
  const rainAnimation = new Animated.Value(0);
  const cloudOpacity = new Animated.Value(1);
  const temperatureScale = new Animated.Value(1);

  const weatherData: WeatherData = {
    temperature: 22,
    feelsLike: 18,
    humidity: 80,
    rain: 89,
    wind: 25,
    location: "Omsk",
    date: "26 May, Thursday",
  };

  const hourlyForecast: HourlyForecast[] = [
    { time: "10:00", temperature: "22°", icon: "cloud-rain" },
    { time: "12:00", temperature: "23°", icon: "cloud" },
    { time: "14:00", temperature: "25°", icon: "sun" },
  ];

  useEffect(() => {
    const startAnimations = () => {
      // Rain animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(rainAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rainAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Cloud breathing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(cloudOpacity, {
            toValue: 0.7,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(cloudOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Temperature scale breathing
      Animated.loop(
        Animated.sequence([
          Animated.timing(temperatureScale, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(temperatureScale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimations();

    return () => {
      // Cleanup animations on unmount
      rainAnimation.stopAnimation();
      cloudOpacity.stopAnimation();
      temperatureScale.stopAnimation();
    };
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4a90e2", "#87ceeb"]}
        style={styles.weatherCard}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.date}>{weatherData.date}</Text>
          <Text style={styles.location}>{weatherData.location}</Text>
        </View>

        {/* Main Weather Display */}
        <View style={styles.mainWeather}>
          <Animated.View
            style={[
              styles.cloudContainer,
              {
                opacity: cloudOpacity,
                transform: [{ scale: temperatureScale }],
              },
            ]}
          >
            {/* <MaterialCommunityIcons name="cloud-rain" size={80} color="white" /> */}
            {[...Array(5)].map((_, i) => (
              <RainDrop
                key={i}
                delay={i * 200}
                animationValue={rainAnimation}
              />
            ))}
          </Animated.View>

          <Animated.Text
            style={[
              styles.temperature,
              {
                transform: [{ scale: temperatureScale }],
              },
            ]}
          >
            {`${weatherData.temperature}°C`}
          </Animated.Text>
          <Text style={styles.feelsLike}>
            {`feels like ${weatherData.feelsLike}°C`}
          </Text>
        </View>

        {/* Weather Details */}
        <View style={styles.weatherDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{`${weatherData.humidity}%`}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Rain</Text>
            <Text style={styles.detailValue}>{`${weatherData.rain}%`}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Wind</Text>
            <Text style={styles.detailValue}>{`${weatherData.wind} km/h`}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create<StylesProps>({
  container: {
    flex: 1,
  },
  weatherCard: {
    // width: width * 0.9,
    padding: 20,
    borderRadius: 20,
    // borderWidth: 0.5,
    elevation: 1,
    borderColor: "#e5e5e5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  date: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  location: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  mainWeather: {
    alignItems: "center",
    marginBottom: 30,
  },
  cloudContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  temperature: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  feelsLike: {
    color: "white",
    fontSize: 16,
    opacity: 0.8,
  },
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  detailItem: {
    alignItems: "center",
  },
  detailLabel: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
  },
  detailValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  warningBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  warningText: {
    color: "white",
    marginLeft: 10,
  },
  hourlyForecast: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  hourlyItem: {
    alignItems: "center",
  },
  hourlyTime: {
    color: "white",
    marginBottom: 5,
  },
  hourlyTemp: {
    color: "white",
    marginTop: 5,
  },
  rainDrop: {
    position: "absolute",
    width: 2,
    height: 10,
    backgroundColor: "white",
    borderRadius: 1,
  },
});

export default TemperatureUpdateScreen;
