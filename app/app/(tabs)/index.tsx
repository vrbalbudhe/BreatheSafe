import AqiStatus from "@/components/Homepage/Aqi/AqiStatus";
import UpcomingScheduleStatus from "@/components/Homepage/TemperatureUpdate/UpcomingScheduleStatus";
import MapShowcaseCard from "@/components/Map/MapShowcaseCard";
import NavbarCard from "@/components/Navbar/NavbarCard";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AddAreaCard from "@/components/Homepage/AddPlaceCards/AddAreaCard";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <LinearGradient colors={["#F5F5F7", "#F5F5F7"]} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <NavbarCard />
        <AqiStatus />
        <UpcomingScheduleStatus />
        <Pressable onPress={() => router.push("/map")}>
          <MapShowcaseCard />
        </Pressable>
        <AddAreaCard />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: 40,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 20,
  },
});
