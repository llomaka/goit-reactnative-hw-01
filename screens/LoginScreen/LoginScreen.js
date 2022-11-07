import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Dimensions } from "react-native";
import { useFonts } from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen';
import { useTogglePasswordVisibility } from '../../hooks';

export default function LoginScreen() { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isKeyboardShown, setIsKeyboardShown] = useState(false);
    const [width, setWidth] = useState(Dimensions.get('window').width);
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
    
    useEffect(() => {
        const onChange = () => {
            setWidth(Dimensions.get('window').width);
        };
        const subscription = Dimensions.addEventListener('change', onChange);
        return () => subscription?.remove();
    }, []);

  const onLayoutLoginView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
    
    const resetForm = () => {
        setEmail('');
        setPassword('');
    };
    
    const handleSubmit = () => { 
        setIsKeyboardShown(false);
        Keyboard.dismiss();
        console.log('email: ', email, 'password: ', password);
        resetForm();
    };

    const handleKeyboardDismiss = () => { 
        setIsKeyboardShown(false);
        Keyboard.dismiss();
    };

  if (!fontsLoaded) {
    return null;
  }

    return (
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
            <View style={styles.container} onLayout={onLayoutLoginView}>
                <ImageBackground source={require('../../assets/images/bg.webp')} style={styles.image} resizeMode="cover">
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View style={[styles.form, { paddingBottom: isKeyboardShown ? 32 : 133, paddingHorizontal: width > 500 ? 100 : 16 }]}>
                            <Text style={styles.title}>Login</Text>
                            <TextInput
                                style={[styles.textInput, {backgroundColor: isEmailFocused ? 'transparent' : '#F6F6F6', borderColor: isEmailFocused ? '#FF6C00' : '#E8E8E8'}]}
                                placeholder='Email'
                                placeholderTextColor='#BDBDBD'
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                onFocus={() => {
                                    setIsEmailFocused(true)
                                    setIsKeyboardShown(true)
                                }}
                                onBlur={() => setIsEmailFocused(false)}
                            />
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={[styles.textInputPassword, {backgroundColor: isPasswordFocused ? 'transparent' : '#F6F6F6', borderColor: isPasswordFocused ? '#FF6C00' : '#E8E8E8'}]}
                                    maxLength={30}
                                    placeholder='Password'
                                    placeholderTextColor='#BDBDBD'
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry={passwordVisibility}
                                    onFocus={() => {
                                        setIsPasswordFocused(true)
                                        setIsKeyboardShown(true)
                                    }}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                <Pressable
                                    onPress={handlePasswordVisibility}
                                    style={styles.showButton}
                                >
                                    <Text style={styles.showText}>{buttonText}</Text>
                                </Pressable>
                            </View>
                            <Pressable
                                onPress={handleSubmit}
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
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    form: {
        paddingTop: 32,
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
        borderWidth: 1,
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