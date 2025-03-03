import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

const LOCATION_TASK_NAME = "background-location-task";

// Corrected interface to match TaskManager's expected type
interface LocationTaskBody {
  data?: { locations: Location.LocationObject[] };
  error?: TaskManager.TaskManagerError | null;
}

// Define the background location task
TaskManager.defineTask(
  LOCATION_TASK_NAME,
  async ({ data, error }: LocationTaskBody) => {
    if (error) {
      console.error("Background location error:", error);
      return;
    }
    if (data?.locations) {
      console.log("Background location update:", data.locations);
    }
  }
);

export const startBackgroundLocation = async (): Promise<void> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permission denied! Allow location access in settings.");
    return;
  }

  const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
  if (backgroundStatus.status !== "granted") {
    alert("Background location access denied! Enable it in settings.");
    return;
  }

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: 5000, // Every 5 seconds
    distanceInterval: 5, // Every 5 meters
    foregroundService: {
      notificationTitle: "Location Tracking",
      notificationBody: "Tracking your location in background.",
    },
  });
};

export const stopBackgroundLocation = async (): Promise<void> => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  console.log("Background location tracking stopped.");
};
