import HealthDetailShowcase from "@/components/Profile/HealthDetailsShowcase";
import UserProfile from "@/components/Profile/UserProfile";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function profile() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <UserProfile />
        <HealthDetailShowcase />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 70,
    backgroundColor: "#ffffff",
  },
});
