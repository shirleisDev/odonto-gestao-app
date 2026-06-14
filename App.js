import React from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./screens/HomeScreen";
import AgendamentoScreen from "./screens/AgendamentoScreen";
import LocalizacaoScreen from "./screens/LocalizacaoScreen";
import SobreScreen from "./screens/SobreScreen";

import { Ionicons } from "@expo/vector-icons";
import { LIGHT_COLORS, DARK_COLORS } from "./theme";

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.subtitle,
          tabBarStyle: {
            height: 65,
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          },
          tabBarIcon: ({ color, size }) => {
            let icon;

            if (route.name === "Início") icon = "home";
            if (route.name === "Agendar") icon = "calendar";
            if (route.name === "Localização") icon = "location";
            if (route.name === "Sobre") icon = "person";

            return (
              <Ionicons
                name={icon}
                size={size}
                color={color}
              />
            );
          }
        })}
      >
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Agendar" component={AgendamentoScreen} />
        <Tab.Screen name="Localização" component={LocalizacaoScreen} />
        <Tab.Screen name="Sobre" component={SobreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}