import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
interface NavbarProps {
  userName?: string;
  avatarUrl?: string;
}
import { Ionicons } from "@expo/vector-icons";
import CurrentLocation from "./CurrentLocation";
import { useLocation } from "@/contexts/LocationContexts";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function NavbarCard({
  userName = "Dear",
  avatarUrl,
}: NavbarProps) {
  const router = useRouter();
  const { location, place, distance, speed, isMoving, getLocation, rotation } =
    useLocation();
  const { user, setUser, loading, refreshUser } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.navContent}>
        <View style={[styles.greetingContainer]}>
          <View style={styles.PinHeadingContainer}>
            <Ionicons name="leaf" size={24} color="#44a1a0" />
            <Text style={styles.userName}>
              Breath
              <Text style={{ color: "#44a1a0" }}>Safe</Text>
            </Text>
          </View>

          <View style={styles.PinHeadingContainer}>
            <Ionicons name="navigate" size={18} color="#8d99ae" />
            <Text style={[styles.greetingText, { fontSize: 14 }]}>{place}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.notificationBell}>
            <Text style={styles.bellIcon}></Text>
          </TouchableOpacity>
          <CurrentLocation />
          {user ? (
            <TouchableOpacity style={styles.avatarContainer}>
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
              ) : (
                <Pressable onPress={() => router.replace("/")}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {user?.firstName?.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                </Pressable>
              )}
            </TouchableOpacity>
          ) : (
            <Pressable onPress={() => router.push("/loginpage")}>
              {/* <View
                style={{
                  backgroundColor: "#44a1a0",
                  paddingHorizontal: 18,
                  paddingVertical: 8,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{ fontSize: 17, fontWeight: "800", color: "white" }}
                >
                  Login
                </Text>
              </View> */}
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 14,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 5,
    width: "100%",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#edf2f4",
  },
  navContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingContainer: {
    gap: 4,
  },
  greetingText: {
    fontSize: 20,
    color: "#666",
    flexWrap: "wrap",
    fontWeight: "500",
  },
  PinHeadingContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  userName: {
    fontSize: 25,
    fontWeight: "800",
    color: "#353535",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  notificationBell: {
    padding: 8,
  },
  bellIcon: {
    fontSize: 24,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    backgroundColor: "#2b2d42",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  notesSection: {
    backgroundColor: "#f7f7ff",
    borderRadius: 18,
    padding: 16,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "800",
    color: "#020202",
  },
  chevron: {
    fontSize: 24,
    color: "#000",
  },
  notesList: {
    gap: 16,
  },
  noteItem: {
    flexDirection: "row",
    gap: 12,
  },
  noteImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  noteContent: {
    flex: 1,
  },
  noteTimestamp: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 25,
    padding: 14,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
