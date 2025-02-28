import NewsApiFetch from "@/components/News/NewsApiFetch";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function News() {
  return (
    <View style={style.container}>
      <NewsApiFetch />
    </View>
  );
}
// 6b56dc35d2bb4b08b7802d54fe7c251e
const style = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingTop: 30,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: "#F5F5F7",
  },
  titleContainer: {},
});
