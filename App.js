import { StatusBar } from 'expo-status-bar';
// import { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import * as SplashScreen from 'expo-splash-screen';
// import { AppLoading } from 'expo';

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
