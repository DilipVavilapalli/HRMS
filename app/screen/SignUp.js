import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, View, Text, StatusBar, ActivityIndicator, Alert,
    TouchableOpacity, ScrollView, LogBox
} from 'react-native'

import { AntDesign } from '@expo/vector-icons'

import Input from '../components/Input'
import Label from '../components/Label'
import Logo from '../components/Logo'
import Header from '../components/Header'

import colors from '../config/colors'

import firebaseConfig from '../config/firebase/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app"
import {getDatabase, ref, push} from 'firebase/database'

// Import validations 
import validate from '../config/validation'

export default function SignUp({navigation}) {
    const [loading, setLoading] = useState(false)
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState({month: '', date: '', year: ''})
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')

    // Firebase initialization
    const app = initializeApp(firebaseConfig)

    // Datebase
    const db = getDatabase(app)

    // End of Firebase initialization

    useEffect(()=>{}, [
        LogBox.ignoreAllLogs()
    ])

    const signUp = async() => {
        setLoading(true)
        const {status, message} = validate.validateSignUp({fullname, dob, phoneNumber})
        
        if(status){
            if(email && password){
                // Auth
                const auth = getAuth()

                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const dbRef = ref(db, 'Users')
                    const obj = {fullname, email, phoneNumber, dob: `${dob.month}/${dob.date}/${dob.year}`}
                    push(dbRef, obj).then(()=>{
                        Alert.alert('Sign-Up Success', 'Sign up was successful', [
                            {
                                text: 'OK',
                                onPress: ()=>navigation.navigate('UserLogin')
                            }
                        ])
                    }).catch(err=>{
                        Alert.alert('Sign-Up Error', err.message, [
                            {
                                text: 'OK'
                            }
                        ])
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
                setTimeout(()=>setError(''), 3000)
            }
        }else{
            setLoading(false)
            setError(message)
            setTimeout(() => setError(''), 3000)
        }
    }

    const headerText = {
        first: <AntDesign name="arrowleft" size={24} color={colors.white} />,
        // last: <Text style={{ color: colors.white }}>User Login</Text>
    }

    const headerAction = {
        first: ()=>navigation.goBack(),
        // last: ()=>navigation.navigate('UserLogin')
    }

  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.primary} />
        <Header text={headerText} action={headerAction} />
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Logo />
                    <Text style={styles.title}>HRMS USER SIGN UP</Text>
                </View>
                <View style={styles.break} />

                <View style={styles.form}>
                    <Label text="Fullname" color={colors.white} />
                    <Input onChangeText={setFullname} value={fullname} />

                    <Label text="Phone Number" color={colors.white} />
                    <Input onChangeText={setPhoneNumber} value={phoneNumber} />

                    <Label text="Please enter your Date of Birth" color={colors.white} />
                    <View style={styles.dob}>
                        <View style={styles.dobItem}>
                            <Input onChangeText={text=>setDob({...dob, month: text})} value={dob.month} placeholder="Month" />
                        </View>
                        <View style={styles.dobItem}>
                            <Input onChangeText={text=>setDob({...dob, date: text})} value={dob.date} placeholder="Date" />
                        </View>
                        <View style={styles.dobItem}>
                            <Input onChangeText={text=>setDob({...dob, year: text})} value={dob.year} placeholder="Year" />
                        </View>
                    </View>

                    <Label text="Email address" color={colors.white} />
                    <Input onChangeText={setEmail} value={email} />

                    <Label text="Password" color={colors.white} />
                    <Input onChangeText={setPassword} value={password} secureTextEntry={true} />
                    <Text style={styles.error}>{error}</Text>

                    <View style={{ width: '100%', height: 5}} />
                    <TouchableOpacity onPress={signUp}>
                        <View style={styles.button}>
                            {loading ? 
                                <ActivityIndicator size="large" color="black" /> 
                                :
                                <Text style={styles.buttonText}>Sign Up</Text>
                            }
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', height: 30}} />
            </View>
        </ScrollView>
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
    dob: {
        flexDirection: 'row',
        marginBottom: 10
    },
    dobItem: {
        flex: 1,
        padding: 2
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