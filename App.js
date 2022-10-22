import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen';
// import { AppLoading } from 'expo';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require('./assets/fonts/Inter-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground source={require('./assets/images/bg.webp')} style={styles.image} resizeMode="cover">
        <View style={styles.wrapper}>
          <Text style={styles.text}>My new app!</Text>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Medium',
    color: '#FFFFFF',
    fontSize: 20,
    padding: 10,
  },
});
