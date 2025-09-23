// styles/RegisterScreenStyles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  keyboardContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20, // Reducido para que no centre tanto
    paddingHorizontal: 24,
  },
  
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    paddingHorizontal: 24,
    minHeight: "100%",
  },
  
  header: {
    alignItems: "center",
    marginBottom: 30, // Reducido
    marginTop: 20, // Cambiado de negativo a positivo
    paddingTop: 20,
  },
  
  // Logo igual al de login
  logo: {
    marginBottom: 20, // Reducido
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
    marginBottom: 40, // Añadido para espacio al final
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  halfInput: {
    flex: 0.48,
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

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
    marginTop: 8,
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
  
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14, // Más padding para mejor toque
  },
  
  dateText: {
    fontSize: 16,
    color: "#111827",
    flex: 1,
  },
  
  placeholder: {
    color: "#9CA3AF",
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
  
  passwordRequirements: {
    marginTop: -12,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  
  requirement: {
    fontSize: 12,
    color: "#EF4444",
    marginBottom: 2,
  },
  
  requirementMet: {
    color: "#10B981",
  },
  
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
  
  optionsRow: {
    flexDirection: "row",
    justifyContent: "center", // Centrado en lugar de space-between
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
  
  loginLink: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
  },
  
  registerButton: {
    width: "100%",
    backgroundColor: "#00bc7d", // Verde como solicitaste
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
  
  disabledButton: {
    backgroundColor: "#9CA3AF",
    shadowColor: "#9CA3AF",
  },
  
  registerButtonText: {
    color: "#000000", // Texto negro para el botón verde
    fontSize: 16,
    fontWeight: "600",
  },

  // Estilos para seriales múltiples
  serialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  addButton: {
    backgroundColor: "#00bc7d",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  addButtonText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "600",
  },

  serialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  serialInput: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
    marginRight: 8,
  },

  removeButton: {
    backgroundColor: "#EF4444",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Estilos para DatePicker modal
  datePickerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  datePickerModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    maxWidth: 350,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  datePickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },

  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: 'bold',
  },

  datePicker: {
    width: '100%',
    height: 200,
  },

  datePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },

  dateButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#F3F4F6',
  },

  confirmButton: {
    backgroundColor: '#00bc7d',
  },

  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },

  confirmButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});