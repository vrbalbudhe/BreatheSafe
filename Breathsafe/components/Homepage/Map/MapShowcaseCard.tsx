import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MapShowcaseCard() {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.iconContainer}>
          <Ionicons name="map" size={18} color="#fff" />
          <Ionicons
            name="location"
            size={16}
            color="#fff"
            style={styles.locationIcon}
          />
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
    borderRadius: 20,
    borderWidth: 2,
    elevation: 3,
    borderColor: "#edf2f4",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3eb489",
    padding: 6,
    borderRadius: 12,
  },
  locationIcon: {
    marginLeft: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#3eb489",
    fontSize: 20,
    fontWeight: "800",
  },
  subtitle: {
    color: "#020202",
    fontSize: 15,
    marginTop: 2,
  },
});
