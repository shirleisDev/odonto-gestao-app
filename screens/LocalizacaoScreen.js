import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme";

const ENDERECO = "R. Domingos Lopes, 671 - Store G - Madureira";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`;

function abrirMaps() {
  Linking.openURL(MAPS_URL);
}

export default function LocalizacaoScreen() {
  const colors = useTheme();
  const styles = getStyles(colors);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={abrirMaps} activeOpacity={0.85}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.banner}
        >
          <Text style={styles.bannerPin}>📍</Text>
          <Text style={styles.bannerTitle}>Como Chegar</Text>
          <Text style={styles.bannerAddress}>{ENDERECO}</Text>
          <View style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Abrir no Google Maps</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Horários de Atendimento</Text>
        <Text style={styles.cardRow}>Segunda a Sexta   08h – 18h</Text>
        <Text style={styles.cardRow}>Sábado             08h – 12h</Text>
        <Text style={styles.cardRow}>Domingo            Fechado</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Referências</Text>
        <Text style={styles.cardText}>
         Ed. Condomínio Cidade Madureira de frente ao Banco Itaú
        </Text>
      </View>
    </ScrollView>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },

    banner: {
      paddingTop: 60,
      paddingBottom: 40,
      paddingHorizontal: 25,
      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      alignItems: "center"
    },

    bannerPin: {
      fontSize: 48,
      marginBottom: 10
    },

    bannerTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#fff"
    },

    bannerAddress: {
      marginTop: 8,
      color: "#fff",
      fontSize: 15,
      textAlign: "center",
      lineHeight: 22,
      opacity: 0.9
    },

    bannerButton: {
      marginTop: 24,
      backgroundColor: "#fff",
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25
    },

    bannerButtonText: {
      color: colors.primaryDark,
      fontWeight: "bold",
      fontSize: 15
    },

    card: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      borderRadius: 25,
      elevation: 2
    },

    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 12
    },

    cardRow: {
      color: colors.subtitle,
      fontSize: 14,
      marginBottom: 6,
      lineHeight: 20
    },

    cardText: {
      color: colors.subtitle,
      lineHeight: 22
    }
  });
}
