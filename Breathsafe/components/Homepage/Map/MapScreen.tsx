import { useLocation } from "@/contexts/LocationContexts";
import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const { location } = useLocation();

  return (
    <MapView
      style={{ flex: 1, width: "100%", height: "100%" }}
      region={{
        latitude: location?.latitude || 18.6709198,
        longitude: location?.longitude || 73.8909215,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {location && (
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      )}
    </MapView>
  );
}
