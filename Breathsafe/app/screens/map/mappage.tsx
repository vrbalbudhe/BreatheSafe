import MapCard from "@/components/Homepage/Map/MapCard";
import MapShowcaseCard from "@/components/Homepage/Map/MapShowcaseCard";
import NavbarCard from "@/components/Homepage/Navbar/NavbarCard";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";

export default function MapPage() {
  return (
    <View style={styles.container}>
      <NavbarCard />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.minicontainer}>
          <MapCard />
          <MapShowcaseCard />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
  },
  minicontainer: {
    flex: 1,
    display: "flex",

    gap: 20,
    flexDirection: "column",
  },
});
