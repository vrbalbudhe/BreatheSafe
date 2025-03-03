import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

const API_URL =
  Constants.expoConfig?.extra?.API_URL || "https://fallback-url.com";
export default function UserProfile(): JSX.Element {
  const { user, setUser, loading, setLoading, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(user?.id || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState(user?.location || "NA");
  const [age, setAge] = useState(user?.age || "NA");
  const [area, setArea] = useState(user?.area || "NA");
  const [landmark, setLandmark] = useState(user?.landmark || "NA");
  const [city, setCity] = useState(user?.city || "NA");
  const [state, setState] = useState(user?.state || "NA");
  const [pincode, setPincode] = useState(user?.pincode || "NA");

  const avatar =
    user?.avatar ||
    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/Auth/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setLoading(true);
        await refreshUser();
        setTimeout(() => {
          setLoading(false);
          router.replace("/");
        }, 3000);
      }

      console.log("Login successful:", response.data);
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = () => {
    const updatedUser = {
      id,
      firstName,
      lastName,
      email,
      phone,
      location,
      age,
      area,
      landmark,
      city,
      state,
      pincode,
      avatar,
    };

    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        {isEditing ? (
          <Text style={styles.headerTitle}>Edit Profile</Text>
        ) : (
          <Text style={styles.headerTitle}>{firstName || "Profile"}</Text>
        )}
        {!isEditing && (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#262626" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Header Section */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: avatar }} style={styles.profileImage} />
            {isEditing && (
              <TouchableOpacity style={styles.changePhotoButton}>
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{`${firstName}${lastName}`}</Text>
            {!isEditing && (
              <TouchableOpacity
                style={styles.editProfileButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Profile Divider */}
        <View style={styles.divider} />

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Personal Info Section */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>First Name</Text>
              <TextInput
                style={[styles.input, isEditing && styles.inputEditable]}
                value={firstName}
                onChangeText={setFirstName}
                editable={isEditing}
                placeholder="First Name"
              />
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Last Name</Text>
              <TextInput
                style={[styles.input, isEditing && styles.inputEditable]}
                value={lastName}
                onChangeText={setLastName}
                editable={isEditing}
                placeholder="Last Name"
              />
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={[styles.input, isEditing && styles.inputEditable]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={isEditing}
                placeholder="Email"
              />
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Phone</Text>
              <TextInput
                style={[styles.input, isEditing && styles.inputEditable]}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                editable={isEditing}
                placeholder="Phone Number"
              />
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Age</Text>
              <TextInput
                style={[styles.input, isEditing && styles.inputEditable]}
                value={age}
                onChangeText={setAge}
                editable={isEditing}
                placeholder="Age"
              />
            </View>
          </View>

          {/* Location Info Section */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Location Information</Text>

            {[
              { label: "Area", value: area, setValue: setArea },
              { label: "Landmark", value: landmark, setValue: setLandmark },
              { label: "Location", value: location, setValue: setLocation },
              { label: "City", value: city, setValue: setCity },
              { label: "State", value: state, setValue: setState },
              { label: "Pincode", value: pincode, setValue: setPincode },
            ].map((field, index) => (
              <View key={index} style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <TextInput
                  style={[styles.input, isEditing && styles.inputEditable]}
                  value={field.value}
                  onChangeText={field.setValue}
                  editable={isEditing}
                  placeholder={field.label}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons - Only visible when editing */}
        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DBDBDB",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#262626",
  },
  logoutButton: {
    position: "absolute",
    right: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileHeader: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 0.5,
    borderColor: "#DBDBDB",
  },
  changePhotoButton: {
    position: "absolute",
    bottom: -5,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  changePhotoText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3897F0",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#262626",
    marginBottom: 8,
  },
  editProfileButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  editProfileText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#262626",
  },
  divider: {
    height: 1,
    backgroundColor: "#DBDBDB",
    marginTop: 10,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#262626",
    marginBottom: 16,
  },
  fieldRow: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#8E8E8E",
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: "#262626",
    borderBottomWidth: 1,
    borderBottomColor: "#DBDBDB",
    paddingBottom: 8,
  },
  inputEditable: {
    borderBottomColor: "#3897F0",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: "#3897F0",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#262626",
    fontWeight: "600",
    fontSize: 14,
  },
  bottomPadding: {
    height: 40,
  },
});
