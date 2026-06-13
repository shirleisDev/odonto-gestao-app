import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import LocalizacaoScreen from "./screens/LocalizacaoScreen";
import SobreScreen from "./screens/SobreScreen";
import TelaAgendamento from "./components/TelaAgendamento";

// IMPORTANTE: Aqui carregamos a nossa nova tela inteligente que criamos juntos!

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./theme";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Configura a cor da barra de bateria/hora do celular no topo */}
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            height: 65,
            paddingBottom: 10
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
        
        {/* Aqui injetamos a nossa tela nova na aba de Agendamento do menu principal */}
        <Tab.Screen name="Agendar" component={TelaAgendamento} />
        
        <Tab.Screen name="Localização" component={LocalizacaoScreen} />
        <Tab.Screen name="Sobre" component={SobreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
