import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, View, Text, Button, StatusBar, 
    TouchableOpacity, ActivityIndicator, Alert, LogBox
} from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import colors from '../config/colors'
import Logo from '../components/Logo'
import ProfileImage from '../components/ProfileImage'
import Header from '../components/Header'

import firebaseConfig from '../config/firebase/firebase'
import { initializeApp } from "firebase/app"
import {getDatabase, ref as dbRef, set} from 'firebase/database'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

export default function UploadImage({route, navigation}) {
    const [image, setImage] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Firebase initialization
    const app = initializeApp(firebaseConfig)

    // Firebase Storage initialization
    const storage = getStorage(app)

    // Firebase Databases initialization
    const db = getDatabase(app)

    useEffect(() =>{
        LogBox.ignoreAllLogs()
        setUser(route.params.details)
        if(route.params.details?.img){
            setImage(route.params.img)
        }
    }, [])

    const headerText = {
        first: <AntDesign name="arrowleft" size={24} color={colors.white} />
    }

    const headerAction = {
        first: ()=>navigation.goBack()
    }

    const pickImage = async() => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setImage(pickerResult);
    }

    const uploadImage = async() => {
        if(image){
            setLoading(true)
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", image, true);
                xhr.send(null);
            })

            // const rand = Math.floor(Math.random() * 1000000000)
            // const storageRef = ref(storage, `employees/image${rand}`)

            console.log({image, blob})

            // uploadBytes(storageRef, blob).then((snapshot)=>{
            //     getDownloadURL(snapshot.ref).then(url=>{
            //         const dataObj = {...user, img: url}
            //         set(dbRef(db, `Users/${user.id}`), dataObj).then(()=>{
            //             setLoading(false)
            //             Alert.alert('Upload', 'Image upload was successful', [
            //                 {
            //                     text: 'OK',
            //                     onPress: ()=>navigation.goBack()
            //                 }
            //             ])
            //         })
            //     })
            // })
        }else{
            setLoading(false)
            setError('No image selected')
            setTimeout(()=>setError(''), 3000)
        }
    }

  return (
    <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.primary} />
            <Header text={headerText} action={headerAction}/>
            <View style={styles.break} />

            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                {image ? <ProfileImage uri={image.uri} /> : <Logo />}
                <View style={{ width: '100%', height: 10}} />
                <Button title="Upload Image" onPress={pickImage} />
            </View>

            <View style={styles.break} />
            <Text style={styles.error}>{error}</Text>
            <View style={{ width: '100%', height: 10}} />
            <View style={{ width: '70%', alignSelf: 'center'}}>
                <TouchableOpacity onPress={uploadImage}>
                    <View style={styles.button}>
                        {loading ? 
                            <ActivityIndicator size="large" color={colors.white} />
                            :
                            <Text style={styles.buttonText}>Upload Image</Text>
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
        padding: 10, 
        backgroundColor: 'tomato', 
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 20,
        color: colors.white
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
        fontSize: 16,
        color: colors.white,
        textAlign: 'center'
    },
    safeareaview: {
        flex: 1
    }
})