import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Tabs, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LocationProvider } from "@/contexts/LocationContexts";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    background: "#f8f9fa",
    card: "rgba(255, 255, 255, 0.9)",
    text: "#2c3e50",
    border: "rgba(0, 0, 0, 0.05)",
    notification: "#e74c3c",
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#3498db",
    background: "#121212",
    card: "rgba(30, 30, 30, 0.8)",
    text: "#ecf0f1",
    border: "rgba(255, 255, 255, 0.1)",
    notification: "#e74c3c",
  },
};

const AUTH_ROUTES = ["/login"];

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? CustomDarkTheme : CustomLightTheme;
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const tabBarOpacity = useSharedValue(isAuthRoute ? 0 : 1);

  useEffect(() => {
    tabBarOpacity.value = withSpring(isAuthRoute ? 0 : 1, { damping: 20 });
  }, [pathname]);

  const animatedTabBarStyle = useAnimatedStyle(() => ({
    opacity: tabBarOpacity.value,
    transform: [{ translateY: withSpring(isAuthRoute ? 20 : 0) }],
  }));

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (isAuthRoute) {
    return (
      <LocationProvider>
        <ThemeProvider value={theme}>
          <Slot />
          <StatusBar style={isDark ? "light" : "dark"} />
        </ThemeProvider>
      </LocationProvider>
    );
  }

  return (
    <LocationProvider>
      <ThemeProvider value={theme}>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
              let iconName;
              if (route.name === "index")
                iconName = focused ? "home" : "home-outline";
              else if (route.name === "mappage")
                iconName = focused ? "map" : "map-outline";
              return (
                <View style={styles.iconContainer}>
                  <Ionicons name={iconName} size={size} color={color} />
                </View>
              );
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: isDark ? "white" : "rgba(0,0,0,0.5)",
            headerShown: false,
            tabBarStyle: [styles.tabBar, animatedTabBarStyle],
            tabBarItemStyle: styles.tabBarItem,
            tabBarShowLabel: true,
            tabBarHideOnKeyboard: true,
          })}
        >
          <Tabs.Screen name="index" options={{ title: "Home" }} />
          <Tabs.Screen
            name="mappage"
            options={{ title: "Map", tabBarStyle: { display: "none" } }}
          />
        </Tabs>
        <StatusBar style={isDark ? "light" : "dark"} />
      </ThemeProvider>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 70,
    bottom: 5,
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#0b2027",
    borderTopWidth: 0,
  },
  tabBarItem: {
    paddingTop: 8,
    height: 70,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
