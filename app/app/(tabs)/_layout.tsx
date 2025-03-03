import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => null,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: "absolute",
              backgroundColor: "black",
              paddingHorizontal: 16,
              paddingBottom: 10,
              borderRadius: 30,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 5,
              height: 80,
              bottom: 20,
              marginHorizontal: 20,
            },
            default: {
              backgroundColor: "black",
              paddingHorizontal: 16,
              paddingBottom: 5,
              marginBottom: 10,
              marginHorizontal: 10,
              borderRadius: 20,
              elevation: 8,
              height: 64,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: Platform.OS === "ios" ? 4 : 6,
          color: "white",
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === "ios" ? 6 : 4,
        },
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "white" : "#8E8E93"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={24}
              color={focused ? "white" : "#8E8E93"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "newspaper" : "newspaper-outline"}
              size={24}
              color={focused ? "white" : "#8E8E93"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profilepage"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? "white" : "#8E8E93"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="learnpage"
        options={{
          title: "Learn",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? "white" : "#8E8E93"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
