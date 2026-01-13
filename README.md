# EcoCampus 

EcoCampus, üniversite öğrencilerinin kullanmadıkları ders materyallerini, kitaplarını veya eşyalarını satabilecekleri ya da ihtiyaç sahiplerine ücretsiz bağışlayabilecekleri bir platformdur.

**Ders:** YMH3007 Fullstack Web ve Mobil Uygulama Geliştirme  
**Geliştirici:** [Rabia Gömeçoğlu] - [232010080031]  
**Dönem:** 2025-2026 Güz Dönemi

## Proje Hakkında

Bu proje, döngüsel ekonomi ve öğrenci dayanışmasını temel alarak geliştirilmiştir.
- **Backend:** Node.js & Express.js (REST API)
- **Veritabanı:** PostgreSQL
- **Web:** React.js (Yönetim Paneli)
- **Mobil:** React Native & Expo (Kullanıcı Uygulaması)

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları sırasıyla uygulayın.

### Ön Hazırlıklar 
Projeyi çalıştırmadan önce bilgisayarınızda şunların kurulu olduğundan emin olun:
* **Node.js** (v14 veya üzeri)
* **MySQL Veritabanı** (XAMPP veya yerel MySQL servisi)
* **Expo Go** (Mobil uygulamayı test etmek için telefona yüklü olmalı)
* **Git**

---

### Veritabanı ve Backend Kurulumu
Sistemin beyni olan sunucuyu (API) başlatmadan istemciler (Web/Mobil) veri çekemez.

1.  **MySQL Servisini Başlatın:** XAMPP Control Panel'den `Apache` ve `MySQL` servislerini "Start" konumuna getirin.
2.  **Terminali Açın:** Proje ana dizininde bir terminal açın ve Backend klasörüne geçiş yapın:
    ```bash
    cd backend
    ```
3.  **Bağımlılıkları Yükleyin:** Gerekli kütüphanelerin (`node_modules`) indirilmesi için:
    ```bash
    npm install
    ```
4.  **Sunucuyu Başlatın:**
    ```bash
    npm start
    ```
    > ✅ **Başarılı Çıktı:** Terminalde `Server 5000 portunda çalışıyor' mesajını görmelisiniz. Bu terminali **kapatmayın**.

---

### Web Arayüzü (Frontend) Kurulumu
Yönetim paneli ve web kullanıcı arayüzünü başlatmak için:

1.  **Yeni Bir Terminal Açın** (Backend terminali açık kalmalı).
2.  Web klasörüne gidin:
    ```bash
    cd web/frontend
    ```
3.  Paketleri yükleyin:
    ```bash
    npm install
    ```
4.  Projeyi başlatın:
    ```bash
    npm start
    ```
    > Tarayıcınız otomatik olarak **http://localhost:3000** adresini açacaktır. Açılmazsa bu adresi manuel olarak girebilirsiniz.

---

### Mobil Uygulama (React Native - Expo) Kurulumu
Mobil uygulamanın fiziksel bir cihazda (Telefon) veya Emülatörde çalıştırılması için aşağıdaki **IP Konfigürasyonu** hayati önem taşır.

#### Kritik Ayar: IP Adresi Yapılandırması
Mobil cihazınızın bilgisayarınızdaki sunucuya (Backend) erişebilmesi için `localhost` yerine bilgisayarınızın yerel IP adresini kullanmalısınız.

1.  Bilgisayarınızın IP adresini öğrenin (Windows'ta `ipconfig`, Mac'te `ifconfig` komutu ile). Örn: `192.168.1.35`
2.  Proje içinde `mobile/services/api.js` dosyasını açın.
3.  `baseURL` satırını kendi IP adresinizle güncelleyin.


    ### Alternatif Bağlantı Yöntemi: USB (Tethering)
Eğer Wi-Fi ağında kısıtlama varsa (Örn: Yurt/Kampüs Wi-Fi) veya bağlantı stabil değilse, uygulamayı **USB Kablosu** ile daha kararlı çalıştırabilirsiniz:

1.  Telefonunuzu USB kablosu ile bilgisayara bağlayın.
2.  Telefondan **Ayarlar > Bağlantı Paylaşımı > USB Bağlanıyor (USB Tethering)** seçeneğini aktif edin.
3.  Bilgisayarınızda `ipconfig` (Windows) komutunu çalıştırın.
4.  Ethernet/USB adaptörünün verdiği yeni IP adresini `api.js` dosyasındaki `baseURL` kısmına yazın.
    ```

#### Uygulamayı Başlatma
1.  **Yeni Bir Terminal Açın** ve mobil klasörüne gidin:
    ```bash
    cd mobile
    ```
2.  Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```
3.  Expo sunucusunu başlatın:
    ```bash
    npx expo start
    ```
4.  Ekranda büyük bir **QR Kod** belirecektir.
    * **Android:** Expo Go uygulamasını açın ve "Scan QR Code" diyerek kodu okutun.
    * **iOS:** Kamera uygulamasını açıp QR kodu okutun.
