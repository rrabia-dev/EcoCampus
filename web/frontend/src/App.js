import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
  
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isRegistering, setIsRegistering] = useState(false); 

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error("Ürünler yüklenemedi", error);
    }
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      alert("Giriş Başarılı!");
    } catch (error) {
      alert("Giriş Hatası: Bilgileri kontrol et.");
    }
  };

  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: regUsername,
        email: regEmail,
        password: regPassword
      });
      alert("Kayıt Başarılı!");
      setIsRegistering(false); 
    } catch (error) {
      alert("Kayıt başarısız: " + (error.response?.data?.message || "Hata oluştu"));
    }
  };

  
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', 
        { 
          title, 
          price: parseFloat(price), 
          image_url: image || "https://via.placeholder.com/150", 
          category_id: 1 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("İlan Yayınlandı!");
      setTitle(''); setPrice(''); setImage('');
      fetchProducts();
    } catch (error) {
      alert("İlan eklenemedi.");
    }
  };

  
  const handleDelete = async (id) => {
    if(!window.confirm("Bu ilanı silmek istediğine emin misin?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("İlan silindi!");
      fetchProducts();
    } catch (error) {
      alert("Hata: Sadece kendi ilanını silebilirsin.");
    }
  };

  
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="App" style={{ backgroundColor: '#e8f5e9', minHeight: '100vh', paddingBottom: '50px' }}>
      
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', position: 'relative' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#000', margin: 0 }}>EcoCampus</h1>
        {token && (
          <button onClick={handleLogout} style={{ position: 'absolute', right: '20px', backgroundColor: '#555', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Çıkış Yap
          </button>
        )}
      </div>

      
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        
        {!token ? (
          
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            
            
            {!isRegistering ? (
              <>
                <h2 style={{ textAlign: 'center', color: '#080707', marginBottom: '20px' }}>Giriş Yap</h2>
                <form onSubmit={handleLogin}>
                  <input type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
                  <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
                  <button type="submit" style={redButtonStyle}>Giriş</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', textDecoration: 'underline', color: '#555' }} onClick={() => setIsRegistering(true)}>
                  <b>Kayıt Ol</b>
                </p>
              </>
            ) : (
              <>
                <h2 style={{ textAlign: 'center', color: '#c62828', marginBottom: '20px' }}>Kayıt Ol</h2>
                <form onSubmit={handleRegister}>
                  <input type="text" placeholder="Kullanıcı Adı" value={regUsername} onChange={e => setRegUsername(e.target.value)} required style={inputStyle} />
                  <input type="email" placeholder="E-posta" value={regEmail} onChange={e => setRegEmail(e.target.value)} required style={inputStyle} />
                  <input type="password" placeholder="Şifre" value={regPassword} onChange={e => setRegPassword(e.target.value)} required style={inputStyle} />
                  <button type="submit" style={{ ...redButtonStyle, backgroundColor: '#c62828' }}>Kayıt Ol</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', textDecoration: 'underline', color: '#555' }} onClick={() => setIsRegistering(false)}>
                  Zaten hesabın var mı? <b>Giriş Yap</b>
                </p>
              </>
            )}

          </div>
        ) : (
          
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', width: '600px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>İlan Ver</h2>
            <form onSubmit={handleAddProduct}>
              <input type="text" placeholder="Ürün Başlığı" value={title} onChange={e => setTitle(e.target.value)} required style={inputStyle} />
              <input type="number" placeholder="Fiyat (0 ise bağış)" value={price} onChange={e => setPrice(e.target.value)} required style={inputStyle} />
              <input type="text" placeholder="Resim URL" value={image} onChange={e => setImage(e.target.value)} style={inputStyle} />
              <button type="submit" style={redButtonStyle}>İlanı Yayınla</button>
            </form>
          </div>
        )}
      </div>

      
      <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: '40px 0 20px 0' }}>İlanlar</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', padding: '0 20px' }}>
        {products.map(item => (
          <div key={item.oid || item.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '20px', width: '300px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'contain', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{item.title}</h3>
            
            <p style={{ fontSize: '1rem', marginBottom: '10px' }}>
              {parseFloat(item.price) === 0 ? <span style={{ backgroundColor: '#f1f8e9', color: '#2e7d32', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' }}>Bağış 🎁</span> : `${item.price} ₺`}
            </p>

            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '10px' }}>
              {token ? `İletişim: ${item.user_email || 'rabia@ecocampus.com'}` : 'Detaylı bilgiler için lütfen giriş yapınız.'}
            </p>

            
            {token && (
              <button 
                onClick={() => handleDelete(item.oid || item.id)}
                style={{ width: '100%', backgroundColor: '#ffcdd2', color: '#c62828', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                İlanı Sil 
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '8px' };
const redButtonStyle = { width: '100%', padding: '12px', backgroundColor: '#c62828', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };

export default App;












