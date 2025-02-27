import AqiStatus from "@/components/Homepage/Aqi/AqiStatus";
import NavbarCard from "@/components/Homepage/Navbar/NavbarCard";
import UpcomingScheduleStatus from "@/components/Homepage/TemperatureUpdate/UpcomingScheduleStatus";
import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.miniContainer}>
          <NavbarCard />
          <AqiStatus />
          <UpcomingScheduleStatus />
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
    gap: 12,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    backgroundColor: "#e9ecef",
    // backgroundColor: "#f5f7fa",
    // alignItems: "center",
    // justifyContent: "flex-start",
  },
  miniContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },
  boxGreen: {
    width: 40,
    height: 40,
    backgroundColor: "lightgreen",
  },
  boxYellow: {
    width: 40,
    height: 40,
    backgroundColor: "lightyellow",
  },
});
