import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    minHeight: "100%",
  },
  
  header: {
    alignItems: "center",
    marginBottom: 60,
    marginTop: -80,
  },
  
  // Logo grande sin cuadrado, directamente sobre el fondo
  logo: {
    marginBottom: 40,
  },
  
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "400",
  },
  
  form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  
  inputGroup: {
    marginBottom: 20,
  },
  
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  
  input: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
  },
  
  passwordContainer: {
    position: "relative",
  },
  
  passwordInput: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 48,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
  },
  
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#3B82F6",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  
  checkboxChecked: {
    backgroundColor: "#3B82F6",
  },
  
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  
  checkboxLabel: {
    fontSize: 14,
    color: "#374151",
  },
  
  createAccountLink: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
  },
  
  loginButton: {
    width: "100%",
    backgroundColor: "#00bc7d",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#00bc7d",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  
  loginButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  
  demoText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    fontWeight: "400",
  },
});