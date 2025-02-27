import RegisterForm from "@/components/Auth/RegisterForm";
import AppShowcase from "@/components/Homepage/Information/AppShowcase";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function registerpage() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <RegisterForm />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
  },
});
