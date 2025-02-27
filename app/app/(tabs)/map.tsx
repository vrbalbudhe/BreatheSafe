import MapCard from "@/components/Map/MapCard";
import MapScreen from "@/components/Map/MapScreen";
import NavbarCard from "@/components/Navbar/NavbarCard";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function map() {
  return (
    <View style={style.container}>
      <ScrollView>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}></View>
        {/* <MapScreen /> */}
        <MapCard />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingTop: 50,
    backgroundColor: "#F5F5F7",
  },
});
