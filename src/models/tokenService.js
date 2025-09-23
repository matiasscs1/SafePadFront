// services/tokenService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error obteniendo token:', error);
    return null;
  }
};