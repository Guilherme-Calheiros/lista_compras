import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 20,
    marginVertical: 40,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
    backgroundColor: "#fff",
    fontSize: 16,
  },

  itemCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  itemText: {
    fontSize: 16,
    color: "#333",
  },

  buttonPrimary: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 6,
  },

  buttonPrimaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonDanger: {
    backgroundColor: "#E53935",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 6,
  },

  buttonDangerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
