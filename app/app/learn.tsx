import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

// Mock data for AQI readings
const mockAQI = {
  current: 48,
  status: "Good",
  color: "#7ED321",
  timeUpdated: "10:30 AM",
  location: "Downtown Park",
  forecast: [
    { time: "12 PM", aqi: 52 },
    { time: "2 PM", aqi: 58 },
    { time: "4 PM", aqi: 62 },
    { time: "6 PM", aqi: 55 },
    { time: "8 PM", aqi: 50 },
  ],
};

// Mock user data
const userData = {
  name: "Alex",
  level: 12,
  points: 4850,
  nextLevel: 5000,
  badges: 18,
  streak: 7,
  avatar:
    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
};

// Challenge types with suggested activities based on AQI levels
const challenges = [
  {
    id: "1",
    title: "Air-Aware Walk",
    description: "Take a 30-minute walk during good air quality hours",
    points: 100,
    progress: 0.7,
    icon: "walk",
    unlocked: true,
    recommendedAQI: "Good to Moderate",
    timeToComplete: "2 days",
    difficulty: "Easy",
  },
  {
    id: "2",
    title: "Indoor Exercise Champion",
    description: "Complete 3 indoor workouts when AQI is Poor",
    points: 150,
    progress: 0.3,
    icon: "dumbbell",
    unlocked: true,
    recommendedAQI: "Poor to Unhealthy",
    timeToComplete: "1 week",
    difficulty: "Medium",
  },
  {
    id: "3",
    title: "Dawn Patrol",
    description: "Exercise outdoors before 8 AM when air quality is best",
    points: 200,
    progress: 0.0,
    icon: "sun",
    unlocked: true,
    recommendedAQI: "Good",
    timeToComplete: "3 days",
    difficulty: "Hard",
  },
  {
    id: "4",
    title: "Mask Master",
    description:
      "Use proper mask protection for 5 outdoor activities during poor air quality",
    points: 120,
    progress: 0.5,
    icon: "head-side-mask",
    unlocked: false,
    recommendedAQI: "Unhealthy",
    timeToComplete: "2 weeks",
    difficulty: "Medium",
  },
  {
    id: "5",
    title: "Forest Bathing",
    description: "Spend time in a forest or park area when AQI is Good",
    points: 180,
    progress: 0.1,
    icon: "tree",
    unlocked: true,
    recommendedAQI: "Good",
    timeToComplete: "1 week",
    difficulty: "Easy",
  },
];

// Achievements the user has unlocked
const achievements = [
  {
    id: "1",
    title: "AQI Guardian",
    description: "Check AQI readings daily for 10 days",
    icon: "shield-alt",
    date: "2 days ago",
  },
  {
    id: "2",
    title: "Health Planner",
    description: "Plan 5 activities based on AQI forecast",
    icon: "calendar-check",
    date: "1 week ago",
  },
  {
    id: "3",
    title: "Community Champion",
    description: "Share 3 AQI reports with your community",
    icon: "users",
    date: "Today",
  },
];

const { width } = Dimensions.get("window");

