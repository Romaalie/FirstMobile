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
