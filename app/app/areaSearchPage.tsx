import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AreaSearchBar from "@/components/AreaSearchPage/AreaSearchBar";
import SearchResultsList from "@/components/AreaSearchPage/SearchResultsList";
import NoResults from "@/components/AreaSearchPage/NoResults";

type Location = {
  id: string;
  name: string;
  lat: string;
  lon: string;
};

export default function AreaSearchPage() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Location[]>([]);

  const handleQueryChange = async (newQuery: string) => {
    setQuery(newQuery);

    if (newQuery.length > 2) {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
            newQuery
          )}*&bias=proximity:73.8997,18.6771&limit=10&apiKey=6a171ff794724567a1f5b79a7f4a64b7`
        );
        const data = await response.json();

        const locations: Location[] = data.features.map((item: any) => ({
          id: item.properties.place_id.toString(),
          name: item.properties.formatted,
          lat: item.properties.lat,
          lon: item.properties.lon,
        }));

        setResults(locations);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setQuery(location.name);
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <AreaSearchBar
        onQueryChange={handleQueryChange}
        onLocationSelect={handleLocationSelect}
      />
      {results.length > 0 ? (
        <SearchResultsList results={results} onSelect={handleLocationSelect} />
      ) : (
        <NoResults />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 20,
    backgroundColor: "#F5F5F7",
  },
});
