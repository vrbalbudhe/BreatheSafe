import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface HealthIssue {
  id: string;
  name: string;
  description: string;
}

export default function HealthDetailShowcase(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState<HealthIssue[]>([]);

  const healthIssues: HealthIssue[] = [
    { id: "1", name: "Asthma", description: "Exacerbation of asthma symptoms" },
    {
      id: "2",
      name: "COPD",
      description: "Worsening of chronic obstructive pulmonary disease",
    },
    { id: "3", name: "Allergies", description: "Increased allergic reactions" },
    {
      id: "4",
      name: "Respiratory Infections",
      description: "Higher risk of respiratory infections",
    },
    {
      id: "5",
      name: "Heart Disease",
      description: "Aggravation of existing heart conditions",
    },
    {
      id: "6",
      name: "Eye Irritation",
      description: "Redness, itching, and discomfort in eyes",
    },
    {
      id: "7",
      name: "Headaches",
      description: "Increased frequency of headaches",
    },
    {
      id: "8",
      name: "Throat Irritation",
      description: "Soreness and irritation in throat",
    },
    {
      id: "9",
      name: "Reduced Lung Function",
      description: "Decreased capacity for normal breathing",
    },
    {
      id: "10",
      name: "Premature Birth",
      description: "Risk for pregnant women",
    },
  ];

  const toggleIssueSelection = (issue: HealthIssue) => {
    setSelectedIssues((prev) =>
      prev.some((item) => item.id === issue.id)
        ? prev.filter((item) => item.id !== issue.id)
        : [...prev, issue]
    );
  };

  const renderIssueItem = ({ item }: { item: HealthIssue }) => {
    const isSelected = selectedIssues.some((issue) => issue.id === item.id);
    return (
      <TouchableOpacity
        style={[styles.issueItem, isSelected && styles.selectedIssue]}
        onPress={() => toggleIssueSelection(item)}
      >
        <View style={styles.issueContent}>
          <Text style={styles.issueName}>{item.name}</Text>
          <Text style={styles.issueDescription}>{item.description}</Text>
        </View>
        {isSelected && (
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          <Ionicons name="medkit" size={26} color="#e63946" /> Health Details
        </Text>
        {selectedIssues.length > 0 ? (
          <View style={styles.selectedIssuesContainer}>
            <Text style={styles.sectionTitle}>Selected Health Issues:</Text>
            {selectedIssues.map((issue) => (
              <View key={issue.id} style={styles.selectedIssueItem}>
                <Text style={styles.selectedIssueName}>{issue.name}</Text>
                <TouchableOpacity onPress={() => toggleIssueSelection(issue)}>
                  <MaterialIcons name="close" size={20} color="#FF5252" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>
            Add the Health Information about You, and We Will Alert You Whenever
            The AQI Affects You With The Selected Health Problems.
          </Text>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Add Health Issue</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Health Issues</Text>
              <Text style={styles.modalSubtitle}>
                Health conditions affected by poor air quality
              </Text>
            </View>
            <FlatList
              data={healthIssues}
              renderItem={renderIssueItem}
              keyExtractor={(item) => item.id}
              style={styles.issuesList}
            />
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 5 },
  alertText: {
    fontSize: 15,
    color: "red",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    borderColor: "#edf2f4",
    borderWidth: 2,
  },
  plusTextSignContainer: {
    borderRadius: 200,
    width: 30,
    height: 30,
    backgroundColor: "#e63946",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 23,
    fontWeight: "800",
    marginBottom: 16,
    color: "#333",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  emptyText: { color: "#666", fontSize: 16, marginBottom: 20 },
  addButton: {
    backgroundColor: "#4285F4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: { color: "white", fontWeight: "600", marginLeft: 8 },
  selectedIssuesContainer: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  selectedIssueItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F0F7FF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedIssueName: { fontSize: 15, fontWeight: "500", color: "#333" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: "80%",
  },
  modalHeader: { paddingHorizontal: 20, marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  modalSubtitle: { fontSize: 14, color: "#666", marginTop: 4 },
  issuesList: { maxHeight: 400 },
  issueItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  issueContent: { flex: 1 },
  issueName: { fontSize: 16, fontWeight: "500", color: "#333" },
  issueDescription: { fontSize: 14, color: "#666", marginTop: 4 },
  selectedIssue: { backgroundColor: "#F0F7FF" },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  cancelButton: { padding: 10, marginRight: 10 },
  cancelButtonText: { color: "#666", fontSize: 16 },
  doneButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  doneButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
