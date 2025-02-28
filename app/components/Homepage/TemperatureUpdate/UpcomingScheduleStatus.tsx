import { StyleSheet, View } from "react-native";
import UpcomingSchedule from "./UpcomingSchedule";

export default function UpcomingScheduleStatus() {
  return (
    <View style={styles.container}>
      <UpcomingSchedule />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    maxWidth: 400,
    marginBottom: 5,
    borderRadius: 30,
    backgroundColor: "white",
    width: "100%",
    borderWidth: 2,
    borderColor: "#edf2f4",
  },
});
