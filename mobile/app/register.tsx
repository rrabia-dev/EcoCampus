import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', {
        username,
        email,
        password
      });
      
      Alert.alert("Başarılı", "Kayıt oldunuz! Şimdi giriş yapabilirsiniz. 🎉", [
        { text: "Tamam", onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert("Hata", "Kayıt başarısız. " + (error.response?.data?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.headerTitle}>EcoCampus Mobil</Text>
      
      
      <View style={styles.card}>
        <Text style={styles.title}>Yeni Hesap Oluştur</Text>

        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.btnText}>{loading ? "Kaydediliyor..." : "Kayıt Ol"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => router.back()}>
          <Text style={styles.linkText}>Zaten hesabın var mı? Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: 'flex-start', 
    padding: 20, 
    paddingTop: 80, 
    backgroundColor: '#e8f5e9' 
  },
  headerTitle: { fontSize: 32, fontWeight: '900', color: '#000000', textAlign: 'center', marginBottom: 30 },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 20, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#c62828', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, marginBottom: 15 },
  button: { backgroundColor: '#c62828', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  linkButton: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#333', textDecorationLine: 'underline' }
});