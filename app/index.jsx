import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
        <Text>Welcome to Mobiiliohjelmointi homework app by Ali Romar</Text>        
      <StatusBar style="auto" />
      <Link href="/T1Laskin" style={{ color: 'blue'}}>
      Tehtävä 1 (Laskin)      
      </Link>
      <Link href="/T2NumeronArvaus" style={{ color: 'blue'}}>
      Tehtävä 2 (Numeron arvaus)      
      </Link>
      <Link href="/T3LaskinHistorialla" style={{ color: 'blue'}}>
      Tehtävä 3 (Laskin historialla)
      </Link>
      <Link href="/T4Ostoslista" style={{ color: 'blue'}}>
      Tehtävä 4 (Ostoslista)
      </Link>
      <Link href="/T5LaskinHistoriallaLaskin" style={{ color: 'blue'}}>
      Tehtävä 5 (Laskin historialla)
      </Link>
      <Link href="/T6ReseptienHaku" style={{ color: 'blue'}}>
      Tehtävä 6 (Reseptien haku)
      </Link>
      <Link href="/T7EuroMuunnin" style={{ color: 'blue'}}>
      Tehtävä 7 (Euro Muunnin)
      </Link>
      <Link href="/T8EtsiOsoite" style={{ color: 'blue'}}>
      Tehtävä 8 (Etsi osoite)
      </Link>
      <Link href="/T9Ravintolahaku" style={{ color: 'blue'}}>
      Tehtävä 9 (Ravintolahaku)
      </Link>
      <Link href="/T10EtsiOsoiteJaSijainti" style={{ color: 'blue'}}>
      Tehtävä 10 (Etsi osoite & sijainti)
      </Link>
      <Link href="/T11OstoslistaJaSqlite" style={{ color: 'blue'}}>
      Tehtävä 11 (Ostoslista & SQLite)
      </Link>
      <Link href="/T12OstoslistaJaFirebase" style={{ color: 'blue'}}>
      Tehtävä 12 (Ostoslista & Firebase)
      </Link>
      <Link href="/T13Kontakti" style={{ color: 'blue'}}>
      Tehtävä 13 (Kontakti)
      </Link>
      <Link href="/T14TekstiPuheeksi" style={{ color: 'blue'}}>
      Tehtävä 14 (Teksti puheeksi)
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: 'blue',
  },
});
