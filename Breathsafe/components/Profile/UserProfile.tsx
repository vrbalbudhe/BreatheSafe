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
} from "react-native";

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
      const response = await axios.get(
        "http://192.168.0.101:8000/api/Auth/logout",
        { withCredentials: true }
      );

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
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.headingContainer}>
        <Text style={styles.headingContainerText}>Profile</Text>
      </View>

      <View style={styles.profileHeader}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{`${firstName} ${lastName}`}</Text>
      </View>

      <View style={styles.profileContent}>
        {/* First Name */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            editable={isEditing}
          />
        </View>

        {/* Last Name */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            editable={isEditing}
          />
        </View>

        {/* Email */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={isEditing}
          />
        </View>

        {/* Phone */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            editable={isEditing}
          />
        </View>

        {/* Other Fields */}
        {[
          { label: "Location", value: location, setValue: setLocation },
          { label: "Age", value: age, setValue: setAge },
          { label: "Landmark", value: landmark, setValue: setLandmark },
          { label: "Area", value: area, setValue: setArea },
          { label: "City", value: city, setValue: setCity },
          { label: "State", value: state, setValue: setState },
          { label: "Pincode", value: pincode, setValue: setPincode },
        ].map((field, index) => (
          <View key={index} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.setValue}
              editable={isEditing}
            />
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.editButton,
                { backgroundColor: "#d63230" },
              ]}
              onPress={async () => {
                setLoading(true);
                await handleLogout();
                setLoading(false);
              }}
            >
              <Text style={[styles.buttonText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headingContainer: {
    padding: 10,
  },
  headingContainerText: {
    fontSize: 35,
    fontWeight: "700",
    color: "#2b2d42",
  },
  profileHeader: {
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userName: {
    fontSize: 30,
    fontWeight: "600",
    color: "#2b2d42",
  },
  profileContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 16,
    color: "#2b2d42",
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#8d99ae",
    paddingVertical: 5,
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#4285F4",
  },
  saveButton: {
    backgroundColor: "#2b9348",
  },
  cancelButton: {
    backgroundColor: "#707070",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
