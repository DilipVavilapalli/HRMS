import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, View, Text, TouchableOpacity, 
    ActivityIndicator, StatusBar, LogBox
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons'

import colors from '../config/colors'
import Logo from '../components/Logo'
import Input from '../components/Input'
import Label from '../components/Label'
import Header from '../components/Header'

import firebaseConfig from '../config/firebase/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app"

export default function UserLogin({navigation}) {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // Firebase initialization
    const app = initializeApp(firebaseConfig)

    // End of Firebase initialization

    const headerText = {
        first: <AntDesign name="arrowleft" size={24} color={colors.white} />
    }

    const headerAction = {
        first: ()=>navigation.goBack()
    }

    const login = async() => {
        setLoading(true)
        if(email && password){
            const auth = getAuth()
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false)
                // Signed in 
                const user = userCredential.user;
                // console.log('user', user)
                AsyncStorage.setItem('email', email, ()=>{
                    navigation.navigate('UserDash')
                })
            })
            .catch((error) => {
                setLoading(false)
                const errorCode = error.code.split('/')[1].toUpperCase();
                setError(errorCode)
                setTimeout(() => setError(''), 3000)
            });
        }else{
            setLoading(false)
            setError('Email and password are required')
            setTimeout(() => setError(''), 3000)
        }
    }

    useEffect(() =>{
        LogBox.ignoreAllLogs()
    }, [])

  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={styles.container}>
            <Header text={headerText} action={headerAction}/>
            <View style={styles.logo}>
                <Logo />
                <Text style={styles.title}>HRMS USER SIGN IN</Text>
            </View>
            <View style={styles.break} />

            <View style={styles.form}>
                <Label text="Email" color={colors.white} />
                <Input value={email} onChangeText={setEmail} placeholder="Enter your email" />

                <Label text="Password" color={colors.white} />
                <Input value={password} onChangeText={setPassword} secureTextEntry placeholder="Enter your password" />
                <Text style={styles.error}>{error}</Text>

                <View style={{ width: '100%', height: 5}} />
                <TouchableOpacity onPress={login}>
                    <View style={styles.button}>
                        {loading ? 
                            <ActivityIndicator size="large" color="black" /> 
                            :
                            <Text style={styles.buttonText}>Sign In</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.lightgreen,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    break: {
        width: '100%', 
        height: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    error: {
        color: 'yellow',
        fontSize: 16
    },
    form: {
        width: '80%',
        alignSelf: 'center'
    },
    logo: {
        alignSelf: 'center',
        alignSelf: 'center'
    },
    safeareaview: {
        flex: 1
    },
    title: {
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})