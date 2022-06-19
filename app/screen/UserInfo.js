import React from 'react'
import {StyleSheet, SafeAreaView, View, Text, StatusBar} from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import SvgQRCode from 'react-native-qrcode-svg'

import colors from '../config/colors'

import Header from '../components/Header'
import Logo from '../components/Logo'
import ProfileImage from '../components/ProfileImage'
import Box from '../components/Box'

export default function UserDash({route, navigation}) {
    const headerText = {
        first:<AntDesign name="arrowleft" size={24} color={colors.white} />
    }

    const headerAction = {
        first: ()=> navigation.goBack()
    }
    
  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={styles.container}>
            <Header text={headerText} action={headerAction} />
            <View style={styles.logo}>
                {route.params.details?.img ? <ProfileImage uri={route.params.details.img} /> : <Logo />}
                <Text style={styles.title}>Welcome, {route.params.details?.fullname ?? 'User'}</Text>
            </View>
            <View style={styles.break} />

            <View style={styles.form}>
                <Text style={[styles.title, {color: 'black'}]}>User Profile</Text>
                <View style={{ width: '100%', height: 10 }} />

                <Box label="Name" text={route.params.details?.fullname ?? ''} />
                <Box label="DOB" text={route.params.details?.dob ?? ''} />
                <Box label="Phone" text={route.params.details?.phoneNumber ?? ''} />
                <Box label="Email" text={route.params.details?.email ?? ''} />

                <View style={{ width: '100%', height: 20 }} />

                <View style={{ alignSelf: 'center' }}>
                    {route.params.details?.email ? <SvgQRCode value={route.params.details?.email ? JSON.stringify(route.params.details): 'invalid user'} /> : <View />}
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