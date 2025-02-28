import { StyleSheet, View } from "react-native";
import AQICard from "./AqiCard";

export default function AqiStatus() {
  return (
    <View style={styles.container}>
      <AQICard location="Alandi" aqi={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    borderRadius:30,
    marginBottom: 5,
    maxWidth: 400,
    backgroundColor: "white",
    width: "100%",
  },
});
