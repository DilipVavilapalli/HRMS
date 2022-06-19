import React, {useEffect, useState} from 'react'
import {StyleSheet, SafeAreaView, View, Text, StatusBar, FlatList, TouchableOpacity} from 'react-native'

import colors from '../config/colors'
import Header from '../components/Header'
import Logo from '../components/Logo'

import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import firebaseConfig from '../config/firebase/firebase'
import { initializeApp } from "firebase/app"
import {getDatabase, ref, onValue} from 'firebase/database'

export default function AdminBoard({navigation}) {
    const [list, setList] = useState([])

    // Firebase initialization
    const app = initializeApp(firebaseConfig)

    // Datebase
    const db = getDatabase(app)

    // End of Firebase initialization

    const headerText = {
        last:<AntDesign name="poweroff" size={24} color={colors.white} />
    }

    const headerAction = {
        last: ()=> navigation.goBack()
    }

    useEffect(() =>{
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
            console.log('arr', arr)
            setList(arr)
        })
    }, [])

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity onPress={()=>navigation.navigate({name: 'AdminView', params: {details: item}})}>
                <View style={styles.list}>
                    <View><Feather name="user" size={24} color="black" /></View>
                    <View><Text style={styles.listText}>{item.fullname}</Text></View>
                </View>
            </TouchableOpacity>
        )
    }

  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={styles.container}>
            <Header text={headerText} action={headerAction} />
            <View style={styles.logo}>
                <Logo />
                <Text style={styles.title}>Welcome, Admin</Text>
            </View>
            <View style={styles.break} />

            <View style={[styles.form, {backgroundColor: colors.white, padding: 10}]}>
                <Text style={styles.empTitle}>List of Employees Profile</Text>
                <View>
                    <FlatList data={list} renderItem={renderItem} keyExtractor={item=>item?.email} />
                </View>
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
    empTitle: {
        fontSize: 16, 
        fontWeight: 'bold'
    },
    form: {
        width: '90%',
        alignSelf: 'center'
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10, 
        backgroundColor: '#ccc',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 5
    },
    listText: {
        fontSize: 20,
        paddingLeft: 10
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