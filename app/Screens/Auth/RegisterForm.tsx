import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const { user, setUser, refreshUser, setLoading } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
  });

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if all fields are filled
    for (const key in formData) {
      if (!formData[key as keyof FormData]) {
        alert(`Please fill in the ${key}`);
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://192.168.0.101:8000/api/Auth/signup",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setLoading(true);
        await refreshUser();
        setTimeout(() => {
          setLoading(false);
          router.replace("/loginpage");
        }, 3000);
      }

      console.log("Form submitted successfully:", response.data);
    } catch (error: any) {
      console.error("Error submitting form:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to register");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Register</Text>

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter first name"
                value={formData.firstName}
                onChangeText={(value) => handleChange("firstName", value)}
              />
            </View>

            <View style={styles.inputHalf}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter last name"
                value={formData.lastName}
                onChangeText={(value) => handleChange("lastName", value)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter gender"
              value={formData.gender}
              onChangeText={(value) => handleChange("gender", value)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15 }}>
              Already have an account?
              <Pressable onPress={() => router.push("/loginpage")}>
                <Text style={{ fontWeight: "800", color: "#3f8efc" }}>
                  {" "}
                  Login
                </Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "white",
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "800",
    color: "#333",
    textAlign: "left",
    marginBottom: 35,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputHalf: {
    width: "48%",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  uniqueTag: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#4a90e2",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
