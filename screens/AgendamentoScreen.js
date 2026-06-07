import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { COLORS } from "../theme";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function AgendamentoScreen() {

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  async function guardarLeads() {

    if (!nome.trim() || !whatsapp.trim()) {
      Alert.alert("Atenção", "Preencha seu nome e WhatsApp.");
      return false;
    }

    try {

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, whatsapp })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar");
      }

      return true;

    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível conectar ao servidor.");
      return false;
    }
  }

  async function abrirWhatsApp() {

    const mensagem =
`Olá, meu nome é ${nome}.
Gostaria de agendar uma consulta.`;

    const url =
`https://wa.me/5521979072363?text=${encodeURIComponent(mensagem)}`;

    const supported =
      await Linking.canOpenURL(url);

    if(supported){
      await Linking.openURL(url);
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Solicitar Atendimento
      </Text>

      <TextInput
        placeholder="Seu nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Seu WhatsApp"
        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsapp}
      />

      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={async () => { const ok = await guardarLeads(); if (ok) abrirWhatsApp(); }}
      >
        <View style={styles.whatsappButtonContent}>
          <FontAwesome name="whatsapp" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>
            Agendar pelo WhatsApp
          </Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:COLORS.background
  },

  title:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:25,
    color:COLORS.text
  },

  input:{
    backgroundColor:"#fff",
    padding:18,
    borderRadius:20,
    marginBottom:15
  },

  primaryButton:{
    backgroundColor:COLORS.primary,
    padding:18,
    borderRadius:20,
    marginBottom:15
  },

  whatsappButton:{
    backgroundColor:COLORS.whatsapp,
    padding:18,
    borderRadius:20
  },

  whatsappButtonContent:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },

  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold"
  }
});