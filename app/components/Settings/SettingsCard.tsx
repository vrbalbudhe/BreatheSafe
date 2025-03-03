import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Types for our settings
interface SettingsProps {
  navigation?: any;
}

interface NotificationSettings {
  airQualityAlerts: boolean;
  dailyForecast: boolean;
  severeWeatherAlerts: boolean;
}

interface DisplaySettings {
  darkMode: boolean;
  useMetric: boolean;
  showAQIColors: boolean;
}

const SettingsCard: React.FC<SettingsProps> = ({ navigation }) => {
  // State for notifications
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      airQualityAlerts: true,
      dailyForecast: false,
      severeWeatherAlerts: true,
    });

  // State for display settings
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    darkMode: false,
    useMetric: true,
    showAQIColors: true,
  });

  // Toggle handler for notification settings
  const toggleNotificationSetting = (setting: keyof NotificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Toggle handler for display settings
  const toggleDisplaySetting = (setting: keyof DisplaySettings) => {
    setDisplaySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Handler for logging out
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => console.log("User logged out") },
    ]);
  };

  // Handler for clearing data
  const handleClearData = () => {
    Alert.alert(
      "Clear App Data",
      "This will clear all saved locations and preferences. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear Data",
          style: "destructive",
          onPress: () => console.log("Data cleared"),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Air Quality Alerts</Text>
            <Text style={styles.settingDescription}>
              Get notified when air quality becomes unhealthy
            </Text>
          </View>
          <Switch
            value={notificationSettings.airQualityAlerts}
            onValueChange={() => toggleNotificationSetting("airQualityAlerts")}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={
              Platform.OS === "ios"
                ? undefined
                : notificationSettings.airQualityAlerts
                  ? "#f4f3f4"
                  : "#f4f3f4"
            }
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Daily Forecast</Text>
            <Text style={styles.settingDescription}>
              Receive daily weather forecasts
            </Text>
          </View>
          <Switch
            value={notificationSettings.dailyForecast}
            onValueChange={() => toggleNotificationSetting("dailyForecast")}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={
              Platform.OS === "ios"
                ? undefined
                : notificationSettings.dailyForecast
                  ? "#f4f3f4"
                  : "#f4f3f4"
            }
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Severe Weather Alerts</Text>
            <Text style={styles.settingDescription}>
              Be alerted of severe weather conditions
            </Text>
          </View>
          <Switch
            value={notificationSettings.severeWeatherAlerts}
            onValueChange={() =>
              toggleNotificationSetting("severeWeatherAlerts")
            }
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={
              Platform.OS === "ios"
                ? undefined
                : notificationSettings.severeWeatherAlerts
                  ? "#f4f3f4"
                  : "#f4f3f4"
            }
          />
        </View>
      </View>

      {/* Display Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Dark Mode</Text>
            <Text style={styles.settingDescription}>
              Use dark theme throughout the app
            </Text>
          </View>
          <Switch
            value={displaySettings.darkMode}
            onValueChange={() => toggleDisplaySetting("darkMode")}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={
              Platform.OS === "ios"
                ? undefined
                : displaySettings.darkMode
                  ? "#f4f3f4"
                  : "#f4f3f4"
            }
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Metric Units</Text>
            <Text style={styles.settingDescription}>
              Use Celsius instead of Fahrenheit
            </Text>
          </View>
          <Switch
            value={displaySettings.useMetric}
            onValueChange={() => toggleDisplaySetting("useMetric")}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={
              Platform.OS === "ios"
                ? undefined
                : displaySettings.useMetric
                  ? "#f4f3f4"
                  : "#f4f3f4"
            }
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>AQI Color Indicators</Text>
            <Text style={styles.settingDescription}>
              Show color-coded air quality indicators
            </Text>
          </View>
          <Switch
            value={displaySettings.showAQIColors}
            onValueChange={() => toggleDisplaySetting("showAQIColors")}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={
              Platform.OS === "ios"
                ? undefined
                : displaySettings.showAQIColors
                  ? "#f4f3f4"
                  : "#f4f3f4"
            }
          />
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.buttonRow}
          onPress={() => navigation?.navigate("Profile")}
        >
          <View style={styles.buttonTextContainer}>
            <Ionicons name="person-outline" size={22} color="#333" />
            <Text style={styles.buttonText}>Profile Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRow}
          onPress={() => navigation?.navigate("Subscription")}
        >
          <View style={styles.buttonTextContainer}>
            <Ionicons name="star-outline" size={22} color="#333" />
            <Text style={styles.buttonText}>Premium Subscription</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, styles.dangerSection]}>
        <Text style={styles.sectionTitle}>Danger Zone</Text>

        <TouchableOpacity
          style={styles.dangerButtonRow}
          onPress={handleClearData}
        >
          <View style={styles.buttonTextContainer}>
            <Ionicons name="trash-outline" size={22} color="#E53935" />
            <Text style={styles.dangerButtonText}>Clear App Data</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dangerButtonRow, styles.lastItem]}
          onPress={handleLogout}
        >
          <View style={styles.buttonTextContainer}>
            <Ionicons name="log-out-outline" size={22} color="#E53935" />
            <Text style={styles.dangerButtonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>BreathSafe v1.0.2</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    marginTop: 14,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#edf2f4",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingInfo: {
    flex: 1,
    paddingRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  buttonTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  dangerSection: {
    marginBottom: 20,
  },
  dangerButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dangerButtonText: {
    fontSize: 16,
    color: "#E53935",
    marginLeft: 12,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  footer: {
    padding: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  version: {
    fontSize: 14,
    color: "#999",
  },
});

export default SettingsCard;
