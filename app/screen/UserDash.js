import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, View, Text, StatusBar, Alert, LogBox, 
    ActivityIndicator
} from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import SvgQRCode from 'react-native-qrcode-svg'

import colors from '../config/colors'

import firebaseConfig from '../config/firebase/firebase'
import { initializeApp } from "firebase/app"
import { getAuth, signOut } from "firebase/auth"
import {getDatabase, ref, onValue} from 'firebase/database'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'
import Logo from '../components/Logo'
import ProfileImage from '../components/ProfileImage'
import Button from '../components/Button'

export default function UserDash({navigation}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

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
                    setLoading(false)
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
                {user?.img ? <ProfileImage uri={user.img} /> : <Logo />}
                <Text style={styles.title}>Welcome, {user?.fullname ?? 'User'}</Text>
            </View>
            <View style={styles.break} />

            <View style={styles.box}>
                {loading ?
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator color={colors.white} size="large" />
                    </View>
                    :
                    <View style={styles.dashboard}>
                        <View style={{ alignSelf: 'center' }}>
                            {user?.email ? <SvgQRCode value={user?.email ? JSON.stringify(user): 'invalid user'} /> : <View />}
                        </View>
                        <View style={styles.break} />

                        <View style={styles.buttonsView}>
                            <View style={styles.buttonView}>
                                <Button onPress={()=>navigation.navigate({name: 'UserInfo', params: {details: user}})} title="View Info" bgColor={colors.lightgreen} color="black" />
                            </View>
                            {/* <View style={styles.buttonView}>
                                <Button title="Upload Image" bgColor="tomato" onPress={()=>navigation.navigate({name: 'UploadImage', params: {details: user}})} />
                            </View> */}
                        </View>
                    </View>
                }
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    activityIndicator: { 
        width: '100%', 
        height: 200, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    box: { 
        width: '90%', 
        alignSelf: 'center'
    },
    break: {
        width: '100%',
        height: 20
    },
    buttonView:{
        marginBottom: 20
    },
    buttonsView: {
        width: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    dashboard: {
        width: '100%'
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