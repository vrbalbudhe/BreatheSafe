import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Svg, Path, Circle } from "react-native-svg";

// Define types
type AQICategory = {
  name: string;
  color: string;
  icon: string;
};

type RecommendationItem = {
  name: string;
  icon: string;
  description: string;
};

type Recommendations = {
  activities: RecommendationItem[];
  health: RecommendationItem[];
};

type AQIData = {
  value: number;
  category: AQICategory;
  recommendations: Recommendations;
};

interface AQIRecommendationsCardProps {
  aqi?: number;
}

const AQIRecommendationsCard: React.FC<AQIRecommendationsCardProps> = ({
  aqi = 75,
}) => {
  // State with proper types
  const [loading, setLoading] = useState<boolean>(true);
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [activeTab, setActiveTab] = useState<"activities" | "health">(
    "activities"
  );
  const scaleAnim = useState<Animated.Value>(new Animated.Value(0.95))[0];

  // Simulate API call
  useEffect(() => {
    // This would be your actual API call
    const fetchAQIData = async (): Promise<void> => {
      try {
        // Simulate network request
        setTimeout(() => {
          setAqiData({
            value: aqi,
            category: getAQICategory(aqi),
            recommendations: getRecommendations(getAQICategory(aqi).name),
          });
          setLoading(false);

          // Animate card appearance
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }, 1500);
      } catch (error) {
        console.error("Error fetching AQI data:", error);
        setLoading(false);
      }
    };

    fetchAQIData();
  }, [aqi]);

  const getAQICategory = (value: number): AQICategory => {
    if (value <= 50) return { name: "Good", color: "#10B981", icon: "happy" };
    if (value <= 100)
      return { name: "Moderate", color: "#F59E0B", icon: "neutral" };
    if (value <= 150)
      return {
        name: "Unhealthy for Sensitive Groups",
        color: "#F97316",
        icon: "mask",
      };
    if (value <= 200)
      return { name: "Unhealthy", color: "#EF4444", icon: "mask" };
    if (value <= 300)
      return { name: "Very Unhealthy", color: "#9333EA", icon: "warning" };
    return { name: "Hazardous", color: "#7F1D1D", icon: "hazard" };
  };

  const getRecommendations = (category: string): Recommendations => {
    switch (category) {
      case "Good":
        return {
          activities: [
            {
              name: "Outdoor Sports",
              icon: "run",
              description: "All outdoor activities are safe",
            },
            {
              name: "Picnics & Parks",
              icon: "tree",
              description: "Enjoy parks and outdoor dining",
            },
            {
              name: "Cycling",
              icon: "bike",
              description: "Excellent air for cycling",
            },
            {
              name: "Gardening",
              icon: "plant",
              description: "Great day for garden work",
            },
          ],
          health: [
            {
              name: "No Restrictions",
              icon: "check",
              description: "Air quality is satisfactory",
            },
            {
              name: "Open Windows",
              icon: "window",
              description: "Let in fresh air",
            },
          ],
        };
      case "Moderate":
        return {
          activities: [
            {
              name: "Light Exercise",
              icon: "walk",
              description: "Moderate outdoor exercise is fine",
            },
            {
              name: "Limited Sports",
              icon: "run",
              description: "Take breaks during intense activities",
            },
            {
              name: "Brief Outdoor Time",
              icon: "clock",
              description: "Consider limiting extended exposure",
            },
          ],
          health: [
            {
              name: "Stay Hydrated",
              icon: "water",
              description: "Drink plenty of water",
            },
            {
              name: "Monitor Symptoms",
              icon: "heart",
              description: "Watch for respiratory issues if sensitive",
            },
            {
              name: "Plan Indoor Alternatives",
              icon: "home",
              description: "Have backup indoor options",
            },
          ],
        };
      case "Unhealthy for Sensitive Groups":
        return {
          activities: [
            {
              name: "Essential Outdoors Only",
              icon: "warning",
              description: "Limit unnecessary outdoor activities",
            },
            {
              name: "Short Duration",
              icon: "clock",
              description: "Keep outdoor time brief",
            },
            {
              name: "Indoor Exercise",
              icon: "home",
              description: "Consider moving workouts indoors",
            },
          ],
          health: [
            {
              name: "Use Masks",
              icon: "mask",
              description: "N95 masks recommended for sensitive groups",
            },
            {
              name: "Keep Medications Ready",
              icon: "pill",
              description: "Have asthma/allergy medication available",
            },
            {
              name: "Air Purifiers",
              icon: "purifier",
              description: "Run air purifiers indoors",
            },
          ],
        };
      case "Unhealthy":
        return {
          activities: [
            {
              name: "Stay Indoors",
              icon: "home",
              description: "Avoid unnecessary outdoor activities",
            },
            {
              name: "Essential Trips Only",
              icon: "warning",
              description: "Quick errands only",
            },
            {
              name: "Brief Pet Walks",
              icon: "pet",
              description: "Keep pet exercise very short",
            },
          ],
          health: [
            {
              name: "Wear N95 Masks",
              icon: "mask",
              description: "Use proper masks when outdoors",
            },
            {
              name: "Keep Windows Closed",
              icon: "window",
              description: "Keep outdoor air out",
            },
            {
              name: "Use Air Purifiers",
              icon: "purifier",
              description: "Run air purifiers on high",
            },
            {
              name: "Avoid Exertion",
              icon: "warning",
              description: "Avoid physical exertion outdoors",
            },
          ],
        };
      case "Very Unhealthy":
        return {
          activities: [
            {
              name: "Indoor Only",
              icon: "home",
              description: "Remain indoors if possible",
            },
            {
              name: "Emergency Trips Only",
              icon: "warning",
              description: "Only go out if absolutely necessary",
            },
          ],
          health: [
            {
              name: "Serious Health Risk",
              icon: "warning",
              description: "Air quality poses health risks",
            },
            {
              name: "Create Clean Room",
              icon: "home",
              description: "Designate one room with air purification",
            },
            {
              name: "N95 Masks Required",
              icon: "mask",
              description: "Always wear masks outdoors",
            },
            {
              name: "Check On Others",
              icon: "heart",
              description: "Check on vulnerable people",
            },
          ],
        };
      case "Hazardous":
        return {
          activities: [
            {
              name: "Avoid All Outdoors",
              icon: "prohibited",
              description: "Do not go outside if possible",
            },
            {
              name: "Emergency Only",
              icon: "warning",
              description: "Only for absolute emergencies",
            },
          ],
          health: [
            {
              name: "Extreme Health Risk",
              icon: "warning",
              description: "Dangerous for everyone",
            },
            {
              name: "Evacuate If Advised",
              icon: "evacuate",
              description: "Follow evacuation orders",
            },
            {
              name: "Seal Home",
              icon: "home",
              description: "Seal doors/windows with tape if needed",
            },
            {
              name: "N95 Required",
              icon: "mask",
              description: "Proper masks mandatory if going outside",
            },
            {
              name: "Medical Alert",
              icon: "medical",
              description: "Seek medical help if symptoms develop",
            },
          ],
        };
      default:
        return { activities: [], health: [] };
    }
  };

  // Render icon based on name
  const renderIcon = (iconName: string, color: string): React.ReactNode => {
    switch (iconName) {
      case "happy":
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
            <Path
              d="M8 14s1.5 2 4 2 4-2 4-2"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Circle cx="9" cy="9" r="1" fill={color} />
            <Circle cx="15" cy="9" r="1" fill={color} />
          </Svg>
        );
      case "neutral":
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
            <Path
              d="M8 14h8"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Circle cx="9" cy="9" r="1" fill={color} />
            <Circle cx="15" cy="9" r="1" fill={color} />
          </Svg>
        );
      case "mask":
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M5.2 8C5.2 8 9 9 12 9C15 9 18.8 8 18.8 8C19.9598 8 20.9 8.94018 20.9 10.1V16C20.9 17.1598 19.9598 18.1 18.8 18.1C18.8 18.1 16 17 12 17C8 17 5.2 18.1 5.2 18.1C4.04018 18.1 3.1 17.1598 3.1 16V10.1C3.1 8.94018 4.04018 8 5.2 8Z"
              stroke={color}
              strokeWidth="2"
            />
            <Path d="M12 9V17" stroke={color} strokeWidth="2" />
          </Svg>
        );
      case "warning":
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 8V12M12 16H12.01M4.98207 19H19.0179C20.5615 19 21.5233 17.3256 20.7455 16L13.7276 4C12.9498 2.67441 11.0502 2.67441 10.2724 4L3.25452 16C2.47675 17.3256 3.43849 19 4.98207 19Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case "hazard":
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56998 17.3333 3.53223 19 5.07183 19Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={color}
              fillOpacity="0.3"
            />
          </Svg>
        );
      case "run":
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="5" r="2" stroke={color} strokeWidth="2" />
            <Path
              d="M10 22L9 17L15 13L13 8L14 7"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M15 7L18 9"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M9 17L5 18"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M14 18L17 21"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      default:
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
            <Path
              d="M12 8V16"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Path
              d="M16 12L8 12"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </Svg>
        );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Fetching air quality data...</Text>
      </View>
    );
  }

  if (!aqiData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load AQI data</Text>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          // borderColor: aqiData.category.color,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View
        style={[styles.header, { backgroundColor: aqiData.category.color }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.aqiValue}>
            <Text style={styles.aqiNumber}>{aqiData.value}</Text>
            <Text style={styles.aqiLabel}>AQI</Text>
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.title}>Air Quality Status</Text>
            <Text style={styles.category}>{aqiData.category.name}</Text>
            <View style={styles.iconContainer}>
              {renderIcon(aqiData.category.icon, "#FFFFFF")}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "activities" && {
              borderBottomColor: aqiData.category.color,
            },
          ]}
          onPress={() => setActiveTab("activities")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "activities" && { color: aqiData.category.color },
            ]}
          >
            Activities
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "health" && {
              borderBottomColor: aqiData.category.color,
            },
          ]}
          onPress={() => setActiveTab("health")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "health" && { color: aqiData.category.color },
            ]}
          >
            Health Tips
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.recommendations}>
        {aqiData.recommendations[activeTab].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendationItem}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconBox,
                { backgroundColor: aqiData.category.color + "20" },
              ]}
            >
              {renderIcon(item.icon, aqiData.category.color)}
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>{item.name}</Text>
              <Text style={styles.recommendationDescription}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    height: 200,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6B7280",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    height: 100,
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
  },
  container: {
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#edf2f4",
  },
  header: {
    padding: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  aqiValue: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  aqiNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  aqiLabel: {
    fontSize: 12,
    color: "white",
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
  },
  recommendations: {
    padding: 16,
    maxHeight: 300,
  },
  recommendationItem: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  recommendationDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default AQIRecommendationsCard;
