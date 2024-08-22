import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import T1Laskin from './T1Laskin';
import T2NumeronArvaus from './T2NumeronArvaus';

export default function App() {
  return (
    <View style={styles.container}>
      <T2NumeronArvaus />
      <StatusBar style="auto" />
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
});
