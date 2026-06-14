import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme";

export default function HomeScreen() {
  const colors = useTheme();
  const styles = getStyles(colors);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>
          Dra. Josiane
        </Text>

        <Text style={styles.heroSubtitle}>
          Odontologia moderna, acolhedora e focada no seu bem-estar.
        </Text>
      </LinearGradient>

      <View style={styles.metricsContainer}>

        <View style={styles.metricCard}>
          <Text style={styles.metricNumber}>500+</Text>
          <Text style={styles.metricText} numberOfLines={1}>Pacientes</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricNumber}>98%</Text>
          <Text style={styles.metricText} numberOfLines={1}>Satisfação</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricNumber}>10+</Text>
          <Text style={styles.metricText} numberOfLines={1}>Anos</Text>
        </View>

      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Atendimento Humanizado
        </Text>

        <Text style={styles.cardText}>
          Cada paciente recebe atenção personalizada
          desde o primeiro contato até a conclusão do tratamento.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Tecnologia Moderna
        </Text>

        <Text style={styles.cardText}>
          Utilizamos equipamentos modernos para proporcionar
          conforto, segurança e precisão.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Avaliações
        </Text>

        <Text style={styles.review}>
          ★★★★★ Atendimento excelente.{"\n"}
          <Text style={styles.reviewName}>— Mariana Oliveira</Text>
        </Text>

        <Text style={styles.review}>
          ★★★★★ Profissional muito cuidadosa.{"\n"}
          <Text style={styles.reviewName}>— Carlos Eduardo Silva</Text>
        </Text>

        <Text style={styles.review}>
          ★★★★★ Ambiente confortável e acolhedor.{"\n"}
          <Text style={styles.reviewName}>— Fernanda Costa</Text>
        </Text>
      </View>

    </ScrollView>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.background
    },

    hero:{
      paddingTop:70,
      paddingBottom:50,
      paddingHorizontal:25,
      borderBottomLeftRadius:35,
      borderBottomRightRadius:35
    },

    heroTitle:{
      fontSize:32,
      fontWeight:"bold",
      color:"#fff"
    },

    heroSubtitle:{
      marginTop:10,
      color:"#fff",
      fontSize:16,
      lineHeight:24
    },

    metricsContainer:{
      flexDirection:"row",
      justifyContent:"space-between",
      margin:20
    },

    metricCard:{
      backgroundColor:colors.card,
      width:"31%",
      padding:15,
      borderRadius:20,
      alignItems:"center",
      elevation:3
    },

    metricNumber:{
      fontSize:20,
      fontWeight:"bold",
      color:colors.primaryDark
    },

    metricText:{
      marginTop:5,
      fontSize:12,
      color:colors.subtitle
    },

    card:{
      backgroundColor:colors.card,
      marginHorizontal:20,
      marginBottom:15,
      padding:20,
      borderRadius:25,
      elevation:2
    },

    cardTitle:{
      fontSize:18,
      fontWeight:"bold",
      color:colors.text
    },

    cardText:{
      marginTop:10,
      lineHeight:22,
      color:colors.subtitle
    },

    review:{
      marginTop:10,
      color:colors.subtitle
    },

    reviewName:{
      fontSize:12,
      fontStyle:"italic",
      color:colors.primaryDark
    }
  });
}
