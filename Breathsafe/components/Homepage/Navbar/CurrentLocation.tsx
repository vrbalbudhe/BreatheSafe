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
          <Ionicons name="compass" size={45} color="#8d99ae" />
        </Animated.View>
      </TouchableOpacity>

      {/* {place && <Text>📍 {place}</Text>}
      {distance !== null && <Text>📏 Distance: {distance.toFixed(2)} km</Text>}
      {speed !== null && <Text>🚗 Speed: {speed.toFixed(2)} km/h</Text>}
      {isMoving ? <Text>✅ Moving</Text> : <Text>❌ Not Moving</Text>} */}
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
