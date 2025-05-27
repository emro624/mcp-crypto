# Mobile Crypto Price App

Bu uygulama, agent servisine bağlanarak kripto para fiyatlarını gösterir.

## Çalıştırmak için

1. [Node.js ve MCP/agent servislerini başlatın](../README.md).
2. [Expo CLI](https://docs.expo.dev/get-started/installation/) kurulu değilse kurun:
   ```
   npm install -g expo-cli
   ```
3. Bu klasörde terminal açıp:
   ```
   npm install
   npm start
   ```
4. Expo Go uygulaması ile QR kodu okutun veya emülatörde açın.

> **Not:** Android emülatör için agent endpoint'i `http://10.0.2.2:4000/agent/price` olarak ayarlanmıştır. Gerçek cihazda kendi bilgisayar IP'nizi kullanmalısınız. 