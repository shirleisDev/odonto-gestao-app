import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from "react-native";

import { useTheme } from "../theme";

export default function SobreScreen() {
  const colors = useTheme();
  const styles = getStyles(colors);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>
        <Text style={styles.nome}>
          Dra. Josiane
        </Text>

        <Text style={styles.profissao}>
          Cirurgiã-Dentista
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Nossa Missão
        </Text>

        <Text style={styles.cardText}>
          Promover saúde bucal com qualidade,
          segurança e atendimento humanizado,
          oferecendo uma experiência acolhedora
          para todos os pacientes.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Serviços
        </Text>

        <Text style={styles.cardText}>
          • Limpeza{"\n"}
          • Clareamento{"\n"}
          • Canal{"\n"}
          • Restauração{"\n"}
          • Extração{"\n"}
          • Prótese
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Diferenciais
        </Text>

        <Text style={styles.cardText}>
          ✓ Atendimento Humanizado{"\n"}
          ✓ Equipamentos Modernos{"\n"}
          ✓ Ambiente Confortável{"\n"}
          ✓ Agendamento Rápido{"\n"}
          ✓ Foco no Bem-estar do Paciente
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

    header: {
      padding: 25,
      alignItems: "center"
    },

    nome: {
      fontSize: 28,
      fontWeight: "bold",
      marginTop: 40,
      color: colors.text
    },

    profissao: {
      marginTop: 8,
      fontSize: 16,
      color: colors.subtitle
    },

    card: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      marginBottom: 15,
      padding: 20,
      borderRadius: 25,
      elevation: 3
    },

    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10
    },

    cardText: {
      color: colors.subtitle,
      lineHeight: 24
    }
  });
}
