import LoginPage from "@/Screens/Auth/LoginForm";
import { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export default function auth() {
  const { width } = Dimensions.get("screen");

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: width,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 20,
          backgroundColor: "#ffffff",
        },
      }),
    [width]
  );

  return (
    <View style={styles.container}>
      <LoginPage />
    </View>
  );
}
