import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "@/contexts/LocationContexts";

export default function CurrentLocation() {
  const { location, place, distance, speed, isMoving, getLocation, rotation } =
    useLocation();

  const rotationInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getLocation}>
        <Animated.View
          style={{ transform: [{ rotate: rotationInterpolation }] }}
        >
          <Ionicons name="compass" size={45} color="#253237" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
