import React, { useState, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  Platform,
  useColorScheme
} from "react-native";

import { Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useTheme } from "../theme";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function AgendamentoScreen() {

  const colors = useTheme();
  const scheme = useColorScheme();
  const styles = getStyles(colors);

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTimestamp, setDateTimestamp] = useState(() => Date.now());
  const minimumDate = useRef(new Date()).current;

  function formatarTelefone(text) {
    const digits = text.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function formatarData(text) {
    const digits = text.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  }

  function dataParaISO(data) {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
  }

  function aplicarDataSelecionada(eventOrDate) {
    let dia, mes, ano;

    if (eventOrDate instanceof Date) {
      // onValueChange passed a plain Date object
      if (isNaN(eventOrDate.getTime())) return;
      setDateTimestamp(eventOrDate.getTime());
      dia = String(eventOrDate.getDate()).padStart(2, "0");
      mes = String(eventOrDate.getMonth() + 1).padStart(2, "0");
      ano = eventOrDate.getFullYear();
    } else {
      // onValueChange passed a native event { nativeEvent: { timestamp, utcOffset } }
      const { timestamp, utcOffset = 0 } = eventOrDate?.nativeEvent ?? {};
      if (!timestamp) return;
      setDateTimestamp(timestamp);
      const localDate = new Date(timestamp + utcOffset * 60 * 1000);
      dia = String(localDate.getUTCDate()).padStart(2, "0");
      mes = String(localDate.getUTCMonth() + 1).padStart(2, "0");
      ano = localDate.getUTCFullYear();
    }

    setDataConsulta(`${dia}/${mes}/${ano}`);
  }

  async function guardarLeads() {

    if (!nome.trim() || !whatsapp.trim() || !dataConsulta.trim()) {
      Alert.alert("Atenção", "Preencha seu nome, WhatsApp e data da consulta.");
      return false;
    }

    if (dataConsulta.length < 10) {
      Alert.alert("Atenção", "Informe a data no formato DD/MM/AAAA.");
      return false;
    }

    if (!API_URL) {
      Alert.alert("Erro de configuração", "URL da API não configurada.");
      return false;
    }

    setLoading(true);
    try {

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, whatsapp, data_consulta: dataParaISO(dataConsulta) }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar");
      }

      setNome("");
      setWhatsapp("");
      setDataConsulta("");
      setDateTimestamp(Date.now());
      Alert.alert("Agendamento enviado!", "Entraremos em contato para confirmar sua consulta.");
      return true;

    } catch (error) {
      const isTimeout = error.name === "AbortError" || error.message?.toLowerCase().includes("cancel");
      if (isTimeout) {
        Alert.alert("Servidor indisponível", "O servidor demorou para responder. Tente novamente em alguns segundos.");
      } else {
        Alert.alert("Erro", error.message || "Não foi possível conectar ao servidor.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }
  async function abrirWhatsAppEmergencia() {
    const mensagem = "Olá! Preciso agendar uma consulta de emergência.";
    const url = `https://wa.me/5521979072363?text=${encodeURIComponent(mensagem)}`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Solicitar Atendimento
      </Text>

      <TouchableOpacity
        style={[styles.whatsappButton, { marginBottom: 25 }]}
        onPress={abrirWhatsAppEmergencia}
      >
        <View style={styles.whatsappButtonContent}>
          <FontAwesome name="whatsapp" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>
            Consulta Emergencial
          </Text>
        </View>
      </TouchableOpacity>

      <TextInput
        placeholder="Seu nome"
        placeholderTextColor={colors.inputPlaceholder}
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Seu WhatsApp (XX) XXXXX-XXXX"
        placeholderTextColor={colors.inputPlaceholder}
        style={styles.input}
        value={whatsapp}
        onChangeText={(text) => setWhatsapp(formatarTelefone(text))}
        keyboardType="phone-pad"
        maxLength={16}
      />

      <TouchableOpacity
        style={[styles.input, styles.dateInput]}
        onPress={() => setShowDatePicker(true)}
        activeOpacity={0.7}
      >
        <FontAwesome
          name="calendar"
          size={16}
          color={dataConsulta ? colors.text : colors.inputPlaceholder}
          style={{ marginRight: 10 }}
        />
        <Text style={dataConsulta ? styles.dateText : styles.datePlaceholder}>
          {dataConsulta || "Data da consulta (DD/MM/AAAA)"}
        </Text>
      </TouchableOpacity>

      {/* Android: DateTimePicker renders as a native dialog */}
      {Platform.OS === "android" && showDatePicker && (
        <DateTimePicker
          value={new Date(dateTimestamp)}
          mode="date"
          display="calendar"
          minimumDate={minimumDate}
          themeVariant={scheme === "dark" ? "dark" : "light"}
          onValueChange={(event) => { setShowDatePicker(false); aplicarDataSelecionada(event); }}
          onDismiss={() => setShowDatePicker(false)}
        />
      )}

      {/* iOS: show in a bottom sheet modal */}
      {Platform.OS === "ios" && (
        <Modal
          transparent
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={new Date(dateTimestamp)}
                mode="date"
                display="spinner"
                minimumDate={minimumDate}
                themeVariant={scheme === "dark" ? "dark" : "light"}
                style={{ width: "100%" }}
                onValueChange={aplicarDataSelecionada}
                onDismiss={() => setShowDatePicker(false)}
              />
              <TouchableOpacity
                style={styles.modalConfirm}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <TouchableOpacity
        style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
        onPress={guardarLeads}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Agendar consulta</Text>
        }
      </TouchableOpacity>

    </ScrollView>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container:{
      flex:1,
      padding:20,
      backgroundColor:colors.background
    },

    title:{
      fontSize:28,
      fontWeight:"bold",
      marginTop:40,
      marginBottom:25,
      color:colors.text
    },

    input:{
      backgroundColor:colors.card,
      padding:18,
      borderRadius:20,
      marginBottom:15,
      color:colors.text
    },

    dateInput:{
      flexDirection:"row",
      alignItems:"center"
    },

    dateText:{
      color:colors.text,
      fontSize:14
    },

    datePlaceholder:{
      color:colors.inputPlaceholder,
      fontSize:14
    },

    primaryButton:{
      backgroundColor:colors.primary,
      padding:18,
      borderRadius:20,
      marginBottom:15
    },

    primaryButtonDisabled:{
      opacity:0.6
    },

    whatsappButton:{
      backgroundColor:colors.whatsapp,
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
    },

    modalOverlay:{
      flex:1,
      justifyContent:"flex-end",
      backgroundColor:"rgba(0,0,0,0.45)"
    },

    modalContent:{
      backgroundColor:colors.card,
      borderTopLeftRadius:24,
      borderTopRightRadius:24,
      padding:20,
      paddingBottom:36
    },

    modalConfirm:{
      backgroundColor:colors.primary,
      padding:16,
      borderRadius:20,
      marginTop:10
    }
  });
}
