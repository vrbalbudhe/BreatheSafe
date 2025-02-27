import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import { Animated } from "react-native";
import * as Location from "expo-location";

interface LocationContextType {
  location: Location.LocationObjectCoords | null;
  place: string | null;
  distance: number | null;
  speed: number | null;
  isMoving: boolean;
  getLocation: () => Promise<void>;
  rotation: Animated.Value;
}

const LocationContexts = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getLocation();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      getLocation();
    }, 120000);

    return () => clearInterval(interval);
  }, [location]);

  // Converts degrees to radians
  const toRad = (value: number) => (value * Math.PI) / 180;

  // Haversine formula to calculate distance
  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied! Allow location access in settings.");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    const newCoords = currentLocation.coords;

    // Calculate distance from last known location
    if (location) {
      const dist = getDistance(
        location.latitude,
        location.longitude,
        newCoords.latitude,
        newCoords.longitude
      );
      setDistance(dist);
    }

    // Convert speed from m/s to km/h
    const currentSpeed = newCoords.speed ? newCoords.speed * 3.6 : 0;
    const accuracy = newCoords.accuracy ?? 9999;

    setSpeed(currentSpeed);
    setIsMoving(currentSpeed > 0 && accuracy < 10);

    setLocation(newCoords);
    rotateIcon();
    getPlaceName(newCoords.latitude, newCoords.longitude);
  };

  // Reverse geocoding to get place name
  const getPlaceName = async (latitude: number, longitude: number) => {
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocode.length > 0) {
      const { city, region, country, street } = reverseGeocode[0];
      setPlace(
        `${street === null ? "" : street} ${street === null ? "" : ","} ${city}, ${region}, ${country}`
      );
    } else {
      setPlace("Location not found");
    }
  };

  const rotateIcon = () => {
    Animated.timing(rotation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0);
    });
  };

  return (
    <LocationContexts.Provider
      value={{
        location,
        place,
        distance,
        speed,
        isMoving,
        getLocation,
        rotation,
      }}
    >
      {children}
    </LocationContexts.Provider>
  );
};

// Custom Hook for using LocationContext
export const useLocation = () => {
  const context = useContext(LocationContexts);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
