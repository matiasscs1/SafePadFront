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
  const [serialIpad, setSerialIpad] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [recordarme, setRecordarme] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  // Validar email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar contraseña
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

    if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!apellido.trim()) newErrors.apellido = 'El apellido es obligatorio';
    if (!correoElectronico.trim()) {
      newErrors.correoElectronico = 'El correo electrónico es obligatorio';
    } else if (!isValidEmail(correoElectronico)) {
      newErrors.correoElectronico = 'El formato del correo no es válido';
    }
    if (!serialIpad.trim()) newErrors.serialIpad = 'El número serial del iPad es obligatorio';
    if (!fechaNacimiento.trim()) newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    
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
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setFechaNacimiento(formattedDate);
    }
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
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
      serial_ipad: serialIpad.trim(),
      fecha_nacimiento: fechaNacimiento,
      contrasena: contrasena,
      recordarme: recordarme
    };

    try {
      await registrar(formData);
      Toast.show({
        type: 'success',
        text1: 'Éxito',
        text2: 'Cuenta creada exitosamente',
      });
      
      // Limpiar formulario
      setNombre('');
      setApellido('');
      setCorreoElectronico('');
      setSerialIpad('');
      setFechaNacimiento('');
      setContrasena('');
      setConfirmarContrasena('');
      setRecordarme(false);
      setErrors({});
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error en registro:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Ha ocurrido un error durante el registro',
      });
    }
  };

  const passwordRequirements = getPasswordRequirements();
  const isFormValid = nombre.trim() && apellido.trim() && correoElectronico.trim() && 
                     serialIpad.trim() && fechaNacimiento.trim() && contrasena.trim() && 
                     confirmarContrasena.trim() && Object.keys(errors).length === 0;

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardContainer} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
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

            {/* Número serial del iPad */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número serial del iPad</Text>
              <TextInput
                style={[styles.input, errors.serialIpad && styles.inputError]}
                placeholder="COXXXXXXXX"
                placeholderTextColor="#9CA3AF"
                value={serialIpad}
                onChangeText={setSerialIpad}
                autoCapitalize="characters"
              />
              {errors.serialIpad && <Text style={styles.errorText}>{errors.serialIpad}</Text>}
            </View>

            {/* Fecha de nacimiento */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fecha de nacimiento</Text>
              <TouchableOpacity
                style={[styles.input, styles.dateInput, errors.fechaNacimiento && styles.inputError]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[styles.dateText, !fechaNacimiento && styles.placeholder]}>
                  {fechaNacimiento ? formatDateForDisplay(fechaNacimiento) : 'dd/mm/aaaa'}
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

            {/* Confirmar contraseña */}
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

          {/* DatePicker */}
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;