import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

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

// Function to decode Google's encoded polyline format
const decodePolyline = (encoded: string) => {
  const poly = [];
  let index = 0,
    lat = 0,
    lng = 0;

  while (index < encoded.length) {
    let b,
      shift = 0,
      result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    poly.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }

  return poly;
};

const MapScreen: React.FC<MapScreenProps> = ({
  fromLocation,
  toLocation,
  selectedRoute,
}) => {
  // Default region (can be updated to user's current location)
  const defaultRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Calculate map region based on from and to locations
  const getMapRegion = () => {
    if (fromLocation && toLocation) {
      const minLat = Math.min(fromLocation.latitude, toLocation.latitude);
      const maxLat = Math.max(fromLocation.latitude, toLocation.latitude);
      const minLng = Math.min(fromLocation.longitude, toLocation.longitude);
      const maxLng = Math.max(fromLocation.longitude, toLocation.longitude);

      // Add padding
      const latPadding = (maxLat - minLat) * 0.2;
      const lngPadding = (maxLng - minLng) * 0.2;

      return {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: maxLat - minLat + latPadding * 2,
        longitudeDelta: maxLng - minLng + lngPadding * 2,
      };
    }

    // If only one location is available
    if (fromLocation) {
      return {
        ...defaultRegion,
        latitude: fromLocation.latitude,
        longitude: fromLocation.longitude,
      };
    }

    if (toLocation) {
      return {
        ...defaultRegion,
        latitude: toLocation.latitude,
        longitude: toLocation.longitude,
      };
    }

    return defaultRegion;
  };

  // Get coordinates for the polyline
  const getRouteCoordinates = () => {
    if (selectedRoute && selectedRoute.polyline) {
      return decodePolyline(selectedRoute.polyline);
    }
    return [];
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={getMapRegion()}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {fromLocation && (
          <Marker
            coordinate={{
              latitude: fromLocation.latitude,
              longitude: fromLocation.longitude,
            }}
            title="Start"
            description={fromLocation.description}
            pinColor="#2196F3"
          />
        )}

        {toLocation && (
          <Marker
            coordinate={{
              latitude: toLocation.latitude,
              longitude: toLocation.longitude,
            }}
            title="Destination"
            description={toLocation.description}
            pinColor="#4CAF50"
          />
        )}

        {selectedRoute && (
          <Polyline
            coordinates={getRouteCoordinates()}
            strokeWidth={4}
            strokeColor="#3e5c76"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
