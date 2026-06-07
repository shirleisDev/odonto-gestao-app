import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import HomeScreen from "./screens/HomeScreen";
import AgendamentoScreen from "./screens/AgendamentoScreen";
import LocalizacaoScreen from "./screens/LocalizacaoScreen";
import SobreScreen from "./screens/SobreScreen";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./theme";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            height: 65
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
    </GestureHandlerRootView>
  );
}