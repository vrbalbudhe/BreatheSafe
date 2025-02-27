import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoResults = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No results found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
});

export default NoResults;
