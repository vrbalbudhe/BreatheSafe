import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type SearchHistoryProps = {
  history: string[];
  onSelect: (item: string) => void;
};

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Searches</Text>
      {history.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => onSelect(item)}>
          <Text style={styles.item}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SearchHistory;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  item: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
