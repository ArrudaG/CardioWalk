import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function App() {
  const [data, setData] = useState<{ message: string; timestamp: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Altere a porta caso o .NET rode em uma porta diferente
  // Android Emulator: 10.0.2.2 | iOS Simulator: localhost | Celular Físico: seu IP local
  const API_URL = 'http://10.0.2.2:5000/api/status'; 

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Erro na resposta da API');
        return response.json();
      })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Não foi possível conectar à API. Verifique o IP e a porta.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Template React Native + .NET</Text>
      
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      {data && (
        <View style={styles.card}>
          <Text style={styles.message}>{data.message}</Text>
          <Text style={styles.timestamp}>Timestamp: {new Date(data.timestamp).toLocaleTimeString()}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  message: {
    fontSize: 16,
    color: '#28a745',
    textAlign: 'center',
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  error: {
    color: '#dc3545',
    textAlign: 'center',
    padding: 10,
  },
});