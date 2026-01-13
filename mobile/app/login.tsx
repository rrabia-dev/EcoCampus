import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      
      const res = await api.post('/auth/login', { email, password });
      
      if (res.status === 200) {
        Alert.alert("Başarılı", "Giriş Yapıldı");
      
        router.back(); 
      }
    } catch (error) {
      Alert.alert("Hata", "Giriş yapılamadı. Bilgileri kontrol et.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>EcoCampus</Text>
      
      <View style={styles.card}>
        <Text style={styles.title}>Giriş Yap</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="E-posta" 
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Şifre" 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.redButton} onPress={handleLogin}>
          <Text style={styles.btnText}>Giriş</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f5e9', justifyContent: 'center', padding: 20 },
  header: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 20, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#c62828', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#fafafa' },
  redButton: { backgroundColor: '#c62828', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});