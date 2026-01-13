import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Alert, TextInput, ScrollView, Dimensions } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import api from '../../services/api';

const { width } = Dimensions.get('window');

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(''); 

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  
  const [prodTitle, setProdTitle] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [loadingAdd, setLoadingAdd] = useState(false);
  
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.log("Veri hatası:", error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen bilgileri giriniz.");
      return;
    }
    setLoadingLogin(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      
      if (res.status === 200) {
        const token = res.data.token || res.data.accessToken;
        if (token) {
          setUserToken(token); 
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setIsLoggedIn(true);
          Alert.alert("Giriş başarılı!");
          setEmail(''); setPassword('');
        }
      }
    } catch (error: any) {
      Alert.alert("Giriş yapılamadı.");
    } finally {
      setLoadingLogin(false);
    }
  };
  
  const handleAddProduct = async () => {
    if (!prodTitle || !prodPrice) return;
    setLoadingAdd(true);
    try {
      const payload = {
        title: prodTitle,
        description: "Mobil uygulamadan yüklendi", 
        price: parseFloat(prodPrice),
        image_url: prodImage || "https://via.placeholder.com/150",
        category_id: 1 
      };
      await api.post('/products', payload);
      Alert.alert("Başarılı", "İlanınız yayınlandı!");
      setProdTitle(''); setProdPrice(''); setProdImage('');
      fetchProducts(); 
    } catch (error: any) {
      Alert.alert("Hata", "İlan eklenemedi.");
    } finally {
      setLoadingAdd(false);
    }
  };

  
  const handleDeleteProduct = (id: any) => {
    Alert.alert(
      "Sil",
      "Bu ilanı silmek istediğine emin misin?",
      [
        { text: "İptal", style: "cancel" },
        { 
          text: "Sil", 
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/products/${id}`);
              Alert.alert("Bilgi", "İlan silindi.");
              fetchProducts();
            } catch (error) {
              Alert.alert("Hata", "Sadece kendi ilanını silebilirsin.");
            }
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserToken(''); 
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e8f5e9" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        
        <View style={styles.header}>
          <Text style={styles.appTitle}>EcoCampus Mobil</Text>
          
          {!isLoggedIn ? (
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Giriş Yap</Text>
              <TextInput style={styles.input} placeholder="E-posta" placeholderTextColor="#999" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
              <TextInput style={styles.input} placeholder="Şifre" placeholderTextColor="#999" value={password} onChangeText={setPassword} secureTextEntry />
              
              <TouchableOpacity style={styles.redButton} onPress={handleLogin} disabled={loadingLogin}>
                <Text style={styles.btnText}>{loadingLogin ? "Giriliyor..." : "Giriş"}</Text>
              </TouchableOpacity>

              
              <TouchableOpacity style={{marginTop: 15, alignItems: 'center'}} onPress={() => router.push('/register')}>
                <Text style={{color: '#555', textDecorationLine: 'underline'}}>Kayıt Ol</Text>
              </TouchableOpacity>

            </View>
          ) : (
            
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                 <Text style={styles.cardTitle}>İlan Ver</Text>
                 <TouchableOpacity onPress={handleLogout} style={styles.smallLogoutBtn}>
                    <Text style={styles.logoutText}>Çıkış</Text>
                 </TouchableOpacity>
              </View>
              <TextInput style={styles.input} placeholder="Ürün Başlığı" placeholderTextColor="#999" value={prodTitle} onChangeText={setProdTitle} />
              <TextInput style={styles.input} placeholder="Fiyat (0 ise bağış)" placeholderTextColor="#999" value={prodPrice} onChangeText={setProdPrice} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Resim URL" placeholderTextColor="#999" value={prodImage} onChangeText={setProdImage} />
              <TouchableOpacity style={styles.redButton} onPress={handleAddProduct} disabled={loadingAdd}>
                <Text style={styles.btnText}>{loadingAdd ? "Yükleniyor..." : "İlanı Yayınla"}</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.sectionTitle}>İlanlar</Text>
        </View>

        <View style={styles.productsContainer}>
          {products.map((item: any) => (
            <View key={item.oid ? item.oid.toString() : Math.random().toString()} style={styles.productCard}>
              <Image source={{ uri: item.image_url || 'https://via.placeholder.com/150' }} style={styles.productImage} />
              <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>{parseFloat(item.price) === 0 ? "Bağış🎁" : `${item.price} ₺`}</Text>
              </View>
              
              <Text style={styles.contactText}>
                {isLoggedIn ? `İletişim: ${item.user_email || 'rabia@ecocampus.com'}` : 'Detaylı bilgiler için lütfen giriş yapınız.'}
              </Text>

              
              {isLoggedIn && (
                <TouchableOpacity 
                  onPress={() => handleDeleteProduct(item.oid || item.id)}
                  style={{ marginTop: 10, backgroundColor: '#ffebee', padding: 6, borderRadius: 5, alignItems: 'center' }}
                >
                  <Text style={{ color: '#c62828', fontWeight: 'bold', fontSize: 12 }}>İlanı Sil</Text>
                </TouchableOpacity>
              )}
            </View> 
          ))} 
        </View> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f5e9' },
  header: { padding: 20, alignItems: 'center', width: '100%' },
  appTitle: { fontSize: 36, fontWeight: '900', marginBottom: 20, color: '#000', textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 20, width: '90%', maxWidth: 400, alignSelf: 'center', elevation: 5 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#070606', marginBottom: 15, textAlign: 'center' },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10, padding: 14, marginBottom: 12, fontSize: 16 },
  redButton: { backgroundColor: '#c62828', paddingVertical: 14, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 5 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  smallLogoutBtn: { backgroundColor: '#455a64', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  logoutText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 30, marginBottom: 10, alignSelf: 'flex-start', color: '#333', paddingLeft: 10 },
  productsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15 },
  productCard: { backgroundColor: '#fff', width: '48%', borderRadius: 15, padding: 10, marginBottom: 15, elevation: 3 },
  productImage: { width: '100%', height: 130, borderRadius: 10, marginBottom: 8, resizeMode: 'contain' },
  productTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 6, height: 40 },
  priceBadge: { backgroundColor: '#f1f8e9', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 6 },
  priceText: { fontWeight: 'bold', color: '#040404', fontSize: 13 },
  contactText: { fontSize: 10, color: '#757575' }
});