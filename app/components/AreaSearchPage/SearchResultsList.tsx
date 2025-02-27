import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

type Location = {
  id: number;
  name: string;
};

type SearchResultsListProps = {
  results: Location[];
  onSelect: (location: Location) => void;
};

const SearchResultsList: React.FC<SearchResultsListProps> = ({
  results,
  onSelect,
}) => {
  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 18,
  },
});

export default SearchResultsList;
