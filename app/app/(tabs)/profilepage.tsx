import AppShowcase from "@/components/Homepage/Information/AppShowcase";
import SettingsCard from "@/components/Settings/SettingsCard";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";

export default function profilepage() {
  const { user, setUser, loading, refreshUser } = useAuth();
  console.log("checkk : ", user);
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "6",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="person" color="#44a1a0" size={20} />
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        {!user ? (
          <View>
            <Pressable onPress={() => router.push("/loginpage")}>
              <View
                style={{
                  backgroundColor: "#44a1a0",
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "700", color: "white" }}
                >
                  Login
                </Text>
              </View>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => router.replace("/profile")}>
            <View
              style={{
                borderRadius: 30,
                paddingHorizontal: 16,
                paddingVertical: 10,
                backgroundColor: "#14213d",
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>
                {user?.firstName?.charAt(0).toUpperCase()}
              </Text>
            </View>
          </Pressable>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingsCard />
        <AppShowcase />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: 40,
    backgroundColor: "#F5F5F7",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    // color: "#44a1a0",
  },
  avatarPlaceholder: {
    backgroundColor: "#2b2d42",
    justifyContent: "center",
    alignItems: "center",
  },
});
