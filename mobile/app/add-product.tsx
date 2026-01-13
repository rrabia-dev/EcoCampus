import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../services/api';

export default function AddProduct() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!title || !price || !description) {
      Alert.alert("Hata", "Lütfen zorunlu alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        description,
        price: parseFloat(price),
        image_url: imageUrl || "https://via.placeholder.com/150", 
        category_id: 1 
      };

      await api.post('/products', payload);
      
      Alert.alert("Başarılı", "İlanınız yayınlandı!", [
        { text: "Tamam", onPress: () => router.push('/') } 
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Hata", "Ürün eklenirken bir sorun oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Yeni İlan Ekle</Text>

      <Text style={styles.label}>Ürün Başlığı</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Örn: Algoritma Kitabı" />

      <Text style={styles.label}>Fiyat (TL)</Text>
      <TextInput 
        style={styles.input} 
        value={price} 
        onChangeText={setPrice} 
        placeholder="0 yazarsan 'Bağış' olur" 
        keyboardType="numeric" 
      />

      <Text style={styles.label}>Açıklama</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        value={description} 
        onChangeText={setDescription} 
        placeholder="Ürün hakkında bilgi..." 
        multiline 
      />

      <Text style={styles.label}>Resim URL (İsteğe Bağlı)</Text>
      <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} placeholder="https://..." />
      
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.previewImage} /> : null}

      <TouchableOpacity style={styles.submitBtn} onPress={handleAddProduct} disabled={loading}>
        <Text style={styles.btnText}>{loading ? "Yükleniyor..." : "İlanı Yayınla"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2e7d32', textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5, color: '#333' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 15 },
  textArea: { height: 100, textAlignVertical: 'top' },
  previewImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 15, resizeMode: 'cover' },
  submitBtn: { backgroundColor: '#2e7d32', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});