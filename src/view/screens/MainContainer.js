// view/screens/MainContainer.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Alert
} from 'react-native';
import { Shield, Home, Tablet, Wrench, DollarSign, Calendar, User, LogOut, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { styles } from '../../styles/MainContainerStyles';

// Importar todas las pantallas
import HomeScreen from './HomeScreen';
import CitasContent from './CitasContent';
import IpadContent from './IpadContent';
import ReparacionContent from './ReparacionContent';
import CashbackContent from './CashbackContent';
import PerfilContent from './PerfilContent';

export default function MainContainer() {
  const insets = useSafeAreaInsets();

  const { logout } = useAuth();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-300));
  const [currentScreen, setCurrentScreen] = useState('Inicio'); // Pantalla actual

  // Mapeo de pantallas
  const screenTitles = {
    'Inicio': 'Inicio',
    'iPad': 'Mi iPad',
    'Reparacion': 'Reparación',
    'Cashback': 'Cashback',
    'Citas': 'Citas',
    'Perfil': 'Perfil'
  };

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleMenuItemPress = (screen) => {
    setCurrentScreen(screen);
    toggleMenu(); // Cerrar menú después de seleccionar
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              Toast.show({
                type: 'success',
                text1: 'Sesión cerrada',
                text2: 'Has cerrado sesión correctamente',
              });
              navigation.replace('Login');
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No se pudo cerrar la sesión',
              });
            }
          },
        },
      ]
    );
  };

  // Función para renderizar el contenido según la pantalla actual
  const renderContent = () => {
    switch (currentScreen) {
      case 'Inicio':
        return <HomeScreen />;
      case 'iPad':
        return <IpadContent />;
      case 'Reparacion':
        return <ReparacionContent />;
      case 'Cashback':
        return <CashbackContent />;
      case 'Citas':
        return <CitasContent />;
      case 'Perfil':
        return <PerfilContent />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header fijo que se extiende hasta arriba */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <View style={styles.hamburgerMenu}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{screenTitles[currentScreen]}</Text>
        <View style={styles.headerRight}>
          <Shield color="#000" size={24} strokeWidth={2} />
          <Text style={styles.brandText}>SAFEPAD</Text>
        </View>
      </View>

      {/* Contenido dinámico */}
      <View style={[styles.content, { paddingBottom: insets.bottom }]}>
        {renderContent()}
      </View>

      {/* Menú lateral */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.sideMenu,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>SAFEPAD</Text>
              <TouchableOpacity onPress={toggleMenu}>
                <X color="#666" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.menuSubtitle}>Menú principal</Text>

            <View style={styles.menuItems}>
              <TouchableOpacity
                style={[styles.menuItem, currentScreen === 'Inicio' && styles.activeMenuItem]}
                onPress={() => handleMenuItemPress('Inicio')}
              >
                <Home color={currentScreen === 'Inicio' ? "#007AFF" : "#333"} size={20} strokeWidth={2} />
                <Text style={[styles.menuItemText, currentScreen === 'Inicio' && styles.activeMenuText]}>Inicio</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, currentScreen === 'iPad' && styles.activeMenuItem]}
                onPress={() => handleMenuItemPress('iPad')}
              >
                <Tablet color={currentScreen === 'iPad' ? "#007AFF" : "#333"} size={20} strokeWidth={2} />
                <Text style={[styles.menuItemText, currentScreen === 'iPad' && styles.activeMenuText]}>Mi iPad</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, currentScreen === 'Reparacion' && styles.activeMenuItem]}
                onPress={() => handleMenuItemPress('Reparacion')}
              >
                <Wrench color={currentScreen === 'Reparacion' ? "#007AFF" : "#333"} size={20} strokeWidth={2} />
                <Text style={[styles.menuItemText, currentScreen === 'Reparacion' && styles.activeMenuText]}>Reparación</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, currentScreen === 'Cashback' && styles.activeMenuItem]}
                onPress={() => handleMenuItemPress('Cashback')}
              >
                <DollarSign color={currentScreen === 'Cashback' ? "#007AFF" : "#333"} size={20} strokeWidth={2} />
                <Text style={[styles.menuItemText, currentScreen === 'Cashback' && styles.activeMenuText]}>Cashback</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, currentScreen === 'Citas' && styles.activeMenuItem]}
                onPress={() => handleMenuItemPress('Citas')}
              >
                <Calendar color={currentScreen === 'Citas' ? "#007AFF" : "#333"} size={20} strokeWidth={2} />
                <Text style={[styles.menuItemText, currentScreen === 'Citas' && styles.activeMenuText]}>Citas</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, currentScreen === 'Perfil' && styles.activeMenuItem]}
                onPress={() => handleMenuItemPress('Perfil')}
              >
                <User color={currentScreen === 'Perfil' ? "#007AFF" : "#333"} size={20} strokeWidth={2} />
                <Text style={[styles.menuItemText, currentScreen === 'Perfil' && styles.activeMenuText]}>Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <LogOut color="#FF3B30" size={20} strokeWidth={2} />
                <Text style={[styles.menuItemText, styles.logoutText]}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <TouchableOpacity
            style={styles.modalBackground}
            onPress={toggleMenu}
            activeOpacity={1}
          />
        </View>
      </Modal>
    </View>
  );
}