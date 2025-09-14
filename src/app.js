import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./view/screens/loginScreen";
import RegisterScreen from "./view/screens/registerScreen";
import { AuthProvider } from "./context/AuthContext";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

// Si no tienes un toastConfig personalizado, puedes usar uno vacío
const toastConfig = {};

export default function App() {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast config={toastConfig} />
        </AuthProvider>
    );
}