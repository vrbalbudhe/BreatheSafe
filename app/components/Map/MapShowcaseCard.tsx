import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MapShowcaseCard() {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.iconContainer}>
          <Ionicons name="map" size={25} color="#fff" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Track Location</Text>
          <Text style={styles.subtitle}>Real-time GPS tracking</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    shadowColor: "#ffffff",
    marginBottom: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    height: 70,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    backgroundColor: "#ffffff",
    padding: 10,
    width: "100%",
    borderRadius: 30,
    borderWidth: 2,
    elevation: 3,
    borderColor: "#edf2f4",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#44a1a0",
    padding: 10,
    borderRadius: 25,
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
    color: "#020202",
    fontSize: 15,
    marginTop: 2,
  },
});
