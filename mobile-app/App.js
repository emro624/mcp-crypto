import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';

export default function App() {
  const [coin, setCoin] = useState('bitcoin');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrice = async () => {
    setLoading(true);
    setError(null);
    setPrice(null);
    try {
      // Agent servisini kendi IP/portuna göre güncelle
      const response = await fetch(`http://10.0.2.2:4000/agent/price?coin=${coin}`); // Android emulator için 10.0.2.2
      const data = await response.json();
      if (data.price) {
        setPrice(data.price);
      } else {
        setError('Fiyat bulunamadı');
      }
    } catch (e) {
      setError('Bağlantı hatası');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kripto Fiyat Sorgu</Text>
      <TextInput
        style={styles.input}
        value={coin}
        onChangeText={setCoin}
        placeholder="Coin ismi (ör: bitcoin)"
        autoCapitalize="none"
      />
      <Button title="Fiyatı Getir" onPress={fetchPrice} />
      {loading && <ActivityIndicator style={{ margin: 16 }} />}
      {price && <Text style={styles.price}>{coin} fiyatı: ${price}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
}); 