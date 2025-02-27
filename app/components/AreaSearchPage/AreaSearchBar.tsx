import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Search } from "lucide-react-native";

interface LocationResult {
  id: string;
  name: string;
  type: string;
  lat: string;
  lon: string;
}

interface AreaSearchBarProps {
  onLocationSelect: (location: LocationResult) => void;
  onQueryChange?: (query: string) => void;
}

export default function AreaSearchBar({
  onLocationSelect,
  onQueryChange,
}: AreaSearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchLocations = async (searchQuery: string): Promise<void> => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(searchQuery)}&format=jsonv2&limit=5`
      );
      const data = await response.json();

      const formattedResults: LocationResult[] = data.map((item: any) => ({
        id: item.place_id.toString(),
        name: item.display_name,
        type: item.type,
        lat: item.lat,
        lon: item.lon,
      }));

      setResults(formattedResults);
    } catch (error) {
      // console.error("Error fetching location data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        searchLocations(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchBar}>
        <Search size={18} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search for cities, places, or areas..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (onQueryChange) onQueryChange(text);
          }}
        />
      </View>

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator
          size="small"
          color="#007bff"
          style={styles.loading}
        />
      )}

      {/* Results List */}
      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => onLocationSelect(item)}
            >
              <View>
                <Text style={styles.resultText}>{item.name}</Text>
                <Text style={styles.resultSubText}>
                  {item.type} • Lat: {item.lat}, Lon: {item.lon}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  loading: {
    marginTop: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultSubText: {
    fontSize: 14,
    color: "#666",
    textTransform: "capitalize",
  },
});
