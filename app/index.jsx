import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Mobiiliohjelmointi homework app by Ali Romar</Text>
      <StatusBar style="auto" />
      <Link href="/T1Laskin" style={styles.link}>
        Tehtävä 1 (Laskin)
      </Link>
      <Link href="/T2NumeronArvaus" style={styles.link}>
        Tehtävä 2 (Numeron arvaus)
      </Link>
      <Link href="/T3LaskinHistorialla" style={styles.link}>
        Tehtävä 3 (Laskin historialla)
      </Link>
      <Link href="/T4Ostoslista" style={styles.link}>
        Tehtävä 4 (Ostoslista)
      </Link>
      <Link href="/T5LaskinHistoriallaLaskin" style={styles.link}>
        Tehtävä 5 (Laskin historialla)
      </Link>
      <Link href="/T6ReseptienHaku" style={styles.link}>
        Tehtävä 6 (Reseptien haku)
      </Link>
      <Link href="/T7EuroMuunnin" style={styles.link}>
        Tehtävä 7 (Euro Muunnin)
      </Link>
      <Link href="/T8EtsiOsoite" style={styles.link}>
        Tehtävä 8 (Etsi osoite)
      </Link>
      <Link href="/T9Ravintolahaku" style={styles.link}>
        Tehtävä 9 (Ravintolahaku)
      </Link>
      <Link href="/T10EtsiOsoiteJaSijainti" style={styles.link}>
        Tehtävä 10 (Etsi osoite & sijainti)
      </Link>
      <Link href="/T11OstoslistaJaSqlite" style={styles.link}>
        Tehtävä 11 (Ostoslista & SQLite)
      </Link>
      <Link href="/T12OstoslistaJaFirebase" style={styles.link}>
        Tehtävä 12 (Ostoslista & Firebase)
      </Link>
      <Link href="/T13Kontakti" style={styles.link}>
        Tehtävä 13 (Kontakti)
      </Link>
      <Link href="/T14TekstiPuheeksi" style={styles.link}>
        Tehtävä 14 (Teksti puheeksi)
      </Link>
      <Link href="/T15TyylikkaampiOstoslista" style={styles.link}>
        Tehtävä 15 (Tyylikkäämpi ostoslista)
      </Link>
      <Link href="/T16OsoitekirjaMyPlaces" style={styles.link}>
        Tehtävä 16 (Osoitekirja)
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
  statusBar: {
    backgroundColor: 'blue',
  },
  link: {
    color: 'blue',
  },
});
