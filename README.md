# EcoCampus - Sürdürülebilir Kampüs Pazaryeri

EcoCampus, üniversite öğrencilerinin kullanmadıkları ders materyallerini, kitaplarını veya eşyalarını satabilecekleri ya da ihtiyaç sahiplerine ücretsiz bağışlayabilecekleri bir platformdur.

**Ders:** YMH3007 Fullstack Web ve Mobil Uygulama Geliştirme  
**Geliştirici:** [Rabia Gömeçoğlu] - [232010080031]  
**Dönem:** 2025-2026 Güz Dönemi

## 🚀 Proje Hakkında

Bu proje, döngüsel ekonomi ve öğrenci dayanışmasını temel alarak geliştirilmiştir.
- **Backend:** Node.js & Express.js (REST API)
- **Veritabanı:** PostgreSQL
- **Web:** React.js (Yönetim Paneli)
- **Mobil:** React Native & Expo (Kullanıcı Uygulaması)

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları sırasıyla uygulayın.

### 1. Veritabanı Hazırlığı (PostgreSQL)
1. PostgreSQL'de `ecocampus_db` adında bir veritabanı oluşturun.
2. `backend/.env` dosyasındaki veritabanı şifrelerinizi güncelleyin.

### 2. Backend (Sunucu)
Terminali açın ve backend klasörüne gidin:
```bash
cd backend
npm install
npm start