import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapScreen from "./MapScreen";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// Define TypeScript interfaces
interface RouteOption {
  id: number;
  name: string;
  duration: string;
  distance: string;
  polyline: string; // Encoded polyline for the route path
}

interface Location {
  latitude: number;
  longitude: number;
  description: string;
}

interface MapScreenProps {
  fromLocation: Location | null;
  toLocation: Location | null;
  selectedRoute: RouteOption | null;
}

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const MapCard: React.FC = () => {
  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);
  const [fromText, setFromText] = useState<string>("");
  const [toText, setToText] = useState<string>("");
  const [showRouteOptions, setShowRouteOptions] = useState<boolean>(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);
  const [routeOptions, setRouteOptions] = useState<RouteOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fromInputRef = useRef<any>(null);
  const toInputRef = useRef<any>(null);

  // Function to fetch routes from Google Directions API
  const fetchRoutes = async (): Promise<void> => {
    if (!fromLocation || !toLocation) return;

    setIsLoading(true);

    try {
      const origin = `${fromLocation.latitude},${fromLocation.longitude}`;
      const destination = `${toLocation.latitude},${toLocation.longitude}`;

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&alternatives=true&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.routes && data.routes.length > 0) {
        const routes: RouteOption[] = data.routes.map(
          (route: any, index: number) => {
            const leg = route.legs[0];
            return {
              id: index + 1,
              name:
                index === 0 ? "Fastest Route" : `Alternative Route ${index}`,
              duration: leg.duration.text,
              distance: leg.distance.text,
              polyline: route.overview_polyline.points,
            };
          }
        );

        setRouteOptions(routes);
        setShowRouteOptions(true);
      } else {
        Alert.alert(
          "Error",
          "Could not find routes between the specified locations."
        );
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
      Alert.alert("Error", "Failed to fetch routes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchRoutes = (): void => {
    if (fromLocation && toLocation) {
      fetchRoutes();
    } else {
      Alert.alert(
        "Missing Location",
        "Please enter both starting point and destination."
      );
    }
  };

  const selectRoute = (route: RouteOption): void => {
    setSelectedRoute(route);
    setShowRouteOptions(false);
  };

  const clearFromLocation = (): void => {
    setFromLocation(null);
    setFromText("");
    if (fromInputRef.current) {
      fromInputRef.current.clear();
    }
  };

  const clearToLocation = (): void => {
    setToLocation(null);
    setToText("");
    if (toInputRef.current) {
      toInputRef.current.clear();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="location" size={24} color="#3e5c76" />
          <Text style={styles.headerText}>Route Planner</Text>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => {
            clearFromLocation();
            clearToLocation();
            setSelectedRoute(null);
            setShowRouteOptions(false);
          }}
        >
          <Ionicons name="refresh" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Route Input Section */}
      <View style={styles.routeInputContainer}>
        <View style={styles.autocompleteContainer}>
          <Ionicons
            name="radio-button-on"
            size={20}
            color="#2196F3"
            style={styles.inputIcon}
          />
          <GooglePlacesAutocomplete
            ref={fromInputRef}
            placeholder="From location"
            onPress={(data, details = null) => {
              if (details) {
                setFromLocation({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  description: data.description,
                });
                setFromText(data.description);
              }
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            fetchDetails={true}
            styles={{
              textInput: styles.autocompleteInput,
              container: {
                flex: 1,
              },
              listView: {
                position: "absolute",
                top: 45,
                left: 0,
                right: 0,
                backgroundColor: "white",
                borderRadius: 5,
                zIndex: 1000,
              },
            }}
            enablePoweredByContainer={false}
            textInputProps={{
              value: fromText,
              onChangeText: setFromText,
            }}
          />
          {fromText ? (
            <TouchableOpacity
              onPress={clearFromLocation}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.divider} />

        <View style={styles.autocompleteContainer}>
          <Ionicons
            name="location"
            size={20}
            color="#4CAF50"
            style={styles.inputIcon}
          />
          <GooglePlacesAutocomplete
            ref={toInputRef}
            placeholder="To location"
            onPress={(data, details = null) => {
              if (details) {
                setToLocation({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  description: data.description,
                });
                setToText(data.description);
              }
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            fetchDetails={true}
            styles={{
              textInput: styles.autocompleteInput,
              container: {
                flex: 1,
              },
              listView: {
                position: "absolute",
                top: 45,
                left: 0,
                right: 0,
                backgroundColor: "white",
                borderRadius: 5,
                zIndex: 1000,
              },
            }}
            enablePoweredByContainer={false}
            textInputProps={{
              value: toText,
              onChangeText: setToText,
            }}
          />
          {toText ? (
            <TouchableOpacity
              onPress={clearToLocation}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={[
            styles.searchButton,
            (isLoading || !fromLocation || !toLocation) &&
              styles.searchButtonDisabled,
          ]}
          onPress={handleSearchRoutes}
          disabled={isLoading || !fromLocation || !toLocation}
        >
          {isLoading ? (
            <Text style={styles.searchButtonText}>Loading...</Text>
          ) : (
            <>
              <Ionicons name="search" size={20} color="white" />
              <Text style={styles.searchButtonText}>Find Routes</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Route Options */}
      {showRouteOptions && routeOptions.length > 0 && (
        <ScrollView style={styles.routeOptionsContainer}>
          {routeOptions.map((route) => (
            <TouchableOpacity
              key={route.id}
              style={styles.routeOption}
              onPress={() => selectRoute(route)}
            >
              <View style={styles.routeOptionLeft}>
                <Ionicons name="navigate" size={18} color="#3e5c76" />
                <Text style={styles.routeName}>{route.name}</Text>
              </View>
              <View style={styles.routeOptionRight}>
                <Text style={styles.routeDetail}>{route.duration}</Text>
                <Text style={styles.routeDetail}>{route.distance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Selected Route Info */}
      {selectedRoute && !showRouteOptions && (
        <View style={styles.selectedRouteInfo}>
          <View style={styles.selectedRouteHeader}>
            <Text style={styles.selectedRouteTitle}>{selectedRoute.name}</Text>
            <TouchableOpacity onPress={() => setShowRouteOptions(true)}>
              <Text style={styles.changeRouteText}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.routeDetails}>
            <View style={styles.routeDetailItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text>{selectedRoute.duration}</Text>
            </View>
            <View style={styles.routeDetailItem}>
              <Ionicons name="resize-outline" size={16} color="#666" />
              <Text>{selectedRoute.distance}</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.mapContainer}>
        <MapScreen
          fromLocation={fromLocation}
          toLocation={toLocation}
          selectedRoute={selectedRoute}
        />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.viewMapButton}>
          <Ionicons name="map" size={20} color="white" />
          <Text style={styles.viewMapText}>View Full Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.directionButton,
            !selectedRoute && styles.directionButtonDisabled,
          ]}
          disabled={!selectedRoute}
        >
          <Ionicons name="navigate-circle" size={20} color="white" />
          <Text style={styles.directionText}>Start Navigation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    backgroundColor: "#F5F5F7",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#edf2f4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  refreshButton: {
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  routeInputContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    zIndex: 2,
  },
  autocompleteContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 999,
    paddingVertical: 8,
    position: "relative",
  },
  inputIcon: {
    marginRight: 12,
  },
  autocompleteInput: {
    height: 40,
    color: "#333",
    fontSize: 16,
    backgroundColor: "transparent",
  },
  clearButton: {
    position: "absolute",
    right: 5,
    zIndex: 1001,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginLeft: 28,
    marginVertical: 4,
  },
  searchButton: {
    backgroundColor: "#3e5c76",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 12,
    gap: 8,
    zIndex: 1,
  },
  searchButtonDisabled: {
    backgroundColor: "#a0a0a0",
  },
  searchButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  routeOptionsContainer: {
    maxHeight: 150,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  routeOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  routeOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  routeName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  routeOptionRight: {
    flexDirection: "row",
    gap: 12,
  },
  routeDetail: {
    fontSize: 14,
    color: "#666",
  },
  selectedRouteInfo: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f0f7ff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d0e1ff",
  },
  selectedRouteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedRouteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  changeRouteText: {
    fontSize: 14,
    color: "#2196F3",
    fontWeight: "500",
  },
  routeDetails: {
    flexDirection: "row",
    gap: 16,
  },
  routeDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  mapContainer: {
    height: 300,
    borderRadius: 1,
    overflow: "hidden",
    position: "relative",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    margin: 16,
  },
  viewMapButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  viewMapText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  directionButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  directionButtonDisabled: {
    backgroundColor: "#a5d6a7",
  },
  directionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default MapCard;
