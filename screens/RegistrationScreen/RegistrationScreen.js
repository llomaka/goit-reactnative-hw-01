import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Dimensions } from "react-native";
import { useFonts } from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen';
import { useTogglePasswordVisibility } from '../../hooks';
// import AddImage from '../../assets/images/add.svg';
import { styles } from '../LoginScreen/LoginScreen';

export default function RegistrationScreen() { 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
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

  const onLayoutRegistrationView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
    
    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
    };
    
    const handleSubmit = () => {
        setIsKeyboardShown(false);
        Keyboard.dismiss();
        console.log('username: ', username, 'email: ', email, 'password: ', password);
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
            <View style={styles.container} onLayout={onLayoutRegistrationView}>
                <ImageBackground source={require('../../assets/images/bg.webp')} style={styles.image} resizeMode="cover">
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View style={[styles.form, regStyles.formContainer, { paddingBottom: isKeyboardShown ? 32 : 78 , paddingHorizontal: width > 500 ? 100 : 16 }]}>
                            <View style={regStyles.avatarContainer}>
                                <Pressable onPress={() => console.log('Add image')} style={{ borderRadius: 25 }}>
                                    {/* <AddImage width={25} height={25} /> */}
                                </Pressable>
                            </View>
                            <Text style={styles.title}>Registration</Text>
                            <TextInput
                                style={[styles.textInput, {backgroundColor: isUsernameFocused ? 'transparent' : '#F6F6F6', borderColor: isUsernameFocused ? '#FF6C00' : '#E8E8E8'}]}
                                placeholder='Username'
                                placeholderTextColor='#BDBDBD'
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                onFocus={() => {
                                    setIsUsernameFocused(true)
                                    setIsKeyboardShown(true)
                                }}
                                onBlur={() => setIsUsernameFocused(false)}
                            />
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
                                    value={password}
                                    placeholder='Password'
                                    placeholderTextColor='#BDBDBD'
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
                                <Text style={styles.buttonText}>Register</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => console.log('Go to Login Form')}
                                style={[styles.button, styles.buttonInvert]}
                            >
                                <Text style={[styles.buttonText, styles.buttonTextInvert]}>Already have an account? Sign In</Text>
                            </Pressable>
                            <StatusBar style="auto" />
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
};

const regStyles = StyleSheet.create({
    formContainer: {
        position: 'relative',
        paddingTop: 92,
    },
    avatarContainer: {
        position: 'absolute',
        top: -60,
        alignSelf: 'center',
        width: 120,
        height: 120,
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
    },
});