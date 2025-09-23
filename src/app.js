import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from "./view/screens/loginScreen";
import RegisterScreen from "./view/screens/registerScreen";
import MainContainer from "./view/screens/MainContainer";
import { AuthProvider } from "./context/AuthContext";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15
      }}
      text2Style={{
        fontSize: 13
      }}
    />
  ),
};

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="Home" component={MainContainer} />
                    </Stack.Navigator>
                    <Toast config={toastConfig} />
                </NavigationContainer>
            </AuthProvider>
        </SafeAreaProvider>
    );
}