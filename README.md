# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Project Detail Info

Bu projede, kullanıcıların video kayıtlarını yönetebilecekleri, düzenleyebilecekleri ve paylaşabilecekleri bir mobil uygulama geliştirdim. Aşağıda projede kullandığım temel teknolojiler ve yaklaşımlar hakkında bilgiler bulunmaktadır.

### Kullanılan Teknolojiler

#### Temel Teknolojiler
- **TypeScript**: Tip güvenliği sağlayarak geliştirme sürecini daha güvenli hale getirdim
- **React Native**: Çapraz platform mobil uygulama geliştirmek için kullandım
- **Expo**: Geliştirme sürecini hızlandırmak ve cihaz özelliklerine kolay erişim sağlamak için tercih ettim
- **Expo Router**: Dosya tabanlı yönlendirme sistemi ile navigasyon yapısını oluşturdum

#### Veri Yönetimi
- **Zustand**: Uygulama genelinde durum yönetimi için hafif ve kullanımı kolay bir çözüm olarak tercih ettim
- **SQLite**: Yerel veritabanı olarak video bilgilerini saklamak için kullandım
- **React Query**: Sunucu durumu yönetimi ve önbelleğe alma için implementasyon yaptım

#### UI/UX
- **NativeWind/TailwindCSS**: Stil yönetimi için CSS-in-JS yaklaşımı yerine daha hızlı ve tutarlı bir çözüm olarak kullandım
- **Expo AV**: Video oynatma ve kontrol işlemleri için kullandım
- **Expo Image Picker**: Galeriden video seçimi için entegre ettim
- **Expo Sharing**: Video paylaşım özelliği için kullandım

#### Form Yönetimi
- **React Hook Form**: Form durumlarını yönetmek ve doğrulama işlemleri için kullandım
- **Zod**: Form doğrulama şemaları oluşturmak için tercih ettim

### Mimari Yaklaşım

Uygulamada şu mimari yaklaşımları benimsedim:
- **Bileşen Tabanlı Mimari**: Yeniden kullanılabilir bileşenler oluşturarak kod tekrarını azalttım
- **Durum Yönetimi Ayrımı**: Zustand ile farklı işlevler için ayrı store'lar oluşturarak (video seçimi, metadata, modal durumu vb.) kaygıları ayırdım
- **Dosya Tabanlı Yönlendirme**: Expo Router ile sayfa yapısını dosya sistemi üzerinden yönettim
- **Yerel Veri Saklama**: SQLite ile video bilgilerini yerel veritabanında saklayarak çevrimdışı kullanım sağladım

### Öne Çıkan Özellikler
- Video seçme ve düzenleme
- Video kırpma simülasyonu (Expo Go sınırlamaları nedeniyle gerçek kırpma yerine)
- Video metadata düzenleme (başlık, açıklama)
- Video paylaşımı
- Kaydedilen videoları listeleme ve detaylarını görüntüleme
- Responsive tasarım ve kullanıcı dostu arayüz

### Performans Optimizasyonları
- Zustand ile minimal durum güncellemeleri
- React Query ile veri önbelleğe alma
- NativeWind ile optimize edilmiş stil yönetimi
- Gerektiğinde bileşenlerin yeniden render edilmesini önlemek için memoization kullanımı(FlatList etc.)

Bu proje, modern React Native geliştirme pratiklerini ve state-of-the-art araçları kullanarak, kullanıcı dostu ve performanslı bir mobil uygulama geliştirme yaklaşımımı yansıtmaktadır.