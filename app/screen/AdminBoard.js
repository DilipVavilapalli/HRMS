import React from 'react'
import {StyleSheet, SafeAreaView, View, Text, StatusBar, TouchableOpacity} from 'react-native'

import colors from '../config/colors'
import Header from '../components/Header'
import Logo from '../components/Logo'

import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import Button from '../components/Button'

export default function AdminBoard({navigation}) {
    const headerText = {
        last:<AntDesign name="poweroff" size={24} color={colors.white} />
    }

    const headerAction = {
        last: ()=> navigation.goBack()
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
            <View style={styles.break} />

            <View style={styles.view}>
                <Button title="Employee List" onPress={()=>navigation.navigate('AdminList')} />
                <View style={{ width: '100%', height: 30 }} />
                <TouchableOpacity onPress={()=>navigation.navigate('Scan')}>
                    <View style={styles.btn}>
                        <View><MaterialIcons name="qr-code-scanner" size={30} color="#fff" /></View>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Scan</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    btn: { 
        width: '100%', 
        padding: 15, 
        backgroundColor: 'tomato', 
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    break: {
        width: '100%',
        height: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary
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
    },
    view: {
        width: '90%',
        alignSelf: 'center'
    }
})