import AppShowcase from "@/components/Homepage/Information/AppShowcase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native";

export default function profilepage() {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: "5" }}>
          <Ionicons name="person" color="#44a1a0" size={28} />
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View>
          <Pressable onPress={() => router.push("/loginpage")}>
            <View
              style={{
                backgroundColor: "#44a1a0",
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "800", color: "white" }}>
                Login
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <AppShowcase />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    backgroundColor: "#F5F5F7",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    // color: "#44a1a0",
  },
});
