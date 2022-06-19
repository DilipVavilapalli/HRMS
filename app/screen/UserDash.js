import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, View, Text, StatusBar, Alert, LogBox} from 'react-native'

import { AntDesign } from '@expo/vector-icons'

import colors from '../config/colors'

import firebaseConfig from '../config/firebase/firebase'
import { initializeApp } from "firebase/app"
import { getAuth, signOut } from "firebase/auth"
import {getDatabase, ref, onValue} from 'firebase/database'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Box from '../components/Box'

export default function UserDash({navigation}) {
    const [user, setUser] = useState(null)

    // Firebase initialization
    const app = initializeApp(firebaseConfig)

    // Datebase
    const db = getDatabase(app)

    // End of Firebase initialization

    const getUserInfo = async() => {
        try{
            const email = await AsyncStorage.getItem('email')
            onValue(ref(db, 'Users'), snapshot=>{
                const arr = []
                const data = snapshot.val()
                const datakeys = Object.keys(data)
                if(datakeys.length > 0){
                    datakeys.forEach(key=>{
                        let obj = data[key]
                        obj.id = obj?.id ? obj.id : key
                        arr.push(obj)
                    })
                }
                const findItem = arr.find(item=>item.email === email)
                if(findItem){
                    setUser(findItem)
                }
            })
        }catch(e){
            console.log(e.message)
        }
    }

    useEffect(() =>{
        LogBox.ignoreAllLogs()
        getUserInfo()
    }, [])

    const signout = async() => {
        const auth = getAuth();
        signOut(auth).then(() => {
            AsyncStorage.removeItem('email')
            Alert.alert('Sign out', 'Account logged out', [
                {
                    text: "OK",
                    onPress: ()=>navigation.goBack()
                }
            ])
        }).catch((error) => {
            Alert.alert('Signout Error', `${error.message}`, [
                {
                    text: 'OK'
                }
            ])
        })
    }

    const headerText = {
        last:<AntDesign name="poweroff" size={24} color={colors.white} />
    }

    const headerAction = {
        last: ()=> signout()
    }
    
  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={styles.container}>
            <Header text={headerText} action={headerAction} />
            <View style={styles.logo}>
                <Logo />
                <Text style={styles.title}>Welcome, {user?.fullname ?? 'User'}</Text>
            </View>
            <View style={styles.break} />

            <View style={styles.form}>
                <Text style={[styles.title, {color: 'black'}]}>User Profile</Text>
                <View style={{ width: '100%', height: 10 }} />

                <Box label="Name" text={user?.fullname ?? ''} />
                <Box label="DOB" text={user?.dob ?? ''} />
                <Box label="Phone" text={user?.phoneNumber ?? ''} />
                <Box label="Email" text={user?.email ?? ''} />
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    break: {
        width: '100%',
        height: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    form: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderRadius: 5,
        padding: 10
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