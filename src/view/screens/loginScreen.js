// screens/LoginScreen.js
import { styles } from '../../styles/LoginScreen.style.js';
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useUsuarioViewModel } from '../../viewmodels/loginViewModel.js';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext.js';
import Loader from '../components/Loader.js';
import Toast from 'react-native-toast-message';
import { Shield, Eye, EyeOff } from 'lucide-react-native';
import { useState, useCallback } from 'react';

export default function LoginScreen() {
  const {
    correo,
    setCorreo,
    contrasena,
    setContrasena,
    login,
    loading,
  } = useUsuarioViewModel();

  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(false);

  // Verificar autenticación cada vez que se enfoca la pantalla
  useFocusEffect(
    useCallback(() => {
      if (!authLoading && isAuthenticated()) {
        navigation.replace('Home');
      }
    }, [authLoading, isAuthenticated, navigation])
  );

  const handleLogin = async () => {
    // Validaciones básicas
    if (!correo.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Campo requerido',
        text2: 'Por favor ingresa tu correo electrónico',
      });
      return;
    }

    if (!contrasena.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Campo requerido',
        text2: 'Por favor ingresa tu contraseña',
      });
      return;
    }

    try {
      const res = await login();
      Toast.show({
        type: 'success',
        text1: 'Bienvenido',
        text2: `Hola ${res?.data?.usuario?.nombre || ''}`,
      });
      navigation.replace('Home');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error al iniciar sesión',
        text2: err.message || 'Credenciales incorrectas',
      });
    }
  };

  // Si está cargando la autenticación, mostrar loader
  if (authLoading) {
    return <Loader visible={true} />;
  }

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
          <Loader visible={loading} />

          {/* Header con icono y títulos */}
          <View style={styles.header}>
            <Shield color="black" size={120} strokeWidth={2} style={styles.logo} />
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.subtitle}>Bienvenido de vuelta a SafePad</Text>
          </View>

          {/* Formulario */}
          <View style={styles.form}>
            {/* Campo Correo electrónico */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                placeholder="andres@example.com"
                placeholderTextColor="#9CA3AF"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Campo Contraseña */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={contrasena}
                  onChangeText={setContrasena}
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
            </View>

            {/* Checkbox y link */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setRememberSession(!rememberSession)}
              >
                <View style={[styles.checkbox, rememberSession && styles.checkboxChecked]}>
                  {rememberSession && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Recordar sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.createAccountLink}>Crear cuenta</Text>
              </TouchableOpacity>
            </View>

            {/* Botón Iniciar Sesión */}
            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.disabledButton]} 
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>→  Iniciar Sesión</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}