export default function Learn() {
  const [tabIndex, setTabIndex] = useState(0);
  const [breatheAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animation for the "breathe" circle
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnimation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnimation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Animation for breathing exercise circle
  const breatheScale = breatheAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const renderAQIStatus = () => {
    return (
      <View style={styles.aqiContainer}>
        <LinearGradient colors={["#F8F9FE", "#FFFFFF"]} style={styles.aqiCard}>
          <View style={styles.aqiHeader}>
            <Text style={styles.aqiTitle}>Current Air Quality</Text>
            <Text style={styles.aqiLocation}>
              <Ionicons name="location" size={16} color="#666" />{" "}
              {mockAQI.location}
            </Text>
          </View>

          <View style={styles.aqiInfoContainer}>
            <View style={styles.aqiIndexContainer}>
              <Text style={[styles.aqiIndex, { color: mockAQI.color }]}>
                {mockAQI.current}
              </Text>
              <Text style={[styles.aqiStatus, { color: mockAQI.color }]}>
                {mockAQI.status}
              </Text>
              <Text style={styles.aqiUpdated}>
                Updated at {mockAQI.timeUpdated}
              </Text>
            </View>

            <View style={styles.aqiRecommendation}>
              <Text style={styles.recommendationTitle}>
                Recommended Activity
              </Text>
              {mockAQI.current < 50 ? (
                <>
                  <View style={styles.activityBadge}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#7ED321"
                    />
                    <Text style={styles.activityName}>Outdoor Exercise</Text>
                  </View>
                  <Text style={styles.activityDescription}>
                    Great air quality! Perfect time for outdoor running,
                    cycling, or team sports.
                  </Text>
                </>
              ) : mockAQI.current < 100 ? (
                <>
                  <View style={styles.activityBadge}>
                    <Ionicons name="alert-circle" size={18} color="#F5A623" />
                    <Text style={styles.activityName}>Moderate Activity</Text>
                  </View>
                  <Text style={styles.activityDescription}>
                    Good for walking or light outdoor activity. Consider shorter
                    exercise duration.
                  </Text>
                </>
              ) : (
                <>
                  <View style={styles.activityBadge}>
                    <Ionicons name="close-circle" size={18} color="#D0021B" />
                    <Text style={styles.activityName}>Indoor Exercise</Text>
                  </View>
                  <Text style={styles.activityDescription}>
                    Poor air quality. Recommended to exercise indoors or
                    reschedule outdoor activities.
                  </Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.aqiForecast}>
            <Text style={styles.forecastTitle}>Today's Forecast</Text>
            <View style={styles.forecastContainer}>
              {mockAQI.forecast.map((item, index) => (
                <View key={index} style={styles.forecastItem}>
                  <Text style={styles.forecastTime}>{item.time}</Text>
                  <Text
                    style={[
                      styles.forecastAqi,
                      {
                        color:
                          item.aqi < 50
                            ? "#7ED321"
                            : item.aqi < 100
                              ? "#F5A623"
                              : "#D0021B",
                      },
                    ]}
                  >
                    {item.aqi}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const renderUserProgress = () => {
    return (
      <View style={styles.userProgressContainer}>
        <View style={styles.userHeader}>
          <Image source={{ uri: userData.avatar }} style={styles.userAvatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userLevel}>
              Health Guardian Level {userData.level}
            </Text>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${(userData.points / userData.nextLevel) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {userData.points} / {userData.nextLevel} XP to Level{" "}
              {userData.level + 1}
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="trophy" size={24} color="#F5A623" />
            <Text style={styles.statValue}>{userData.badges}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={24} color="#FF5A5F" />
            <Text style={styles.statValue}>{userData.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="leaf" size={24} color="#7ED321" />
            <Text style={styles.statValue}>
              {challenges.filter((c) => c.progress === 1).length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderChallenges = () => {
    return (
      <View style={styles.challengesContainer}>
        <Text style={styles.sectionTitle}>Today's Challenges</Text>
        <Text style={styles.sectionSubtitle}>
          Based on current air quality ({mockAQI.status})
        </Text>

        <FlatList
          data={challenges}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.challengeCard,
                !item.unlocked && styles.lockedChallenge,
              ]}
              disabled={!item.unlocked}
            >
              <View style={styles.challengeHeader}>
                <View style={styles.challengeIconContainer}>
                  <FontAwesome5 name={item.icon} size={20} color="white" />
                </View>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{item.title}</Text>
                  <Text style={styles.challengeDesc}>{item.description}</Text>
                </View>
                {!item.unlocked && (
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color="#999"
                    style={styles.lockIcon}
                  />
                )}
              </View>

              <View style={styles.challengeMeta}>
                <Text style={styles.challengeReward}>
                  +{item.points} points
                </Text>
                <Text style={styles.challengeAQI}>
                  Best when: {item.recommendedAQI}
                </Text>
              </View>

              <View style={styles.challengeProgressContainer}>
                <View
                  style={[
                    styles.challengeProgress,
                    { width: `${item.progress * 100}%` },
                  ]}
                />
              </View>

              <View style={styles.challengeFooter}>
                <Text style={styles.challengeTimeLeft}>
                  {item.timeToComplete} left
                </Text>
                <View style={styles.difficultyContainer}>
                  <Text style={styles.difficultyLabel}>
                    Difficulty: {item.difficulty}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.challengesList}
        />
      </View>
    );
  };

  const renderBreathingExercise = () => {
    return (
      <View style={styles.breathingContainer}>
        <Text style={styles.sectionTitle}>Breathing Exercise</Text>
        <Text style={styles.breathingDescription}>
          Take a moment to clear your lungs with this guided breathing exercise
        </Text>

        <View style={styles.breathingCircleContainer}>
          <Animated.View
            style={[
              styles.breathingCircle,
              { transform: [{ scale: breatheScale }] },
            ]}
          >
            <Text style={styles.breathingText}>Breathe</Text>
          </Animated.View>
        </View>

        <Text style={styles.breathingInstructions}>
          Breathe in as the circle expands, breathe out as it contracts
        </Text>

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start 2-Minute Session</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAchievements = () => {
    return (
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>

        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementCard}>
            <View style={styles.achievementIconContainer}>
              <FontAwesome5 name={achievement.icon} size={20} color="white" />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDesc}>
                {achievement.description}
              </Text>
              <Text style={styles.achievementDate}>
                Earned: {achievement.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>AirGuardian</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {renderAQIStatus()}
        {renderUserProgress()}
        {renderChallenges()}
        {renderBreathingExercise()}
        {renderAchievements()}

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setTabIndex(0)}>
          <Ionicons
            name={tabIndex === 0 ? "home" : "home-outline"}
            size={24}
            color={tabIndex === 0 ? "#5E72E4" : "#666"}
          />
          <Text
            style={[styles.tabLabel, tabIndex === 0 && styles.activeTabLabel]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setTabIndex(1)}>
          <Ionicons
            name={tabIndex === 1 ? "trophy" : "trophy-outline"}
            size={24}
            color={tabIndex === 1 ? "#5E72E4" : "#666"}
          />
          <Text
            style={[styles.tabLabel, tabIndex === 1 && styles.activeTabLabel]}
          >
            Challenges
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setTabIndex(2)}>
          <MaterialCommunityIcons
            name={tabIndex === 2 ? "map-marker" : "map-marker-outline"}
            size={24}
            color={tabIndex === 2 ? "#5E72E4" : "#666"}
          />
          <Text
            style={[styles.tabLabel, tabIndex === 2 && styles.activeTabLabel]}
          >
            Map
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setTabIndex(3)}>
          <Ionicons
            name={tabIndex === 3 ? "person" : "person-outline"}
            size={24}
            color={tabIndex === 3 ? "#5E72E4" : "#666"}
          />
          <Text
            style={[styles.tabLabel, tabIndex === 3 && styles.activeTabLabel]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FE",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#5E72E4",
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fe",
  },
  scrollView: {
    flex: 1,
  },
  aqiContainer: {
    padding: 16,
  },
  aqiCard: {
    borderRadius: 16,
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  aqiHeader: {
    marginBottom: 15,
  },
  aqiTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  aqiLocation: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  aqiInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  aqiIndexContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#f8f9fe",
    minWidth: 100,
  },
  aqiIndex: {
    fontSize: 36,
    fontWeight: "800",
  },
  aqiStatus: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  aqiUpdated: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  aqiRecommendation: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  activityBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  activityName: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 6,
    color: "#333",
  },
  activityDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  aqiForecast: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  forecastTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  forecastContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forecastItem: {
    alignItems: "center",
  },
  forecastTime: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },
  forecastAqi: {
    fontSize: 16,
    fontWeight: "600",
  },
  userProgressContainer: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#5E72E4",
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  userLevel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#5E72E4",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 15,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  challengesContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  challengesList: {
    paddingBottom: 10,
  },
  challengeCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  lockedChallenge: {
    opacity: 0.6,
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  challengeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#5E72E4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  challengeDesc: {
    fontSize: 13,
    color: "#666",
  },
  lockIcon: {
    marginLeft: 8,
  },
  challengeMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  challengeReward: {
    fontSize: 13,
    fontWeight: "600",
    color: "#F5A623",
  },
  challengeAQI: {
    fontSize: 12,
    color: "#666",
  },
  challengeProgressContainer: {
    height: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    marginTop: 15,
    marginBottom: 10,
  },
  challengeProgress: {
    height: 5,
    backgroundColor: "#5E72E4",
    borderRadius: 3,
  },
  challengeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  challengeTimeLeft: {
    fontSize: 12,
    color: "#666",
  },
  difficultyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  difficultyLabel: {
    fontSize: 12,
    color: "#666",
  },
  breathingContainer: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  breathingDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  breathingCircleContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 160,
    width: "100%",
    marginVertical: 20,
  },
  breathingCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#5E72E4",
    alignItems: "center",
    justifyContent: "center",
  },
  breathingText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  breathingInstructions: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#5E72E4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  startButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  achievementsContainer: {
    margin: 16,
  },
  achievementCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  achievementIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5A623",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  achievementDate: {
    fontSize: 12,
    color: "#999",
  },
  bottomPadding: {
    height: 100,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 12,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activeTabLabel: {
    color: "#5E72E4",
    fontWeight: "600",
  },
});
