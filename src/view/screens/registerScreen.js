// screens/RegisterScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Shield, Eye, EyeOff, Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUsuarioViewModel } from '../../viewmodels/loginViewModel';
import { styles } from '../../styles/RegisterScreenStyles';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({ navigation }) => {
  const { registrar, loading } = useUsuarioViewModel();

  // Estados locales para el formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [serialsIpad, setSerialsIpad] = useState(['']); // Array para múltiples seriales
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [recordarme, setRecordarme] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  // Pregunta de seguridad única
  const [mascotaPreferida, setMascotaPreferida] = useState('');

  // Validar solo letras
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return nameRegex.test(name);
  };

  // Validar email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Funciones para manejar seriales múltiples
  const addSerialField = () => {
    setSerialsIpad([...serialsIpad, '']);
  };

  const removeSerialField = (index) => {
    if (serialsIpad.length > 1) {
      const newSerials = serialsIpad.filter((_, i) => i !== index);
      setSerialsIpad(newSerials);
    }
  };

  const updateSerial = (index, value) => {
    const newSerials = [...serialsIpad];
    newSerials[index] = value;
    setSerialsIpad(newSerials);
  };
  const getPasswordRequirements = () => {
    if (!contrasena) return null;
    
    const hasUpperCase = /[A-Z]/.test(contrasena);
    const hasLowerCase = /[a-z]/.test(contrasena);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);
    const hasMinLength = contrasena.length >= 8;

    return {
      hasUpperCase,
      hasLowerCase,
      hasSpecialChar,
      hasMinLength,
      isValid: hasUpperCase && hasLowerCase && hasSpecialChar && hasMinLength
    };
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (!isValidName(nombre.trim())) {
      newErrors.nombre = 'El nombre solo debe contener letras';
    }
    
    if (!apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    } else if (!isValidName(apellido.trim())) {
      newErrors.apellido = 'El apellido solo debe contener letras';
    }
    
    if (!correoElectronico.trim()) {
      newErrors.correoElectronico = 'El correo electrónico es obligatorio';
    } else if (!isValidEmail(correoElectronico)) {
      newErrors.correoElectronico = 'El formato del correo no es válido';
    }
    
    // Validar seriales
    const emptySerials = serialsIpad.filter(serial => !serial.trim());
    if (emptySerials.length > 0) {
      newErrors.serialsIpad = 'Todos los seriales del iPad son obligatorios';
    }
    
    if (!fechaNacimiento.trim()) newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    
    // Validar pregunta de seguridad
    if (!mascotaPreferida.trim()) newErrors.mascotaPreferida = 'El nombre de tu mascota o animal preferido es obligatorio';
    
    if (!contrasena.trim()) {
      newErrors.contrasena = 'La contraseña es obligatoria';
    } else {
      const passwordValidation = getPasswordRequirements();
      if (!passwordValidation.isValid) {
        newErrors.contrasena = 'La contraseña no cumple con los requisitos mínimos';
      }
    }

    if (!confirmarContrasena.trim()) {
      newErrors.confirmarContrasena = 'Debe confirmar la contraseña';
    } else if (contrasena !== confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setFechaNacimiento(formattedDate);
      
      if (Platform.OS === 'ios') {
        setShowDatePicker(false);
      }
    } else if (Platform.OS === 'ios') {
      setShowDatePicker(false);
    }
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00'); // Evitar problemas de zona horaria
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleRegisterPress = async () => {
    if (!validateForm()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor, corrija los errores en el formulario',
      });
      return;
    }

    const formData = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      correo: correoElectronico.trim().toLowerCase(),
      series_dispositivos: serialsIpad.filter(serial => serial.trim()),
      fecha_nacimiento: fechaNacimiento,
      contrasena: contrasena,
      preguntas_seguridad: mascotaPreferida.trim(), // Solo la respuesta del usuario
      rol: 'usuario',
      estado: 'activo'
    };

    try {
      await registrar(formData);
      Toast.show({
        type: 'success',
        text1: 'Registro exitoso',
        text2: 'Tu cuenta ha sido creada correctamente',
      });
      
      // Limpiar formulario
      setNombre('');
      setApellido('');
      setCorreoElectronico('');
      setSerialsIpad(['']);
      setFechaNacimiento('');
      setContrasena('');
      setConfirmarContrasena('');
      setMascotaPreferida('');
      setRecordarme(false);
      setErrors({});
      navigation.navigate('Login');
    } catch (error) {
      // Solo mostrar en Toast, no en console
      Toast.show({
        type: 'error',
        text1: 'Error en el registro',
        text2: error.message || 'Ha ocurrido un error. Intenta nuevamente',
      });
    }
  };

  const passwordRequirements = getPasswordRequirements();
  const hasValidSerials = serialsIpad.every(serial => serial.trim());
  const isFormValid = nombre.trim() && apellido.trim() && correoElectronico.trim() && 
                     hasValidSerials && fechaNacimiento.trim() && contrasena.trim() && 
                     confirmarContrasena.trim() && mascotaPreferida.trim() && 
                     Object.keys(errors).length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Shield color="black" size={80} strokeWidth={2} style={styles.logo} />
            <Text style={styles.title}>Crear Cuenta SafePad</Text>
            <Text style={styles.subtitle}>Únete a la protección total</Text>
          </View>

          {/* Formulario */}
          <View style={styles.form}>
            {/* Nombre y Apellido */}
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={[styles.input, errors.nombre && styles.inputError]}
                  placeholder="María"
                  placeholderTextColor="#9CA3AF"
                  value={nombre}
                  onChangeText={setNombre}
                  autoCapitalize="words"
                />
                {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
              </View>
              
              <View style={styles.halfInput}>
                <Text style={styles.label}>Apellido</Text>
                <TextInput
                  style={[styles.input, errors.apellido && styles.inputError]}
                  placeholder="García"
                  placeholderTextColor="#9CA3AF"
                  value={apellido}
                  onChangeText={setApellido}
                  autoCapitalize="words"
                />
                {errors.apellido && <Text style={styles.errorText}>{errors.apellido}</Text>}
              </View>
            </View>

            {/* Correo electrónico */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={[styles.input, errors.correoElectronico && styles.inputError]}
                placeholder="maria@example.com"
                placeholderTextColor="#9CA3AF"
                value={correoElectronico}
                onChangeText={setCorreoElectronico}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.correoElectronico && (
                <Text style={styles.errorText}>{errors.correoElectronico}</Text>
              )}
            </View>

            {/* Números seriales del iPad */}
            <View style={styles.inputGroup}>
              <View style={styles.serialHeader}>
                <Text style={styles.label}>Números seriales del iPad</Text>
                <TouchableOpacity onPress={addSerialField} style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Agregar</Text>
                </TouchableOpacity>
              </View>
              {serialsIpad.map((serial, index) => (
                <View key={index} style={styles.serialRow}>
                  <TextInput
                    style={[styles.serialInput, errors.serialsIpad && styles.inputError]}
                    placeholder="COXXXXXXXX"
                    placeholderTextColor="#9CA3AF"
                    value={serial}
                    onChangeText={(value) => updateSerial(index, value)}
                    autoCapitalize="characters"
                  />
                  {serialsIpad.length > 1 && (
                    <TouchableOpacity 
                      onPress={() => removeSerialField(index)}
                      style={styles.removeButton}
                    >
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              {errors.serialsIpad && <Text style={styles.errorText}>{errors.serialsIpad}</Text>}
            </View>

            {/* Fecha de nacimiento */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fecha de nacimiento</Text>
              <TouchableOpacity
                style={[styles.input, styles.dateInput, errors.fechaNacimiento && styles.inputError]}
                onPress={openDatePicker}
                activeOpacity={0.7}
              >
                <Text style={[styles.dateText, !fechaNacimiento && styles.placeholder]}>
                  {fechaNacimiento ? formatDateForDisplay(fechaNacimiento) : 'Selecciona tu fecha de nacimiento'}
                </Text>
                <Calendar color="#9CA3AF" size={20} />
              </TouchableOpacity>
              {errors.fechaNacimiento && (
                <Text style={styles.errorText}>{errors.fechaNacimiento}</Text>
              )}
            </View>

            {/* Contraseña */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.passwordInput, errors.contrasena && styles.inputError]}
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor="#9CA3AF"
                  value={contrasena}
                  onChangeText={setContrasena}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff color="#9CA3AF" size={20} />
                  ) : (
                    <Eye color="#9CA3AF" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.contrasena && <Text style={styles.errorText}>{errors.contrasena}</Text>}
            </View>

            {/* Requisitos de contraseña */}
            {passwordRequirements && (
              <View style={styles.passwordRequirements}>
                <Text style={[
                  styles.requirement,
                  passwordRequirements.hasUpperCase && styles.requirementMet
                ]}>
                  • Una mayúscula
                </Text>
                <Text style={[
                  styles.requirement,
                  passwordRequirements.hasLowerCase && styles.requirementMet
                ]}>
                  • Una minúscula
                </Text>
                <Text style={[
                  styles.requirement,
                  passwordRequirements.hasSpecialChar && styles.requirementMet
                ]}>
                  • Un carácter especial
                </Text>
                <Text style={[
                  styles.requirement,
                  passwordRequirements.hasMinLength && styles.requirementMet
                ]}>
                  • 8+ caracteres
                </Text>
              </View>
            )}

            {/* Pregunta de seguridad */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>¿Cuál es el nombre de tu mascota o animal preferido?</Text>
              <TextInput
                style={[styles.input, errors.mascotaPreferida && styles.inputError]}
                placeholder="Nombre de tu mascota o animal preferido"
                placeholderTextColor="#9CA3AF"
                value={mascotaPreferida}
                onChangeText={setMascotaPreferida}
                autoCapitalize="words"
              />
              {errors.mascotaPreferida && <Text style={styles.errorText}>{errors.mascotaPreferida}</Text>}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.passwordInput, errors.confirmarContrasena && styles.inputError]}
                  placeholder="Confirma tu contraseña"
                  placeholderTextColor="#9CA3AF"
                  value={confirmarContrasena}
                  onChangeText={setConfirmarContrasena}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff color="#9CA3AF" size={20} />
                  ) : (
                    <Eye color="#9CA3AF" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.confirmarContrasena && (
                <Text style={styles.errorText}>{errors.confirmarContrasena}</Text>
              )}
            </View>

            {/* Opciones */}
            <View style={styles.optionsRow}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>¿Ya tienes cuenta? Inicia Sesión</Text>
              </TouchableOpacity>
            </View>

            {/* Botón de registro */}
            <TouchableOpacity
              style={[styles.registerButton, !isFormValid && styles.disabledButton]}
              onPress={handleRegisterPress}
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <Text style={styles.registerButtonText}>→  Registrarse</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* DatePicker Modal */}
          {showDatePicker && (
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerModal}>
                <View style={styles.datePickerHeader}>
                  <Text style={styles.datePickerTitle}>Selecciona tu fecha de nacimiento</Text>
                  <TouchableOpacity 
                    onPress={() => setShowDatePicker(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={fechaNacimiento ? new Date(fechaNacimiento + 'T00:00:00') : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                  style={styles.datePicker}
                  textColor="#000000"
                  accentColor="#00bc7d"
                  themeVariant="light"
                />
                {Platform.OS === 'ios' && (
                  <View style={styles.datePickerButtons}>
                    <TouchableOpacity 
                      onPress={() => setShowDatePicker(false)}
                      style={[styles.dateButton, styles.cancelButton]}
                    >
                      <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => setShowDatePicker(false)}
                      style={[styles.dateButton, styles.confirmButton]}
                    >
                      <Text style={styles.confirmButtonText}>Confirmar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;