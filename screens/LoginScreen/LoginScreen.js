import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { useFonts } from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen';
import { useTogglePasswordVisibility } from '../../hooks';

export default function LoginScreen() { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { passwordVisibility, buttonText, handlePasswordVisibility } = useTogglePasswordVisibility();

    const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutLoginView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

    return (
        <View style={styles.container} onLayout={onLayoutLoginView}>
            <ImageBackground source={require('../../assets/images/bg.webp')} style={styles.image} resizeMode="cover">
                <View style={styles.form}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Email'
                        placeholderTextColor='#BDBDBD'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInputPassword}
                            maxLength={30}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={passwordVisibility}
                        />
                        <Pressable
                            onPress={handlePasswordVisibility}
                            style={styles.showButton}
                        >
                            <Text style={styles.showText}>{buttonText}</Text>
                        </Pressable>
                    </View>
                    <Pressable
                        onPress={() => console.log('email: ', email, ' password: ', password)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Sing In</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => console.log('Go to Registration Form')}
                        style={[styles.button, styles.buttonInvert]}
                    >
                        <Text style={[styles.buttonText, styles.buttonTextInvert]}>Do not have an account? Register</Text>
                    </Pressable>
                    <StatusBar style="auto" />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    form: {
        paddingHorizontal: 16,
        paddingVertical: 32,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'transparent',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    title: {
        width: '100%',
        marginBottom: 33,
        fontFamily: 'Roboto-Medium',
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',
        letterSpacing: 0.01,
        color: '#212121',
    },
    textInput: {
        width: '100%',
        padding: 16,
        marginBottom: 16,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
    },
    textInputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 43,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
    },
    textInputPassword: {
        width: '80%',
        padding: 16,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',
    },
    showButton: {
        width: '20%',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
    },
    showText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'right',
        color: '#1B4371',
    },
    button: {
        padding: 16,
        backgroundColor: '#FF6C00',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 100,
    },
    buttonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        textTransform: 'none',
        color: '#FFFFFF',
    },
    buttonInvert: {
        backgroundColor: 'transparent',
    },
    buttonTextInvert: {
        color: '#1B4371',
    },
});