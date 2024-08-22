import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import T1Laskin from './T1Laskin';

export default function App() {
  return (
    <View style={styles.container}>
      <T1Laskin />
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
